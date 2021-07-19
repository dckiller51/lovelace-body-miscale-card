export function deepMerge(...sources: any): any {
    const isObject = (obj: any) => obj && typeof obj === 'object';
    const target = {};

    sources.filter((source: any) => isObject(source)).forEach((source: any) => {
      Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
          target[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
          target[key] = deepMerge(Object.assign({}, targetValue), sourceValue);
        } else {
          target[key] = sourceValue;
        }
      });
    });

    return target;
  }