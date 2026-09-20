import { test, expect } from '@playwright/test';

// Keep tests deterministic and avoid making requests to event/payment providers.
test.beforeEach(async ({ page }) => {
	await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});

test('public destinations load and the hero uses responsive images', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', error => errors.push(error.message));
	for (const [path, heading] of [
		['/', 'Learn, build and'], ['/residency', 'Join the Malaysian.ai residency'],
		['/residents', 'Meet the residents'], ['/contact', 'Get in touch'], ['/brand', 'Brand'], ['/blog', 'Malaysian AI Blog'],
	]) {
		const response = await page.goto(path);
		expect(response?.status()).toBe(200);
		await expect(page.getByRole('heading', { level: 1 })).toContainText(heading);
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
	}
	await page.goto('/');
	const heroImages = page.locator('.hero-art');
	await expect(heroImages).toHaveCount(1);
	const heroSources = await heroImages.evaluateAll((images: HTMLImageElement[]) =>
		images.map(image => ({ loaded: image.complete && image.naturalWidth > 0, srcset: image.srcset })),
	);
	for (const image of heroSources) {
		expect(image.srcset).toMatch(/640w.*1024w.*1672w/);
		expect(image.loaded).toBe(true);
	}
	expect(errors).toEqual([]);
});

test('hero fetches one theme and keeps artwork visible during a delayed theme switch', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'dark' });
	const heroRequests: string[] = [];
	page.on('request', request => {
		if (request.url().includes('/_astro/hero-fibonacci')) heroRequests.push(request.url());
	});
	await page.goto('/');
	const hero = page.locator('.hero-media > .hero-art');
	await expect(hero).toHaveClass(/hero-art-night/);
	expect(heroRequests).toHaveLength(1);
	expect(heroRequests[0]).not.toContain('hero-fibonacci-day');

	let releaseImage!: () => void;
	const imageGate = new Promise<void>(resolve => { releaseImage = resolve; });
	await page.route('**/_astro/hero-fibonacci-day*', async route => {
		await imageGate;
		await route.continue();
	});
	await page.getByRole('radio', { name: 'Light' }).click();
	await expect.poll(() => heroRequests.length).toBe(2);
	await expect(hero).toHaveClass(/hero-art-night/);
	expect(await hero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
	releaseImage();
	await expect(hero).toHaveClass(/hero-art-day/);

	// A stored override must win over the OS without requesting the OS artwork.
	heroRequests.length = 0;
	await page.reload();
	await expect(hero).toHaveClass(/hero-art-day/);
	expect(heroRequests).toHaveLength(1);
	expect(heroRequests[0]).toContain('hero-fibonacci-day');
	await page.locator('.footer-company').getByRole('link', { name: 'About', exact: true }).click();
	await page.locator('.footer-brand').click();
	await expect(hero).toHaveClass(/hero-art-day/);
	await page.getByRole('radio', { name: 'Dark' }).click();
	await expect(hero).toHaveClass(/hero-art-night/);
});

test('event background preloading starts near the section', async ({ page }) => {
	const images: string[] = [];
	page.on('request', request => { if (request.resourceType() === 'image') images.push(request.url()); });
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.goto('/');
	const second = page.locator('[data-event-card]').nth(1);
	const sources = (await second.getAttribute('data-srcset'))!.split(',').map(source => source.trim().split(' ')[0]);
	expect(images.some(url => sources.some(src => url.endsWith(src)))).toBe(false);
	await page.locator('#events').scrollIntoViewIfNeeded();
	await expect.poll(() => images.some(url => sources.some(src => url.endsWith(src)))).toBe(true);
	await second.click();
	await expect.poll(() => page.locator('[data-events-background].is-visible').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0 && image.currentSrc.includes('aimto-learnathon'))).toBe(true);
});

