import {
  states,
  attributes_kg,
  attributes_lb,
  body_kg,
  body_lb,
  buttons,
} from './const';
import { deepMerge } from './helpers';
import localize from './localize';
import { BodymiscaleCardConfig } from './types';

function buildStyles(config: Partial<BodymiscaleCardConfig>) {
  const { image, theme, show_toolbar, show_body } = config;

  return {
    background: image
      ? `
          background-image: url('${image}');
          color: white;
          text-shadow: 0 0 10px black;
          min-height: 220px;
          ${
            show_toolbar
              ? 'border-radius: 0;'
              : show_body
                ? 'border-radius: 0;'
                : 'border-radius: var(--ha-card-border-radius, 12px);'
          }
          overflow: hidden;
        `
      : '',
    icon: `color: ${image ? 'white' : 'var(--state-icon-color)'};`,
    iconbody: `background-color: ${theme !== false ? 'var(--state-icon-color)' : 'white'};`,
  };
}

export default function buildConfig(
  config?: Partial<BodymiscaleCardConfig>,
): BodymiscaleCardConfig {
  if (!config) {
    throw new Error(localize('error.invalid_config'));
  }

  if (!config.entity) {
    throw new Error(localize('error.missing_entity'));
  }

  if (config.entity.split('.')[0] !== 'bodymiscale') {
    throw new Error(localize('error.missing_entity_bodymiscale'));
  }

  // Fusionner les données et préparer les valeurs par défaut
  return {
    ...config,
    type: config.type ?? 'custom:body-miscale-card',
    entity: config.entity ?? '',
    image: config.image ?? '',
    icons_body: config.icons_body ?? '',
    model: config.model ?? false,
    dual_impedance: config.dual_impedance ?? false,
    unit: config.unit ?? false,
    theme: config.theme ?? true,
    show_name: config.show_name ?? true,
    show_states: config.show_states ?? true,
    show_attributes: config.show_attributes ?? true,
    show_always_details: config.show_always_details ?? false,
    show_toolbar: config.show_toolbar ?? true,
    show_body: config.show_body ?? true,
    show_buttons: config.show_buttons ?? false,
    states: deepMerge(config.states ?? {}, states),
    attributes: config.unit
      ? deepMerge(config.attributes ?? {}, attributes_lb)
      : deepMerge(config.attributes ?? {}, attributes_kg),
    body: config.unit
      ? deepMerge(config.body ?? {}, body_lb)
      : deepMerge(config.body ?? {}, body_kg),
    buttons: config.buttons === true ? {} : deepMerge(config.buttons ?? {}, buttons),
    styles: buildStyles(config),
    open: config.open ?? false,
    stats: config.stats ?? {},
    color: config.color ?? undefined,
    positions: config.positions ?? {
      icon: 'left',
      name: 'left',
      minmax: 'off',
      value: 'right',
    },
  };
}
