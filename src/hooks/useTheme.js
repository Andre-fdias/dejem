import { useState, useEffect } from 'react';

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('dejem_theme');
        return saved || 'dark'; // 'dark' is default as requested
    });

    useEffect(() => {
        if (theme === 'system') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
        localStorage.setItem('dejem_theme', theme);
    }, [theme]);

    return [theme, setTheme];
}
