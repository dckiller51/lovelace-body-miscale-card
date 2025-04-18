/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepMerge(...sources: any[]): Record<string, any> {
  const overrideArrays = ['severity']; // Clés dont les tableaux doivent être écrasés
  const isObject = (obj: any): obj is Record<string, any> =>
    obj && typeof obj === 'object';

  const target: Record<string, any> = {};

  sources
    .filter((source) => isObject(source))
    .forEach((source) => {
      Object.keys(source).forEach((key) => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (
          Array.isArray(targetValue) &&
          Array.isArray(sourceValue) &&
          overrideArrays.includes(key)
        ) {
          // Remplacer le tableau 'severity' (plutôt que de concaténer)
          target[key] = [...sourceValue];
        } else if (Array.isArray(targetValue) && Array.isArray(sourceValue) && !overrideArrays.includes(key)) {
          // Concaténer d'autres tableaux (si ce n'est pas 'severity')
          target[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
          target[key] = deepMerge({ ...targetValue }, sourceValue);
        } else {
          target[key] = sourceValue;
        }
      });
    });

  return target;
}

export function filterByImpedance<T extends { impedance_required?: boolean }>(
  data: Record<string, T>,
  model: boolean,
): T[] {
  return Object.values(data).filter(
    (item) => model || !item.impedance_required,
  );
}
