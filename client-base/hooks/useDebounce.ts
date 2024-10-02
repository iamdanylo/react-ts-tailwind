import { useState, useEffect } from 'react';
import { isEqual } from 'lodash';

export function useDebounce<T>(value: T, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (typeof value === 'object') {
        if (!isEqual(value, debouncedValue)) {
          setDebouncedValue(value);
        }
      } else {
        if (value !== debouncedValue) {
          setDebouncedValue(value);
        }
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);

  return debouncedValue;
}
