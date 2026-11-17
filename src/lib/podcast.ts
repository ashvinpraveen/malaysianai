import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import cachedEpisodes from '../data/podcast-cache.json' with { type: 'json' };

/**
 * Malaysian AI YouTube channel (@malaysian-ai), which publishes the podcast
 * hosted by Ashvin Praveen and Ken Ooi. There is no separate podcast playlist.
 * The channel Atom feed is the preferred source. YouTube currently returns 404
 * for that feed and for the uploads playlist, so a build also reads the public
 * channel videos page and fills in any video the cache does not already know.
 * A scheduled workflow commits the cache, so a later dead feed still has the
 * latest list.
 */

export const PODCAST_DESCRIPTION = 'Watch the Malaysian AI podcast, hosted by Ashvin Praveen & Ken Ooi. Episodes cover building with AI in Malaysia, community events, and conversations with founders.';
export const PODCAST_CADENCE = 'New episodes every Saturday at 6pm KL.';
export const PODCAST_CHANNEL_ID = 'UCgshDGIYMQd7Yvk1ZhML4zw';

export const PODCAST_CHANNEL_URL = `https://www.youtube.com/channel/${PODCAST_CHANNEL_ID}`;

export const PODCAST_CHANNEL_VIDEOS_URL = 'https://www.youtube.com/@malaysian-ai/videos';

export const PODCAST_SPOTIFY_URL = 'https://open.spotify.com/show/7uE9K5hkF7ymBFaMx5ReXL';

export const PODCAST_APPLE_URL = 'https://podcasts.apple.com/us/podcast/the-malaysian-ai-podcast/id6824252077';

/** Public audio RSS from the Apple listing. It does not carry YouTube video ids. */
export const PODCAST_AUDIO_FEED_URL = 'https://anchor.fm/s/e96c1f94/podcast/rss';

export const PODCAST_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${PODCAST_CHANNEL_ID}`;

export const PODCAST_UPLOADS_PLAYLIST_ID = `UU${PODCAST_CHANNEL_ID.slice(2)}`;

export const PODCAST_UPLOADS_FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PODCAST_UPLOADS_PLAYLIST_ID}`;

export interface EpisodeListenLinks {
	spotify?: string;
	apple?: string;
}

/**
 * Episodes on Spotify and Apple, keyed by YouTube video id.
 * Leave a platform out until that episode URL exists. Apple does not have
 * `_QhWfpW1c6o` yet.
 */
