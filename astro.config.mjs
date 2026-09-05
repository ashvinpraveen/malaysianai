// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
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
});
