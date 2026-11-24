import { MARKDOWN_CONTENT_TYPE, prefersMarkdown } from '../src/lib/markdown-negotiation.js';
import { notFoundMarkdown } from '../src/lib/not-found-markdown.js';

// vercel.json rewrites a request here only after no static file matched and the
// Accept header names text/markdown. Every response keeps the 404 status.
type FetchAsset = (input: URL) => Promise<Response>;

export async function notFoundResponse(request: Request, fetchAsset: FetchAsset = fetch): Promise<Response> {
	const headers = { Vary: 'Accept', 'Cache-Control': 'public, max-age=0, must-revalidate' };
	const body = (text: string) => request.method === 'HEAD' ? null : text;
	if (prefersMarkdown(request.headers.get('accept'))) {
		return new Response(body(notFoundMarkdown), { status: 404, headers: { ...headers, 'Content-Type': MARKDOWN_CONTENT_TYPE } });
	}
	// The client named Markdown but rated HTML higher, so send the site's HTML 404 page.
	const html = await fetchAsset(new URL('/404.html', request.url)).catch(() => undefined);
	if (html?.ok) {
		return new Response(body(await html.text()), { status: 404, headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
	}
	return new Response(body('Page not found\n'), { status: 404, headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8' } });
}

export function GET(request: Request) {
	return notFoundResponse(request);
}

export function HEAD(request: Request) {
	return notFoundResponse(request);
}
