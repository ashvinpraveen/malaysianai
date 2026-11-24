import { next } from '@vercel/functions/middleware';
import { MARKDOWN_CONTENT_TYPE, negotiate, notAcceptableText } from './src/lib/markdown-negotiation.js';

// Vercel Routing Middleware. It runs before static files are served; vercel.json
// rewrites run after them, so they cannot vary the response at /.
export const config = { matcher: '/' };

type FetchAsset = (input: URL) => Promise<Response>;

const varyHeaders = { Vary: 'Accept', 'Cache-Control': 'public, max-age=0, must-revalidate' };

export async function negotiateHomepage(request: Request, fetchAsset: FetchAsset = fetch): Promise<Response> {
	const url = new URL(request.url);
	// The '/' matcher also matches /index. Leave that path to normal routing.
	if (url.pathname !== '/') return next();
	const accept = request.headers.get('accept');
	const representation = negotiate(accept);
	if (representation === 'html') return next({ headers: { Vary: 'Accept' } });
	if (!representation) {
		return new Response(request.method === 'HEAD' ? null : notAcceptableText(accept ?? ''), {
			status: 406,
			headers: { ...varyHeaders, 'Content-Type': 'text/plain; charset=utf-8' },
		});
	}
	// /index.md is a static build output, so this request is served from the CDN.
	const markdown = await fetchAsset(new URL('/index.md', url)).catch(() => undefined);
	if (!markdown?.ok) return next({ headers: { Vary: 'Accept' } });
	return new Response(request.method === 'HEAD' ? null : await markdown.text(), {
		headers: { ...varyHeaders, 'Content-Type': MARKDOWN_CONTENT_TYPE },
	});
}

export default function middleware(request: Request) {
	return negotiateHomepage(request);
}
