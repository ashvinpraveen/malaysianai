import { SITE_URL } from '../consts.js';

// The body does not echo the requested path, so a crafted URL cannot inject text into it.
export const notFoundMarkdown = [
	'# Page not found',
	'',
	'There is no page at this address on Malaysian AI. The link may be mistyped, or the page may have moved or been retired.',
	'',
	'Try one of these instead:',
	'',
	`- [llms.txt](${SITE_URL}/llms.txt): every public page with a short description, plus guidance on when to use this site`,
	`- [Sitemap](${SITE_URL}/sitemap-index.xml): all canonical page URLs`,
	`- [Homepage](${SITE_URL}/): request it with \`Accept: text/markdown\` to get Markdown`,
	`- [Contact](${SITE_URL}/contact): reach the Malaysian AI team`,
	'',
].join('\n');
