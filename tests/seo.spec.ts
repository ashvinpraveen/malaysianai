import sharp from 'sharp';
import hosting from '../vercel.json' with { type: 'json' };
import { test, expect } from '@playwright/test';

const origin = 'https://www.malaysian.ai';
const pages = ['/', '/about', '/residency', '/residents', '/contact', '/privacy', '/terms', '/blog', '/blog/largest-ai-learnathon', '/blog/applications-open-2026', '/blog/inside-the-curriculum'];

// Keep expectations independent of the production SEO map and article frontmatter.
const expectedMetadata = [
	{
		path: '/',
		title: 'Malaysian AI | Malaysia AI Community & Events',
		description: 'Malaysian AI connects the Malaysia AI community. Discover AI events, workshops, hackathons and builder groups across Malaysia, plus our Kuala Lumpur residency.',
	},
	{
		path: '/about',
		title: 'About Our Malaysia AI Community | Malaysian AI',
		description: 'Meet Malaysian AI, a Malaysian community for AI builders and curious learners. Find workshops, meetups and founder support in Kuala Lumpur and across Malaysia.',
	},
	{
		path: '/residency',
		title: 'AI Residency Malaysia | Build in Kuala Lumpur | Malaysian AI',
		description: 'Build your AI startup at the Malaysian AI residency in Kuala Lumpur. Find co-working space, regular demos and support with product, engineering and fundraising.',
	},
	{
		path: '/residents',
		title: 'AI Startups Malaysia | Meet the Residents | Malaysian AI',
		description: 'Meet the AI startups, founders and teams building products at Malaysian AI. Explore resident companies in our Kuala Lumpur AI residency.',
	},
	{
		path: '/blog',
		title: 'Malaysia AI Community Stories & Updates | Malaysian AI',
		description: 'Read stories from the Malaysia AI community: AI events, hands-on learning, builder projects and updates from the Malaysian AI residency.',
	},
	{
		path: '/contact',
		title: 'Contact the Malaysia AI Community | Malaysian AI',
		description: 'Contact Malaysian AI about community events, workshops or the Kuala Lumpur residency. Add your Malaysian community to the directory or find an upcoming event.',
	},
	{
		path: '/blog/largest-ai-learnathon',
		title: "We did it: Malaysia's largest AI Learn-a-thon | Malaysian AI",
		description: 'How thousands of Malaysians, hundreds of builders and a floor full of volunteers turned AI Malaysia Takeover 2026 into a national record.',
	},
	{
		path: '/blog/applications-open-2026',
		title: 'Applications open for the 2026 cohort | Malaysian AI',
		description: "We're now accepting applications for the next Malaysian AI Residency cohort.",
	},
	{
		path: '/blog/inside-the-curriculum',
		title: 'Inside the residency curriculum | Malaysian AI',
		description: 'A closer look at the sprint cadence, mentor touchpoints, and deliverables.',
	},
];

test.beforeEach(async ({ page }) => {
	await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});

for (const { path, title, description } of expectedMetadata) {
	test(`SEO title and description match expected content for ${path}`, async ({ page }) => {
		const response = await page.goto(path);
		expect(response?.status()).toBe(200);
		await expect(page).toHaveTitle(title);
		await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
	});
}

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
		const description = await page.locator('meta[name="description"]').getAttribute('content');
		expect(description?.length, path).toBeGreaterThan(20);
		await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description!);
		await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', description!);
		if (path === '/privacy' || path === '/terms') {
			await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);
		} else {
			await expect(page.locator('meta[name="keywords"]')).toHaveAttribute('content', /Malaysian AI/);
		}
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
			expect(graph[2].keywords.join(', ')).toBe(await page.locator('meta[name="keywords"]').getAttribute('content'));
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
	await expect(page).toHaveTitle('Malaysian AI | Malaysia AI Community & Events');
	const keywords = (await page.locator('meta[name="keywords"]').getAttribute('content'))!.split(', ');
	expect(keywords).toEqual(expect.arrayContaining(['Malaysian AI', 'Malaysia AI community', 'Malaysian community', 'AI meetup Kuala Lumpur', 'AI hackathon Malaysia']));
	expect(new Set(keywords).size).toBe(13);
	await page.locator('.footer-company').getByRole('link', { name: 'About', exact: true }).click();
	await expect(page).toHaveURL(/\/about$/);
	await expect(page.locator('h1')).toHaveText('About Malaysian AI');
	await expect(page).toHaveTitle('About Our Malaysia AI Community | Malaysian AI');
	await expect(page.locator('.info-page header p')).toHaveText('A community for people learning, building, and starting companies with AI in Malaysia.');
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/about`);
	await page.getByRole('link', { name: 'Read the story', exact: true }).click();
	await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
	await page.goBack();
	await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
	const response = await page.goto('/this-page-does-not-exist');
	expect(response?.status()).toBe(404);
	await expect(page.locator('h1')).toHaveText('Page not found');
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
	await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);
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

test('site marks paint immediately without waiting for an animation', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.goto('/');
	const icons = await page.locator('link[rel="icon"]').evaluateAll(links => links.map(link => link.getAttribute('href')!));
	expect(icons).toHaveLength(2);
	const brand = await page.locator('.brand-mark img').getAttribute('src');
	expect(brand).toBeTruthy();
	const marks = [...icons, brand!];
	// Decode a fresh image URL to check the first frame, not a warmed animation.
	await page.goto('/robots.txt');
	for (const src of marks) {
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
