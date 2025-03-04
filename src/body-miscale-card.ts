import { CSSResultGroup, LitElement, PropertyValues, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  fireEvent,
  formatDate,
  formatNumber,
  formatTime
} from 'custom-card-helpers';
import localize from './localize';
import styles from './styles.css';
import { HassEntity } from 'home-assistant-js-websocket';
import { Template, BodymiscaleCardConfig, BodymiscaleEntity } from './types';
import buildConfig from './config';
import { defaultCardConfig } from './const';

// String in the right side will be replaced by Rollup
const PKG_VERSION = 'PKG_VERSION_VALUE';

console.info(
  `%c Body-miscale-card \n%c  ${localize('common.version')} ${PKG_VERSION} `,
  'color: cyan; background: black; font-weight: bold;',
  'color: darkblue; background: white; font-weight: bold;',
);

@customElement('body-miscale-card')
export class BodymiscaleCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: BodymiscaleCardConfig;
  @state() open = false;

  static get styles(): CSSResultGroup {
    return styles;
  }

  public static async getConfigElement() {
    import('./editor');
    return document.createElement('body-miscale-card-editor');
  }

  static getStubConfig(_: unknown, entities: string[]) {
    const [bodymiscaleEntity] = entities.filter((eid) => eid.startsWith('bodymiscale'));

    return {
        ...defaultCardConfig,
        entity: bodymiscaleEntity ?? '',
    };
  }

  get entity(): BodymiscaleEntity {
    return this.hass.states[this.config.entity] as BodymiscaleEntity;
  }

  public setConfig(config: BodymiscaleCardConfig): void {
    this.config = buildConfig(config);
  }

  public getCardSize(): number {
    return this.config.show_name && this.config.show_buttons ? 4 
         : this.config.show_name || this.config.show_buttons ? 3 
         : 2;
  }

  shouldShowBackground() {
    return !(
      this.config.image === "" &&
      this.config.show_states === false &&
      this.config.show_attributes === false &&
      this.config.show_always_details === true &&
      this.config.show_body === true
    );
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  private toggle(event?: Event) {
    event?.stopPropagation();
    this.open = !this.open;
  }
  
  private customEvent(event: CustomEvent) {
    if (event.detail?.fold_row) {
      this.toggle(event);
    }
  }
  
  toggleMenu(key: string) {
    const menu = this.shadowRoot?.querySelector<HTMLElement & { open?: boolean }>(`#bmc-menu-${key}`);
    if (menu && 'open' in menu) {
      menu.open = !menu.open;
    }
  }

  private handleChange(mode: string | number, key: any, service?: string): void {
    if (!this.hass || !this.config?.entity) return;
  
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) return;
  
    this.callService(service ?? `bodymiscale.set_${key}`, {
      entity_id: stateObj.entity_id,
      [key]: mode,
    });
  }

  private callService(service: string, data?: Record<string, unknown>): void {
    if (!this.hass || !this.config?.entity) return;
  
    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      console.error("Entity not found:", this.config.entity);
      return;
    }
  
    const [domain, name] = service.split(".");
    const serviceData = { entity_id: stateObj.entity_id, ...data };
  
    this.hass.callService(domain, name, serviceData);
  }

  private moreInfo(): void {
    if (!this.config?.entity) {
        console.warn("No entity defined in the config.");
        return;
    }

    fireEvent(this, 'hass-more-info', {
        entityId: this.config.entity,
    });
  }

  private renderName(stateObj: HassEntity): Template {
    if (!this.config.show_name) {
      return nothing;
    }
    return html` <div class="title">${this.config.name || stateObj.attributes.friendly_name}</div> `;
  }

  private renderState(data: any): Template {
    if (!this.config.show_states) {
        return nothing;
    }
    if (!this.hass || !this.config?.entity) {
        return html`<div>${localize('state.default.unavailable')}</div>`;
    }

    const stateObj = this.hass.states?.[this.config.entity];

    if (!stateObj) {
        return html`<div>${this.hass.localize('state.default.unavailable')}</div>`;
    }

    const keyExists = data?.key && stateObj;
    const isValidAttribute = keyExists && stateObj.attributes?.[data.key] !== undefined;
    const isValidEntityData = keyExists && (stateObj as Record<string, any>)[data.key] !== undefined;

    let value = isValidAttribute
      ? stateObj.attributes[data.key]
      : isValidEntityData
      ? (stateObj as Record<string, any>)[data.key]
      : this.hass.localize('state.default.unavailable');

    if (data.key === "last_measurement_time" && typeof value === "string") {
      try {
        const parsedDate = new Date(value.replace(" ", "T"));
    
        const formattedDate = formatDate(parsedDate, this.hass.locale);
        const formattedTime = formatTime(parsedDate, this.hass.locale);
    
        value = `${formattedDate} ${formattedTime}`;
      } catch { /* empty */ }
    }

    const formatValue = typeof value === 'number' ? formatNumber(value, this.hass.locale) : value;
    const localizedValue = localize(`states.${value}`) || formatValue;

    const attribute =
      stateObj.state === 'ok' && data.icon === 'mdi:alert'
        ? nothing
        : html` <div class="state-div">
                  <div>${data.icon && this.renderIcon(data)}</div>
                  <div class="state-label">
                    ${data.label ?? ''}${localizedValue}${data.unit ?? ''}</div>
                </div>`;

    const hasDropdown = `${data.key}_list` in stateObj.attributes;

    return hasDropdown && (isValidAttribute || isValidEntityData) && data.service
      ? this.renderDropdown(attribute, data.key, data.service)
      : attribute;
  }

  private renderAttribute(data: any): Template {
    if (!this.config.show_attributes) {
        return nothing;
    }
    if (!this.hass || !this.config?.entity) {
      return html`<div>${localize('state.default.unavailable')}</div>`;
    }
    const stateObj = this.hass.states?.[this.config.entity];
    
    if (!stateObj) {
      return html`<div>${this.hass.localize('state.default.unavailable')}</div>`;
    }

    const computeFunc = typeof data.compute === 'function' ? data.compute : (v: any) => v;
    const keyExists = data?.key && stateObj;
    const isValidAttribute = keyExists && stateObj.attributes?.[data.key] !== undefined;
    const isValidEntityData = keyExists && (stateObj as Record<string, any>)[data.key] !== undefined;

    let value = isValidAttribute
      ? computeFunc(stateObj.attributes[data.key])
      : isValidEntityData
      ? computeFunc((stateObj as Record<string, any>)[data.key])
      : this.hass.localize('state.default.unavailable');

    if (data.key === "last_measurement_time" && typeof value === "string") {
      try {
        const parsedDate = new Date(value.replace(" ", "T"));
    
        const formattedDate = formatDate(parsedDate, this.hass.locale);
        const formattedTime = formatTime(parsedDate, this.hass.locale);
    
        value = `${formattedDate} ${formattedTime}`;
      } catch { /* empty */ }
    }

    const formatValue = typeof value === 'number' ? formatNumber(value, this.hass.locale) : value;

    const localizedValue = localize(`attributes_value.${value}`) || formatValue;
    const attribute = html`<div>
      ${data.icon && this.renderIcon(data)}
      ${data.label ?? ''}${localizedValue}${data.unit ?? ''}
    </div>`;

    const hasDropdown = `${data.key}_list` in stateObj.attributes;

    return hasDropdown && (isValidAttribute || isValidEntityData) && data.service
      ? this.renderDropdown(attribute, data.key, data.service)
      : attribute;
  }

  private renderBody(data: any): Template {
    if (!this.config.show_body) {
        return nothing;
    }
    if (!this.hass || !this.config?.entity) {
      return html`<div>${localize('state.default.unavailable')}</div>`;
    }
    const stateObj = this.hass.states?.[this.config.entity];
    
    if (!stateObj) {
      return html`<div>${this.hass.localize('state.default.unavailable')}</div>`;
    }

    const computeFunc = typeof data.compute === 'function' ? data.compute : (v: any) => v;
    const keyExists = data?.key && stateObj;
    const isValidAttribute = keyExists && stateObj.attributes?.[data.key] !== undefined;
    const isValidEntityData = keyExists && (stateObj as Record<string, any>)[data.key] !== undefined;

    let value = isValidAttribute
      ? computeFunc(stateObj.attributes[data.key])
      : isValidEntityData
      ? computeFunc((stateObj as Record<string, any>)[data.key])
      : this.hass.localize('state.default.unavailable');

    if (data.key === "last_measurement_time" && typeof value === "string") {
      try {
        const parsedDate = new Date(value.replace(" ", "T"));
        
        const formattedDate = formatDate(parsedDate, this.hass.locale);
        const formattedTime = formatTime(parsedDate, this.hass.locale);
        
        value = `${formattedDate} ${formattedTime}`;
      } catch { /* empty */ }
    }

    const formatValue = typeof value === 'number' ? formatNumber(value, this.hass.locale) : value;


    // Defined height and check for configured height.
    let barHeight: string | number = 30;
    if (typeof data.height === 'number' || typeof data.height === 'string') {
      barHeight = data.height;
    }

    // Set style variables based on direction.
    let alignItems = 'stretch';
    let backgroundMargin = '0px 0px 0px 13px';
    let barDirection = 'right';
    let flexDirection = 'row';
    let markerDirection = 'left';
    let markerStyle = 'height: 100%; width: 2px;';

    switch (data.direction) {
      case 'right':
        barDirection = 'right';
        markerDirection = 'left';
        break;
      case 'up':
        backgroundMargin = '0px';
        barDirection = 'top';
        flexDirection = 'column-reverse';
        markerDirection = 'bottom';
        markerStyle = 'height: 2px; width: 100%;';
        break;
    }

    // Set icon position html.
    let iconOutside;
    let iconInside;

    const positions = data.positions || {};
    switch (positions.icon) {
      case 'outside':
        iconOutside = html` <score-card-iconbar> ${data.icon && this.renderIconbody(data)} </score-card-iconbar> `;
        break;
      case 'inside':
        iconInside = html` <score-card-iconbar> ${data.icon && this.renderIconbody(data)} </score-card-iconbar> `;
        backgroundMargin = '0px';
        break;
      case 'off':
        backgroundMargin = '0px';
        break;
    }

    // Set name html based on position.
    let nameOutside;
    let nameInside;

    switch (data.positions.name) {
      case 'outside':
        nameOutside = html`
          <score-card-name
            style="${data.direction == 'up'
              ? ''
              : data.width
              ? `width: calc(100% - ${data.width});`
              : ''}"
            >${data.label ?? ''}</score-card-name
          >
        `;
        backgroundMargin = '0px';
        break;
      case 'inside':
        nameInside = html` <score-card-name>${data.label ?? ''}</score-card-name> `;
        break;
      case 'off':
        break;
    }

    // Set min and max html based on position.
    let minMaxOutside;
    let minMaxInside;

    const min = data.min ?? 0;
    const max = data.max ?? 100;
    switch (data.positions.minmax) {
      case 'outside':
        minMaxOutside = html`
          <score-card-min>${min + (data.unit ?? '')}</score-card-min>
          <score-card-divider>/</score-card-divider>
          <score-card-max>${max + (data.unit ?? '')}</score-card-max>
        `;
        break;
      case 'inside':
        minMaxInside = html`
          <score-card-min class="${data.direction == 'up' ? 'min-direction-up' : 'min-direction-right'}"
            >${min + (data.unit ?? '')}</score-card-min
          >
          <score-card-divider>/</score-card-divider>
          <score-card-max> ${max + (data.unit ?? '')}</score-card-max>
        `;
        break;
      case 'off':
        break;
    }

    // Set value html based on position.
    let valueOutside;
    let valueInside;
    
    switch (data.positions.value) {
      case 'outside':
        valueOutside = html`
          <score-card-value class="${data.direction == 'up' ? 'value-direction-up' : 'value-direction-right'}"
            >${(localize(`body_value.${value}`) || formatValue)}
             ${(data.unit ?? '')}</score-card-value
          >
        `;
        break;
      case 'inside':
        valueInside = html`
          <score-card-value
            class="${data.positions.minmax == 'inside'
              ? ''
              : data.direction == 'up'
              ? 'value-direction-up'
              : 'value-direction-right'}"
            >${(localize(`body_value.${value}`) || formatValue)}
             ${(data.unit ?? '')}</score-card-value
          >
        `;
        break;
      case 'off':
        backgroundMargin = '0px';
        break;
    }

    // Set bar color.
    const barColor = this.computeBarColor(data, Number(value));

    // Set bar percent and marker percent based on value difference.
    const barPercent = this.computePercent(data, Number(value));
    const targetMarkerPercent = this.computePercent(data, data.target);
    let targetStartPercent = barPercent;
    let targetEndPercent = this.computePercent(data, data.target);
    if (targetEndPercent < targetStartPercent) {
      targetStartPercent = targetEndPercent;
      targetEndPercent = barPercent;
    }

    // Set bar width if configured.
    let barWidth = '';
    if (data.width) {
      alignItems = 'center';
      barWidth = `width: ${data.width}`;
    }

    // Create array containing all rows.
    let rowFlexDirection = 'column';
    if (this.config.columns) rowFlexDirection = 'row';

    const attribute = html` <score-card-row style="flex-direction: ${rowFlexDirection};">
      <score-card-card style="flex-direction: ${flexDirection}; align-items: ${alignItems};">
        ${iconOutside} ${nameOutside}
        <score-card-background
          style="margin: ${backgroundMargin}; height: ${barHeight}${typeof barHeight == 'number'
            ? 'px'
            : ''}; ${barWidth}"
        >
          <score-card-backgroundbar style="--bar-color: ${barColor};"></score-card-backgroundbar>
          <score-card-currentbar
            style="--bar-color: ${barColor}; --bar-percent: ${barPercent}%; --bar-direction: ${barDirection}"
          ></score-card-currentbar>
          ${data.target
            ? html`
                <score-card-targetbar
                  style="--bar-color: ${barColor}; --bar-percent: ${targetStartPercent}%; --bar-target-percent: ${targetEndPercent}%; --bar-direction: ${barDirection};"
                ></score-card-targetbar>
                <score-card-markerbar
                  style="--bar-color: ${barColor}; --bar-target-percent: ${targetMarkerPercent}%; ${markerDirection}: calc(${targetMarkerPercent}% - 1px); ${markerStyle}"
                ></score-card-markerbar>
              `
            : ''}
          <score-card-contentbar
            class="${data.direction == 'up' ? 'contentbar-direction-up' : 'contentbar-direction-right'}"
          >
            ${iconInside} ${nameInside} ${minMaxInside} ${valueInside}
          </score-card-contentbar>
        </score-card-background>
        ${minMaxOutside} ${valueOutside}
      </score-card-card>
    </score-card-row>`;

    const hasDropdown = `${data.key}_list` in stateObj.attributes;

    return hasDropdown && (isValidAttribute || isValidEntityData)
      ? this.renderDropdown(attribute, data.key, data.service)
      : attribute;
  }

  private renderIcon(data: any): Template {
    if (!this.hass || !this.config?.entity) {
        return nothing;
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
        return nothing;
    }

    const icon =
        data.key === 'water' && 'water_icon' in stateObj.attributes
            ? stateObj.attributes.water_icon
            : data.icon;

    if (!icon) {
        return nothing; // Évite un <ha-icon> inutile
    }

    const isProblem = stateObj.attributes.problem !== 'none' && icon === 'mdi:alert';
    const iconClass = isProblem ? 'problem' : '';
    
    return html`
      <ha-icon
        class="${iconClass}"
        icon="${icon}"
        style="margin-right: 10px; ${this.config.styles?.icon || ''} ${isProblem ? 'color: var(--error-color) !important;' : ''}"
      ></ha-icon>
    `;
  }

  private renderIconbody(data: any): Template {
    if (!this.hass || !this.config?.entity) {
      return nothing;
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      return nothing;
    }

    const icon = 
      data.key === 'Water' && 'water_icon' in stateObj.attributes
        ? stateObj.attributes.water_icon
        : data.icon;

    if (!icon) {
      return nothing; // Évite un ha-icon inutile
    }

    return html`
      <ha-icon
        class="image"
        style="-webkit-mask-image: url('${icon}'); -webkit-mask-size: 24px; 
          ${this.config.styles?.iconbody || ''}"
      ></ha-icon>
    `;
  }

  private renderButton(data: any) {
    if (!this.config.show_buttons || !data?.icon || data.show === false) {
      return nothing;
    }
  
    return html`
      <ha-icon-button
        @click=${() => this.callService(data.service, data.service_data)}
        title=${ifDefined(data.label)}
        style=${this.config.styles?.icon || ''}>
        <ha-icon icon="${data.icon}"></ha-icon>
      </ha-icon-button>
    `;
  }
  
  private renderToolbar(): Template {
    if (!this.config.show_toolbar) {
      return nothing;
    }
    return html`
      <div class="toolbar" @ll-custom=${this.customEvent} ?open=${this.open}>
        <ha-icon-button
          @click=${this.toggle}
          title=${ifDefined(localize('common.toggle_power') || undefined)}
          style="color: var(--primary-color);">
            <ha-icon icon=${this.config.show_always_details ? '' : this.open ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </ha-icon-button>
        <div class="fill-gap"></div>
        ${Object.values(this.config.buttons ?? {})
          .filter(Boolean)
          .map(this.renderButton.bind(this))}
      </div>
    `;
  }

  private renderDropdown(attribute: any, key: string, service: string) {
  if (!this.hass || !this.config?.entity) {
    return nothing;
  }

  const stateObj = this.hass.states[this.config.entity];
  if (!stateObj?.attributes) {
    return nothing;
  }

  const list: string[] = stateObj.attributes[`${key}_list`] ?? [];
  if (!Array.isArray(list) || list.length === 0) {
    return nothing;
  }

  return html`
    <div style="position: relative" @click=${(e: Event) => e.stopPropagation()}>
      <ha-button @click=${() => this.toggleMenu(key)}>
        ${attribute}
      </ha-button>
        <mwc-menu
          @selected=${(e: CustomEvent) => this.handleChange(list[e.detail.index], key, service)}
          id=${ifDefined(`bmc-menu-${key}`)}
          activatable
          corner="BOTTOM_START">
          ${list.map((item: string) => html`<mwc-list-item value=${item}>${item}</mwc-list-item>`)}
        </mwc-menu>
    </div>`;
  }

  private computeBarColor(data: any, numberValue: number): string {
    if (data.severity) {
      return this.computeSeverityColor(data, numberValue);
    } 
    if (data == 'unavailable') {
      return `var(--score-card-disabled-color, ${data.color ?? 'gray'})`;
    }
    return data.color ?? 'gray';
  }

  private computeSeverityColor(data: any, numberValue: number): string {
    const sections = data.severity;
    let color: string | undefined;

    if (isNaN(numberValue)) {
      sections.forEach((section: { text: any; color: string | undefined }) => {
        if (data == section.text) {
          color = section.color;
        }
      });
    } else {
      sections.forEach((section: { from: number; to: number; color: string | undefined }) => {
        if (numberValue >= section.from && numberValue <= section.to) {
          color = section.color;
        }
      });
    }

    return color ?? data.color ?? 'gray'; // Défaut à 'gray' si aucune couleur trouvée
  }

  private computePercent(data: any, numberValue: number): number {
    if (data === 'unavailable') return 0;
    if (isNaN(numberValue)) return 100;

    // Vérifier que min et max existent et sont bien des nombres
    const min = typeof data.min === 'number' ? data.min : 0;
    const max = typeof data.max === 'number' ? data.max : 100;

    if (min >= max) return 0; // Évite une division par zéro ou un pourcentage incorrect

    const percent = (100 * (numberValue - min)) / (max - min);

    switch (data.direction) {
      case 'right-reverse':
      case 'left-reverse':
      case 'up-reverse':
      case 'down-reverse':
        return 100 - percent;
      default:
        return percent;
    }
 }

  protected render(): Template {
    if (!this.hass || !this.config?.entity) {
      return nothing;
    }
  
    const stateObj = this.hass.states[this.config.entity];
  
    if (!stateObj) {
      return html`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">
                ${localize('common.not_available')}
              </div>
            </div>
          </div>
        </ha-card>
      `;
    }
  
    return html`
      <ha-card>
        ${this.shouldShowBackground()
          ? html`
              <div class="background" 
                style="
                  ${this.config.styles?.background || ''};
              ">
                ${this.config.show_name ? html`<div class="title">${this.renderName(stateObj)}</div>` : ""}
                <div class="grid" 
                  style="${this.config.styles?.content || ''}" 
                  @click="${this.moreInfo}" 
                  tabindex="0">
                  <div class="grid-left">
                    ${(this.config.states ? Object.values(this.config.states) : [])
                      .filter((v) => v)
                      .map(this.renderState.bind(this))}
                  </div>
                  <div class="grid-right">
                    ${(this.config.attributes ? Object.values(this.config.attributes) : [])
                      .filter((v) => v)
                      .map(this.renderAttribute.bind(this))}
                  </div>
                </div>
              </div>
            `
          : this.config.show_name
          ? html`<div class="title">${this.renderName(stateObj)}</div>`
          : ""}
        
        ${this.renderToolbar()}
        <div id="items" ?open=${this.open || this.config.show_always_details}>
          <div id="score" class="card-content" style=${this.config.direction === 'up' ? '' : 'flex-grow: 0;'}>
            ${(this.config.body ? Object.values(this.config.body) : [])
              .filter(Boolean)
              .map(this.renderBody.bind(this))}
          </div>
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface Window {
    customCards?: unknown[];
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  preview: true,
  type: 'body-miscale-card',
  name: localize('common.name'),
  description: localize('common.description'),
});