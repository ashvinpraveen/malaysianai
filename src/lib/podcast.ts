import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import cachedEpisodes from '../data/podcast-cache.json';

/**
 * Malaysian AI YouTube channel (@malaysian-ai), which publishes the podcast
 * hosted by Ashvin Praveen and Ken Ooi. There is no separate podcast playlist,
 * so the public channel feed is the episode source.
 */

export const PODCAST_DESCRIPTION = 'Watch the Malaysian AI podcast, hosted by Ashvin Praveen & Ken Ooi. Episodes cover building with AI in Malaysia, community events, and conversations with founders.';
export const PODCAST_CHANNEL_ID = 'UCgshDGIYMQd7Yvk1ZhML4zw';

export const PODCAST_CHANNEL_URL = `https://www.youtube.com/channel/${PODCAST_CHANNEL_ID}`;

export const PODCAST_SPOTIFY_URL = 'https://open.spotify.com/show/7uE9K5hkF7ymBFaMx5ReXL';

export const PODCAST_APPLE_URL = 'https://podcasts.apple.com/us/podcast/the-malaysian-ai-podcast/id6824252077';

export const PODCAST_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${PODCAST_CHANNEL_ID}`;

/** Episodes published on the Spotify and Apple shows, keyed by YouTube video id. */
const EPISODE_LISTEN_LINKS: Record<string, { spotify: string; apple: string }> = {
	BAs18i68zvc: {
		spotify: 'https://open.spotify.com/episode/7t3X7PEr1ruHsNeD40OAM2',
		apple: 'https://podcasts.apple.com/us/podcast/the-malaysian-ai-podcast/id6824252077?i=1000796940907',
	},
	OYqACwQJY9w: {
		spotify: 'https://open.spotify.com/episode/6tpXPu1FEzvhihh5C7YHCx',
		apple: 'https://podcasts.apple.com/us/podcast/the-malaysian-ai-podcast/id6824252077?i=1000796940437',
	},
	tWTAF6PK4hM: {
		spotify: 'https://open.spotify.com/episode/6L1jbWio2cZQueKlMbKO8H',
		apple: 'https://podcasts.apple.com/us/podcast/the-malaysian-ai-podcast/id6824252077?i=1000796941052',
	},
};

export function episodeListenLinks(id: string) {
	return EPISODE_LISTEN_LINKS[id];
}

const LATEST_EPISODE_COUNT = 3;
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const CACHE_PATH = join(process.cwd(), 'src/data/podcast-cache.json');

export interface PodcastEpisode {
	id: string;
	title: string;
	published: string;
	description: string;
	url: string;
}

function decodeXml(value: string) {
	const text = value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
	return text
		.replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
		.replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&apos;|&#39;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
}

function tagText(source: string, name: string) {
	const match = source.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
	return match?.[1] ? decodeXml(match[1]) : '';
}

export function parseYouTubeFeed(xml: string): PodcastEpisode[] {
	const episodes: PodcastEpisode[] = [];
	for (const match of xml.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/g)) {
		const entry = match[1] ?? '';
		const id = tagText(entry, 'yt:videoId') || tagText(entry, 'id').replace(/^yt:video:/, '');
		const published = tagText(entry, 'published');
		const title = tagText(entry, 'title') || tagText(entry, 'media:title');
		if (!VIDEO_ID.test(id) || !title || Number.isNaN(Date.parse(published))) continue;
		episodes.push({
			id,
			title,
			published: new Date(published).toISOString(),
			description: tagText(entry, 'media:description'),
			url: `https://www.youtube.com/watch?v=${id}`,
		});
	}
	return episodes.sort((a, b) => Date.parse(b.published) - Date.parse(a.published));
}

function isEpisode(value: unknown): value is PodcastEpisode {
	if (!value || typeof value !== 'object') return false;
	const episode = value as Record<string, unknown>;
	return typeof episode.id === 'string'
		&& VIDEO_ID.test(episode.id)
		&& typeof episode.title === 'string'
		&& episode.title.length > 0
		&& typeof episode.published === 'string'
		&& !Number.isNaN(Date.parse(episode.published))
		&& typeof episode.description === 'string'
		&& typeof episode.url === 'string';
}

function cached(): PodcastEpisode[] {
	return (Array.isArray(cachedEpisodes) ? cachedEpisodes : []).filter(isEpisode);
}

async function remember(episodes: PodcastEpisode[]) {
	const next = `${JSON.stringify(episodes, null, '\t')}\n`;
	try {
		const current = await readFile(CACHE_PATH, 'utf8').catch((error: NodeJS.ErrnoException) => {
			if (error.code === 'ENOENT') return '';
			throw error;
		});
		if (current === next) return;
		await writeFile(CACHE_PATH, next);
	} catch (error) {
		const reason = error instanceof Error ? error.message : 'unknown error';
		console.warn(`Could not update the podcast cache (${reason}).`);
	}
}

async function fetchEpisodes(): Promise<PodcastEpisode[]> {
	try {
		const response = await fetch(PODCAST_FEED_URL, {
			headers: { accept: 'application/atom+xml, application/xml, text/xml' },
			signal: AbortSignal.timeout(8000),
		});
		if (!response.ok) throw new Error(`YouTube feed responded ${response.status}`);
		const xml = await response.text();
		if (!xml.includes('<feed') || !xml.includes('<entry')) throw new Error('YouTube feed was not an Atom document');
		const episodes = parseYouTubeFeed(xml);
		if (episodes.length === 0) throw new Error('YouTube feed had no episodes');
		await remember(episodes);
		return episodes;
	} catch (error) {
		const reason = error instanceof Error ? error.message : 'unknown error';
		console.warn(`YouTube podcast feed unavailable (${reason}); using the cached episode list.`);
		return cached();
	}
}

let episodesPromise: Promise<PodcastEpisode[]> | undefined;

export function loadPodcastEpisodes() {
	episodesPromise ??= fetchEpisodes();
	return episodesPromise;
}

export function latestEpisodes(episodes: PodcastEpisode[]) {
	return episodes.slice(0, LATEST_EPISODE_COUNT);
}

export function shortDescription(description: string, maxLength = 240) {
	const paragraph = description
		.replace(/\r\n/g, '\n')
		.split(/\n\s*\n/)[0]
		?.replace(/\s+/g, ' ')
		.trim() ?? '';
	if (paragraph.length <= maxLength) return paragraph;
	const clipped = paragraph.slice(0, maxLength - 1);
	const boundary = clipped.lastIndexOf(' ');
	const trimmed = (boundary > 80 ? clipped.slice(0, boundary) : clipped).trim();
	return `${trimmed}…`;
}

export function thumbnailURL(id: string) {
	return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
