export const useLocalStorage = () => {
    const add = (key: string, value: Object) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const remove = (key: string) => {
        localStorage.removeItem(key);
    }

    const get = (key: string) => {
        const value = localStorage.getItem(key);
        if(!value) return null;

        return JSON.parse(value);
    }

    return { add, remove, get };
}