export function groupBy<T extends Record<string, any>>(
  array: T[],
  key: keyof T,
  transformKeyValue?: (value: string) => any,
): { [key: string]: T[] } {
  if (!array || array?.length === 0 || !key) return {};
  return array.reduce(
    (result, currentValue) => {
      let groupKey = currentValue[key];
      if (transformKeyValue) {
        groupKey = transformKeyValue(currentValue[key]);
      }

      if (!result[groupKey]) {
        result[groupKey] = [];
      }

      result[groupKey].push(currentValue);
      return result;
    },
    {} as { [key: string]: T[] },
  );
}
