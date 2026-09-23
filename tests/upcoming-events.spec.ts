import { test, expect } from '@playwright/test';
import { parseUpcomingEvents, nextEvents } from '../src/lib/upcoming-events';

const start = Date.now() + 86_400_000;
const entries = Array.from({ length: 5 }, (_, index) => ({ event: {
	api_id: `event-${index}`, name: `Community event ${index + 1}`, url: `event-${index}`,
	visibility: 'public', start_at: new Date(start + index * 86_400_000).toISOString(),
	end_at: new Date(start + index * 86_400_000 + 3_600_000).toISOString(),
	geo_address_info: { city: 'Kuala Lumpur' },
} }));

test('calendar omits expired, private, cancelled and unsafe entries', () => {
	const events = parseUpcomingEvents({ entries: [
		...entries,
		{ event: { ...entries[0].event, visibility: 'private' } },
		{ event: { ...entries[0].event, cancelled_at: '2026-01-01' } },
		{ event: { ...entries[0].event, url: 'javascript:alert(1)' } },
		{ event: { ...entries[0].event, url: 'https://evil.example/' } },
		{ event: { ...entries[0].event, start_at: 'invalid' } },
	] });
	expect(events).toHaveLength(5);
	expect(nextEvents(events, start + 3_600_000).map(event => event.id)).toEqual(['event-1', 'event-2', 'event-3']);
});

for (const colorScheme of ['light', 'dark'] as const) {
	test(`upcoming events stay visible and scroll with the page in ${colorScheme} mode`, async ({ page, isMobile }) => {
		await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
		await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
		await page.route('**/api/luma-events', route => route.fulfill({ json: { entries } }));
		await page.goto('/');
		const calendar = page.locator('[data-upcoming-events]');
		await calendar.scrollIntoViewIfNeeded();
		const cards = calendar.locator('.upcoming-card');
		await expect(cards).toHaveCount(3);
		await expect(cards.first()).toContainText('Community event 1');
		await expect(calendar.locator('iframe')).toHaveCount(0);
		await expect(calendar.getByRole('link', { name: 'View all upcoming events' })).toHaveAttribute('href', 'https://luma.com/malaysianai');
		if (isMobile) {
			const box = (await cards.first().boundingBox())!;
			const x = box.x + box.width / 2;
			const y = box.y + box.height / 2;
			const before = await page.evaluate(() => window.scrollY);
			const session = await page.context().newCDPSession(page);
			await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
			for (let step = 1; step <= 8; step++) {
				await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - step * 20 }] });
			}
			await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
			await session.detach();
			await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 60);
			await expect(page).toHaveURL('/');
		}
		await page.route('https://luma.com/event-0', route => route.fulfill({ body: 'Event registration' }));
		await cards.first().click();
		await expect(page).toHaveURL('https://luma.com/event-0');
	});
}

test('calendar preserves visible snapshot events if refreshing fails', async ({ page }) => {
	await page.route('**/api/luma-events', route => route.fulfill({ status: 503, body: 'Unavailable' }));
	const response = page.waitForResponse('**/api/luma-events');
	await page.goto('/');
	const calendar = page.locator('[data-upcoming-events]');
	const before = await calendar.locator('.upcoming-card').allTextContents();
	await calendar.scrollIntoViewIfNeeded();
	await response;
	expect(await calendar.locator('.upcoming-card').allTextContents()).toEqual(before);
	await expect(calendar.getByRole('link', { name: 'View all upcoming events' })).toBeVisible();
});
