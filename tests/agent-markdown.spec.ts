import { test, expect } from '@playwright/test';
import hosting from '../vercel.json' with { type: 'json' };
import middleware, { config as middlewareConfig, negotiateHomepage } from '../middleware';
import { GET as notFoundGet, notFoundResponse } from '../api/markdown-not-found';
import { negotiate } from '../src/lib/markdown-negotiation';
import { notFoundMarkdown } from '../src/lib/not-found-markdown';

const origin = 'https://www.malaysian.ai';
const chrome = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8';

// The middleware and the 404 function fetch static assets from the deployment.
// In tests, those requests go to the local production preview instead.
function previewFetch(baseURL: string | undefined) {
	return (input: URL) => fetch(new URL(input.pathname, baseURL));
}

test('Accept negotiation follows the acceptmarkdown.com test vectors', () => {
	expect(negotiate('text/markdown')).toBe('markdown');
	expect(negotiate('text/markdown, text/html;q=0.8')).toBe('markdown');
	expect(negotiate('text/markdown, */*;q=0.1')).toBe('markdown');
	expect(negotiate('TEXT/Markdown;charset=utf-8')).toBe('markdown');
	expect(negotiate('text/html')).toBe('html');
	expect(negotiate('text/markdown;q=0, text/html')).toBe('html');
	expect(negotiate('text/html, text/markdown;q=0.5')).toBe('html');
	expect(negotiate('text/markdown;q=0')).toBe('html');
	expect(negotiate(null)).toBe('html');
	expect(negotiate('')).toBe('html');
	expect(negotiate('*/*')).toBe('html');
	expect(negotiate('text/*')).toBe('html');
	expect(negotiate(chrome)).toBe('html');
	expect(negotiate('application/pdf')).toBeUndefined();
	expect(negotiate('application/json, text/markdown;q=0')).toBeUndefined();
});

