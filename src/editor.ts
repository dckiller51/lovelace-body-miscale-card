/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { LitElement, html, TemplateResult, css, CSSResultGroup } from 'lit';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';

import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { localize } from './localize/localize';
import { BodyMiScaleCardConfig } from './types';
import { customElement, property, state } from 'lit/decorators';
import { formfieldDefinition } from '../elements/formfield';
import { selectDefinition } from '../elements/select';
import { switchDefinition } from '../elements/switch';
import { textfieldDefinition } from '../elements/textfield';

@customElement('body-miscale-card-editor')
export class BoilerplateCardEditor extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: BodyMiScaleCardConfig ;

  @state() private _helpers?: any;
  
  private _initialized = false;

  static elementDefinitions = {
    ...textfieldDefinition,
    ...selectDefinition,
    ...switchDefinition,
    ...formfieldDefinition,
  };

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

        <mwc-select
          naturalMenuWidth
          fixedMenuPosition
          label="${localize('editor.entity')}"
          .configValue=${'entity'}
          .value=${this._entity}
          @selected=${this._valueChanged}
          @closed=${(ev) => ev.stopPropagation()}
        >
          ${bodymiscaleEntities.map((entity) => {
            return html`<mwc-list-item .value=${entity}>${entity}</mwc-list-item>`;
          })}
        </mwc-select>

        <mwc-textfield
          label="${localize('editor.image')}"
          .value=${this._image}
          .configValue=${'image'}
          @input=${this._valueChanged}
        ></mwc-textfield>

        ${localize('editor.model')}<br>
        ${localize('editor.model1')}<br>
        <mwc-formfield class="option" .label=${localize(this._model 
          ? 'editor.model_aria_label_off' 
          : 'editor.model_aria_label_on'
          )}>
          <mwc-switch
            .checked=${this._model !== false}
            .configValue=${'model'}
            @change=${this._valueChanged}
          ></mwc-switch>
        </mwc-formfield>

        ${localize('editor.unit')}<br>
        <mwc-formfield class="option" .label=${localize(this._unit 
          ? 'editor.unit_aria_label_off' 
          : 'editor.unit_aria_label_on'
          )}>
          <mwc-switch
            .checked=${this._unit !== false}
            .configValue=${'unit'}
            @change=${this._valueChanged}
          ></mwc-switch>
        </mwc-formfield>

        <strong style="font-size: large; line-height: 200%;">
          <U>${localize('editor.header_options')}</U>
        </strong><br>

        ${localize('editor.show_name')}<br>
        <mwc-formfield class="option" .label=${localize(this._show_name 
          ? 'editor.show_name_aria_label_off' 
          : 'editor.show_name_aria_label_on'
          )}>
          <mwc-switch
            .checked=${this._show_name !== false}
            .configValue=${'show_name'}
            @change=${this._valueChanged}
          ></mwc-switch>
        </mwc-formfield>

        ${localize('editor.show_states')}<br>
        <mwc-formfield class="option" .label=${localize(this._show_states 
          ? 'editor.show_states_aria_label_off' 
          : 'editor.show_states_aria_label_on'
          )}>
          <mwc-switch
            .checked=${this._show_states !== false}
            .configValue=${'show_states'}
            @change=${this._valueChanged}
          ></mwc-switch>
        </mwc-formfield>

        ${localize('editor.show_attributes')}<br>
        <mwc-formfield class="option" .label=${localize(this._show_attributes 
          ? 'editor.show_attributes_aria_label_off' 
          : 'editor.show_attributes_aria_label_on'
          )}>
          <mwc-switch
            .checked=${this._show_attributes !== false}
            .configValue=${'show_attributes'}
            @change=${this._valueChanged}
          ></mwc-switch>
        </mwc-formfield>

        <strong style="font-size: large; line-height: 200%;">
          <U>${localize('editor.body_options')}</U>
        </strong><br>

        ${localize('editor.show_toolbar')}<br>
        <mwc-formfield class="option" .label=${localize(this._show_toolbar 
          ? 'editor.show_toolbar_aria_label_off' 
          : 'editor.show_toolbar_aria_label_on'
          )}>
          <mwc-switch
            .checked=${this._show_toolbar !== false}
            .configValue=${'show_toolbar'}
            @change=${this._valueChanged}
          ></mwc-switch>
        </mwc-formfield>

        <strong style="padding:0 0 0 45px">
          ${localize('editor.show_body')}<br>
        </strong>
        <strong style="padding:0 0 0 45px">
          ${localize('editor.show_body1')}<br>
        </strong>
        <mwc-formfield class="option" style="padding:0 0 0 45px" .label=${localize(this._show_body 
          ? 'editor.show_body_aria_label_off' 
          : 'editor.show_body_aria_label_on'
          )}>
          <mwc-switch
            .checked=${this._show_body !== false}
            .configValue=${'show_body'}
            @change=${this._valueChanged}
          ></mwc-switch>
        </mwc-formfield>

        <strong style="padding:0 0 0 45px">
        ${localize('editor.show_buttons')}<br>
        </strong>
        <mwc-formfield class="option" style="padding:0 0 0 45px" .label=${localize(this._show_buttons 
          ? 'editor.show_buttons_aria_label_off' 
          : 'editor.show_buttons_aria_label_on'
          )}>
          <mwc-switch
            .checked=${this._show_buttons !== false}
            .configValue=${'show_buttons'}
            @change=${this._valueChanged}
          ></mwc-switch>
        </mwc-formfield>
       
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

  private _valueChanged(ev): void {
    if (!this._config || !this.hass) {
      return;
    }
    const target = ev.target;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        const tmpConfig = { ...this._config };
        delete tmpConfig[target.configValue];
        this._config = tmpConfig;
      } else {
        this._config = {
          ...this._config,
          [target.configValue]: target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static styles: CSSResultGroup = css`
    mwc-select,
    mwc-textfield {
      margin-bottom: 16px;
      display: block;
    }
    mwc-formfield {
      padding-bottom: 8px;
    }
    mwc-switch {
      --mdc-theme-secondary: var(--switch-checked-color);
    }
    .option {
      display: flex;
      align-items: center;
    }
  `;
}