export type Theme = 'light' | 'dark';

const TV_BROWSER = /Tizen|Web0S|SMART-TV|SmartTV|\bTV Safari\b|\(TV;/i;

export function isTvBrowser(userAgent = navigator.userAgent): boolean {
	return TV_BROWSER.test(userAgent);
}

export function systemTheme(userAgent = navigator.userAgent): Theme {
	if (isTvBrowser(userAgent)) return 'dark';
	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
