import {useEffect, useState} from "react";

/**
 * React hook for storing values in the local storage
 * @param key
 * @param defaultValue
 * @returns {(string|*|((value: (((prevState: (string|*)) => (string|*)) | string | *)) => void))[]}
 */
export function useLocalStorage(key, defaultValue) {
    const [state, setState] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? item : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, state)
    }, [key, state]);

    return [state, setState];
}