test('homepage middleware serves Markdown with Vary: Accept and leaves HTML to the static file', async ({ baseURL, request }) => {
	expect(middlewareConfig.matcher).toBe('/');
	const fetchAsset = previewFetch(baseURL);
	const markdown = await negotiateHomepage(new Request(`${origin}/`, { headers: { Accept: 'text/markdown' } }), fetchAsset);
	expect(markdown.status).toBe(200);
	expect(markdown.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
	expect(markdown.headers.get('vary')).toBe('Accept');
	expect(markdown.headers.get('x-middleware-next')).toBeNull();
	const body = await markdown.text();
	expect(body).toBe(await (await request.get('/index.md')).text());
	expect(body.startsWith('# Malaysian AI\n')).toBe(true);

	for (const accept of ['text/html', chrome, '*/*', '']) {
		const html = await negotiateHomepage(new Request(`${origin}/`, { headers: accept ? { Accept: accept } : {} }), fetchAsset);
		expect(html.headers.get('x-middleware-next'), accept).toBe('1');
		expect(html.headers.get('vary'), accept).toBe('Accept');
		expect(html.body, accept).toBeNull();
	}

	const head = await negotiateHomepage(new Request(`${origin}/`, { method: 'HEAD', headers: { Accept: 'text/markdown' } }), fetchAsset);
	expect(head.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
	expect(head.body).toBeNull();

	const refused = await negotiateHomepage(new Request(`${origin}/`, { headers: { Accept: 'application/pdf' } }), fetchAsset);
	expect(refused.status).toBe(406);
	expect(refused.headers.get('vary')).toBe('Accept');
	expect(await refused.text()).toContain('text/markdown');

	// The '/' matcher also matches /index; that path must keep normal routing.
	const index = await negotiateHomepage(new Request(`${origin}/index`, { headers: { Accept: 'text/markdown' } }), fetchAsset);
	expect(index.headers.get('x-middleware-next')).toBe('1');

	// If the Markdown asset is unavailable, fall back to HTML rather than fail the homepage.
	const missing = await negotiateHomepage(new Request(`${origin}/`, { headers: { Accept: 'text/markdown' } }), async () => new Response('', { status: 404 }));
	expect(missing.headers.get('x-middleware-next')).toBe('1');
	expect(typeof middleware).toBe('function');
});

test('unknown URLs return a Markdown 404 that points agents to llms.txt', async ({ baseURL }) => {
	const fetchAsset = previewFetch(baseURL);
	const response = await notFoundResponse(new Request(`${origin}/__probe-does-not-exist`, { headers: { Accept: 'text/markdown' } }), fetchAsset);
	expect(response.status).toBe(404);
	expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
	expect(response.headers.get('vary')).toBe('Accept');
	const body = await response.text();
	expect(body).toBe(notFoundMarkdown);
	expect(body.length).toBeGreaterThan(20);
	expect(body).toContain(`](${origin}/llms.txt)`);
	expect(body).toContain(`](${origin}/sitemap-index.xml)`);
	expect(body).not.toContain('__probe');

	const head = await notFoundResponse(new Request(`${origin}/missing`, { method: 'HEAD', headers: { Accept: 'text/markdown' } }), fetchAsset);
	expect(head.status).toBe(404);
	expect(head.body).toBeNull();

	// A client that names Markdown but rates HTML higher gets the HTML 404 page, still with status 404.
	const html = await notFoundResponse(new Request(`${origin}/missing`, { headers: { Accept: 'text/html, text/markdown;q=0.5' } }), fetchAsset);
	expect(html.status).toBe(404);
	expect(html.headers.get('content-type')).toBe('text/html; charset=utf-8');
	expect(await html.text()).toContain('Page not found');

	const offline = await notFoundResponse(new Request(`${origin}/missing`, { headers: { Accept: 'text/html, text/markdown;q=0.5' } }), () => Promise.reject(new Error('offline')));
	expect(offline.status).toBe(404);
	expect(await offline.text()).toBe('Page not found\n');
	expect(typeof notFoundGet).toBe('function');
});

test('Vercel routes Markdown requests for missing files to the 404 function and varies / on Accept', () => {
	// vercel.json rewrites run only after static files miss, so existing pages are never rewritten.
	const rewrite = hosting.rewrites.find(rule => rule.destination === '/api/markdown-not-found');
	expect(rewrite).toBeTruthy();
	expect(hosting.rewrites.at(-1)).toBe(rewrite);
	expect(rewrite!.source).toBe('/:path*');
	const condition = rewrite!.has?.[0];
	expect(condition?.type).toBe('header');
	expect(condition?.key).toBe('accept');
	const matches = new RegExp(`^(?:${condition!.value})$`);
	expect(matches.test('text/markdown')).toBe(true);
	expect(matches.test('text/markdown, text/html;q=0.8')).toBe(true);
	expect(matches.test(chrome)).toBe(false);
	expect(matches.test('*/*')).toBe(false);
	expect(hosting.headers).toContainEqual({ source: '/', headers: [{ key: 'Vary', value: 'Accept' }] });
	expect(hosting.headers).toContainEqual({ source: '/index.md', headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }] });
});

test('homepage Markdown matches the visible homepage sections', async ({ page, request }) => {
	const response = await request.get('/index.md');
	expect(response.status()).toBe(200);
	expect(response.headers()['content-type']).toContain('text/markdown');
	const markdown = await response.text();
	const headings = [...markdown.matchAll(/^#{2,3} (.+)$/gm)].map(match => match[1]);

	await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
	await page.goto('/');
	const normalize = (value: string | null) => (value ?? '').replace(/\s+/g, ' ').trim();
	// Headings use <br> for line breaks; read them as a space, as a reader would.
	const headingText = (selector: string) => page.locator(selector).evaluateAll(elements => elements.map(element => {
		const copy = element.cloneNode(true) as HTMLElement;
		copy.querySelectorAll('br').forEach(br => br.replaceWith(' '));
		return copy.textContent ?? '';
	}));
	for (const heading of [...await headingText('h1'), ...await headingText('main h2')]) {
		expect(headings, heading).toContain(normalize(heading));
	}
	for (const selector of ['.hero-copy .intro', '.residency-lede', '.community-lede', '.host-copy']) {
		const copy = normalize(await page.locator(selector).first().textContent());
		expect(markdown.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'), selector).toContain(copy);
	}
	for (const name of await page.locator('.residency-track ul:first-child .resident-name').allTextContents()) {
		expect(markdown).toContain(`[${name}](${origin}/directory/`);
	}
	for (const question of await page.locator('#faq .faq-question').allTextContents()) {
		expect(headings).toContain(normalize(question));
	}
	expect(markdown).toContain(`](${origin}/llms.txt)`);
});
