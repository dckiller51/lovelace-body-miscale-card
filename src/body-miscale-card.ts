import { LitElement, html, CSSResultGroup, TemplateResult, PropertyValues } from 'lit';

import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  LovelaceCardEditor,
  LovelaceCard,
  fireEvent,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types

import './editor';
import { BodyMiScaleCardConfig } from './types';
import { CARD_VERSION, states, attributes_kg, attributes_lb, body_kg, body_lb, buttons, models } from './const';
import { styles } from './styles';
import { localize } from './localize/localize';
import { HassEntity } from 'home-assistant-js-websocket';
import { deepMerge } from './helpers';
import { formatNumber } from './format_number';

/* eslint no-console: 0 */
console.info(
  `%c  Body-miscale-card \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: cyan; background: black; font-weight: bold;',
  'color: darkblue; background: white; font-weight: bold;',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'body-miscale-card',
  name: localize('common.name'),
  description: localize('common.description'),
});

@customElement('body-miscale-card')
export class BodyMiScaleCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config!: BodyMiScaleCardConfig;
  @state() private _configArray: BodyMiScaleCardConfig[] = [];
  @state() open: boolean = false;
  stateObj: any;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('body-miscale-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): object {
    return {};
  }

  public getCardSize(): number {
    if (this.config.show_name && this.config.show_buttons) return 4;
    if (this.config.show_name || this.config.show_buttons) return 3;
    return 2;
  }

  setConfig(config: BodyMiScaleCardConfig): void {
    if (!config.entity) throw new Error(localize('error.missing_entity'));
    if (config.entity.split('.')[0] !== 'bodymiscale') throw new Error(localize('error.missing_entity_bodymiscale'));
    if (config.model && !(config.model in models)) throw new Error(localize('error.missing_model'));

    const model = models[config.model] || models.false;

    this.config = {
      name: config.name,
      show_name: config.show_name,
      show_states: config.show_states,
      show_attributes: config.show_attributes,
      show_body: config.show_body,
      show_buttons: config.show_buttons,
      show_toolbar: config.show_toolbar,
      always_show_details: config.always_show_details,
      ...config,
      states: deepMerge(states, model.states, config.states),
      attributes: config.unit ? deepMerge(attributes_lb, model.attributes_lb, config.attributes) : deepMerge(attributes_kg, model.attributes_kg, config.attributes),
      body: config.unit ? deepMerge(body_lb, model.body_lb, config.body) : deepMerge(body_kg, model.body_kg, config.body),
      buttons: deepMerge(buttons, model.buttons, config.buttons),
      direction: 'right',
      styles: {
        background: config.image
          ? `background-image: url('${config.image}'); color: white; text-shadow: 0 0 10px black;`
          : '',
        icon: `color: ${config.image ? 'white' : 'var(--paper-item-icon-color)'};`,
        iconbody: `background-color: ${config.theme !== false ? 'var(--paper-item-icon-color)' : 'white'};`,
        content: `padding: ${config.name !== false ? '8px' : '16px'} ${config.buttons !== false ? '8px' : '16px'};`,
      },
    };
    this.open = this.open || this.config.open;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  private toggle(ev: Event) {
    if (ev) ev.stopPropagation();
    this.open = !this.open;
  }

  private _customEvent(ev: CustomEvent) {
    const detail: any = ev.detail;
    if (detail.fold_row) {
      this.toggle(ev);
    }
  }

  protected render(): TemplateResult {
    if (!this.hass || !this.config) {
      return html``;
    }

    const stateObj = this.hass.states[this.config!.entity];

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="preview not-available">
            <div class="metadata">
              <div class="not-available">${localize('common.not_available')}</div>
            </div>
          </div>
        </ha-card>
      `;
    }

    return html` <ha-card>
      <div class="background" style="${this.config.styles.background}">
        <div>${this.renderName(stateObj)}</div>
        <div class="grid" style="${this.config.styles.content}" @click="${this._moreInfo}" tabindex="0">
          <div class="grid-content grid-left">
            ${Object.values(this.config.states)
              .filter((v) => v)
              .map(this.renderState.bind(this))}
          </div>
          <div class="grid-content grid-right">
            ${Object.values(this.config.attributes)
              .filter((v) => v)
              .map(this.renderAttribute.bind(this))}
          </div>
        </div>
      </div>
      ${this.renderToolbar()}
      <div id="items" ?open=${this.open || this.config.always_show_details}>
        <div id="score" class="card-content" style="${this.config.direction == 'up' ? '' : 'flex-grow: 0;'}">
          ${Object.values(this.config.body)
            .filter((v) => v)
            .map(this.renderBody.bind(this))}
          </score-card-row>
        </div>
      </div>
    </ha-card>`;
  }

  private renderName(stateObj: HassEntity): TemplateResult {
    if (!this.config.show_name) {
      return html``;
    }
    return html` <div class="title">${this.config.name || stateObj.attributes.friendly_name}</div> `;
  }

  private renderState(data: any): TemplateResult {
    if (!this.config.show_states) {
      return html``;
    }

    const stateObj = this.hass!.states[this.config!.entity];

    const isValidAttribute = data && data.key in stateObj.attributes;
    const isValidEntityData = data && data.key in stateObj;

    const value = isValidAttribute
      ? stateObj.attributes[data.key]
      : isValidEntityData
      ? stateObj[data.key]
      : this.hass!.localize('state.default.unavailable');
    const formatValue = formatNumber(value, this.hass!.locale);
    const attribute = html`<div class="state-div ${stateObj.state === 'ok' && data.icon === 'mdi:alert' ? 'ok' : ''}">
      <div>${data.icon && this.renderIcon(data)}</div>
      <div class="state-label">
        ${(data.label || '') + (localize(`states.${value}`) || formatValue) + (data.unit || '')}
      </div>
    </div>`;

    const hasDropdown = `${data.key}_list` in stateObj.attributes;

    return hasDropdown && (isValidAttribute || isValidEntityData)
      ? this.renderDropdown(attribute, data.key, data.service)
      : attribute;
  }

  private renderAttribute(data: any): TemplateResult {
    if (!this.config.show_attributes) {
      return html``;
    }
    const stateObj = this.hass!.states[this.config!.entity];

    const computeFunc = data.compute || ((v: any) => v);
    const isValidAttribute = data && data.key in stateObj.attributes;
    const isValidEntityData = data && data.key in stateObj;

    const value = isValidAttribute
      ? computeFunc(stateObj.attributes[data.key])
      : isValidEntityData
      ? computeFunc(stateObj[data.key])
      : this.hass!.localize('state.default.unavailable');

    const formatValue = formatNumber(value, this.hass!.locale);

    const attribute = html`<div>
      ${data.icon && this.renderIcon(data)}${(data.label || '') +
      (localize(`attributes_value.${value}`) || formatValue) +
      (data.unit || '')}
    </div>`;

    const hasDropdown = `${data.key}_list` in stateObj.attributes;

    return hasDropdown && (isValidAttribute || isValidEntityData)
      ? this.renderDropdown(attribute, data.key, data.service)
      : attribute;
  }

  private renderBody(data: any): TemplateResult {
    if (!this.config.show_body) {
      return html``;
    }

    const stateObj = this.hass!.states[this.config!.entity];

    const computeFunc = data.compute || ((v: any) => v);
    const isValidAttribute = data && data.key in stateObj.attributes;
    const isValidEntityData = data && data.key in stateObj;

    const value = isValidAttribute
      ? computeFunc(stateObj.attributes[data.key])
      : isValidEntityData
      ? computeFunc(stateObj[data.key])
      : this.hass!.localize('state.default.unavailable');
    const formatValue = formatNumber(value, this.hass!.locale);

    // Defined height and check for configured height.
    let barHeight: string | number = 30;
    if (data.height) barHeight = data.height;

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
    switch (data.positions.icon) {
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
            >${data.label || ''}</score-card-name
          >
        `;
        backgroundMargin = '0px';
        break;
      case 'inside':
        nameInside = html` <score-card-name>${data.label || ''}</score-card-name> `;
        break;
      case 'off':
        break;
    }

    // Set min and max html based on position.
    let minMaxOutside;
    let minMaxInside;
    switch (data.positions.minmax) {
      case 'outside':
        minMaxOutside = html`
          <score-card-min>${data.min + (data.unit || '')}</score-card-min>
          <score-card-divider>/</score-card-divider>
          <score-card-max>${data.max + (data.unit || '')}</score-card-max>
        `;
        break;
      case 'inside':
        minMaxInside = html`
          <score-card-min class="${data.direction == 'up' ? 'min-direction-up' : 'min-direction-right'}"
            >${data.min + (data.unit || '')}</score-card-min
          >
          <score-card-divider>/</score-card-divider>
          <score-card-max> ${data.max + (data.unit || '')}</score-card-max>
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
            >${(localize(`body_value.${value}`) || formatValue) + (data.unit || '')}</score-card-value
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
            >${(localize(`body_value.${value}`) || formatValue) + (data.unit || '')}</score-card-value
          >
        `;
        break;
      case 'off':
        backgroundMargin = '0px';
        break;
    }

    // Set bar color.
    const barColor = this._computeBarColor(data, Number(value));

    // Set bar percent and marker percent based on value difference.
    const barPercent = this._computePercent(data, Number(value));
    const targetMarkerPercent = this._computePercent(data, data.target);
    let targetStartPercent = barPercent;
    let targetEndPercent = this._computePercent(data, data.target);
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

  private renderIcon(data: any): TemplateResult {
    const stateObj = this.hass!.states[this.config!.entity];
    const icon =
      data.key === 'water' && 'water_icon' in this.stateObj.attributes
        ? this.stateObj.attributes.water_icon
        : data.icon;
    if (stateObj.attributes.problem !== 'none' && icon === 'mdi:alert') {
      return html`<ha-icon class="problem" icon="${icon}"></ha-icon>`;
    }
    return html`<ha-icon icon="${icon}" style="margin-right: 10px; ${this.config.styles.icon}"></ha-icon>`;
  }

  private renderIconbody(data: any): TemplateResult {
    const icon =
      data.key === 'Water' && 'water_icon' in this.stateObj.attributes
        ? this.stateObj.attributes.water_icon
        : data.icon;
    return html`<ha-icon
      class="image"
      style="-webkit-mask-image: url('${icon}');-webkit-mask-size: 24px; ${this.config.styles.iconbody}"
    ></ha-icon>`;
  }

  renderButton(data: any) {
    if (!this.config.show_buttons) {
      return html``;
    }

    return data && data.show !== false
      ? html`<ha-icon-button
          @click="${() => this.callService(data.service, data.service_data)}"
          title="${data.label || ''}"
          style="${this.config.styles.icon}">
            <ha-icon icon="${data.icon}"></ha-icon>
          </ha-icon-button>`
      : null;
  }

  private renderToolbar(): TemplateResult {
    if (!this.config.show_toolbar) {
      return html``;
    }
    return html`
      <div class="toolbar" @ll-custom=${this._customEvent} ?open=${this.open}>
        <ha-icon-button
          @click=${this.toggle}
          title="${localize('common.toggle_power')}"
          style="color: var(--primary-color);">
            <ha-icon icon=${this.config.always_show_details ? '' : this.open ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </ha-icon-button>
        <div class="fill-gap"></div>
        ${Object.values(this.config.buttons)
          .filter((v) => v)
          .map(this.renderButton.bind(this))}
      </div>
    `;
  }

  private handleChange(mode: any, key: any, service: any): void {
    const stateObj = this.hass!.states[this.config!.entity];
    this.callService(service ||`bodymiscale.set_${key}`, { entity_id: stateObj.entity_id, [key]: mode });
  }

  private callService(service: any, data = { entity_id: this.stateObj.entity_id }): void {
    const [domain, name] = service.split('.');
    this.hass!.callService(domain, name, data);
  }

  private renderDropdown(attribute: any, key: any, service: any) {
    if (!this.hass || !this.config) {
      return html``;
    }
    const stateObj = this.hass.states[this.config!.entity];
    const list = stateObj.attributes[`${key}_list`];

    return html`
      <div style="position: relative" @click=${e => e.stopPropagation()}>
        <ha-button @click=${() => this.toggleMenu(key)}>
          ${attribute}
        </ha-button>
        <mwc-menu
        @selected=${e => this.handleChange(list[e.detail.index], key, service)}
          id=${`bmc-menu-${key}`}
          activatable
          corner="BOTTOM_START">
            ${list.map(item => html`<mwc-list-item value=${item}>${item}</mwc-list-item>`)}
        </mwc-menu>
      </div>`;
  }

  toggleMenu(key: any) {
    const menu: any = this.shadowRoot!.querySelector(`#bmc-menu-${key}`);
    menu.open = !menu.open;
  }

  static get styles(): CSSResultGroup {
    return styles;
  }

  private _computeBarColor(data: any, numberValue: number): string {
    let BarColor;
    if (data.severity) {
      BarColor = this._computeSeverityColor(data, numberValue);
    } else if (data == 'unavailable') {
      BarColor = `var(--score-card-disabled-color, ${data.color})`;
    } else {
      BarColor = data.color;
    }
    return BarColor;
  }

  private _computeSeverityColor(data: any, numberValue: number): unknown {
    const sections = data.severity;
    let color: undefined | string;

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

    if (color == undefined) color = data.color;
    return color;
  }

  private _computePercent(data: any, numberValue: number): number {
    if (data == 'unavailable') return 0;
    if (isNaN(numberValue)) return 100;

    switch (data.direction) {
      case 'right-reverse':
      case 'left-reverse':
      case 'up-reverse':
      case 'down-reverse':
        return 100 - (100 * (numberValue - data.min)) / (data.max - data.min);
      default:
        return (100 * (numberValue - data.min)) / (data.max - data.min);
    }
  }

  private _moreInfo(): void {
    fireEvent(this, 'hass-more-info', {
      entityId: this.config!.entity,
    });
  }
}
