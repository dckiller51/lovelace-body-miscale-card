/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HomeAssistant,
  LovelaceCardConfig,
  LovelaceCardEditor,
  fireEvent,
} from 'custom-card-helpers';
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { defaultCardConfig, body_kg, body_lb } from './const';
import styles from './editor.css';
import localize from './localize';
import './color-select';
import {
  Template,
  BodymiscaleCardConfig,
  NumericSeverity,
  PositionKeys,
} from './types';

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
        <h2 class="page-title">${localize('editor.configuration')}</h2>
        <div class="navigation">
          <ha-icon-button
            @click=${this._handleConfigClick}
            .disabled=${this.page === 1}
            .label="${localize('editor.configuration')}"
          >
            <ha-icon icon="mdi:tune"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            @click=${this._handleCustomClick}
            .disabled=${this.page === 2}
            .label="${localize('editor.customization')}"
          >
            <ha-icon icon="mdi:palette"></ha-icon>
          </ha-icon-button>
        </div>
      </div>
      <div class="option">
        <ha-select
          .label=${localize('editor.entity')}
          .value=${config.entity}
          @closed=${(e: Event) => e.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
          required
          .validationMessage=${localize('error.missing_entity')}
        >
          ${entities.map(
            (entity) =>
              html`<ha-list-item 
                .value=${entity}
                @click=${() => this._updateValue('entity', entity)}
              >${entity}</ha-list-item>`,
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
        <h2 class="page-title">${localize('editor.customization')}</h2>
        <div class="navigation">
          <ha-icon-button
            @click=${this._handleConfigClick}
            .disabled=${this.page === 1}
            .label="${localize('editor.configuration')}"
          >
            <ha-icon icon="mdi:tune"></ha-icon>
          </ha-icon-button>
          <ha-icon-button
            @click=${this._handleCustomClick}
            .disabled=${this.page === 2}
            .label="${localize('editor.customization')}"
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
      const showabovelabels =
        bodyConfig[key]?.showabovelabels !== undefined && bodyConfig[key]?.showabovelabels !== null
          ? bodyConfig[key].showabovelabels
          : item.showabovelabels;
      const showbelowlabels =
        bodyConfig[key]?.showbelowlabels !== undefined && bodyConfig[key]?.showbelowlabels !== null
          ? bodyConfig[key].showbelowlabels
          : item.showbelowlabels;
      const severity = bodyConfig[key]?.severity || item.severity;

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
            ${this.renderBooleanSelector('showabovelabels', showabovelabels, `body.${key}.showabovelabels`)}
            ${this.renderBooleanSelector('showbelowlabels', showbelowlabels, `body.${key}.showbelowlabels`)}
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
    const configPath = `body.${sectionKey}.positions.${positionKey}`;

    return html`
      <div class="option">
        <ha-select
          .label=${localize(`editor_body.${positionKey}_position`)}
          .value=${valueToUse}
          @closed=${(e: Event) => e.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
          class="full"
        >
          ${currentValue === undefined
            ? html`<ha-list-item value="" selected disabled></ha-list-item>`
            : nothing}
          <ha-list-item 
            .value=${'left'}
            @click=${() => this._updateValue(configPath, 'left')}
          >${localize('editor_body.left')}</ha-list-item>
          <ha-list-item 
            .value=${'right'}
            @click=${() => this._updateValue(configPath, 'right')}
          >${localize('editor_body.right')}</ha-list-item>
          <ha-list-item 
            .value=${'off'}
            @click=${() => this._updateValue(configPath, 'off')}
          >${localize('editor_body.off')}</ha-list-item>
        </ha-select>
      </div>
    `;
  }

  private renderBooleanSelector(
    labelKey: string,
    currentValue: string | null | undefined,
    configPath: string
  ) {
    if (currentValue === null || currentValue === undefined) {
      return nothing;
    }

    const value = String(currentValue);

    return html`
      <div class="option">
        <ha-select
          .label=${localize(`editor_body.${labelKey}`)}
          .value=${value}
          @closed=${(e: Event) => e.stopPropagation()}
          fixedMenuPosition
          naturalMenuWidth
          class="full"
        >
          <ha-list-item 
            .value=${'true'}
            @click=${() => this._updateValue(configPath, 'true')}
          >${localize('editor_body.on')}</ha-list-item>
          <ha-list-item 
            .value=${'false'}
            @click=${() => this._updateValue(configPath, 'false')}
          >${localize('editor_body.off')}</ha-list-item>
        </ha-select>
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
        : [{ from: '', to: '', color: '', label: '' }];
  
    return html`
      <div>
        ${itemsToRender.map(
          (
            item: { from: number | string; to: number | string; color: string; label?: string },
            index: number,
          ) => {
            return html`
              <div class="severity-row">
                <div class="input-line">
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
                    class="from-input"
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
                    class="to-input"
                  ></ha-textfield>
                  <div class="color-picker-container">
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
                </div>
                <div class="below-line">
                  <ha-textfield
                    .label=${localize('editor_body.label_below')}
                    .value=${item.label ?? ''}
                    @input=${(ev: Event) =>
                      this.updateNumericSeverity(
                        configKey,
                        index,
                        'label',
                        (ev.target as HTMLInputElement).value,
                      )}
                    class="label-input"
                  ></ha-textfield>
                  <div class="severity-icons">
                    <ha-icon-button
                      class="compact-icon"
                      @click=${() => this.removeNumericSeverity(configKey, index)}
                    >
                      <ha-icon icon="mdi:delete"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      class="compact-icon"
                      @click=${() => this.addNumericSeverity(configKey)}
                    >
                      <ha-icon icon="mdi:plus"></ha-icon>
                    </ha-icon-button>
                    <ha-icon-button
                      class="compact-icon"
                      @click=${() => window.open('https://dckiller51.github.io/lovelace-body-miscale-card/', '_blank')}
                      .label="${localize('editor_body.severity_generator_help')}"
                    >
                      <ha-icon icon="mdi:information-outline"></ha-icon>
                    </ha-icon-button>
                  </div>
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
    key: 'from' | 'to' | 'color' | 'label',
    value: number | string,
  ): void {
    if (this.config && this.config.body) {
      if (!Array.isArray(this.config.body[configKey]?.severity)) {
        this.config.body[configKey].severity = []; // Initialiser si nécessaire
      }
      const severity = [
        ...(this.config.body[configKey].severity as NumericSeverity),
      ];
      if (severity[index]) {
        severity[index] = { ...severity[index], [key]: value };

        this.updateConfig(configKey, severity);
      }
    }
  }

  private addNumericSeverity(configKey: string): void {
    if (this.config && this.config.body) {
      if (!Array.isArray(this.config.body[configKey]?.severity)) {
        this.config.body[configKey].severity = []; // Initialiser en tant que tableau si nécessaire
      }
      const severity = [
        ...((this.config.body[configKey]?.severity as NumericSeverity) || []),
      ];
      severity.push({ from: 0, to: 0, color: '', label: '' });
      this.updateConfig(configKey, severity);
    }
  }

  private removeNumericSeverity(configKey: string, index: number) {
    const severity = [
      ...((this.config?.body?.[configKey]?.severity as NumericSeverity) || []),
    ].filter((_, i) => i !== index);

    // Assurer qu'on a toujours au moins une ligne vide
    if (severity.length === 0) {
      severity.push({ from: 0, to: 0, color: '', label: '' });
    }

    this.updateConfig(configKey, severity);
  }

  private updateConfig(configKey: string, severity: NumericSeverity): void {
    if (this.config && this.config.body) {
      this.config.body[configKey].severity = severity;

      this.valueChanged();
    }
  }

  private valueChanged(event: Event | null = null): void {
    if (!this.config || !this.hass) {
      return;
    }

    if (event && event.currentTarget) {
      const target = event.currentTarget as ConfigElement;

      if (target.configValue && typeof target.configValue === 'string') {
        const newValue =
          target.checked !== undefined
            ? target.checked
            : target.value || undefined;
        
        this._updateValue(target.configValue, newValue);
      }
    } else {
      fireEvent(this, 'config-changed', { config: this.config });
    }
  }

  private _updateValue(configPath: string, value: any): void {
    if (!this.config) return;

    const path = configPath.split('.');
    const newConfig = { ...this.config };
    let current = newConfig as any;

    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      } else {
        current[key] = { ...current[key] };
      }
      current = current[key];
    }

    current[path[path.length - 1]] = value;
    this.config = newConfig;

    fireEvent(this, 'config-changed', { config: this.config });
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
