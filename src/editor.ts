/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { LitElement, html, TemplateResult, CSSResultGroup, css } from 'lit';
import { customElement, state, property } from "lit/decorators";
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';
import { localize } from './localize/localize';
import { BodyMiScaleCardConfig } from './types';

@customElement('body-miscale-card-editor')
export class BoilerplateCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: BodyMiScaleCardConfig ;
  @state() private _helpers?: any;
  private _initialized = false;

  public setConfig(config: BodyMiScaleCardConfig ): void {
    this._config = config;

    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get _entity(): string {
    return this._config?.entity || '';
  }

  get _image(): string {
    return this._config?.image || '';
  }

  get _model() {
    return this._config?.model || false;
  }

  get _unit() {
    return this._config?.unit || false;
  }

  get _show_name(): boolean {
    return this._config?.show_name || false;
   }

  get _show_states(): boolean {
    return this._config?.show_states || false;
  }

  get _show_attributes(): boolean {
    return this._config?.show_attributes || false;
  }

  get _show_body(): boolean {
    if (this._show_toolbar === false) {
      return false;
    }
    return this._config?.show_body || false;
  }

  get _show_buttons(): boolean {
    if (this._show_toolbar === false) {
      return false;
    }
    return this._config?.show_buttons || false;
  }

  get _show_toolbar(): boolean {
    return this._config?.show_toolbar || false;    
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    const bodymiscaleEntities = Object.keys(this.hass.states).filter(eid => eid.substr(0, eid.indexOf('.')) === 'bodymiscale');

    return html`
      <div class="card-config">
        <strong>
          ${localize('editor.code_information')}
        </strong>

        <paper-dropdown-menu
          label="${localize('editor.entity')}"
          @value-changed=${this._valueChanged}
          .configValue=${'entity'}
        >
          <paper-listbox
            slot="dropdown-content"
            .selected=${bodymiscaleEntities.indexOf(this._entity)}
          >
            ${bodymiscaleEntities.map((entity) => {
              return html` <paper-item>${entity}</paper-item> `;
            })}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-input
          label="${localize('editor.image')}"
          .value=${this._image}
          .configValue=${'image'}
          @value-changed=${this._valueChanged}
        ></paper-input>

        <p class="option">
          <ha-switch
            aria-label=${localize(
              this._model
                ? 'editor.model_aria_label_off'
                : 'editor.model_aria_label_on'
            )}
            .checked=${this._model !== false}
            .configValue=${'model'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.model')}<br>
          ${localize('editor.model1')}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${localize(
              this._unit
                ? 'editor.unit_aria_label_off'
                : 'editor.unit_aria_label_on'
            )}
            .checked=${this._unit !== false}
            .configValue=${'unit'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.unit')}<br>
        </p>

        <strong style="font-size: large; line-height: 200%;">
          <U>${localize('editor.header_options')}</U>
        </strong>

        <p class="option">
          <ha-switch
            aria-label=${localize(
              this._show_name
                ? 'editor.show_name_aria_label_off'
                : 'editor.show_name_aria_label_on'
            )}
            .checked=${this._show_name !== false}
            .configValue=${'show_name'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_name')}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${localize(
              this._show_states
                ? 'editor.show_states_aria_label_off'
                : 'editor.show_states_aria_label_on'
            )}
            .checked=${this._show_states !== false}
            .configValue=${'show_states'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_states')}
        </p>

        <p class="option">
          <ha-switch
            aria-label=${localize(
              this._show_attributes
                ? 'editor.show_attributes_aria_label_off'
                : 'editor.show_attributes_aria_label_on'
            )}
            .checked=${this._show_attributes !== false}
            .configValue=${'show_attributes'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_attributes')}
        </p>

        <strong style="font-size: large; line-height: 200%;">
          <U>${localize('editor.body_options')}</U>
        </strong>

        <p class="option">
          <ha-switch
            aria-label=${localize(
              this._show_toolbar
                ? 'editor.show_toolbar_aria_label_off'
                : 'editor.show_toolbar_aria_label_on'
            )}
            .checked=${this._show_toolbar !== false}
            .configValue=${'show_toolbar'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_toolbar')}
        </p>

        <p class="option" style="padding:0 0 0 45px;">
          <ha-switch
            aria-label=${localize(
              this._show_body
                ? 'editor.show_body_aria_label_off'
                : 'editor.show_body_aria_label_on'
            )}
            .checked=${this._show_body !== false}
            .configValue=${'show_body'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_body')}<br>
          ${localize('editor.show_body1')}
        </p>

        <p class="option" style="padding:0 0 0 45px;">
          <ha-switch
            aria-label=${localize(
              this._show_buttons
                ? 'editor.show_buttons_aria_label_off'
                : 'editor.show_buttons_aria_label_on'
            )}
            .checked=${this._show_buttons !== false}
            .configValue=${'show_buttons'}
            @change=${this._valueChanged}
          >
          </ha-switch>
          ${localize('editor.show_buttons')}
        </p>
        
        <p>
          <U><B>${localize('editor.warning')}</B></U> ${localize('editor.code_only_note')}
        </p>
      </div>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) return;

    const target = ev.target as any;
    const value = ev.detail?.value ?? target.value;

    if (this[`_${target.configValue}`] === value) return;

    if (target.configValue) {
      if (value === '') {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles(): CSSResultGroup {
    return css`
    .card-config paper-dropdown-menu {
      width: 100%;
    }
    .option {
      display: flex;
      align-items: center;
    }
    .option ha-switch {
      margin-right: 10px;
    }
  `;
  }
}