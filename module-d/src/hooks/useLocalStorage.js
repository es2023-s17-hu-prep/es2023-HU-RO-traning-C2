import { useEffect, useState } from "react";

/**
 * Hook to access the local storage easily
 */
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item === null ? defaultValue : JSON.parse(item);
  });

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [key, value]
  );

  return [value, setValue];
}
