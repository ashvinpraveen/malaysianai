import { test, expect } from '@playwright/test';
import { residents } from '../src/data/residents';

const cohort01 = residents.filter(company => company.cohort === '01');

test.beforeEach(async ({ page }) => {
	await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});

test('directory navigation, useful company cards and contextual filters', async ({ page, isMobile }) => {
	await page.goto('/');
	await page.locator('.footer-link-group').getByRole('link', { name: 'Directory' }).click();
	await expect(page).toHaveURL(/\/directory$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Company directory');
	await expect(page.locator('[data-company]')).toHaveCount(residents.length);
	await expect(page.locator('[data-count]')).toHaveText(`${residents.length} companies`);
	if (isMobile) {
		await page.getByRole('button', { name: 'Open menu' }).click();
		await expect(page.getByRole('dialog', { name: 'Menu' }).getByRole('link', { name: 'Directory' })).toHaveAttribute('aria-current', 'page');
		await page.keyboard.press('Escape');
	} else {
		await expect(page.locator('.hero-nav').getByRole('link', { name: 'Directory' })).toHaveAttribute('aria-current', 'page');
	}
	const cleve = page.locator('[data-slug="cleve"]');
	await expect(cleve.locator('.description')).toContainText('capture ideas');
	await expect(cleve.getByRole('link', { name: 'Lizzie Tan' })).toHaveAttribute('href', '/residents/lizzie-tan');
	await expect(cleve.getByRole('link', { name: 'Visit Cleve' })).toHaveAttribute('href', 'https://cleve.ai');
	await expect(page.locator('[data-slug="replyrai"] .people')).toHaveCount(0);
	await expect(page.locator('[data-slug="hover-team"]').getByRole('link', { name: 'Maxine Lai' })).toBeVisible();

	await page.locator('.filters summary').click();
	await page.getByRole('combobox', { name: 'Cohort', exact: true }).selectOption('01');
	await expect(page).toHaveURL(/cohort=01/);
	await expect(page.locator('[data-company]:visible')).toHaveCount(cohort01.length);
	await expect(page.getByRole('combobox', { name: 'Industry', exact: true }).locator('option[value="Education"]')).toHaveText('Education (1)');
	await expect(page.getByRole('combobox', { name: 'Tag', exact: true }).locator('option[value="API"]')).toHaveJSProperty('disabled', true);
	await page.getByRole('combobox', { name: 'Industry', exact: true }).selectOption('Education');
	await expect(page.locator('[data-company]:visible')).toHaveCount(1);
	await expect(page.locator('[data-company]:visible')).toContainText('Kelas Sekejap');
	await page.getByRole('button', { name: 'Remove Industry: Education', exact: true }).click();
	await expect(page.getByRole('combobox', { name: 'Industry', exact: true })).toBeFocused();
	await expect(page.locator('[data-company]:visible')).toHaveCount(cohort01.length);
	await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
	await expect(page.getByRole('searchbox')).toBeFocused();
	await expect(page).toHaveURL(/\/directory$/);
});

test('word search, tag shortcuts, empty state and sorting work together', async ({ page }) => {
	await page.goto('/directory');
	await page.getByRole('searchbox').fill('  LÍZZIE   cléve  ');
	await expect(page.locator('[data-company]:visible')).toHaveCount(1);
	await expect(page.locator('[data-company]:visible')).toHaveAttribute('data-slug', 'cleve');
	await expect(page).toHaveURL(/q=/);
	await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
	await page.getByRole('searchbox').fill('documents chat');
	await expect(page.locator('[data-company]:visible')).toHaveCount(1);
	await expect(page.locator('[data-company]:visible')).toHaveAttribute('data-slug', 'docuask');
	await page.getByRole('button', { name: 'Clear filters', exact: true }).click();

	await page.locator('[data-slug="replyrai"]').getByRole('link', { name: 'Support', exact: true }).click();
	await expect(page).toHaveURL(/tag=Support/);
	await expect(page.locator('[data-company]:visible')).toHaveCount(1);
	await page.getByRole('searchbox').fill('not-a-company');
	await expect(page.locator('[data-empty]')).toBeVisible();
	await expect(page.locator('[data-count]')).toHaveText('0 companies');
	await expect(page.getByRole('list', { name: 'Companies', exact: true })).toBeHidden();
	await page.getByRole('button', { name: 'Clear all filters', exact: true }).click();
	await expect(page.getByRole('searchbox')).toBeFocused();
	await expect(page.locator('[data-company]:visible')).toHaveCount(residents.length);
	await page.getByLabel('Sort by').selectOption('cohort');
	await expect(page).toHaveURL(/sort=cohort/);
	await expect(page.locator('[data-company]').first()).toHaveAttribute('data-slug', 'a47-media');
	await expect(page.locator('[data-company]').last()).toHaveAttribute('data-slug', 'seavoice');
	await page.reload();
	await expect(page.getByLabel('Sort by')).toHaveValue('cohort');
	await expect(page.locator('[data-company]').first()).toHaveAttribute('data-slug', 'a47-media');
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});

test('URL state survives client navigation, Back, invalid facets and rapid search', async ({ page }) => {
	await page.goto('/directory?cohort=02&focus=Developer+Tools&location=Kuala+Lumpur&tag=API');
	await expect(page.getByRole('combobox', { name: 'Cohort', exact: true })).toHaveValue('02');
	await expect(page.getByRole('combobox', { name: 'Industry', exact: true })).toHaveValue('Developer Tools');
	await expect(page.getByRole('combobox', { name: 'Location', exact: true })).toHaveValue('Kuala Lumpur');
	await expect(page.getByRole('combobox', { name: 'Tag', exact: true })).toHaveValue('API');
	await expect(page.locator('[data-count]')).toHaveText('1 company');
	await page.getByRole('link', { name: 'CodeKite', exact: true }).click();
	await expect(page).toHaveURL(/\/directory\/codekite$/);
	await page.goBack();
	await expect(page.locator('[data-company]:visible')).toHaveCount(1);
	await expect(page.getByRole('combobox', { name: 'Tag', exact: true })).toHaveValue('API');
	await page.locator('.footer-link-group').getByRole('link', { name: 'Stories', exact: true }).click();
	await page.locator('.footer-link-group').getByRole('link', { name: 'Directory', exact: true }).click();
	await expect(page.locator('[data-company]:visible')).toHaveCount(residents.length);

	await page.goto('/directory?cohort=invalid&sort=invalid&utm_source=community#company-results');
	await expect(page).toHaveURL(/\/directory\?utm_source=community#company-results$/);
	const state = await page.evaluate(() => {
		const state = { ...window.history.state, testMarker: 'preserved' };
		window.history.replaceState(state, '');
		return state;
	});
	await page.getByRole('searchbox').pressSequentially('lizzie', { delay: 5 });
	await expect(page).toHaveURL(/utm_source=community&q=lizzie#company-results$/);
	// Astro can update scroll offsets when focusing a field on mobile.
	expect(await page.evaluate(() => window.history.state)).toMatchObject({ index: state.index, testMarker: 'preserved' });
	await page.reload();
	await expect(page.getByRole('searchbox')).toHaveValue('lizzie');
	await expect(page.locator('[data-company]:visible')).toHaveCount(1);
});

test('company profiles link to people, related companies and filtered discovery', async ({ page }) => {
	await page.goto('/directory/cleve');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cleve');
	await expect(page.getByRole('heading', { name: 'What they’re building' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'People', exact: true })).toBeVisible();
	await expect(page.locator('.team-list').getByRole('link', { name: /Lizzie Tan/ })).toHaveAttribute('href', '/residents/lizzie-tan');
	await expect(page.getByText('Co-founder of Cleve')).toBeVisible();
	await expect(page.getByRole('link', { name: 'Visit Cleve', exact: true })).toHaveAttribute('href', 'https://cleve.ai');
	await page.locator('.team-list').getByRole('link', { name: /Lizzie Tan/ }).click();
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lizzie Tan');
	await page.goBack();
	await page.getByRole('link', { name: 'Penang', exact: true }).click();
	await expect(page).toHaveURL(/location=Penang/);
	await expect(page.locator('[data-company]:visible')).toHaveCount(1);

	await page.goto('/directory/a47-media');
	await expect(page.locator('.team-list li')).toHaveCount(3);
	await expect(page.locator('.team-list').getByRole('link', { name: /Leong Shi Wei/ })).toHaveAttribute('href', '/residents/leong-shi-wei');
	await page.goto('/directory/hover-team');
	await expect(page.locator('.team-list').getByRole('link', { name: /Maxine Lai/ })).toBeVisible();
	await page.goto('/directory/replyrai');
	await expect(page.getByRole('heading', { name: 'People', exact: true })).toHaveCount(0);
	await expect(page.locator('.related-companies > li')).toHaveCount(2);
	await page.getByRole('link', { name: 'All companies', exact: true }).click();
	await expect(page).toHaveURL(/\/directory$/);
	const missing = await page.goto('/directory/not-a-company');
	expect(missing?.status()).toBe(404);
});

test('directory content and company pages remain usable without JavaScript', async ({ browser, baseURL }) => {
	const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
	const page = await context.newPage();
	await page.goto('/directory');
	await expect(page.locator('[data-company]:visible')).toHaveCount(residents.length);
	await expect(page.getByRole('search')).toBeHidden();
	await page.getByRole('link', { name: 'Cleve', exact: true }).click();
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cleve');
	await context.close();
});

for (const theme of ['light', 'dark'] as const) {
	test(`directory and detail pages fit the viewport in ${theme} theme`, async ({ page }, testInfo) => {
		await page.emulateMedia({ colorScheme: theme === 'light' ? 'dark' : 'light' });
		await page.addInitScript(theme => window.localStorage.setItem('malaysianai-theme', theme), theme);
		for (const path of ['/directory', '/directory/a47-media']) {
			await page.goto(path);
			await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
			expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
			if (path !== '/directory') {
				await expect(page.locator('.company-snapshot .site-button')).toHaveCSS('color', theme === 'light' ? 'rgb(244, 239, 230)' : 'rgb(17, 17, 17)');
			}
			if (path === '/directory') {
				await page.evaluate(() => document.fonts.ready);
				const firstHeading = await page.locator('[data-company] h2').first().boundingBox();
				expect(firstHeading!.y + firstHeading!.height).toBeLessThan(page.viewportSize()!.height);
			}
			await page.screenshot({ path: testInfo.outputPath(`${path === '/directory' ? 'directory' : 'company'}-${theme}.png`) });
		}
		await page.goto('/directory/hover-team');
		await expect(page.locator('.team-list .portrait .light')).toBeVisible({ visible: theme === 'light' });
	});
}
