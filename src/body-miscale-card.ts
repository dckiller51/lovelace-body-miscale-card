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
    if (!this.config.show_body) {
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

    // Forcer la direction à 'right' (horizontale)
    let backgroundMargin = '0px 0px 0px 13px';

    // Définir la hauteur et vérifier la hauteur configurée.
    let barHeight: string | number = 30;
    if (data.height) barHeight = data.height;

    // Normalisation de barHeight
    const normalizedBarHeight =
      typeof barHeight === 'number'
        ? `${barHeight}px` // Si c'est un nombre, ajouter 'px'
        : barHeight.toString().includes('px')
          ? barHeight // Si déjà en "px", ne rien changer
          : `${parseInt(barHeight, 10) || 0}px`; // Sinon, convertir en nombre et ajouter 'px'

    // Définir les variables de style pour toujours aller à droite
    let alignItems = 'stretch';
    let barDirection = 'right'; // Toujours 'right'
    let flexDirection = 'row';
    let markerDirection = 'left'; // Le marqueur reste à gauche
    let markerStyle = 'height: 100%; width: 2px;';

    // Récupérer les éléments à l'extérieur et à l'intérieur
    const {
      outside: iconOutside,
      inside: iconInside,
      backgroundMargin: backgroundMarginFromIcon,
    } = this.renderBarIcon(data);
    const {
      outside: nameOutside,
      inside: nameInside,
      backgroundMargin: backgroundMarginFromName,
    } = this.renderBarName(data);
    const { outside: minMaxOutside, inside: minMaxInside } =
      this.renderBarMinMax(data);
    const {
      outside: valueOutside,
      inside: valueInside,
      backgroundMargin: backgroundMarginFromValue,
    } = this.renderBarValue(data, value, formatValue, localize);

    // Mettre à jour backgroundMargin ici
    backgroundMargin =
      backgroundMarginFromIcon ||
      backgroundMarginFromName ||
      backgroundMarginFromValue ||
      backgroundMargin;

    // Définir la couleur de la barre
    const numberValue = Number(value);
    const barColor = this._computeBarColor(data, numberValue);

    // Définir le pourcentage de la barre et du marqueur en fonction de la différence de valeur.
    const barPercent = this._computePercent(data, Number(value));
    const targetMarkerPercent = this._computePercent(data, data.target);
    let targetStartPercent = barPercent;
    let targetEndPercent = this._computePercent(data, data.target);

    if (targetEndPercent < targetStartPercent) {
      targetStartPercent = targetEndPercent;
      targetEndPercent = barPercent;
    }

    // Définir la largeur de la barre si configurée.
    let barWidth = '';
    if (data.width) {
      alignItems = 'center';
      barWidth = `width: ${data.width}`;
    }

    // Créer le tableau contenant toutes les lignes.
    let rowFlexDirection = 'row';

    const attribute = html`
      <score-card-row style="flex-direction: ${rowFlexDirection};">
        <score-card-card
          style="flex-direction: ${flexDirection}; align-items: ${alignItems};"
        >
          ${iconOutside} ${nameOutside}
          <score-card-background
            style="margin: ${backgroundMargin}; height: ${normalizedBarHeight}; ${barWidth}"
          >
            <score-card-backgroundbar
              style="--bar-color: ${barColor};"
            ></score-card-backgroundbar>
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
            <score-card-contentbar class="contentbar-direction-right">
              ${iconInside} ${nameInside} ${minMaxInside} ${valueInside}
            </score-card-contentbar>
          </score-card-background>
          ${minMaxOutside} ${valueOutside}
        </score-card-card>
      </score-card-row>
    `;

    const hasDropdown = `${data.key}_list` in stateObj.attributes;

    return hasDropdown && (isValidAttribute || isValidEntityData)
      ? this.renderDropdown(attribute, data.key)
      : attribute;
  }

  private renderBarIcon(data: any): {
    outside: Template;
    inside: Template;
    backgroundMargin: string;
  } {
    let iconOutside: Template = nothing;
    let iconInside: Template = nothing;

    // Déclaration et mise à jour de backgroundMargin ici
    let backgroundMargin = '0px'; // Définie pour l'initialisation

    switch (data.positions.icon) {
      case 'outside':
        iconOutside = html`
          <score-card-iconbar
            >${data.icon && this.renderIcon(data, 'body')}</score-card-iconbar
          >
        `;
        backgroundMargin = '0px 0px 0px 13px';
        break;
      case 'inside':
        iconInside = html`
          <score-card-iconbar
            >${data.icon && this.renderIcon(data, 'body')}</score-card-iconbar
          >
        `;
        backgroundMargin = '0px'; // Réinitialisation de backgroundMargin pour 'inside'
        break;
      case 'off':
        backgroundMargin = '0px'; // Pas de marge pour 'off'
        break;
    }

    return { outside: iconOutside, inside: iconInside, backgroundMargin };
  }

  private renderBarName(data: any): {
    outside: Template;
    inside: Template;
    backgroundMargin: string;
  } {
    let nameOutside: Template = nothing;
    let nameInside: Template = nothing;

    // Déclaration et mise à jour de backgroundMargin ici
    let backgroundMargin = '0px'; // Définie pour l'initialisation

    if (data.label !== undefined) {
      switch (data.positions.name) {
        case 'outside':
          nameOutside = html`
            <score-card-name
              style="${data.width ? `width: calc(100% - ${data.width});` : ''}"
              >${data.label || ''}</score-card-name
            >
          `;
          backgroundMargin = '0px'; // Mise à jour de la marge pour 'outside'
          break;
        case 'inside':
          nameInside = html`<score-card-name
            >${data.label || ''}</score-card-name
          >`;
          break;
        case 'off':
          break; // Pas de changement
      }
    }

    return { outside: nameOutside, inside: nameInside, backgroundMargin };
  }

  private renderBarMinMax(data: any): { outside: Template; inside: Template } {
    let minMaxOutside: Template = nothing;
    let minMaxInside: Template = nothing;

    if (data.min !== undefined && data.max !== undefined) {
      switch (data.positions.minmax) {
        case 'outside':
          minMaxOutside = html`
            <score-card-min>${data.min}</score-card-min>
            <score-card-divider>/</score-card-divider>
            <score-card-max>${data.max}</score-card-max>
          `;
          break;
        case 'inside':
          minMaxInside = html`
            <score-card-min class="min-direction-right">
              ${data.min}
            </score-card-min>
            <score-card-divider>/</score-card-divider>
            <score-card-max>${data.max}</score-card-max>
          `;
          break;
        case 'off':
          break;
      }
    }

    return { outside: minMaxOutside, inside: minMaxInside };
  }

  private renderBarValue(
    data: any,
    value: any,
    formatValue: any,
    localize: any,
  ): { outside: Template; inside: Template; backgroundMargin: string } {
    let valueOutside: Template = nothing;
    let valueInside: Template = nothing;

    // Déclaration et mise à jour de backgroundMargin ici
    let backgroundMargin = '0px'; // Définie pour l'initialisation

    switch (data.positions.value) {
      case 'outside':
        valueOutside = html`
          <score-card-value class="value-direction-right">
            ${(localize(`body_value.${value}`) || formatValue) +
            (data.unit || '')}
          </score-card-value>
        `;
        break;
      case 'inside':
        valueInside = html`
          <score-card-value
            class="${data.positions.minmax == 'inside'
              ? ''
              : 'value-direction-right'}"
          >
            ${(localize(`body_value.${value}`) || formatValue) +
            (data.unit || '')}
          </score-card-value>
        `;
        break;
      case 'off':
        break; // Pas de changement pour 'off'
    }

    return { outside: valueOutside, inside: valueInside, backgroundMargin };
  }

  private _computeSeverityColor(data: any, numberValue: number): string {
    const sections: {
      from?: number;
      to?: number;
      text?: string;
      color: string | undefined;
    }[] = data.severity;
    let color: string | undefined;

    if (isNaN(numberValue)) {
      sections.forEach((section) => {
        if (data == section.text && section.color) {
          color = computeCssColor(section.color) || 'disabled';
        }
      });
    } else {
      sections.forEach((section) => {
        if (
          numberValue >= (section.from || 0) &&
          numberValue <= (section.to || Infinity) &&
          section.color
        ) {
          color = computeCssColor(section.color) || 'disabled';
        }
      });
    }

    return color ?? computeCssColor(data.color) ?? 'disabled';
  }

  private _computeBarColor(data: any, numberValue: number): string {
    let BarColor: string;
    if (data.severity) {
      BarColor =
        this._computeSeverityColor(data, numberValue) ||
        computeCssColor(data.color) ||
        'disabled';
    } else if (data == 'unavailable') {
      BarColor = computeCssColor(data.color) || 'disabled';
    } else {
      BarColor = computeCssColor(data.color) || 'disabled';
    }
    return BarColor;
  }

  private _computePercent(data: any, numberValue: number): number {
    if (data == 'unavailable') return 0;
    if (isNaN(numberValue)) return 100;

    return (100 * (numberValue - data.min)) / (data.max - data.min);
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

    if (type === 'body') {
      return html`
        <ha-icon
          class="image"
          style="
              -webkit-mask-image: url('${icon}'); 
              -webkit-mask-size: 24px;
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
            ${filteredBodyData.filter(Boolean).map(this.renderBody.bind(this))}
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