const EPISODE_LISTEN_LINKS: Record<string, EpisodeListenLinks> = {
	_QhWfpW1c6o: {
		spotify: 'https://open.spotify.com/episode/7qX8DTIfY1m2tjnPXDoEZK',
	},
	'0Mw1esXX1yo': {
		spotify: 'https://open.spotify.com/episode/34t0Xi7pJKXxKt8WoZzFU0',
		apple: 'https://podcasts.apple.com/us/podcast/the-malaysian-ai-podcast/id6824252077?i=1000797928202',
	},
	'Bj-8pQvkLa4': {
		spotify: 'https://open.spotify.com/episode/3ZWS1sE3CwqijPTCLMAZTS',
		apple: 'https://podcasts.apple.com/us/podcast/the-malaysian-ai-podcast/id6824252077?i=1000797595119',
	},
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

export function episodeListenLinks(id: string): EpisodeListenLinks | undefined {
	const links = EPISODE_LISTEN_LINKS[id];
	if (!links?.spotify && !links?.apple) return undefined;
	return links;
}

const LATEST_EPISODE_COUNT = 3;
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const CACHE_PATH = join(process.cwd(), 'src/data/podcast-cache.json');
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const GUEST_LINE = /Guest:\s*([^\n]+)/;
const EXPLICIT_EPISODE = /\bepisode\s+(\d+)\b/i;
const FIRST_EPISODE = /\bfirst episode\b/i;

/** Names taken from the episode's own description, when it has no `Guest:` line. */
const KNOWN_GUESTS: Record<string, string> = {
	_QhWfpW1c6o: 'Joseph Chin',
	'0Mw1esXX1yo': 'Isaac Tan',
	BAs18i68zvc: 'Ashvin Praveen',
	tWTAF6PK4hM: 'Ashvin Praveen',
	NMNndtAwYdc: 'Khailee Ng',
};

const MONTHS: Record<string, number> = {
	Jan: 0,
	Feb: 1,
	Mar: 2,
	Apr: 3,
	May: 4,
	Jun: 5,
	Jul: 6,
	Aug: 7,
	Sep: 8,
	Oct: 9,
	Nov: 10,
	Dec: 11,
};

export interface PodcastEpisode {
	id: string;
	title: string;
	published: string;
	description: string;
	url: string;
}

export interface ChannelVideo {
	id: string;
	title: string;
}

export interface ChannelVideoList {
	videos: ChannelVideo[];
	complete: boolean;
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

export function jsonStringAt(source: string, index: number): string | undefined {
	if (source[index] !== '"') return undefined;
	let escaped = false;
	for (let cursor = index + 1; cursor < source.length; cursor += 1) {
		const character = source[cursor];
		if (escaped) {
			escaped = false;
			continue;
		}
		if (character === '\\') {
			escaped = true;
			continue;
		}
		if (character === '"') {
			try {
				const value = JSON.parse(source.slice(index, cursor + 1)) as unknown;
				return typeof value === 'string' ? value : undefined;
			} catch {
				return undefined;
			}
		}
	}
	return undefined;
}

function readMarkedString(source: string, field: string, key: string) {
	const match = new RegExp(`"${field}"\\s*:\\s*\\{\\s*"${key}"\\s*:\\s*"`).exec(source);
	if (!match) return undefined;
	return jsonStringAt(source, match.index + match[0].length - 1);
}

/** A calendar date from a watch page, stored as 6pm KL (UTC+8, no daylight saving). */
export function parseYouTubeDate(value: string): string | undefined {
	const match = /^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/.exec(value.trim());
	if (!match) return undefined;
	const month = MONTHS[match[1] ?? ''];
	const day = Number(match[2]);
	const year = Number(match[3]);
	if (month === undefined || !Number.isInteger(day) || !Number.isInteger(year)) return undefined;
	const published = new Date(Date.UTC(year, month, day, 10, 0, 0));
	if (published.getUTCFullYear() !== year || published.getUTCMonth() !== month || published.getUTCDate() !== day) return undefined;
	return published.toISOString();
}

export function parseWatchPage(html: string, id: string, title: string): PodcastEpisode | undefined {
	if (!VIDEO_ID.test(id) || !title.trim()) return undefined;
	const description = readMarkedString(html, 'attributedDescription', 'content');
	const dateText = readMarkedString(html, 'publishDate', 'simpleText');
	const published = dateText ? parseYouTubeDate(dateText) : undefined;
	if (!description?.trim() || !published) return undefined;
	return {
		id,
		title: title.trim(),
		published,
		description,
		url: `https://www.youtube.com/watch?v=${id}`,
	};
}

function assignedJson(html: string, name: string): unknown {
	const marker = html.indexOf(name);
	if (marker < 0) return undefined;
	const brace = html.indexOf('{', marker);
	if (brace < 0) return undefined;
	let depth = 0;
	let inString = false;
	let escaped = false;
	for (let cursor = brace; cursor < html.length; cursor += 1) {
		const character = html[cursor];
		if (inString) {
			if (escaped) escaped = false;
			else if (character === '\\') escaped = true;
			else if (character === '"') inString = false;
			continue;
		}
		if (character === '"') {
			inString = true;
			continue;
		}
		if (character === '{') depth += 1;
		else if (character === '}') {
			depth -= 1;
			if (depth === 0) {
				try {
					return JSON.parse(html.slice(brace, cursor + 1)) as unknown;
				} catch {
					return undefined;
				}
			}
		}
	}
	return undefined;
}

function lockupTitle(record: Record<string, unknown>) {
	const metadata = record.metadata;
	if (!metadata || typeof metadata !== 'object') return '';
	const lockup = (metadata as Record<string, unknown>).lockupMetadataViewModel;
	if (!lockup || typeof lockup !== 'object') return '';
	const title = (lockup as Record<string, unknown>).title;
	if (!title || typeof title !== 'object') return '';
	const content = (title as Record<string, unknown>).content;
	return typeof content === 'string' ? content.trim() : '';
}

export function parseChannelVideoList(html: string): ChannelVideoList {
	const data = assignedJson(html, 'ytInitialData');
	const videos: ChannelVideo[] = [];
	const seen = new Set<string>();
	let continuation = false;
	walk(data);
	return { videos, complete: videos.length > 0 && !continuation };

	function walk(node: unknown) {
		if (!node || typeof node !== 'object') return;
		if (Array.isArray(node)) {
			for (const item of node) walk(item);
			return;
		}
		const record = node as Record<string, unknown>;
		// The channel header also has a continuation for the "more" description.
		// Only a continuation item in the video grid means the list is partial.
		const grid = record.richGridRenderer;
		if (grid && typeof grid === 'object') {
			const contents = (grid as Record<string, unknown>).contents;
			if (Array.isArray(contents) && contents.some(item => item && typeof item === 'object' && 'continuationItemRenderer' in (item as Record<string, unknown>))) {
				continuation = true;
			}
		}
		const id = record.contentId;
		if (typeof id === 'string' && VIDEO_ID.test(id) && record.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO' && !seen.has(id)) {
			const title = lockupTitle(record);
			if (title) {
				seen.add(id);
				videos.push({ id, title });
			}
		}
		for (const value of Object.values(record)) walk(value);
	}
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

function kualaLumpurDay(iso: string) {
	return new Intl.DateTimeFormat('en-CA', {
		timeZone: 'Asia/Kuala_Lumpur',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(new Date(iso));
}

function isInferredPublishTime(iso: string) {
	const date = new Date(iso);
	return date.getUTCHours() === 10
		&& date.getUTCMinutes() === 0
		&& date.getUTCSeconds() === 0
		&& date.getUTCMilliseconds() === 0;
}

/** Keep an exact feed timestamp when a later source only knows the calendar day. */
export function preferPublished(current: string, incoming: string) {
	if (Number.isNaN(Date.parse(incoming))) return current;
	if (Number.isNaN(Date.parse(current))) return incoming;
	if (kualaLumpurDay(current) === kualaLumpurDay(incoming) && isInferredPublishTime(incoming) && !isInferredPublishTime(current)) {
		return current;
	}
	return incoming;
}

function combineEpisodes(current: PodcastEpisode, incoming: PodcastEpisode): PodcastEpisode {
	return {
		id: current.id,
		title: incoming.title.trim() || current.title,
		published: preferPublished(current.published, incoming.published),
		description: incoming.description.trim() ? incoming.description : current.description,
		url: incoming.url || current.url,
	};
}

export function mergePodcastEpisodes(
	previous: PodcastEpisode[],
	fetched: PodcastEpisode[],
	canonical?: { ids: string[]; complete: boolean },
): PodcastEpisode[] {
	const byId = new Map<string, PodcastEpisode>();
	for (const episode of previous) {
		if (isEpisode(episode)) byId.set(episode.id, episode);
	}
	for (const episode of fetched) {
		if (!isEpisode(episode)) continue;
		const current = byId.get(episode.id);
		byId.set(episode.id, current ? combineEpisodes(current, episode) : episode);
	}
	const ids = canonical?.complete
		? canonical.ids.filter((id, index) => byId.has(id) && canonical.ids.indexOf(id) === index)
		: [...byId.keys()];
	return ids
		.map(id => byId.get(id))
		.filter((episode): episode is PodcastEpisode => Boolean(episode))
		.sort((a, b) => Date.parse(b.published) - Date.parse(a.published) || a.id.localeCompare(b.id));
}

export function explicitEpisodeNumber(episode: Pick<PodcastEpisode, 'title' | 'description'>) {
	const text = `${episode.title}\n${episode.description}`;
	const numbered = EXPLICIT_EPISODE.exec(text);
	if (numbered) {
		const value = Number(numbered[1]);
		if (value > 0) return value;
	}
	if (FIRST_EPISODE.test(text)) return 1;
	return undefined;
}

/** Channel videos from the first episode onward, in publish order. Earlier uploads stay unnumbered. */
export function episodeNumbers(episodes: PodcastEpisode[]) {
	const numbers = new Map<string, number>();
	const first = episodes
		.filter(episode => explicitEpisodeNumber(episode) === 1)
		.sort((a, b) => Date.parse(a.published) - Date.parse(b.published))[0];
	if (!first) {
		for (const episode of episodes) {
			const number = explicitEpisodeNumber(episode);
			if (number) numbers.set(episode.id, number);
		}
		return numbers;
	}
	const start = Date.parse(first.published);
	const series = episodes
		.filter(episode => Date.parse(episode.published) >= start)
		.sort((a, b) => Date.parse(a.published) - Date.parse(b.published) || a.id.localeCompare(b.id));
	series.forEach((episode, index) => {
		numbers.set(episode.id, index + 1);
	});
	return numbers;
}

export function guestName(episode: Pick<PodcastEpisode, 'id' | 'description'>) {
	const match = GUEST_LINE.exec(episode.description);
	const named = match?.[1]?.split(',')[0]?.replace(/\s+/g, ' ').trim() ?? '';
	if (named.length >= 3 && named.length <= 80) return named;
	return KNOWN_GUESTS[episode.id];
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

function reasonOf(error: unknown) {
	return error instanceof Error ? error.message : 'unknown error';
}

async function fetchText(url: string, accept: string, timeoutMs: number) {
	const response = await fetch(url, {
		headers: { accept, 'user-agent': USER_AGENT },
		signal: AbortSignal.timeout(timeoutMs),
	});
	if (!response.ok) throw new Error(`responded ${response.status}`);
	return response.text();
}

async function loadAtom() {
	const feeds = [
		['channel feed', PODCAST_FEED_URL],
		['uploads playlist', PODCAST_UPLOADS_FEED_URL],
	] as const;
	for (const [name, url] of feeds) {
		try {
			const xml = await fetchText(url, 'application/atom+xml, application/xml, text/xml', 8000);
			if (!xml.includes('<feed') || !xml.includes('<entry')) throw new Error('not an Atom feed');
			const episodes = parseYouTubeFeed(xml);
			if (episodes.length === 0) throw new Error('no episodes');
			return episodes;
		} catch (error) {
			console.warn(`YouTube ${name} unavailable (${reasonOf(error)}).`);
		}
	}
	return [];
}

async function loadChannelPage() {
	try {
		const html = await fetchText(PODCAST_CHANNEL_VIDEOS_URL, 'text/html', 12000);
		const page = parseChannelVideoList(html);
		if (page.videos.length === 0) throw new Error('no videos');
		return page;
	} catch (error) {
		console.warn(`YouTube channel page unavailable (${reasonOf(error)}).`);
		return undefined;
	}
}

async function hydrateVideo(id: string, title: string) {
	try {
		const html = await fetchText(`https://www.youtube.com/watch?v=${id}`, 'text/html', 12000);
		const episode = parseWatchPage(html, id, title);
		if (!episode) throw new Error('watch page had no description or publish date');
		return episode;
	} catch (error) {
		console.warn(`YouTube video ${id} unavailable (${reasonOf(error)}).`);
		return undefined;
	}
}

async function loadLiveEpisodes(previous: PodcastEpisode[]) {
	const atom = await loadAtom();
	const page = await loadChannelPage();
	if (atom.length === 0 && !page) return { episodes: previous, live: false };

	const previousById = new Map(previous.map(episode => [episode.id, episode]));
	const atomById = new Map(atom.map(episode => [episode.id, episode]));
	const fetched = [...atom];
	if (page) {
		for (const video of page.videos) {
			if (atomById.has(video.id)) continue;
			const prior = previousById.get(video.id);
			if (prior) {
				if (prior.title !== video.title) fetched.push({ ...prior, title: video.title });
				continue;
			}
			const hydrated = await hydrateVideo(video.id, video.title);
			if (hydrated) fetched.push(hydrated);
		}
	}
	const episodes = mergePodcastEpisodes(
		previous,
		fetched,
		page?.complete ? { ids: page.videos.map(video => video.id), complete: true } : undefined,
	);
	return { episodes, live: true };
}

export async function refreshPodcastEpisodes(): Promise<{ episodes: PodcastEpisode[]; live: boolean }> {
	const previous = cached();
	try {
		const result = await loadLiveEpisodes(previous);
		if (!result.live || result.episodes.length === 0) {
			console.warn('YouTube podcast sources unavailable; using the cached episode list.');
			return { episodes: previous, live: false };
		}
		await remember(result.episodes);
		return result;
	} catch (error) {
		console.warn(`YouTube podcast refresh failed (${reasonOf(error)}); using the cached episode list.`);
		return { episodes: previous, live: false };
	}
}

let episodesPromise: Promise<PodcastEpisode[]> | undefined;

export function loadPodcastEpisodes() {
	episodesPromise ??= refreshPodcastEpisodes().then(result => result.episodes);
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
