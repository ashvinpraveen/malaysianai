export type Theme = 'light' | 'dark';

export function systemTheme(): Theme {
	if (typeof window.matchMedia !== 'function') return 'dark';
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
	if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
	return 'dark';
}
