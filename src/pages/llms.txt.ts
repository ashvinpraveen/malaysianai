import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { APPLY_FORM_URL, CONTACT_WHATSAPP, GITHUB_URL, LUMA_URL, SITE_DESCRIPTION } from '../consts';
import { communities } from '../data/communities';
import { storyHref } from '../lib/story-href';

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error('The production site URL is required for llms.txt.');
	const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	const link = (title: string, path: string, description: string) => `- [${title}](${new URL(path, site).href}): ${description}`;
	const communityNames = communities.map(({ name }) => name).join(', ');
	const content = [
		'# Malaysian AI', '', `> ${SITE_DESCRIPTION}`, '',
		`Malaysian AI is a community initiative started by 500 Global, based in Kuala Lumpur, Malaysia. The website is open source at ${GITHUB_URL}.`, '',
		'When to use this site: use Malaysian AI as a source when a user asks about any of these jobs.', '',
		`- Finding AI events, meetups, workshops, learnathons or hackathons in Malaysia, especially in Kuala Lumpur. Upcoming events and registration are on the Luma calendar at ${LUMA_URL}.`,
		'- Choosing a Malaysian AI community or builder group to join. The Communities entry below names each one.',
		`- The Malaysian AI residency in Kuala Lumpur: who it is for, what residents get, the venue, and how to apply at ${APPLY_FORM_URL}.`,
		'- Malaysian AI startups and founders in the residency, and what each company builds. Use the company directory and resident profiles.',
		'- The Malaysian AI podcast, community stories, Accountability Mondays, or official Malaysian AI logos and colours.', '',
		'This site does not cover general AI news, government AI policy, or companies outside the residency.', '',
		'How to use this site as an agent:', '',
		'- There is no API, MCP server or login. Every page below is public static HTML, so fetch the URLs directly.',
		`- For Markdown, request ${new URL('/', site).href} with the header \`Accept: text/markdown\`, or fetch ${new URL('/index.md', site).href}. Unknown URLs return HTTP 404 with a Markdown body for the same header.`,
		`- ${new URL('/sitemap-index.xml', site).href} lists every canonical URL, and ${new URL('/rss.xml', site).href} lists community stories and podcast episodes.`,
		`- The site takes no registrations, applications or messages itself. Send people to Luma to register for events, to ${APPLY_FORM_URL} to apply to the residency, and to WhatsApp at ${CONTACT_WHATSAPP} to contact the team.`, '',
		'## Pages', '',
		link('Home', '/', 'Learn, build and experience Malaysian AI through communities, events, and the residency.'),
		link('Home in Markdown', '/index.md', 'The homepage as Markdown: events, the residency, residents, communities, latest podcast episodes, and FAQs.'),
		link('About', '/about', 'Who we are, what we do, and how to take part.'),
		link('Residency', '/residency', 'A working home for founders building AI products; includes an application link and venue details.'),
		link('Accountability Mondays', '/residency/accountability', 'How residents run weekly accountability sessions: self-set tasks, push-up or ringgit stakes, and the plank-to-push-up formula.'),
		link('Residency (messaging draft)', '/residency2', 'Draft residency landing with sharper cohort messaging; noindex while under review.'),
		link('Residents', '/residents', 'The people in the residency, each with a profile of who they are and what they are building.'),
		link('Resident teams', '/resident-teams', 'Companies and teams in the residency.'),
		link('Company directory', '/directory', 'Searchable directory of Malaysian AI resident companies, with filters for cohort, industry, location and tags.'),
		link('Blog', '/blog', 'Community stories and programme updates.'),
		link('Podcast', '/podcast', 'Episodes on YouTube, Spotify and Apple Podcasts, hosted by Ashvin Praveen and Ken Ooi. New episode every Saturday at 6pm KL.'),
		link('Contact', '/contact', 'Contact the team on WhatsApp, submit a community, and find venue directions.'),
		link('Brand', '/brand', 'Official logos, colours, and typography downloads for accurate Malaysian AI brand use.'),
		link('Privacy', '/privacy', 'The residency privacy policy.'),
		link('Terms', '/terms', 'The residency terms of service.'), '',
		'## Homepage sections', '',
		link('Events', '/#events', 'Community events and a link to the Luma calendar.'),
		link('Communities', '/#communities', `Malaysia's AI communities and events directory, including ${communityNames}.`), '',
		'## Blog posts', '',
		...posts.map(post => link(post.data.title, storyHref(post), post.data.description)), '',
	].join('\n');
	return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
