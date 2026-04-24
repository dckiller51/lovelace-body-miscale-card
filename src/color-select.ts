import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { computeCssColor, COLOR_HEX_MAP } from './compute-color';
import localize from './localize';

@customElement('color-select')
export class ColorSelect extends LitElement {
  @property() public label?: string;
  @property() public value?: string;
  @property() public configValue = '';

  private _selectColor(color: string) {
    this.dispatchEvent(
      new CustomEvent('value-changed', {
        detail: {
          value: color || undefined,
        },
      }),
    );
  }

  render() {
    return html`
      <ha-select
        .icon=${Boolean(this.value)}
        .label=${localize('color_select.color')}
        .value=${this.value}
        @closed=${(e: Event) => e.stopPropagation()}
        fixedMenuPosition
        naturalMenuWidth
      >
        <span slot="icon">
          ${this._renderColorCircle(this.value || 'grey')}
        </span>

        ${Object.keys(COLOR_HEX_MAP).map(
          (color) => html`
            <ha-list-item 
              .value=${color} 
              graphic="icon"
              @click=${() => this._selectColor(color)}
            >
              ${localize(`color_select.${color}`) || color}
              <span slot="graphic">${this._renderColorCircle(color)}</span>
            </ha-list-item>
          `,
        )}
      </ha-select>
    `;
  }

  private _renderColorCircle(color: string) {
    return html`
      <span
        class="circle-color"
        style=${styleMap({
          '--circle-color': computeCssColor(color),
        })}
      ></span>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .circle-color {
        display: block;
        background-color: var(--circle-color, var(--divider-color));
        border: 1px solid var(--outline-color);
        border-radius: 10px;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
      }
      ha-select {
        width: 100%;
      }
    `;
  }
}