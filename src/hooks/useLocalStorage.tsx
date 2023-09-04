import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValie: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue == null) {
            if (typeof initialValie === 'function') {
                return (initialValie as () => T)();
            } else {
                return initialValie
            }
        } else {
            return JSON.parse(jsonValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue] as [T, typeof setValue]
}

export default useLocalStorage;