import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
	{ ignores: ['dist/**', '.astro/**', 'playwright-report/**', 'test-results/**'] },
	js.configs.recommended,
	...tseslint.configs.recommended,
	...astro.configs.recommended,
	{
		files: ['**/*.{js,mjs,ts,astro}'],
		languageOptions: {
			globals: Object.fromEntries([
				'console', 'process', 'URL', 'Response', 'setTimeout', 'clearTimeout', 'document', 'window',
				'HTMLElement', 'HTMLImageElement', 'HTMLButtonElement', 'HTMLDetailsElement', 'HTMLDialogElement',
				'Element', 'Node', 'KeyboardEvent', 'AbortController', 'IntersectionObserver',
				'performance', 'matchMedia', 'innerWidth', 'innerHeight', 'requestAnimationFrame', 'cancelAnimationFrame',
			].map(name => [name, 'readonly'])),
		},
	},
];
