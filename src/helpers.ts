/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatTime } from 'custom-card-helpers';

import { body_kg, body_lb } from './const';

/**
 * Format the last measurement timestamp in a compact, locale-aware way
 * (abbreviated month, e.g. "22 oct. 2026 09:53" / "Oct 22, 2026 9:53 AM")
 * so it fits in the narrow columns of the card on mobile (#236).
 * Returns the original value if it can't be parsed.
 */
export function formatMeasurementTime(value: string, locale: any): string {
  const parsedDate = new Date(value.replace(' ', 'T'));
  if (Number.isNaN(parsedDate.getTime())) return value;
  try {
    const date = new Intl.DateTimeFormat(locale?.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(parsedDate);
    return `${date} ${formatTime(parsedDate, locale)}`;
  } catch {
    return value;
  }
}
export function deepMerge(...sources: any[]): Record<string, any> {
  const overrideArrays = ['severity']; // Clés dont les tableaux doivent être écrasés
  const isObject = (obj: any): obj is Record<string, any> =>
    obj && typeof obj === 'object';

  const target: Record<string, any> = {};

  sources
    .filter((source) => isObject(source))
    .forEach((source) => {
      Object.keys(source).forEach((key) => {
        const sourceValue = source[key];

        if (key in target) {
          const targetValue = target[key];

          if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            if (!overrideArrays.includes(key))
              target[key] = targetValue.concat(sourceValue);
          } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = deepMerge({ ...targetValue }, sourceValue);
          }
        } else {
          target[key] = sourceValue;
        }
      });
    });

  return target;
}

export function filterByImpedance<T extends { 
  impedance_required?: boolean;
  dual_impedance_required?: boolean;
}>(
  data: Record<string, T>,
  model: boolean,
  dual_impedance?: boolean,
): T[] {
  return Object.values(data).filter((item) => {
    if (!model) {
      return !item.impedance_required && !item.dual_impedance_required;
    }
    if (!dual_impedance) {
      return item.dual_impedance_required !== true;
    }
    // mode dual
    return item.dual_impedance_required !== false;
  });
}

const sameThresholds = (a: any[], b: any[]): boolean =>
  a.length === b.length &&
  a.every(
    (seg, i) =>
      Number(seg?.from) === Number(b[i]?.from) &&
      Number(seg?.to) === Number(b[i]?.to),
  );

/**
 * Return the severity to use for a body element in the selected unit (#234).
 *
 * The stub config written when the card is added contains the kg thresholds.
 * When the card is then switched to lbs, those kg thresholds would win over the
 * lbs defaults while the value is converted to lbs, so the marker leaves the bar.
 * If the configured thresholds are exactly the defaults of the *other* unit, they
 * are replaced by the defaults of the selected unit (custom colors/labels are kept).
 * Any other custom severity is returned unchanged.
 */
export function resolveBodySeverity(
  key: string,
  severity: any,
  unitLb: boolean | undefined,
): any {
  const target = (unitLb ? body_lb : body_kg)[key]?.severity;
  const other = (unitLb ? body_kg : body_lb)[key]?.severity;

  if (severity === undefined) return target;

  if (
    Array.isArray(severity) &&
    Array.isArray(target) &&
    Array.isArray(other) &&
    !sameThresholds(target, other) &&
    sameThresholds(severity, other)
  ) {
    return target.map((seg, i) => ({
      ...seg,
      color: severity[i]?.color ?? seg.color,
      label: severity[i]?.label ?? seg.label,
    }));
  }

  return severity;
}
