import localize from './localize';
import { BodymiscaleCardConfig } from './types';
import {
  states,
  attributes_kg,
  attributes_lb,
  body_kg,
  body_lb,
  buttons,
} from './const';
import { deepMerge } from './helpers';

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
    icon: `color: ${image ? 'white' : 'var(--paper-item-icon-color)'};`,
    iconbody: `background-color: ${theme !== false ? 'var(--paper-item-icon-color)' : 'white'};`,
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
    entity: config.entity ?? '',
    image: config.image ?? '',
    icons_body: config.icons_body ?? '',
    model: config.model ?? false,
    impedance_required: config.impedance_required ?? false,
    unit: config.unit ?? false,
    theme: config.theme ?? true,
    show_name: config.show_name ?? true,
    show_states: config.show_states ?? true,
    show_attributes: config.show_attributes ?? true,
    show_always_details: config.show_always_details ?? false,
    show_toolbar: config.show_toolbar ?? true,
    show_body: config.show_body ?? true,
    show_buttons: config.show_buttons ?? false,
    states: deepMerge(states, config.states),
    attributes: config.unit
      ? deepMerge(attributes_lb, config.attributes)
      : deepMerge(attributes_kg, config.attributes),
    body: config.unit
      ? deepMerge(body_lb, config.body)
      : deepMerge(body_kg, config.body),
    buttons: config.buttons === true ? {} : deepMerge(buttons, config.buttons),
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
    showabovelabels: config.showabovelabels ?? undefined,
    showbelowlabels: config.showbelowlabels ?? undefined,
    severity: config.severity ?? null,
  };
}
