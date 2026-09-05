import sharp from 'sharp';
import hosting from '../vercel.json' with { type: 'json' };
import { test, expect } from '@playwright/test';

const origin = 'https://www.malaysian.ai';
const pages = ['/', '/about', '/residency', '/residents', '/contact', '/privacy', '/terms', '/blog', '/blog/largest-ai-learnathon', '/blog/applications-open-2026', '/blog/inside-the-curriculum'];

test.beforeEach(async ({ page }) => {
	await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});

test('public pages have consistent production metadata and valid share images', async ({ page, request }) => {
	const titles = new Set<string>();
	for (const path of pages) {
		const response = await page.goto(path);
		expect(response?.status(), path).toBe(200);
		const canonical = origin + path;
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
		await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
		const title = await page.title();
		expect(title).toContain('Malaysian AI');
		expect(title).not.toBe('Malaysian AI');
		expect(titles.has(title)).toBe(false);
		titles.add(title);
		await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
		await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
		await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
		const image = await page.locator('meta[property="og:image"]').getAttribute('content');
		expect(image).toMatch(/^https:\/\/www\.malaysian\.ai\//);
		expect(image).not.toContain('logo-ai-residency.png');
		await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', image!);
		const imageResponse = await request.get(new URL(image!).pathname);
		expect(imageResponse.status()).toBe(200);
		const actualImage = await sharp(await imageResponse.body()).metadata();
		const dimensions = await page.locator('head').evaluate(head => ['width', 'height'].map(key => Number(head.querySelector(`meta[property="og:image:${key}"]`)?.getAttribute('content'))));
		expect(dimensions).toEqual([actualImage.width, actualImage.height]);
		const graph = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)['@graph'];
		expect(graph.map((item: { '@type': string }) => item['@type'])).toEqual(path.startsWith('/blog/') ? ['Organization', 'WebSite', 'BlogPosting'] : ['Organization', 'WebSite']);
		if (path.startsWith('/blog/')) {
			await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
			expect(graph[2].headline).toBe(await page.locator('h1').textContent());
			expect(graph[2].url).toBe(canonical);
			expect(graph[2].image).toBe(image);
			await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute('content', graph[2].datePublished);
		}
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path).toBe(true);
	}
});

test('crawl documents list live canonical URLs and exclude retired pages', async ({ request }) => {
	const robots = await request.get('/robots.txt');
	expect(robots.status()).toBe(200);
	expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap-index.xml`);
	const index = await request.get('/sitemap-index.xml');
	const sitemapPaths = [...(await index.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]));
	const urls: string[] = [];
	for (const url of sitemapPaths) {
		expect(url.origin).toBe(origin);
		const sitemap = await request.get(url.pathname);
		urls.push(...[...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).href));
	}
	expect(urls.sort()).toEqual(pages.map(path => origin + path).sort());
	const llms = await request.get('/llms.txt');
	expect(llms.status()).toBe(200);
	const listed = [...(await llms.text()).matchAll(/\]\((https:[^)]+)\)/g)].map(match => new URL(match[1]));
	for (const url of listed) {
		expect(url.origin).toBe(origin);
		expect((await request.get(url.pathname)).status(), url.href).toBe(200);
	}
	expect(listed.some(url => url.pathname === '/about')).toBe(true);
	expect(listed.some(url => url.pathname === '/residency/apply')).toBe(false);
	const rss = await request.get('/rss.xml');
	const feed = await rss.text();
	expect(feed).toContain(`${origin}/blog/largest-ai-learnathon`);
	expect(feed).not.toMatch(/https:\/\/www\.malaysian\.ai\/blog\/[^<]+\/<\/link>/);
});

test('About navigation updates metadata and unknown URLs show the custom 404', async ({ page }) => {
	await page.goto('/');
	await page.locator('.footer-company').getByRole('link', { name: 'About', exact: true }).click();
	await expect(page).toHaveURL(/\/about$/);
	await expect(page.locator('h1')).toHaveText('About Malaysian AI');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/about`);
	await page.getByRole('link', { name: 'Read the story', exact: true }).click();
	await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
	await page.goBack();
	await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
	const response = await page.goto('/this-page-does-not-exist');
	expect(response?.status()).toBe(404);
	await expect(page.locator('h1')).toHaveText('Page not found');
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
	await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
	await page.getByRole('link', { name: 'Go to the homepage' }).click();
	await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/`);
});


test('known retired routes retain redirect fallbacks and AIMTO has a host wildcard', async ({ request }) => {
	for (const rule of hosting.redirects.filter(rule => !rule.source.includes(':'))) {
		const response = await request.get(rule.source);
		const html = await response.text();
		expect(html).toContain(`url=${rule.destination}`);
		expect(html).toContain('name="robots" content="noindex"');
		expect(rule.statusCode).toBe(301);
		if (rule.destination.startsWith('/')) {
			expect((await request.get(rule.destination.split('#')[0])).status()).toBe(200);
		}
	}
	// Arbitrary subpaths and slash normalization run on Vercel, not Astro preview.
	expect(hosting.redirects).toContainEqual({ source: '/aimto/:path*', destination: 'https://aimto.my/', statusCode: 301 });
	expect(hosting.trailingSlash).toBe(false);
});

test('favicons paint immediately without waiting for an animation', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.goto('/');
	const icons = await page.locator('link[rel="icon"]').evaluateAll(links => links.map(link => link.getAttribute('href')!));
	expect(icons).toHaveLength(2);
	// Decode a fresh image URL to check the first frame, not a warmed animation.
	await page.goto('/robots.txt');
	for (const src of icons) {
		const visiblePixels = await page.evaluate(async src => {
			const image = document.createElement('img');
			const url = new URL(src, window.location.href);
			url.searchParams.set('render-check', 'first-frame');
			image.src = url.href;
			await image.decode();
			const canvas = document.createElement('canvas');
			canvas.width = canvas.height = 32;
			const context = canvas.getContext('2d')!;
			context.drawImage(image, 0, 0, 32, 32);
			const rgba = context.getImageData(0, 0, 32, 32).data;
			return Array.from(rgba).filter((value, index) => index % 4 === 3 && value > 32).length;
		}, src);
		expect(visiblePixels, `${src} must be visible on its first frame`).toBeGreaterThan(500);
	}
});
