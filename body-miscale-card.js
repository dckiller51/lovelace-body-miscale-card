((LitElement) => {
    console.info(
        '%c BODYMISCALE-CARD %c 1.0.0 ',
        'color: cyan; background: black; font-weight: bold;',
        'color: darkblue; background: white; font-weight: bold;',
    );

    const attributes = {
        weight: {
            key: 'weight',
            label: 'weight: ',
            unit: ' kg',
        },
        impedance: {
            key: 'impedance',
            label: 'impedance: ',
            unit: ' ohm',
        },
        height: {
            key: 'height',
            label: 'height: ',
            unit: ' cm',
        },
        age: {
            key: 'age',
            label: 'age: ',
            unit: ' years',
        },
        gender: {
            key: 'gender',
            label: 'gender: ',
        },
    };

    const buttons = {
        user1: {
            label: 'User1',
            icon: 'mdi:alpha-u-circle',
            service: 'input_boolean.toggle',
        },
        user2: {
            show: false,
            label: 'User2',
            icon: 'mdi:alpha-u-circle',
            service: 'input_boolean.toggle',
        },
        user3: {
            show: false,
            label: 'User3',
            icon: 'mdi:alpha-u-circle',
            service: 'input_boolean.toggle',
        },
        user4: {
            show: false,
            label: 'User4',
            icon: 'mdi:alpha-u-circle',
            service: 'input_boolean.toggle',
        },
        user5: {
            show: false,
            label: 'User5',
            icon: 'mdi:alpha-u-circle',
            service: 'input_boolean.toggle',
        },
    };

    const models = {
        miscale: {
            buttons: {
                user1: {show: false},
            },
            attributes: {
                weight: {key: 'weight'},
                impedance: false,
                height: {key: 'height'},
                age: {key: 'age'},
                gender: {key: 'gender'},
            },
        },
        '181D': {
            attributes: {
                weight: {key: 'weight'},
                impedance: false,
                height: {key: 'height'},
                age: {key: 'age'},
                gender: {key: 'gender'},
            },
        },
        '181B': {
            attributes: {
                weight: {key: 'weight'},
                impedance: {key: 'impedance'},
                height: {key: 'height'},
                age: {key: 'age'},
                gender: {key: 'gender'},
            },
        },
    };

    const html = LitElement.prototype.html;
    const css = LitElement.prototype.css;

    class BodyMiscaleCard extends LitElement {

        static get properties() {
            return {
                _hass: {},
                config: {},
                stateObj: {},
            }
        }

        static get styles() {
            return css`
.background {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.title {
  font-size: 20px;
  padding: 12px 16px 8px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.flex {
  display: flex;
  align-items: right;
  justify-content: space-evenly;
}
.grid {
  display: grid;
  grid-template-columns: repeat(1, auto);
  cursor: pointer;
}
.grid-content {
  display: grid;
  align-content: right;
  grid-row-gap: 6px;
}
.grid-right {
  text-align: right;
  padding-right: 10px;
  border-right: 2px solid var(--primary-color);
}`;
        }

        render() {
            return this.stateObj ? html`
            <ha-card class="background" style="${this.config.styles.background}">
              ${this.config.show.name ?
                html`<div class="title">${this.config.name || this.stateObj.attributes.friendly_name}</div>`
                : null}
              ${(this.config.show.attributes) ? html`
              <div class="grid" style="${this.config.styles.content}" @click="${() => this.fireEvent('hass-more-info')}">
                ${this.config.show.attributes ? html`
                <div class="grid-content grid-right">
                  ${Object.values(this.config.attributes).filter(v => v).map(this.renderAttribute.bind(this))}
                </div>` : null}
              </div>` : null}
              ${this.config.show.buttons ? html`
              <div class="flex">
                ${Object.values(this.config.buttons).filter(v => v).map(this.renderButton.bind(this))}
              </div>` : null}
            </ha-card>` : html`<ha-card style="padding: 8px 16px">Entity '${this.config.entity}' not available...</ha-card>`;
        }

        renderAttribute(data) {
            const computeFunc = data.compute || (v => v);
            const isValidAttribute = data && data.key in this.stateObj.attributes;

            const value = isValidAttribute
                ? computeFunc(this.stateObj.attributes[data.key]) + (data.unit || '')
                : isValidEntityData
                    ? computeFunc(this.stateObj[data.key]) + (data.unit || '')
                    : this._hass.localize('state.default.unavailable');
            const attribute = html`<div>${data.icon && this.renderIcon(data)}${(data.label || '') + value}</div>`;

            const hasDropdown = `${data.key}_list` in this.stateObj.attributes;

            return (hasDropdown && (isValidAttribute))
                ? this.renderDropdown(attribute, data.key)
                : attribute;
        }

        renderIcon(data) {
            const icon = (this.stateObj.attributes)
                ? this.stateObj.attributes
                : data.icon;
            return html`<ha-icon icon="${icon}" style="margin-right: 10px; ${this.config.styles.icon}"></ha-icon>`;
        }

        renderButton(data) {
            return data && data.show !== false
                ? html`<ha-icon-button
                    @click="${() => this.callService(data.service, data.service_data)}"
                    icon="${data.icon}"
                    title="${data.label || ''}"
                    style="${this.config.styles.icon}"></ha-icon-button>`
                : null;
        }

        renderDropdown(attribute, key) {
            const selected = this.stateObj.attributes[key];
            const list = this.stateObj.attributes[`${key}_list`];

            return html`
              <paper-menu-button slot="dropdown-trigger" @click="${e => e.stopPropagation()}" style="padding: 0">
                <paper-button slot="dropdown-trigger">${attribute}</paper-button>
                <paper-listbox slot="dropdown-content" selected="${list.indexOf(selected)}" @click="${e => this.handleChange(e, key)}">
                  ${list.map(item => html`<paper-item value="${item}" style="text-shadow: none;">${item}</paper-item>`)}
                </paper-listbox>
              </paper-menu-button>
            `;
        }

        getCardSize() {
            if (this.config.show.name && this.config.show.buttons) return 4;
            if (this.config.show.name || this.config.show.buttons) return 3;
            return 2;
        }

        shouldUpdate(changedProps) {
            return changedProps.has('stateObj');
        }

        setConfig(config) {
            if (!config.entity) throw new Error('Please define an entity.');
            if (config.entity.split('.')[0] !== 'bodymiscale') throw new Error('Please define a bodymiscale entity.');
            if (config.model && !config.model in models) throw new Error('Please define a valid model.');

            const model = models[config.model] || models.miscale;

            this.config = {
                name: config.name,
                entity: config.entity,
                show: {
                    name: config.name !== false,
                    attributes: config.attributes !== false,
                    buttons: config.buttons !== false,
                },
                buttons: this.deepMerge(buttons, model.buttons, config.buttons),
                attributes: this.deepMerge(attributes, model.attributes, config.attributes),
                styles: {
                    background: config.image ? `background-image: url('${config.image}'); color: white; text-shadow: 0 0 10px black;` : '',
                    icon: `color: ${config.image ? 'white' : 'var(--paper-item-icon-color)'};`,
                    content: `padding: ${config.name !== false ? '8px' : '16px'} 16px ${config.buttons !== false ? '8px' : '16px'};`,
                },
            };
        }

        set hass(hass) {
            if (hass && this.config) {
                this.stateObj = this.config.entity in hass.states ? hass.states[this.config.entity] : null;
            }
            this._hass = hass;
        }

        handleChange(e, key) {
            const mode = e.target.getAttribute('value');
            this.callService(`bodymiscale.set_${key}`, {entity_id: this.stateObj.entity_id, [key]: mode});
        }

        callService(service, data = {entity_id: this.stateObj.entity_id}) {
            const [domain, name] = service.split('.');
            this._hass.callService(domain, name, data);
        }

        fireEvent(type, options = {}) {
            const event = new Event(type, {
                bubbles: options.bubbles || true,
                cancelable: options.cancelable || true,
                composed: options.composed || true,
            });
            event.detail = {entityId: this.stateObj.entity_id};
            this.dispatchEvent(event);
        }

        deepMerge(...sources) {
            const isObject = (obj) => obj && typeof obj === 'object';
            const target = {};

            sources.filter(source => isObject(source)).forEach(source => {
                Object.keys(source).forEach(key => {
                    const targetValue = target[key];
                    const sourceValue = source[key];

                    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                        target[key] = targetValue.concat(sourceValue);
                    } else if (isObject(targetValue) && isObject(sourceValue)) {
                        target[key] = this.deepMerge(Object.assign({}, targetValue), sourceValue);
                    } else {
                        target[key] = sourceValue;
                    }
                });
            });

            return target;
        }
    }

    customElements.define('body-miscale-card', BodyMiscaleCard);
})(window.LitElement || Object.getPrototypeOf(customElements.get("hui-masonry-view") || customElements.get("hui-view")));