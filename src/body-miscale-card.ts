import {
  LitElement,
  html,
  CSSResultGroup,
  TemplateResult,
  PropertyValues,
} from 'lit';

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
import {
  CARD_VERSION,
  states,
  attributes,
  body,
  buttons,
  models,
} from './const';
import { styles } from './styles';
import { localize } from './localize/localize';
import { HassEntity } from 'home-assistant-js-websocket';
import { deepMerge } from './helpers';
import {formatNumber} from './format_number'

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
      ...config,
      states: deepMerge(states, model.states, config.states),
      attributes: deepMerge(attributes,model.attributes, config.attributes),
      body: deepMerge(body,model.body, config.body),
      buttons: deepMerge(buttons, model.buttons, config.buttons),
      styles: {
        background: config.image ? `background-image: url('${config.image}'); color: white; text-shadow: 0 0 10px black;` : '',
        icon: `color: ${config.image ? 'white' : 'var(--paper-item-icon-color)'};`,
        iconbody: `background-color: white;`,
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
        <div class="background" style="${this.config.styles.background}">
          <div>${this.renderName(stateObj)}</div>
          <div class="grid" style="${this.config.styles.content}" @click="${this._moreInfo}" tabindex="0">
            <div class="grid-content grid-left">
              ${Object.values(this.config.states).filter(v => v).map(this.renderState.bind(this))}
            </div>
            <div class="grid-content grid-right">
              ${Object.values(this.config.attributes).filter(v => v).map(this.renderAttribute.bind(this))}
            </div>
          </div>
        </div>
        ${this.renderToolbar()}
        <div id="items" ?open=${this.open}>
          <div class="score">
            ${Object.values(this.config.body).filter(v => v).map(this.renderBody.bind(this))}
          </div>  
        </div>
      </ha-card>`;
  }

  private renderName(stateObj: HassEntity): TemplateResult {
    if (!this.config.show_name) {
      return html``;
    }
    return html`
      <div class="title">${this.config.name || stateObj.attributes.friendly_name}</div>
    `;
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
      const attribute = html`<div class="state-div ${stateObj.state ==="ok" && data.icon === "mdi:alert"  ? "ok" : ""}">
                               <div>
                                 ${data.icon && this.renderIcon(data)}
                               </div>
                               <div class=state-label>
                                 ${(data.label || '') + (localize(`states.${value}`) || formatValue) + (data.unit || '') }
                               </div>
                            </div>`;

      const hasDropdown = `${data.key}_list` in stateObj.attributes;

      return (hasDropdown && (isValidAttribute || isValidEntityData))
          ? this.renderDropdown(attribute, data.key)
          : attribute;
  }


  private renderAttribute(data: any): TemplateResult {
    if (!this.config.show_attributes) {
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
      const attribute = html`<div>${data.icon && this.renderIcon(data)}${(data.label || '') + (localize(`attributes_value.${value}`) || formatValue) + (data.unit || '')}</div>`;

      const hasDropdown = `${data.key}_list` in stateObj.attributes;

      return (hasDropdown && (isValidAttribute || isValidEntityData))
          ? this.renderDropdown(attribute, data.key)
          : attribute;
  }

  private renderBody(data: any): TemplateResult {
    if (!this.config.show_body) {
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
      const attribute = html`<div class="score-div">
                               <div class="score-icon">
                                 ${data.icon && this.renderIconbody(data)}
                               </div>
                               <div class="score-label">
                                 ${(data.label || '')}
                               </div>
                               <div class="score-value">
                                 ${(localize(`body_value.${value}`) || formatValue ) + (data.unit || '')}
                               </div>
                             </div>`;

      const hasDropdown = `${data.key}_list` in stateObj.attributes;

      return (hasDropdown && (isValidAttribute || isValidEntityData))
          ? this.renderDropdown(attribute, data.key)
          : attribute;
  }

  private renderIcon(data: any): TemplateResult {
    const stateObj = this.hass!.states[this.config!.entity];
    const icon = (data.key === 'water' && 'water_icon' in this.stateObj.attributes)
      ? this.stateObj.attributes.water_icon
      : data.icon;
    if(stateObj.attributes.problem !== "none" && icon === "mdi:alert") {
      return html`<ha-icon class="problem" icon="${icon}"></ha-icon>`;
    }
    return html`<ha-icon icon="${icon}" style="margin-right: 10px; ${this.config.styles.icon}"></ha-icon>`;
  }

  private renderIconbody(data: any): TemplateResult {
    const icon = (data.key === 'Water' && 'water_icon' in this.stateObj.attributes)
        ? this.stateObj.attributes.water_icon
        : data.icon;
    return html`<div class="image" style="-webkit-mask-box-image: url('${icon}');${this.config.styles.iconbody}"></div>`;
}

renderButton(data: any) {
  if (!this.config.show_buttons) {
    return html``;
  }
  
  return data && data.show !== false
    ? html`<ha-icon-button
      @click="${() => this.callService(data.service, data.service_data)}"
      icon="${data.icon}"
      title="${data.label || ''}"
      style="${this.config.styles.icon}"></ha-icon-button>`
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
          icon = ${this.open ? "mdi:chevron-up" : "mdi:chevron-down"}
          title="${localize('common.toggle_power')}"
          style="color: var(--primary-color);"
        >
        </ha-icon-button>
        <div class="fill-gap"></div>
        ${Object.values(this.config.buttons).filter(v => v).map(this.renderButton.bind(this))}
      </div>
    `;
  }

  private handleChange(e: any, key: any): void {
    const stateObj = this.hass!.states[this.config!.entity];
    const mode = e.target.getAttribute('value');
    this.callService(`bodymiscale.set_${key}`, {entity_id: stateObj.entity_id, [key]: mode});
  }

  private callService(service: any, data = {entity_id: this.stateObj.entity_id}): void {
    const [domain, name] = service.split('.');
    this.hass!.callService(domain, name, data);
  }

  private renderDropdown(attribute: any, key: any) {
    if (!this.hass || !this.config) {
      return html``;
    }
    const stateObj = this.hass.states[this.config!.entity];
    const selected = stateObj.attributes[key];
    const list = stateObj.attributes[`${key}_list`];

    return html`
      <paper-menu-button slot="dropdown-trigger" @click="${(e: any) => e.stopPropagation()}" style="padding: 0">
        <paper-button slot="dropdown-trigger">${attribute}</paper-button>
        <paper-listbox slot="dropdown-content" selected="${list.indexOf(selected)}" @click="${(e: any) => this.handleChange(e, key)}">
          ${list.map((item: any) => html`<paper-item value="${item}" style="text-shadow: none;">${item}</paper-item>`)}
        </paper-listbox>
      </paper-menu-button>
    `;
  }

  static get styles(): CSSResultGroup {
    return styles
  }

  private _moreInfo(): void {
    fireEvent(this, "hass-more-info", {
      entityId: this.config!.entity
    });
  }
}