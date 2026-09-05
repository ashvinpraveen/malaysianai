import { test, expect } from '@playwright/test';

// Keep tests deterministic and avoid making requests to event/payment providers.
test.beforeEach(async ({ page }) => {
	await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});

test('public destinations load and the hero uses responsive images', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', error => errors.push(error.message));
	for (const [path, heading] of [
		['/', "Driving Malaysia's"], ['/residency', 'The AI Residency'],
		['/residents', 'Meet the residents'], ['/contact', 'Get in touch'], ['/blog', 'Malaysian AI Blog'],
	]) {
		const response = await page.goto(path);
		expect(response?.status()).toBe(200);
		await expect(page.getByRole('heading', { level: 1 })).toContainText(heading);
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
	}
	await page.goto('/');
	await expect(page.locator('.hero-art')).toHaveAttribute('srcset', /640w.*1024w.*1672w/);
	expect(await page.locator('.hero-art').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
	expect(errors).toEqual([]);
});

test('image dialog contains keyboard focus, closes and survives page navigation', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', error => errors.push(error.message));
	await page.goto('/blog/largest-ai-learnathon/');
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
	await page.locator('.footer-company a').evaluate((link: HTMLElement) => link.focus());
	expect(await page.locator('.footer-company a').evaluate(link => link === document.activeElement)).toBe(false);
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
	expect(errors).toEqual([]);
});

test('community rendering stops offscreen and reduced motion still allows keyboard selection', async ({ page }) => {
	await page.goto('/');
	const stage = page.locator('#community-stage');
	await stage.scrollIntoViewIfNeeded();
	await expect(page.locator('[data-community-card]').first()).toHaveAttribute('style', /translate3d/);
	await page.evaluate(() => {
		const deck = document.querySelector('[data-community-deck]')!;
		deck.setAttribute('data-test-mutations', '0');
		new MutationObserver(records => {
			const count = records.filter(record => record.attributeName === 'style').length;
			if (count) deck.setAttribute('data-test-mutations', String(Number(deck.getAttribute('data-test-mutations')) + count));
		}).observe(deck, { attributes: true, subtree: true, attributeFilter: ['style'] });
	});
	const mutations = () => page.locator('[data-community-deck]').getAttribute('data-test-mutations');
	await expect.poll(mutations).not.toBe('0');
	await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
	await page.waitForTimeout(300);
	const count = await mutations();
	await page.waitForTimeout(300);
	expect(await mutations()).toBe(count);
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await stage.scrollIntoViewIfNeeded();
	await stage.focus();
	await page.keyboard.press('ArrowRight');
	await expect(page.locator('[data-community-name]')).toHaveText('Build with AI');
	await page.waitForTimeout(100);
	const reducedCount = await mutations();
	await page.waitForTimeout(300);
	expect(await mutations()).toBe(reducedCount);
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
		await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
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
	await menu.locator('summary').click();
	await expect(menu).toHaveAttribute('open', '');
	await page.keyboard.press('Escape');
	await expect(menu).not.toHaveAttribute('open', '');
	await menu.locator('summary').click();
	await menu.getByRole('link', { name: 'Stories' }).click();
	await expect(page).toHaveURL(/\/blog\/?$/);
	await expect(menu).not.toHaveAttribute('open', '');
});
