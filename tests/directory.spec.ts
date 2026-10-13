import { test, expect } from '@playwright/test';
import { residents } from '../src/data/residents';
import { directoryPath } from '../src/lib/directory';

test.beforeEach(async ({ page }) => {
	await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
});

const cohort01 = residents.filter(resident => resident.cohort === '01');

test('company directory lists residents and filters through the URL', async ({ page, isMobile }) => {
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

	const cleve = page.locator('[data-company]').filter({ hasText: 'Cleve' });
	await expect(cleve.locator('.founders')).toContainText('Ashvin Praveen · Co-founder and CEO');
	await expect(cleve.getByRole('link', { name: 'Visit Cleve' })).toHaveAttribute('href', 'https://cleve.ai');
	await expect(page.locator('[data-company]').filter({ hasText: 'ReplyrAI' }).locator('.founders')).toHaveCount(0);

	await page.getByRole('searchbox', { name: 'Search companies' }).fill('penang');
	await expect(page).toHaveURL(/[?&]q=penang/);
	await expect(page.locator('[data-company]:not([hidden])')).toHaveCount(1);
	await expect(page.locator('[data-company]:not([hidden])')).toContainText('Cleve');

	await page.getByRole('button', { name: 'Clear filters' }).click();
	await expect(page).toHaveURL(/\/directory$/);
	await expect(page.locator('[data-company]:not([hidden])')).toHaveCount(residents.length);

	await page.getByLabel('Cohort').selectOption('01');
	await expect(page).toHaveURL(/cohort=01/);
	await expect(page.locator('[data-company]:not([hidden])')).toHaveCount(cohort01.length);
	await page.getByLabel('Industry').selectOption('Education');
	await expect(page.locator('[data-company]:not([hidden])')).toHaveCount(1);
	await expect(page.locator('[data-company]:not([hidden])')).toContainText('Kelas Sekejap');

	await page.goto('/directory?cohort=02&focus=Developer+Tools&location=Kuala+Lumpur&tag=API');
	await expect(page.getByLabel('Cohort')).toHaveValue('02');
	await expect(page.getByLabel('Industry')).toHaveValue('Developer Tools');
	await expect(page.getByLabel('Location')).toHaveValue('Kuala Lumpur');
	await expect(page.getByLabel('Tag')).toHaveValue('API');
	await expect(page.locator('[data-company]:not([hidden])')).toHaveCount(1);
	await expect(page.locator('[data-company]:not([hidden])')).toContainText('CodeKite');
	await expect(page.locator('[data-count]')).toHaveText('1 company');

	await page.getByRole('searchbox', { name: 'Search companies' }).fill('not-a-company');
	await expect(page.locator('[data-empty]')).toBeVisible();
	await expect(page.locator('[data-empty]')).toHaveText('No companies match these filters.');
	await expect(page.locator('[data-count]')).toHaveText('0 companies');
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
});

test('company pages show verified founders and hide an empty founders section', async ({ page }) => {
	await page.goto('/directory?cohort=01');
	await page.getByRole('link', { name: 'Cleve', exact: true }).click();
	await expect(page).toHaveURL(/\/directory\/cleve$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cleve');
	await expect(page.getByRole('heading', { name: 'Founders' })).toBeVisible();
	await expect(page.getByText('Ashvin Praveen')).toBeVisible();
	await expect(page.getByText('Co-founder and CEO')).toBeVisible();
	await expect(page.getByRole('link', { name: 'Visit Cleve' })).toHaveAttribute('href', 'https://cleve.ai');
	await page.goBack();
	await expect(page).toHaveURL(/cohort=01/);
	await expect(page.locator('[data-company]:not([hidden])')).toHaveCount(cohort01.length);

	await page.goto(directoryPath('ReplyrAI'));
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('ReplyrAI');
	await expect(page.getByRole('heading', { name: 'Founders' })).toHaveCount(0);
	await page.getByRole('link', { name: 'All companies' }).click();
	await expect(page).toHaveURL(/\/directory$/);

	const missing = await page.goto('/directory/not-a-company');
	expect(missing?.status()).toBe(404);
});
