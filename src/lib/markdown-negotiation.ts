// Shared by the Vercel middleware, the Markdown 404 function, and the Markdown endpoints.
// Keep this module free of Astro imports so the Vercel builders can include it. Vercel compiles
// middleware.ts and api/ to Node ESM file by file, so their relative imports need a .js extension.
// Rules follow RFC 9110 section 12.5.1 and https://acceptmarkdown.com/guides/accept-parsing.

export const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8';

export type Representation = 'html' | 'markdown';

type MediaRange = { type: string; subtype: string; q: number };

function parseAccept(accept: string): MediaRange[] {
	return accept.split(',').flatMap(part => {
		const [range, ...params] = part.split(';').map(value => value.trim().toLowerCase());
		const [type, subtype] = range.split('/');
		if (!type || !subtype) return [];
		const qParam = params.find(param => /^q\s*=/.test(param));
		const q = qParam ? Number(qParam.split('=')[1]) : 1;
		return [{ type, subtype, q: Number.isFinite(q) ? Math.min(Math.max(q, 0), 1) : 0 }];
	});
}

function specificity(range: MediaRange) {
	return (range.type === '*' ? 0 : 1) + (range.subtype === '*' ? 0 : 1);
}

// The most specific matching range sets the quality value: text/html beats text/*, which beats */*.
function quality(ranges: MediaRange[], type: string, subtype: string) {
	const matches = ranges.filter(range => (range.type === '*' && range.subtype === '*')
		|| (range.type === type && (range.subtype === '*' || range.subtype === subtype)));
	if (!matches.length) return 0;
	const best = Math.max(...matches.map(specificity));
	return Math.max(...matches.filter(range => specificity(range) === best).map(range => range.q));
}

function namesMarkdown(ranges: MediaRange[]) {
	return ranges.some(range => range.type === 'text' && range.subtype === 'markdown');
}

/**
 * Picks the representation to send, or undefined when the client accepts neither (HTTP 406).
 * HTML stays the default: a missing header, `*\/*` and browser headers all get HTML.
 * Markdown is chosen only when the client names text/markdown and rates it at least as high as HTML.
 */
export function negotiate(accept: string | null | undefined): Representation | undefined {
	if (!accept?.trim()) return 'html';
	const ranges = parseAccept(accept);
	// No usable range, or only refusals such as `text/markdown;q=0`: serve the default.
	if (!ranges.some(range => range.q > 0)) return 'html';
	const html = Math.max(quality(ranges, 'text', 'html'), quality(ranges, 'application', 'xhtml+xml'));
	const markdown = namesMarkdown(ranges) ? quality(ranges, 'text', 'markdown') : 0;
	if (markdown > 0 && markdown >= html) return 'markdown';
	if (html > 0) return 'html';
	return undefined;
}

export function prefersMarkdown(accept: string | null | undefined) {
	return negotiate(accept) === 'markdown';
}

/** Plain-text 406 body that lists the representations, as RFC 9110 section 15.5.7 suggests. */
export function notAcceptableText(accept: string) {
	return `This resource is available as:\n- text/html\n- text/markdown\n\nYou requested: ${accept.replace(/[\r\n]/g, ' ').slice(0, 200)}\n`;
}