test('homepage copy points people at communities and the add-community contact flow', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Learn, build and');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('experience Malaysian AI.');
	await expect(page.locator('.hero-card .intro')).toContainText("Discover Malaysia's AI communities and events.");
	await expect(page.locator('.hero-card').getByRole('link', { name: 'Join residency' })).toHaveAttribute('href', '/residency');
	await page.locator('#communities').scrollIntoViewIfNeeded();
	await expect(page.getByRole('heading', { level: 2, name: /Malaysia's AI/ })).toBeVisible();
	await page.getByRole('link', { name: 'Add your community' }).click();
	await expect(page).toHaveURL(/subject=/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Add your community');
	await expect(page.locator('#contact-whatsapp')).toHaveAttribute('href', /add%20my%20community/i);
});

test('image dialog contains keyboard focus, closes and survives page navigation', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', error => errors.push(error.message));
	await page.goto('/blog/largest-ai-learnathon');
	const cover = page.getByRole('button', { name: 'View cover image full screen' });
	const dialog = page.getByRole('dialog');
	const close = page.getByRole('button', { name: 'Close full-screen image' });
	await cover.focus();
	await page.keyboard.press('Enter');
	await expect(dialog).toBeVisible();
	await expect(close).toBeFocused();
	for (const key of ['Tab', 'Shift+Tab', 'Tab']) {
		await page.keyboard.press(key);
		// Native dialog may focus the document boundary; background controls must remain unreachable.
		expect(await page.evaluate(() => document.activeElement === document.body || !!document.activeElement?.closest('dialog'))).toBe(true);
	}
	await page.locator('.footer-company').getByRole('link', { name: 'Contact', exact: true }).evaluate((link: HTMLElement) => link.focus());
	expect(await page.locator('.footer-company').getByRole('link', { name: 'Contact', exact: true }).evaluate(link => link === document.activeElement)).toBe(false);
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
	await expect(cover).toBeFocused();
	await expect(page.locator('body')).not.toHaveClass(/has-image-viewer/);
	await cover.click();
	await close.click();
	await expect(cover).toBeFocused();
	await page.getByRole('link', { name: 'Back to all stories' }).click();
	await expect(page).toHaveURL(/\/blog\/?$/);
	await page.locator('.lead-image').click();
	await cover.click();
	await expect(dialog).toBeVisible();
	await page.keyboard.press('Escape');
	const bodyImage = page.locator('.story-body img').first();
	await expect(bodyImage).toHaveAttribute('srcset', /400w.*640w.*960w/);
	await bodyImage.click();
	await expect(page.locator('.image-viewer-image')).toHaveAttribute('src', '/images/blog/largest-ai-learnathon/record-certificate.webp');
	await page.keyboard.press('Escape');
	expect(errors).toEqual([]);
});

const communityNames = [
	'Build Club',
	'Build with AI',
	'AI Tinkerers',
	'AI Hackerdorm',
	'AI SEA',
	'KrackedDevs',
	'Rakan Tutor',
	'CoderPuffs',
	'Cursor KL',
];

test('community filmstrip advances every 6s, accepts side-card clicks, and reduced motion still allows keyboard selection', async ({
	page,
	isMobile,
}) => {
	test.skip(isMobile, 'Filmstrip is desktop-only');
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.goto('/');
	const stage = page.locator('#community-stage');
	const focusName = page.locator('[data-community-name]');
	await stage.scrollIntoViewIfNeeded();
	await expect(page.locator('[data-community-card]').first()).toHaveAttribute('style', /translate3d/);

	// Keep the pointer off the stage so hover does not pause autoplay.
	await page.mouse.move(8, 8);
	const initialName = await focusName.innerText();
	await expect.poll(async () => focusName.innerText(), { timeout: 7500 }).not.toBe(initialName);
	const afterFirst = await focusName.innerText();
	await page.waitForTimeout(2500);
	expect(await focusName.innerText()).toBe(afterFirst);

	const sideCard = page.locator('[data-community-card][aria-current="false"]').nth(1);
	const sideName = await sideCard.getAttribute('data-name');
	expect(sideName).toBeTruthy();
	const box = await sideCard.boundingBox();
	expect(box).not.toBeNull();
	// Click near the card's outer edge so the scaled center card does not steal the hit.
	await page.mouse.click(box!.x + Math.min(12, box!.width / 5), box!.y + box!.height / 2);
	await expect(focusName).toHaveText(sideName!);

	await page.evaluate(() => {
		const deck = document.querySelector('[data-community-deck]')!;
		deck.setAttribute('data-test-mutations', '0');
		new MutationObserver(records => {
			const count = records.filter(record => record.attributeName === 'style').length;
			if (count) deck.setAttribute('data-test-mutations', String(Number(deck.getAttribute('data-test-mutations')) + count));
		}).observe(deck, { attributes: true, subtree: true, attributeFilter: ['style'] });
	});
	const mutations = () => page.locator('[data-community-deck]').getAttribute('data-test-mutations');
	await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
	await page.waitForTimeout(300);
	const count = await mutations();
	await page.waitForTimeout(300);
	expect(await mutations()).toBe(count);

	await page.emulateMedia({ reducedMotion: 'reduce' });
	await stage.scrollIntoViewIfNeeded();
	await stage.focus();
	await page.keyboard.press('ArrowRight');
	await expect(focusName).not.toHaveText(sideName!);
	await page.waitForTimeout(100);
	const reducedCount = await mutations();
	await page.waitForTimeout(300);
	expect(await mutations()).toBe(reducedCount);
});

test('community directory lists every partner without overflowing', async ({ page, isMobile }) => {
	await page.goto('/');
	const section = page.locator('#communities');
	await section.scrollIntoViewIfNeeded();
	if (isMobile) {
		for (const name of communityNames) {
			await expect(section.getByRole('heading', { name, exact: true })).toBeVisible();
		}
	} else {
		for (const name of communityNames) {
			await expect(section.getByRole('button', { name: new RegExp(`Focus ${name}`) })).toBeAttached();
		}
	}
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});

test('event autoplay advances over the background and resumes after card interaction', async ({ page, isMobile }) => {
	await page.emulateMedia({ reducedMotion: 'no-preference' });
	await page.goto('/');
	const section = page.locator('#events');
	await section.scrollIntoViewIfNeeded();
	const box = await section.boundingBox();
	expect(box).not.toBeNull();
	await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
	const title = page.locator('[data-event-title]');
	await expect(title).toHaveText('AIMTO Learnathon', { timeout: 6500 });
	const thirdCard = page.locator('[data-event-card]').nth(2);
	if (isMobile) {
		await thirdCard.tap();
		await expect(title).toHaveText('Anthropic × Cursor Hackathon Malaysia');
		await expect(title).toHaveText('Workshops', { timeout: 6500 });
	} else {
		await thirdCard.hover();
		const pausedTitle = await title.textContent();
		await page.waitForTimeout(4300);
		await expect(title).toHaveText(pausedTitle!);
		// Hovering a transformed card can scroll it into view. The earlier
		// section coordinates may now hit another card, keeping autoplay paused.
		await page.mouse.move(8, 8);
		await expect(page.locator('[data-event-card]:hover')).toHaveCount(0);
		await expect(title).not.toHaveText(pausedTitle!, { timeout: 6500 });
		await thirdCard.focus();
		const focusedTitle = await title.textContent();
		await page.waitForTimeout(4300);
		await expect(title).toHaveText(focusedTitle!);
		await page.getByRole('link', { name: 'See the event calendar' }).focus();
		await expect(title).not.toHaveText(focusedTitle!, { timeout: 6500 });
	}
});

test('reduced motion disables event and testimonial autoplay', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	await page.locator('#events').scrollIntoViewIfNeeded();
	const title = page.locator('[data-event-title]');
	await expect(title).toHaveText('Show & Tell with the Supabase CEO');
	await page.waitForTimeout(4300);
	await expect(title).toHaveText('Show & Tell with the Supabase CEO');
	await page.locator('[data-event-card]').nth(1).click();
	await expect(title).toHaveText('AIMTO Learnathon');
	const deck = page.locator('[data-voices-deck]');
	await deck.scrollIntoViewIfNeeded();
	const front = page.locator('[data-voice-card][data-pos="0"]');
	await expect(front).toContainText('Workshop attendee');
	await page.mouse.move(0, 0);
	await page.waitForTimeout(5600);
	await expect(front).toContainText('Workshop attendee');
	await deck.focus();
	await page.keyboard.press('Enter');
	await expect(front).toContainText('Community member');
});

test('mobile navigation closes on Escape and after selecting a destination', async ({ page, isMobile }) => {
	test.skip(!isMobile, 'Mobile menu only');
	await page.goto('/');
	const menu = page.locator('.mobile-navigation');
	const dialog = menu.getByRole('dialog', { name: 'Menu' });
	const toggle = menu.getByRole('button', { name: 'Open menu' });
	const brand = page.locator('.hero-header .brand-mark');
	const toggleBox = await toggle.boundingBox();
	const brandBox = await brand.boundingBox();
	expect(toggleBox).not.toBeNull();
	expect(brandBox).not.toBeNull();
	expect(toggleBox!.x).toBeLessThan(brandBox!.x);
	await expect(page.locator('.nav-cta')).toHaveText('View events');
	await toggle.click();
	await expect(dialog).toBeVisible();
	await expect(dialog.getByRole('link', { name: 'View events' })).toBeVisible();
	await expect(dialog.getByRole('link', { name: 'Join residency' })).toHaveAttribute('href', 'https://platform.malaysian.ai');
	await page.keyboard.press('Escape');
	await expect(dialog).not.toBeVisible();
	await toggle.click();
	await dialog.getByRole('link', { name: 'Stories' }).click();
	await expect(page).toHaveURL(/\/blog\/?$/);
	await expect(dialog).not.toBeVisible();
});

test('homepage brand mark is visible on mobile', async ({ page, isMobile }) => {
	test.skip(!isMobile, 'Mobile logo layout only');
	await page.goto('/');
	const mark = page.locator('.hero-header .brand-mark img');
	await expect(mark).toBeVisible();
	expect(await mark.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
	const box = await mark.boundingBox();
	expect(box?.width).toBeGreaterThan(24);
	expect(box?.height).toBeGreaterThan(24);
});

test('brand page lists logos with descriptive alt text and footer links GitHub', async ({ page }) => {
	await page.goto('/brand');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Brand');
	await expect(page.getByRole('heading', { level: 2, name: 'Logos' })).toBeVisible();
	await expect(page.getByRole('heading', { level: 2, name: 'Colours' })).toBeVisible();
	await expect(page.getByRole('heading', { level: 2, name: 'Typography' })).toBeVisible();
	const logo = page.getByRole('img', { name: /Malaysian AI square logo mark/i });
	await expect(logo).toBeVisible();
	await expect(page.getByRole('link', { name: /PNG 512/i }).first()).toHaveAttribute('href', /\/brand\/malaysian-ai-mark-512\.png$/);
	await expect(page.getByRole('link', { name: /SVG/i }).first()).toHaveAttribute('href', /\.svg$/);
	const github = page.locator('.footer-company').getByRole('link', { name: 'GitHub', exact: true });
	await expect(github).toHaveAttribute('href', 'https://github.com/ashvinpraveen/malaysianai');
	await expect(page.locator('.footer-company')).toContainText('Open source');
});

test('theme toggle follows the system scheme and can lock light or dark', async ({ page }) => {
	await page.emulateMedia({ colorScheme: 'dark' });
	await page.goto('/');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'system');
	await expect(page.locator('.hero-card')).toHaveCSS('background-color', 'rgb(6, 9, 15)');
	await expect(page.locator('.hero-card h1')).toHaveCSS('color', 'rgb(255, 253, 246)');
	await expect(page.locator('.hero-header .brand-panel')).toHaveCSS('background-color', 'rgb(6, 9, 15)');
	await expect(page.getByRole('radio', { name: 'System' })).toHaveAttribute('aria-checked', 'true');
	await expect(page.locator('.hero-cta-panel').getByRole('radio')).toHaveCount(0);
	await page.getByRole('radio', { name: 'Light' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(239, 232, 216)');
	await expect(page.locator('.hero-card')).toHaveCSS('background-color', 'rgb(244, 239, 230)');
	await expect(page.locator('.hero-card h1')).toHaveCSS('color', 'rgb(16, 43, 42)');
	await expect(page.locator('.hero-header .brand-panel')).toHaveCSS('background-color', 'rgb(244, 239, 230)');
	expect(await page.evaluate(() => localStorage.getItem('malaysianai-theme'))).toBe('light');
	await page.locator('.footer-company').getByRole('link', { name: 'About', exact: true }).click();
	await expect(page).toHaveURL(/\/about\/?$/);
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(243, 240, 234)');
	await page.getByRole('radio', { name: 'Dark' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await page.getByRole('radio', { name: 'System' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'system');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('Tizen follows the system scheme and can lock dark cutouts', async ({ browser }) => {
	const context = await browser.newContext({
		...test.info().project.use,
		colorScheme: 'light',
		userAgent: 'Mozilla/5.0 (SMART-TV; LINUX; Tizen 5.5) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/5.4 Chrome/69.0.3497.106 TV Safari/537.36',
	});
	const page = await context.newPage();
	await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
	await page.goto('/');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(page.locator('.hero-card')).toHaveCSS('background-color', 'rgb(244, 239, 230)');
	await expect(page.locator('.hero-card h1')).toHaveCSS('color', 'rgb(16, 43, 42)');
	await page.getByRole('radio', { name: 'Dark' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await expect(page.locator('.hero-card')).toHaveCSS('background-color', 'rgb(6, 9, 15)');
	await expect(page.locator('.hero-card h1')).toHaveCSS('color', 'rgb(255, 253, 246)');
	await context.close();
});

test('residency announcement banner opens the residency page and can be dismissed', async ({ page }) => {
	await page.goto('/');
	const banner = page.getByRole('region', { name: 'Announcement' });
	await expect(banner).toBeVisible();
	await expect(banner).toContainText('Applications for the 1st Oct residency now open.');
	await expect(banner.getByRole('link', { name: /learn more/i })).toHaveAttribute('href', '/residency');

	await banner.click({ position: { x: 24, y: 12 } });
	await expect(page).toHaveURL(/\/residency\/?$/);
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Join the Malaysian.ai residency');
	await expect(banner).toBeVisible();

	await banner.getByRole('button', { name: 'Dismiss announcement' }).click();
	await expect(banner).toBeHidden();
	await expect(page).toHaveURL(/\/residency\/?$/);
	expect(await page.evaluate(() => localStorage.getItem('malaysianai-announcement'))).toBe('residency-oct-2026');

	await page.goto('/');
	await expect(banner).toBeHidden();
	await page.locator('.footer-company').getByRole('link', { name: 'About', exact: true }).click();
	await expect(page).toHaveURL(/\/about\/?$/);
	await expect(banner).toBeHidden();
});
