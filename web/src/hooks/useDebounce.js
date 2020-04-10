import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutReference = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutReference);
    };
  }, [value, delay]);

  return debouncedValue;
}
