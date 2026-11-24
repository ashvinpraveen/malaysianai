import { test, expect } from '@playwright/test';

const origin = 'https://www.malaysian.ai';

test.beforeEach(async ({ page }) => {
	await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});

test('Show & Tell page renders editorial content, SEO metadata, structured data, and FAQ accordion', async ({ page, request }) => {
	const errors: string[] = [];
	page.on('pageerror', error => errors.push(error.message));

	const response = await page.goto('/show-and-tell');
	expect(response?.status()).toBe(200);

	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Malaysian AI Show & Tell');
	await expect(page.locator('.lede')).toContainText('Every Thursday in Kuala Lumpur');
	await expect(page.locator('.lede')).toContainText('4-minute live demos');

	const rsvpLink = page.locator('.hero-actions .site-button');
	await expect(rsvpLink).toHaveAttribute('href', 'https://luma.com/malaysianai');
	await expect(page.locator('.hero-actions').getByRole('link', { name: /All community stories/ })).toHaveAttribute('href', '/blog');

	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/show-and-tell`);
	await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /weekly Thursday AI meetup in Kuala Lumpur/i);
	await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `${origin}/show-and-tell`);
	await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\/www\.malaysian\.ai\//);
	await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');

	const structured = await page.locator('script[type="application/ld+json"]').evaluateAll(scripts =>
		scripts.map(script => JSON.parse(script.textContent || '{}')),
	);

	const collectionPage = structured.find(entry => entry['@type'] === 'CollectionPage');
	expect(collectionPage).toBeTruthy();
	expect(collectionPage.url).toBe(`${origin}/show-and-tell`);

	const eventSeries = structured.find(entry => entry['@type'] === 'EventSeries');
	expect(eventSeries).toBeTruthy();
	expect(eventSeries.name).toBe('Malaysian AI Show & Tell');
	expect(eventSeries.isAccessibleForFree).toBe(true);
	expect(eventSeries.eventSchedule?.byDay).toBe('https://schema.org/Thursday');
	expect(eventSeries.location?.address?.addressLocality).toBe('Kuala Lumpur');

	const breadcrumbs = structured.find(entry => entry['@type'] === 'BreadcrumbList');
	expect(breadcrumbs?.itemListElement).toEqual([
		{ '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
		{ '@type': 'ListItem', position: 2, name: 'Show & Tell', item: `${origin}/show-and-tell` },
	]);

	const faqPage = structured.find(entry => entry['@type'] === 'FAQPage');
	expect(faqPage?.mainEntity?.length).toBeGreaterThanOrEqual(6);

	const faq = page.locator('#show-and-tell-faq');
	const firstFaq = faq.locator('details').first();
	await expect(firstFaq).not.toHaveAttribute('open', '');
	await firstFaq.locator('summary').click();
	await expect(firstFaq).toHaveAttribute('open', '');
	await expect(firstFaq.locator('.faq-answer')).toContainText('four minutes');

	const llmsText = await (await request.get('/llms.txt')).text();
	expect(llmsText).toContain(`(${origin}/show-and-tell)`);

	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
	expect(errors).toEqual([]);
});

test('Show & Tell is reachable from the blog and footer and renders cleanly in dark and light themes', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'dark' });
	await page.goto('/blog');
	const blogLink = page.locator('.blog-subnav').getByRole('link', { name: /Show & Tell recaps/i });
	await expect(blogLink).toHaveAttribute('href', '/show-and-tell');
	await blogLink.click();
	await expect(page).toHaveURL(/\/show-and-tell\/?$/);

	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await expect(page.locator('.st-page')).toHaveCSS('background-color', 'rgb(6, 9, 15)');

	await page.getByRole('radio', { name: 'Light' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(page.locator('.st-page')).toHaveCSS('background-color', 'rgb(244, 239, 230)');

	const footerLink = page.locator('.footer-link-group').getByRole('link', { name: 'Show & Tell', exact: true });
	await expect(footerLink).toHaveAttribute('href', '/show-and-tell');
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});
