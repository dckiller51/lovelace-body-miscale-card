import { LitElement, html, nothing } from 'lit';
import {
  HomeAssistant,
  LovelaceCardConfig,
  LovelaceCardEditor,
  fireEvent,
} from 'custom-card-helpers';
import localize from './localize';
import { customElement, property, state } from 'lit/decorators.js';
import { Template, BodymiscaleCardConfig } from './types';
import styles from './editor.css';
import { defaultCardConfig } from './const';

type ConfigElement = HTMLInputElement & {
  configValue?: keyof BodymiscaleCardConfig;
};

@customElement('body-miscale-card-editor')
export class BodymiscaleCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config: Partial<BodymiscaleCardConfig> = {};
  @state() private helpers: any;

  private isInitialized = false;

  setConfig(config: LovelaceCardConfig & Partial<BodymiscaleCardConfig>): void {
    this.config = { ...config };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this.isInitialized) {
      this.initialize();
    }
    return true;
  }

  protected render(): Template {
    if (!this.hass || !this.helpers) {
      return nothing;
    }

    const config = {
      ...defaultCardConfig,
      ...this.config,
    };

    const entities = Object.keys(this.hass.states).filter((entity) =>
      entity.startsWith("bodymiscale.")
    );

    return html`
      <div class="card-config">
        <div class="option">
          <ha-select
            .label=${localize('editor.entity')}
            @selected=${this.valueChanged}
            .configValue=${'entity'}
            .value=${config.entity}
            @closed=${(e: Event) => e.stopPropagation()}
            fixedMenuPosition
            naturalMenuWidth
            required
            .validationMessage=${localize('error.missing_entity')}
          >
            ${entities.map(
              (entity) => html`<mwc-list-item .value=${entity}>${entity}</mwc-list-item>`,
            )}
          </ha-select>
        </div>

        <div class="option">
          <ha-textfield
            .label=${localize('editor.image')}
            .value=${config.image || ''}
            .configValue=${'image'}
            @input=${this.valueChanged}
          ></ha-textfield>
        </div>

        ${this.renderSwitch('model', config)}
        ${this.renderSwitch('unit', config)}
        ${this.renderSwitch('theme', config)}

        <p style="font-size: large; line-height: 200%;">
          <u>${localize('editor.header_options')}</u>
        </p>

        ${this.renderSwitch('show_name', config)}
        ${this.renderSwitch('show_states', config)}
        ${this.renderSwitch('show_attributes', config)}

        <p style="font-size: large; line-height: 200%;">
          <u>${localize('editor.body_options')}</u>
        </p>

        ${this.renderSwitch('show_always_details', config)}
        ${this.renderSwitch('show_toolbar', config)}
        ${this.renderSwitch('show_body', config, true)}
        ${this.renderSwitch('show_buttons', config, true)}

        <strong>${localize('editor.code_only_note')}</strong>
      </div>
    `;
  }

  private renderSwitch(option: keyof BodymiscaleCardConfig, config: Partial<BodymiscaleCardConfig>, padded = false) {
    return html`
      <div style="padding: ${padded ? '0 0 0 45px' : '0'}">
        ${localize(`editor.${option}`)}
        <div class="option">
          <ha-formfield
            .label=${localize(
              config[option]
                ? `editor.${option}_aria_label_off`
                : `editor.${option}_aria_label_on`
            )}
          >
            <ha-switch
              .checked=${Boolean(config[option])}
              .configValue=${option}
              @change=${this.valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `;
  }

  private valueChanged(event: Event): void {
    if (!this.config || !this.hass || !event.target) {
      return;
    }
    const target = event.target as ConfigElement;
    if (target.configValue) {
      const newValue = target.checked !== undefined ? target.checked : target.value || undefined;
      this.config = {
        ...this.config,
        [target.configValue]: newValue,
      };
      fireEvent(this, 'config-changed', { config: this.config });
    }
  }

  private initialize(): void {
    if (this.hass && this.config && this.helpers) {
      this.isInitialized = true;
    }
  }

  private async loadCardHelpers(): Promise<void> {
    this.helpers = await (window as any).loadCardHelpers();
  }

  static get styles() {
    return styles;
  }
}
