import { test, expect } from '@playwright/test';
import cachedEpisodes from '../src/data/podcast-cache.json' with { type: 'json' };
import {
	episodeListenLinks,
	episodeNumbers,
	explicitEpisodeNumber,
	guestName,
	mergePodcastEpisodes,
	parseChannelVideoList,
	parseWatchPage,
	parseYouTubeDate,
	parseYouTubeFeed,
	preferPublished,
	type PodcastEpisode,
} from '../src/lib/podcast';

const episodes = cachedEpisodes as PodcastEpisode[];

function episode(id: string, published: string, title = `Episode ${id}`): PodcastEpisode {
	return {
		id,
		title,
		published,
		description: 'A description long enough to keep.',
		url: `https://www.youtube.com/watch?v=${id}`,
	};
}

test('podcast episode numbers follow publish order after the first episode', () => {
	const numbers = episodeNumbers(episodes);
	expect(numbers.get('tWTAF6PK4hM')).toBe(1);
	expect(numbers.get('OYqACwQJY9w')).toBe(2);
	expect(numbers.get('BAs18i68zvc')).toBe(3);
	expect(numbers.get('Bj-8pQvkLa4')).toBe(4);
	expect(numbers.get('0Mw1esXX1yo')).toBe(5);
	expect(numbers.get('_QhWfpW1c6o')).toBe(6);
	expect(numbers.has('NMNndtAwYdc')).toBe(false);
	expect(explicitEpisodeNumber(episodes.find(item => item.id === 'BAs18i68zvc')!)).toBe(3);
	expect(explicitEpisodeNumber(episodes.find(item => item.id === 'tWTAF6PK4hM')!)).toBe(1);
});

test('guest names come from the episode description', () => {
	expect(guestName(episodes.find(item => item.id === '_QhWfpW1c6o')!)).toBe('Joseph Chin');
	expect(guestName(episodes.find(item => item.id === '0Mw1esXX1yo')!)).toBe('Isaac Tan');
	expect(guestName(episodes.find(item => item.id === 'BAs18i68zvc')!)).toBe('Ashvin Praveen');
	expect(guestName(episodes.find(item => item.id === 'Bj-8pQvkLa4')!)).toBeUndefined();
	expect(guestName({ id: 'newvideoid1', description: 'Guest: Ada Lovelace, engineer\nMore' })).toBe('Ada Lovelace');
});

test('listen links can be Spotify without Apple', () => {
	expect(episodeListenLinks('_QhWfpW1c6o')).toEqual({
		spotify: 'https://open.spotify.com/episode/7qX8DTIfY1m2tjnPXDoEZK',
	});
	expect(episodeListenLinks('_QhWfpW1c6o')?.apple).toBeUndefined();
	expect(episodeListenLinks('0Mw1esXX1yo')?.spotify).toBe('https://open.spotify.com/episode/34t0Xi7pJKXxKt8WoZzFU0');
	expect(episodeListenLinks('0Mw1esXX1yo')?.apple).toContain('1000797928202');
	expect(episodeListenLinks('not-a-video')).toBeUndefined();
});

test('a dead feed keeps cached episodes and a complete channel list drops videos that are gone', () => {
	const previous = [
		episode('abcdefghijk', '2026-10-01T10:00:07.000Z', 'Kept'),
		episode('zyxwvutsrqp', '2026-09-01T10:00:07.000Z', 'Old'),
	];
	const fetched = [episode('abcdefghijk', '2026-10-01T10:00:00.000Z', 'Kept live')];
	const union = mergePodcastEpisodes(previous, fetched);
	expect(union.map(item => item.id)).toEqual(['abcdefghijk', 'zyxwvutsrqp']);
	expect(union[0]?.title).toBe('Kept live');
	expect(union[0]?.published).toBe('2026-10-01T10:00:07.000Z');

	const complete = mergePodcastEpisodes(previous, fetched, { ids: ['abcdefghijk'], complete: true });
	expect(complete.map(item => item.id)).toEqual(['abcdefghijk']);
});

test('YouTube date text becomes 6pm KL and an exact timestamp wins on that day', () => {
	expect(parseYouTubeDate('Oct 31, 2026')).toBe('2026-10-31T10:00:00.000Z');
	expect(parseYouTubeDate('Feb 31, 2026')).toBeUndefined();
	expect(preferPublished('2026-10-31T10:00:07.000Z', '2026-10-31T10:00:00.000Z')).toBe('2026-10-31T10:00:07.000Z');
});

test('channel and watch page parsers read the published video', () => {
	const html = `<script>ytInitialData = {"contents":[{"richItemRenderer":{"content":{"lockupViewModel":{"contentId":"_QhWfpW1c6o","contentType":"LOCKUP_CONTENT_TYPE_VIDEO","metadata":{"lockupMetadataViewModel":{"title":{"content":"I Thought AI Would End My Career"}}}}}}}]};</script>`;
	expect(parseChannelVideoList(html)).toEqual({
		videos: [{ id: '_QhWfpW1c6o', title: 'I Thought AI Would End My Career' }],
		complete: true,
	});
	const continued = html.replace('{"contents":', '{"richGridRenderer":{"contents":[{"continuationItemRenderer":{}}]},"contents":');
	expect(parseChannelVideoList(continued).videos).toHaveLength(1);
	expect(parseChannelVideoList(continued).complete).toBe(false);

	const watch = '"publishDate":{"simpleText":"Oct 31, 2026"},"attributedDescription":{"content":"When GPT-3 came out.\\n\\nSecond paragraph"}';
	expect(parseWatchPage(watch, '_QhWfpW1c6o', 'I Thought AI Would End My Career')).toMatchObject({
		id: '_QhWfpW1c6o',
		published: '2026-10-31T10:00:00.000Z',
		description: 'When GPT-3 came out.\n\nSecond paragraph',
		url: 'https://www.youtube.com/watch?v=_QhWfpW1c6o',
	});
});

test('the Atom feed parser keeps a real entry and skips a bad id', () => {
	const xml = `<?xml version="1.0"?><feed><entry><yt:videoId>_QhWfpW1c6o</yt:videoId><title>I Thought AI Would End My Career</title><published>2026-10-31T10:00:07+00:00</published><media:group xmlns:media="http://search.yahoo.com/mrss/"><media:description>Hello there</media:description></media:group></entry><entry><yt:videoId>short</yt:videoId><title>Nope</title><published>2026-10-31T10:00:07+00:00</published></entry></feed>`;
	const parsed = parseYouTubeFeed(xml);
	expect(parsed).toHaveLength(1);
	expect(parsed[0]).toMatchObject({
		id: '_QhWfpW1c6o',
		title: 'I Thought AI Would End My Career',
		published: '2026-10-31T10:00:07.000Z',
		description: 'Hello there',
	});
});
