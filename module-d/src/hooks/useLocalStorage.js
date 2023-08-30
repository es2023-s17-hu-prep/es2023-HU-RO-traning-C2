import {useEffect, useState} from "react";

/**
 * React hook for storing string values in the local storage
 */
export function useLocalStorage(key, defaultValue) {
    const [state, setState] = useState(() => {
        return localStorage.getItem(key) ?? defaultValue
    });

    useEffect(() => {
        localStorage.setItem(key, state)
    }, [key, state]);

    return [state, setState];
}