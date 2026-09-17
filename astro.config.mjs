// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import hosting from './vercel.json' with { type: 'json' };

// Vercel owns HTTP redirects. Generate static fallbacks for the known old URLs too.
const redirects = Object.fromEntries(hosting.redirects
	.filter(rule => !rule.source.includes(':'))
	.map(rule => [rule.source, rule.destination]));

export default defineConfig({
	site: 'https://www.malaysian.ai',
	trailingSlash: 'never',
	redirects,
	integrations: [mdx(), sitemap({ filter: page => {
		const path = new URL(page).pathname.replace(/\/+$/, '');
		return path !== '/404' && !Object.hasOwn(redirects, path);
	} })],
	build: {
		// A few pages, small CSS: inline it and skip the render-blocking requests.
		inlineStylesheets: 'always',
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
	experimental: {
		// Speculation Rules in Chromium: the next page is rendered before the click.
		clientPrerender: true,
	},
	vite: {
		build: {
			cssTarget: 'chrome69',
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-body',
			fallbacks: ['system-ui', 'sans-serif'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/atkinson-regular.woff2'], weight: 400, style: 'normal' },
					{ src: ['./src/assets/fonts/atkinson-bold.woff2'], weight: 700, style: 'normal' },
				],
			},
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Instrument Serif',
			cssVariable: '--font-display',
			weights: [400],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Baskerville', 'Iowan Old Style', 'Times New Roman', 'serif'],
		},
		{
			provider: fontProviders.local(),
			name: 'Mondwest',
			cssVariable: '--font-pixel',
			fallbacks: ['Times New Roman', 'Times', 'serif'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/PPMondwest-Regular.woff2'], weight: 400, style: 'normal' },
				],
			},
		},
	],
});
