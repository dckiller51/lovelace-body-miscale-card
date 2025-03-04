export function deepMerge(...sources: any[]): Record<string, any> {
  const isObject = (obj: any): obj is Record<string, any> => obj && typeof obj === 'object';
  const target: Record<string, any> = {};

  sources.filter((source) => isObject(source)).forEach((source) => {
    Object.keys(source).forEach((key) => {
      const targetValue = target[key];
      const sourceValue = source[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
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
