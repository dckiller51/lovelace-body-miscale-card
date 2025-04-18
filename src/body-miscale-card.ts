/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSResultGroup, LitElement, PropertyValues, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  fireEvent,
  formatDate,
  formatNumber,
  formatTime,
} from 'custom-card-helpers';
import { filterByImpedance } from './helpers';
import localize from './localize';
import styles from './styles.css';
import { computeCssColor } from './compute-color';
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
    const [bodymiscaleEntity] = entities.filter((eid) =>
      eid.startsWith('bodymiscale'),
    );

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
    return this.config.show_name && this.config.show_buttons
      ? 4
      : this.config.show_name || this.config.show_buttons
        ? 3
        : 2;
  }

  shouldShowBackground() {
    return !(
      this.config.image === '' &&
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
    const menu = this.shadowRoot?.querySelector<
      HTMLElement & { open?: boolean }
    >(`#bmc-menu-${key}`);
    if (menu && 'open' in menu) {
      menu.open = !menu.open;
    }
  }

  private handleChange(entity: string): void {
    if (!this.hass) return;

    // Mise à jour de l'entité principale
    this.config = { ...this.config, entity };

    // Déclencher un événement pour enregistrer le changement
    fireEvent(this, 'config-changed', { config: this.config });
  }

  private moreInfo(): void {
    if (!this.config?.entity) {
      console.warn('No entity defined in the config.');
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
    return html`
      <div class="bodymiscale-name">${stateObj.attributes.friendly_name}</div>
    `;
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
      return html`<div>
        ${this.hass.localize('state.default.unavailable')}
      </div>`;
    }

    const keyExists = data?.key && stateObj;
    const isValidAttribute =
      keyExists && stateObj.attributes?.[data.key] !== undefined;
    const isValidEntityData =
      keyExists && (stateObj as Record<string, any>)[data.key] !== undefined;

    let value = isValidAttribute
      ? stateObj.attributes[data.key]
      : isValidEntityData
        ? (stateObj as Record<string, any>)[data.key]
        : this.hass.localize('state.default.unavailable');

    if (data.key === 'last_measurement_time' && typeof value === 'string') {
      try {
        const parsedDate = new Date(value.replace(' ', 'T'));

        const formattedDate = formatDate(parsedDate, this.hass.locale);
        const formattedTime = formatTime(parsedDate, this.hass.locale);

        value = `${formattedDate} ${formattedTime}`;
      } catch {
        /* empty */
      }
    }

    const formatValue =
      typeof value === 'number' ? formatNumber(value, this.hass.locale) : value;
    const localizedValue = localize(`states.${value}`) || formatValue;

    const attribute =
      stateObj.state === 'ok' && data.icon === 'mdi:alert'
        ? nothing
        : html` <div class="state-div">
            <div>${data.icon && this.renderIcon(data, 'default')}</div>
            <div class="state-label">
              ${data.label ?? ''}${localizedValue}${data.unit ?? ''}
            </div>
          </div>`;

    const hasDropdown = `${data.key}_list` in stateObj.attributes;

    return hasDropdown && (isValidAttribute || isValidEntityData)
      ? this.renderDropdown(attribute, data.key)
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
      return html`<div>
        ${this.hass.localize('state.default.unavailable')}
      </div>`;
    }

    const computeFunc =
      typeof data.compute === 'function' ? data.compute : (v: any) => v;
    const keyExists = data?.key && stateObj;
    const isValidAttribute =
      keyExists && stateObj.attributes?.[data.key] !== undefined;
    const isValidEntityData =
      keyExists && (stateObj as Record<string, any>)[data.key] !== undefined;

    let value = isValidAttribute
      ? computeFunc(stateObj.attributes[data.key])
      : isValidEntityData
        ? computeFunc((stateObj as Record<string, any>)[data.key])
        : this.hass.localize('state.default.unavailable');

    if (data.key === 'last_measurement_time' && typeof value === 'string') {
      try {
        const parsedDate = new Date(value.replace(' ', 'T'));

        const formattedDate = formatDate(parsedDate, this.hass.locale);
        const formattedTime = formatTime(parsedDate, this.hass.locale);

        value = `${formattedDate} ${formattedTime}`;
      } catch {
        /* empty */
      }
    }

    const formatValue =
      typeof value === 'number' ? formatNumber(value, this.hass.locale) : value;

    const localizedValue = localize(`attributes_value.${value}`) || formatValue;
    const attribute = html`<div>
      ${data.icon && this.renderIcon(data, 'default')}
      ${data.label ?? ''}${localizedValue}${data.unit ?? ''}
    </div>`;

    const hasDropdown = `${data.key}_list` in stateObj.attributes;

    return hasDropdown && (isValidAttribute || isValidEntityData)
      ? this.renderDropdown(attribute, data.key)
      : attribute;
  }

  private renderBody(data: any): Template {
    if (!this.hass || !this.config?.entity) return nothing;
  
    const stateObj = this.hass.states?.[this.config.entity];
    if (!stateObj) return html`<div>${this.hass.localize('state.default.unavailable')}</div>`;
  
    const keyExists = data?.key && stateObj;
  
    const isValidAttr =
      keyExists && stateObj.attributes?.[data.key] !== undefined;
  
    const isValidEntity =
      keyExists && (stateObj as Record<string, any>)[data.key] !== undefined;
  
    const computeFunc =
      typeof data.compute === 'function' ? data.compute : (v: any) => v;
  
    const rawValue = isValidAttr
      ? computeFunc(stateObj.attributes[data.key])
      : isValidEntity
      ? computeFunc((stateObj as Record<string, any>)[data.key])
      : this.hass.localize('state.default.unavailable');
  
    const formattedValue =
      typeof rawValue === 'number'
        ? formatNumber(rawValue, this.hass.locale)
        : rawValue;
  
    const iconUrl = this.getIconUrl(data.icon);
  
    const icon = data.icon
      ? html`
          <ha-icon
            class="image"
            style="
              -webkit-mask-image: url('${iconUrl}');
              mask-image: url('${iconUrl}');
              -webkit-mask-size: 24px;
              mask-size: 24px;
              background-color: currentColor;
              ${this.config.styles?.iconbody || ''}
            "
          ></ha-icon>
        `
      : nothing;
  
    const name = data.label
      ? html`<div class="name">${data.label}</div>`
      : nothing;
  
    const segmentBar = typeof rawValue === 'number' ? this.renderColorBarSegments(data, rawValue, false) : nothing;
    const showBar = segmentBar !== nothing;
    const barClass = showBar ? 'bar-container' : 'bar-container compact';
  
    const iconPosition = data.positions?.icon ?? 'left';
    const namePosition = data.positions?.name ?? 'left';
    const minMaxPosition = data.positions?.minmax ?? 'off';
    const valuePosition = data.positions?.value ?? 'right';
    
    const iconBlock = iconPosition !== 'off' ? icon : nothing;
    const nameBlock = namePosition !== 'off' ? name : nothing;
    const minMaxBlock = minMaxPosition !== 'off'
      ? html`
          <div class="minmax">
            ${localize('editor_body.minmax_label')}
            <span class="min">${data.min}</span>/<span class="max">${data.max}</span>
          </div>`
      : nothing;
    const valueBlock = valuePosition !== 'off'
      ? html`<div class="value">${localize(`body_value.${rawValue}`) || formattedValue}${data.unit || ''}</div>`
      : nothing;
    
    // Contenu gauche / droite
    const leftItems = [
      iconPosition === 'left' ? iconBlock : nothing,
      namePosition === 'left' ? nameBlock : nothing,
      minMaxPosition === 'left' ? minMaxBlock : nothing,
      valuePosition === 'left' ? valueBlock : nothing,
    ];
    
    const rightItems = [
      iconPosition === 'right' ? iconBlock : nothing,
      namePosition === 'right' ? nameBlock : nothing,
      minMaxPosition === 'right' ? minMaxBlock : nothing,
      valuePosition === 'right' ? valueBlock : nothing,
    ];
    
    return html`
      <div style="display: flex; flex-direction: column; padding: 1rem 0;">
        <!-- Ligne 1: éléments dynamiques -->
        <div class="flex-container" style="justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            ${leftItems.filter(item => item !== nothing)} <!-- Affiche uniquement les éléments valides à gauche -->
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            ${rightItems.filter(item => item !== nothing)} <!-- Affiche uniquement les éléments valides à droite -->
          </div>
        </div>
    
        <!-- Ligne 2: Barre (si elle existe) -->
        <div class="${barClass}">
          ${segmentBar}
        </div>
      </div>
    `;    
  }  
  
  private renderColorBarSegments(data: any, value: number, wrap = true): Template {
    const range = data.max - data.min;
    if (!data.severity || !Array.isArray(data.severity) || range <= 0) {
      return nothing;
    }
  
    const filteredSeverity = data.severity.filter(
      (s: any) =>
        s.color !== 'disabled' &&
        s.from !== null &&
        s.to !== null &&
        s.color !== undefined
    );
  
    if (filteredSeverity.length === 0) {
      return nothing;
    }
  
    const segmentsHtml = filteredSeverity.map((segment: any, index: number) => {
      const from = parseFloat(segment.from) || 0;
      const to = parseFloat(segment.to) || 0;
      const widthPercent = ((to - from) / range) * 100;
      const color = computeCssColor(segment.color) || 'gray';
  
      const showAbove = data.showabovelabels !== "false";
      const showBelow = data.showbelowlabels !== "false";
      
      const segmentLabelAbove = showAbove && index !== filteredSeverity.length - 1
      ? html`
          <div class="segment-label-above" style="color: ${color};">
            ${formatNumber(to, this.hass.locale)}${data.unit || ''}
          </div>
        `
      : nothing;
      
        const segmentLabelBelow = showBelow && segment.label
        ? html`
            <div class="segment-label-below" style="color: ${color};">
              ${localize(`label_below.${segment.label}`)}
            </div>
          `
        : nothing;
      
      return html`
        <div
          class="colorbar-segment"
          style="
            width: ${widthPercent}%;
            background-color: ${color};
            border-radius: ${index === 0
              ? '4px 0 0 4px'
              : index === filteredSeverity.length - 1
              ? '0 4px 4px 0'
              : '0'};
          "
        >
          ${segmentLabelAbove}
          ${segmentLabelBelow}
        </div>
      `;        
    });
  
    const markerPercent = this._computePercent(data, value);
    const activeSegment = filteredSeverity.find(
      (s: any) => value >= (parseFloat(s.from) || 0) && value <= (parseFloat(s.to) || data.max)
    );
    const markerColor = computeCssColor(activeSegment?.color) || 'var(--primary-color)';
  
    const barHtml = html`
      <div class="bar-inner">
        ${segmentsHtml}
        <div class="bar-marker-wrapper" style="left: ${markerPercent}%;">
          <div
            class="bar-marker"
            style="border-color: ${markerColor};"
          ></div>
          <div class="bar-marker-tooltip">
            ${formatNumber(value, this.hass.locale)}${data.unit || ''}
          </div>
        </div>
      </div>
    `;
  
    return wrap
      ? html`<div class="bar-container">${barHtml}</div>`
      : barHtml;
  }  
  
  private _computePercent(data: any, numberValue: number): number {
    if (!data || typeof numberValue !== 'number') return 0;
    const range = data.max - data.min;
    if (range <= 0) return 0;
    return ((numberValue - data.min) / range) * 100;
  }  

  private getIconUrl(iconName: string): string {
    const basePath = this.config?.icons_body ?? '/local/images/bodyscoreIcon';
    return `${basePath}/${iconName}`;
  }

  private renderIcon(
    data: any,
    type: 'default' | 'body' = 'default',
  ): Template {
    if (!this.hass || !this.config?.entity) {
      return nothing;
    }

    const stateObj = this.hass.states[this.config.entity];
    if (!stateObj) {
      return nothing;
    }

    const icon =
      data.key.toLowerCase() === 'water' && 'water_icon' in stateObj.attributes
        ? stateObj.attributes.water_icon
        : data.icon;

    if (!icon) {
      return nothing;
    }

    const iconUrl = this.getIconUrl(data.icon);

    if (type === 'body'&& iconUrl ) {
      return html`
        <ha-icon
          class="image"
          style="
              -webkit-mask-image: url('${iconUrl}');
              mask-image: url('${iconUrl}');
              -webkit-mask-size: 24px;
              mask-size: 24px;
              ${this.config.styles?.iconbody || ''}"
        ></ha-icon>
      `;
    }

    const isProblem =
      stateObj.attributes.problem !== 'none' && icon === 'mdi:alert';
    const iconClass = isProblem ? 'problem' : '';

    return html`
      <ha-icon
        class="${iconClass}"
        icon="${icon}"
        style="margin-right: 10px; ${this.config.styles?.icon || ''} ${isProblem
          ? 'color: var(--error-color) !important;'
          : ''}"
      ></ha-icon>
    `;
  }

  private renderButton(button: {
    entity: string;
    label?: string;
    icon?: string;
    show?: boolean;
  }): Template {
    if (!this.config.show_buttons || !button.show) {
      return nothing;
    }

    return html`
      <ha-button
        @click=${() => this.handleChange(button.entity)}
        title=${ifDefined(button.label)}
      >
        ${button.icon
          ? html`<ha-icon icon="${button.icon}"></ha-icon>`
          : button.label}
      </ha-button>
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
          style="color: var(--primary-color);"
        >
          <ha-icon
            icon=${this.config.show_always_details
              ? ''
              : this.open
                ? 'mdi:chevron-up'
                : 'mdi:chevron-down'}
          ></ha-icon>
        </ha-icon-button>
        <div class="fill-gap"></div>
        ${Object.values(this.config.buttons ?? {})
          .filter((btn) => btn.show)
          .map((btn) => this.renderButton(btn))}
      </div>
    `;
  }

  private renderDropdown(attribute: any, key: string) {
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

    return html` <div
      style="position: relative"
      @click=${(e: Event) => e.stopPropagation()}
    >
      <ha-button @click=${() => this.toggleMenu(key)}> ${attribute} </ha-button>
      <mwc-menu
        @selected=${(e: CustomEvent) => this.handleChange(list[e.detail.index])}
        id=${ifDefined(`bmc-menu-${key}`)}
        activatable
        corner="BOTTOM_START"
      >
        ${list.map(
          (item: string) => html`
            <mwc-list-item value=${item}>${item}</mwc-list-item>
          `,
        )}
      </mwc-menu>
    </div>`;
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

    const filteredBodyData = filterByImpedance(
      this.config.body ?? {},
      this.config.model,
    );
    console.log('filteredBodyData in render:', filteredBodyData);
    const filteredAttributesData = filterByImpedance(
      this.config.attributes ?? {},
      this.config.model,
    );

    return html`
      <ha-card>
        ${this.shouldShowBackground()
          ? html`
              <div
                class="background"
                style="${this.config.styles?.background || ''};"
              >
                ${this.config.show_name
                  ? html`<div class="title" style="padding: 12px 16px 8px">
                      ${this.renderName(stateObj)}
                    </div>`
                  : ''}
                <div
                  class="grid"
                  style="padding: 12px 16px 8px"
                  @click="${this.moreInfo}"
                  tabindex="0"
                >
                  <div class="grid-left">
                    ${(this.config.states
                      ? Object.values(this.config.states)
                      : []
                    )
                      .filter((v) => v)
                      .map(this.renderState.bind(this))}
                  </div>
                  <div class="grid-right">
                    ${filteredAttributesData
                      .filter(Boolean)
                      .map(this.renderAttribute.bind(this))}
                  </div>
                </div>
              </div>
            `
          : this.config.show_name
            ? html`<div class="title">${this.renderName(stateObj)}</div>`
            : ''}
        ${this.renderToolbar()}

        <div id="items" ?open=${this.open || this.config.show_always_details}>
          <div id="score" class="card-content">
            <div class="scroll-wrapper">
              ${filteredBodyData.filter(Boolean).map(this.renderBody.bind(this))}
            </div>
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
