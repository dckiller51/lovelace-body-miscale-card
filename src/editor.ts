/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  LovelaceCardConfig,
  LovelaceCardEditor,
  fireEvent,
} from 'custom-card-helpers';
import localize from './localize';
import './color-select';
import {
  Template,
  BodymiscaleCardConfig,
  NumericSeverity,
  PositionKeys,
} from './types';
import styles from './editor.css';
import { defaultCardConfig, body_kg, body_lb } from './const';

type ConfigElement = HTMLInputElement & {
  configValue?: keyof BodymiscaleCardConfig;
};

@customElement('body-miscale-card-editor')
export class BodymiscaleCardEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: Number }) page = 1;
  @property() selectedColor: string = 'white';

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

    return html`
      <div class="card-config">
        ${this.page === 1 ? this.renderPage1(config) : this.renderPage2(config)}
      </div>
    `;
  }

  private _handleConfigClick() {
    this.page = 1;
  }

  private _handleCustomClick() {
    this.page = 2;
  }

  private renderPage1(config: Partial<BodymiscaleCardConfig>): Template {
    const entities = Object.keys(this.hass!.states).filter((entity) =>
      entity.startsWith('bodymiscale.'),
    );

    return html`
      <div class="flex-space-between">
        <h2 class="page-title">${localize('editor.Configuration')}</h2>
        <div class="navigation">
          <ha-icon-button
            @click=${this._handleConfigClick}
            .disabled=${this.page === 1}
          >
            <ha-icon icon="mdi:tune"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            @click=${this._handleCustomClick}
            .disabled=${this.page === 2}
          >
            <ha-icon icon="mdi:palette"></ha-icon>
          </ha-icon-button>
        </div>
      </div>
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
            (entity) =>
              html`<mwc-list-item .value=${entity}>${entity}</mwc-list-item>`,
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

      <div class="option">
        <ha-textfield
          .label=${localize('editor.icons_body')}
          .value=${config.icons_body || ''}
          .configValue=${'icons_body'}
          @input=${this.valueChanged}
        ></ha-textfield>
      </div>

      ${this.renderSwitch('model', config)} ${this.renderSwitch('unit', config)}
      ${this.renderSwitch('theme', config)}

      <p class="page-title">
        <u>${localize('editor.header_options')}</u>
      </p>

      ${this.renderSwitch('show_name', config)}
      ${this.renderSwitch('show_states', config)}
      ${this.renderSwitch('show_attributes', config)}

      <p class="page-title">
        <u>${localize('editor.body_options')}</u>
      </p>

      ${this.renderSwitch('show_always_details', config)}
      ${this.renderSwitch('show_toolbar', config)}
      ${this.renderSwitch('show_body', config, true)}
      ${this.renderSwitch('show_buttons', config, true)}

      <strong>${localize('editor.code_only_note')}</strong>
    `;
  }

  private renderPage2(config: Partial<BodymiscaleCardConfig>): Template {
    return html`
      <div class="flex-space-between">
        <h2 class="page-title">${localize('editor.Customization')}</h2>
        <div class="navigation">
          <ha-icon-button
            @click=${this._handleConfigClick}
            .disabled=${this.page === 1}
          >
            <ha-icon icon="mdi:tune"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            @click=${this._handleCustomClick}
            .disabled=${this.page === 2}
          >
            <ha-icon icon="mdi:palette"></ha-icon>
          </ha-icon-button>
        </div>
      </div>
      ${this.renderBodyOptions(config)}
    `;
  }

  private renderSwitch(
    option: keyof BodymiscaleCardConfig,
    config: Partial<BodymiscaleCardConfig>,
    padded = false,
  ) {
    return html`
      <div style="padding: ${padded ? '0 0 0 45px' : '0'}">
        ${localize(`editor.${option}`)}
        <div class="option">
          <ha-formfield
            .label=${localize(
              config[option]
                ? `editor.${option}_aria_label_off`
                : `editor.${option}_aria_label_on`,
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

  private renderBodyOptions(config: Partial<BodymiscaleCardConfig>) {
    const bodyData = config.unit === false ? body_kg : body_lb;
    const bodyConfig = config.body ?? {};

    // Filtrage basé sur impedance_required
    const filteredKeys = Object.keys(bodyData).filter((key) => {
      const item = bodyData[key as keyof typeof bodyData];

      // Si model est false, n'inclure que ceux avec impedance_required === false
      if (config.model === false) {
        return !item.impedance_required; // Exclure ceux qui ont impedance_required = true
      }

      // Si model est true, inclure tous les éléments
      return true;
    });

    return filteredKeys.map((key) => {
      const item = bodyData[key as keyof typeof bodyData];
      const positions = bodyConfig[key]?.positions || item.positions || {};
      const min =
      bodyConfig[key]?.min !== undefined && bodyConfig[key]?.min !== null
        ? bodyConfig[key].min
        : item.min;
      const max =
        bodyConfig[key]?.max !== undefined && bodyConfig[key]?.max !== null
          ? bodyConfig[key].max
          : item.max;
      const target =
        bodyConfig[key]?.target !== undefined && bodyConfig[key]?.target !== null
          ? bodyConfig[key]?.target
          : item.target;
      const height =
        bodyConfig[key]?.height !== undefined && bodyConfig[key]?.height !== null
          ? bodyConfig[key].height
          : item.height;
      const severity =
        Array.isArray(bodyConfig[key]?.severity) &&
        bodyConfig[key].severity.some(
          (s: { from: number; to: number; color: string }) => s.color !== undefined
        )
          ? bodyConfig[key].severity
          : item.severity;

      const label = localize(`body.${key}`);

      const positionKeys: PositionKeys[] = ['icon', 'name', 'minmax', 'value'];

      return html`
        <div>
          <h3>${label}</h3>
          <ha-form-grid>
            ${positionKeys.map((positionKey) => {
              return this.renderPositionSelect(
                positionKey,
                positions[positionKey],
                key,
              );
            })}
          </ha-form-grid>
          <ha-form-grid>
            ${this.renderMinMaxInputs(min, max, key)}
            ${this.renderTargetInputs(target, key)}
            ${this.renderHeightInputs(height, key)}
          </ha-form-grid>
          <ha-form-grid>
            ${this.renderSeverityInputs(severity, key)}
          </ha-form-grid>
        </div>
      `;
    });
  }

  private renderPositionSelect(
    positionKey: PositionKeys,
    currentValue: string | undefined,
    sectionKey: string,
  ) {
    const valueToUse = currentValue ?? '';

    return html`
      <div class="option">
        <ha-select
          .label=${localize(`editor_body.${positionKey}_position`)}
          .configValue=${`body.${sectionKey}.positions.${positionKey}`}
          @selected=${this.valueChanged}
          .value=${valueToUse}
          @closed=${(e: Event) => e.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
          class="full"
        >
          ${currentValue === undefined
            ? html`<mwc-list-item value="" selected disabled></mwc-list-item>`
            : nothing}
          <mwc-list-item value="inside"
            >${localize('editor_body.inside')}</mwc-list-item
          >
          <mwc-list-item value="outside"
            >${localize('editor_body.outside')}</mwc-list-item
          >
          <mwc-list-item value="off"
            >${localize('editor_body.off')}</mwc-list-item
          >
        </ha-select>
      </div>
    `;
  }

  private renderMinMaxInputs(
    min: number | null | undefined,
    max: number | null | undefined,
    sectionKey: string,
  ) {
    if (min == null || max == null) {
      return nothing;
    }

    return html`
      <div class="option">
        <ha-textfield
          .label=${localize('editor_body.min')}
          .configValue=${`body.${sectionKey}.min`}
          @input=${this.valueChanged}
          .value=${String(min)}
          class="full"
          type="number"
        ></ha-textfield>
      </div>
      <div class="option">
        <ha-textfield
          .label=${localize('editor_body.max')}
          .configValue=${`body.${sectionKey}.max`}
          @input=${this.valueChanged}
          .value=${String(max)}
          class="full"
          type="number"
        ></ha-textfield>
      </div>
    `;
  }

  private renderTargetInputs(
    target: number | null | undefined,
    sectionKey: string,
  ) {
    if (target == null) {
      return nothing;
    }

    return html`
      <div class="option">
        <ha-textfield
          .label=${localize('editor_body.target')}
          .configValue=${`body.${sectionKey}.target`}
          @input=${this.valueChanged}
          .value=${String(target)}
          class="full"
          type="number"
        ></ha-textfield>
      </div>
    `;
  }

  private renderHeightInputs(
    height: number | null | undefined,
    sectionKey: string,
  ) {
    if (height == null) {
      return nothing;
    }

    return html`
      <div class="option">
        <ha-textfield
          .label=${localize('editor_body.height')}
          .configValue=${`body.${sectionKey}.height`}
          @input=${this.valueChanged}
          .value=${String(height)}
          class="full"
          type="number"
        ></ha-textfield>
      </div>
    `;
  }

  private renderSeverityInputs(
    severity: NumericSeverity | null | string | undefined,
    configKey: string,
  ): Template {
    if (severity == null) {
      return nothing;
    }

    const severityArray = Array.isArray(severity) ? severity : [];

    // Assurer qu'il y a toujours au moins une ligne vide pour l'édition
    const itemsToRender =
      severityArray.length > 0
        ? severityArray
        : [{ from: '', to: '', color: '' }];

    return html`
      <div>
        ${itemsToRender.map(
          (
            item: { from: number | string; to: number | string; color: string },
            index: number,
          ) => {
            return html`
              <div class="severity-row">
                <ha-textfield
                  .label=${localize('editor_body.from')}
                  .value=${String(item.from ?? '')}
                  @input=${(ev: Event) =>
                    this.updateNumericSeverity(
                      configKey,
                      index,
                      'from',
                      (ev.target as HTMLInputElement).value,
                    )}
                  type="number"
                  class="full"
                ></ha-textfield>
                <ha-textfield
                  .label=${localize('editor_body.to')}
                  .value=${String(item.to ?? '')}
                  @input=${(ev: Event) =>
                    this.updateNumericSeverity(
                      configKey,
                      index,
                      'to',
                      (ev.target as HTMLInputElement).value,
                    )}
                  type="number"
                  class="full"
                ></ha-textfield>
                <div>
                  <color-select
                    .value=${item.color ?? ''}
                    @value-changed=${(ev: CustomEvent) =>
                      this.updateNumericSeverity(
                        configKey,
                        index,
                        'color',
                        ev.detail.value,
                      )}
                  ></color-select>
                </div>
                <div style="display: flex; align-items: center; margin: 0px">
                  <ha-icon-button
                    @click=${() => this.removeNumericSeverity(configKey, index)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button
                    @click=${() => this.addNumericSeverity(configKey)}
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </ha-icon-button>
                </div>
              </div>
            `;
          },
        )}
      </div>
    `;
  }

  private updateNumericSeverity(
    configKey: string,
    index: number,
    key: 'from' | 'to' | 'color',
    value: number | string,
  ): void {
    if (this.config?.body) {
      if (!Array.isArray(this.config.body[configKey]?.severity)) {
        this.config.body[configKey].severity = []; // Initialiser si nécessaire
      }
      const severity = [
        ...(this.config.body[configKey].severity as NumericSeverity),
      ];
      if (severity[index]) {
        severity[index] = { ...severity[index], [key]: value };

        this.config.body[configKey].severity = severity; // Mise à jour directe
        this.valueChanged(); // Déclencher l'événement de changement
      }
    }
  }

  private addNumericSeverity(configKey: string): void {
    if (this.config?.body) {
      if (!Array.isArray(this.config.body[configKey]?.severity)) {
        this.config.body[configKey].severity = []; // Initialiser en tant que tableau si nécessaire
      }
      const severity = [
        ...((this.config.body[configKey]?.severity as NumericSeverity) || []),
      ];
      severity.push({ from: 0, to: 0, color: '' });
      this.config.body[configKey].severity = severity; // Mise à jour directe
      this.valueChanged(); // Déclencher l'événement de changement
    }
  }

  private removeNumericSeverity(configKey: string, index: number) {
    if (this.config?.body?.[configKey]?.severity) {
      const severity = [
        ...(this.config.body[configKey].severity as NumericSeverity),
      ].filter((_, i) => i !== index);

      // Assurer qu'on a toujours au moins une ligne vide
      if (severity.length === 0) {
        severity.push({ from: 0, to: 0, color: '' });
      }

      this.config.body[configKey].severity = severity; // Mise à jour directe
      this.valueChanged(); // Déclencher l'événement de changement
    }
  }

  private valueChanged(event: Event | null = null): void {
    if (!this.config || !this.hass) {
      return;
    }

    if (event && event.target) {
      const target = event.target as ConfigElement;

      if (target.configValue && typeof target.configValue === 'string') {
        const newValue =
          target.checked !== undefined
            ? target.checked
            : target.value || undefined;
        const path = target.configValue.split('.');

        let currentConfig = { ...this.config };
        let currentLevel = currentConfig;

        for (let i = 0; i < path.length - 1; i++) {
          const key = path[i];
          if (currentLevel[key] === undefined) {
            currentLevel[key] = {};
          }
          currentLevel = currentLevel[key];
        }

        // Mise à jour de la valeur
        const lastKey = path[path.length - 1];
        currentLevel[lastKey] = newValue;

        this.config = currentConfig;

        fireEvent(this, 'config-changed', { config: this.config });
      }
    } else {
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
