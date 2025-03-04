import localize from './localize';
import { BodymiscaleCardConfig } from './types';
import { states, attributes_kg, attributes_lb, body_kg, body_lb, buttons, models } from './const';
import { deepMerge } from './helpers';

function buildStyles(config: Partial<BodymiscaleCardConfig>) {
  const { image, theme, show_toolbar, name, buttons } = config;

  return {
    background: image
      ? `
          background-image: url('${image}');
          color: white;
          text-shadow: 0 0 10px black;
          min-height: 220px;
          border-radius: var(--ha-card-border-radius, 12px);
          ${show_toolbar === false ? 'border-radius: var(--ha-card-border-radius, 12px);' : 'border-radius: 0;'}
          overflow: hidden;
        `
      : '',
    icon: `color: ${image ? 'white' : 'var(--paper-item-icon-color)'};`,
    iconbody: `background-color: ${theme !== false ? 'var(--paper-item-icon-color)' : 'white'};`,
    content: `padding: ${name !== false ? '8px' : '16px'} ${buttons !== false ? '8px' : '16px'};`,
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

  const model = config.model ? models.with_impedance : models.no_impedance;

  // Fusionner les données et préparer les valeurs par défaut
  return {
    name: config.name ?? '',
    entity: config.entity ?? '',
    image: config.image ?? undefined,
    model: config.model ?? undefined,
    unit: config.unit ?? undefined,
    theme: config.theme ?? undefined,
    show_name: config.show_name ?? undefined,
    show_states: config.show_states ?? undefined,
    show_attributes: config.show_attributes ?? undefined,
    show_always_details: config.show_always_details ?? undefined,
    show_toolbar: config.show_toolbar ?? undefined,
    show_body: config.show_body ?? undefined,
    show_buttons: config.show_buttons ?? undefined,
    states: deepMerge(states, model.states, config.states),
    attributes: config.unit
      ? deepMerge(attributes_lb, model.attributes_lb, config.attributes)
      : deepMerge(attributes_kg, model.attributes_kg, config.attributes),
    body: config.unit
      ? deepMerge(body_lb, model.body_lb, config.body)
      : deepMerge(body_kg, model.body_kg, config.body),
    buttons: config.buttons === true ? {} : deepMerge(buttons, model.buttons, config.buttons),
    direction: 'right',
    styles: buildStyles(config),
    open: config.open ?? false,
    height: config.height ?? 'auto',
    width: config.width ?? '100%',
    stats: config.stats ?? {},
    type: config.type ?? 'custom:body-miscale-card',
    min: config.min ?? 0,
    max: config.max ?? 100,
    color: config.color ?? 'var(--primary-color)',
    columns: config.columns ?? '1',
  };
}
