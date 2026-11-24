import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { APPLY_FORM_URL, CONTACT_WHATSAPP, LUMA_URL, SITE_TITLE, VENUE_ADDRESS } from '../consts';
import { communities } from '../data/communities';
import { homepageFaqs } from '../data/faq';
import { residents } from '../data/residents';
import { voices } from '../data/voices';
import { directoryPath } from '../lib/directory';
import { MARKDOWN_CONTENT_TYPE } from '../lib/markdown-negotiation';
import { displayTitle } from '../lib/podcast-title';
import { PODCAST_APPLE_URL, PODCAST_SPOTIFY_URL, latestEpisodes, loadPodcastEpisodes, shortDescription } from '../lib/podcast';
import { communityDescription } from '../lib/seo-content';
import { storyHref } from '../lib/story-href';
import { CALENDAR_FEED, nextEvents, parseUpcomingEvents, type UpcomingEvent } from '../lib/upcoming-events';

// The Markdown copy of the homepage. Vercel middleware serves it at / when the
// request's Accept header prefers text/markdown. Keep section copy in step with
// src/components; tests/agent-markdown.spec.ts compares the two.
export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error('The production site URL is required for index.md.');
	const url = (path: string) => new URL(path, site).href;
	const eventStart = new Intl.DateTimeFormat('en-MY', { timeZone: 'Asia/Kuala_Lumpur', dateStyle: 'full', timeStyle: 'short' });
	const text = (value: string) => value.replace(/([\\[\]*_`])/g, '\\$1');
	const stories = await getCollection('blog');
	const episodeHref = (id: string) => {
		const story = stories.find(item => item.data.category === 'podcast' && item.data.youtubeId === id);
		return url(story ? storyHref(story) : `/podcast#episode-${id}`);
	};
	const episodes = latestEpisodes(await loadPodcastEpisodes());
	let events: UpcomingEvent[] = [];
	try {
		const response = await fetch(CALENDAR_FEED, { signal: AbortSignal.timeout(8000) });
		if (response.ok) events = nextEvents(parseUpcomingEvents(await response.json()));
	} catch {
		// Same fallback as UpcomingEvents.astro: keep the calendar link and build the rest.
	}
	const content = [
		`# ${SITE_TITLE}`, '',
		`> ${communityDescription}`, '',
		'## Learn, build and experience Malaysian AI.', '',
		"Discover weekly events with Malaysia's AI Communities, and take your projects further with an 8-week residency in Kuala Lumpur.", '',
		`- [View upcoming events](${LUMA_URL})`,
		`- [Join residency](${url('/residency')})`, '',
		'## Your first step into AI starts here.', '',
		...(events.length ? [
			'Upcoming events at build time, in Malaysia time:', '',
			...events.map(event => `- ${eventStart.format(new Date(event.startAt))}: [${text(event.name)}](${event.href})${event.location ? ` (${event.location})` : ''}`), '',
		] : []),
		`[View all upcoming events](${LUMA_URL}) on the Luma calendar.`, '',
		'## There is always something happening.', '',
		`Events include founder show and tells, hands-on learnathons, community hackathons and workshops with local builders, open to all ages and experience levels. See the [event calendar](${LUMA_URL}).`, '',
		'## Join the Malaysian.ai residency.', '',
		'For founders, builders, marketers, designers and creators looking to go all-in on companies, products, research or projects — built with AI. Apply to join our 8-week residency at the Malaysian.ai space.', '',
		`Full-time, in person. Check application dates on the [application platform](${APPLY_FORM_URL}).`, '',
		`- [Learn more about the residency](${url('/residency')})`,
		`- [Apply now](${APPLY_FORM_URL})`, '',
		'### Current residents', '',
		...residents.map(resident => `- [${text(resident.name)}](${url(directoryPath(resident))}): ${resident.tag}`), '',
		'## Discover the AI communities for you', '',
		"From deeply technical coding events for developers, to workshops for creators, business owners, students and women building your first apps & AI agents; there's a community of people here to help you along your AI journey. Global networks are listed through the Malaysian chapter or edition you can join.", '',
		...communities.map(community => `- [${text(community.name)}](${community.href}) (${community.qualifier}): ${community.description}`), '',
		'## What the community has to say.', '',
		...voices.flatMap(voice => [
			`> ${voice.segments.map(segment => segment.strong ? `**${text(segment.text)}**` : text(segment.text)).join('')}`,
			'>',
			`> ${voice.author}, ${voice.context}`, '',
		]),
		...(episodes.length ? [
			'## Latest episodes', '',
			`Listen on [Spotify](${PODCAST_SPOTIFY_URL}) and [Apple Podcasts](${PODCAST_APPLE_URL}), or see [all episodes](${url('/podcast')}).`, '',
			...episodes.map(episode => `- [${text(displayTitle(episode.title))}](${episodeHref(episode.id)}) (${episode.published.slice(0, 10)}): ${shortDescription(episode.description, 140)}`), '',
		] : []),
		'## Host & initiator', '',
		'[500 Global](https://500.co) is a venture capital firm with more than $2.1B in assets under management. Since 2010, it has backed founders across 80+ countries and invested early in companies including Grab, Carsome, Carousell, Canva and Udemy. Its portfolio includes 3,000+ companies, 35+ unicorns and 270+ exits.', '',
		'## Questions and Answers', '',
		...homepageFaqs.flatMap(({ question, answer }) => [`### ${question}`, '', answer, '']),
		'## Contact', '',
		`Message the team on [WhatsApp](${CONTACT_WHATSAPP}) or visit ${VENUE_ADDRESS}. See the [contact page](${url('/contact')}).`, '',
		'## More for agents', '',
		`- [llms.txt](${url('/llms.txt')}): every public page, with when-to-use guidance for AI agents`,
		`- [Sitemap](${url('/sitemap-index.xml')}): all canonical page URLs`,
		`- [RSS feed](${url('/rss.xml')}): community stories and podcast episodes`, '',
	].join('\n');
	return new Response(content, { headers: { 'Content-Type': MARKDOWN_CONTENT_TYPE } });
};
