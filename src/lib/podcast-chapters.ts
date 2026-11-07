export interface PodcastChapter {
	at: string;
	seconds: number;
	title: string;
}

const CHAPTER_LINE = /^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})\s*[-–—]?\s+(.+)$/;

/** Timestamped lines from a YouTube description, such as `00:00 Cold open` or `1:17:27 Title`. */
export function parseChapters(description: string): PodcastChapter[] {
	const chapters: PodcastChapter[] = [];
	for (const rawLine of description.split('\n')) {
		const match = CHAPTER_LINE.exec(rawLine.trim());
		if (!match) continue;
		const hours = match[1] ? Number(match[1]) : 0;
		const minutes = Number(match[2]);
		const seconds = Number(match[3]);
		const title = (match[4] ?? '').replace(/^[-–—]\s*/, '').trim();
		if (!title) continue;
		chapters.push({
			at: match[1] ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}` : `${minutes}:${String(seconds).padStart(2, '0')}`,
			seconds: hours * 3600 + minutes * 60 + seconds,
			title,
		});
	}
	return chapters;
}

function isChapterBlock(paragraph: string) {
	const lines = paragraph.split('\n').map(line => line.trim()).filter(Boolean);
	if (lines.length === 0) return false;
	const chapterLines = lines.filter(line => CHAPTER_LINE.test(line.replace(/^[-–—]\s*/, '')));
	return chapterLines.length >= 2 && chapterLines.length >= lines.length - 1;
}

/** Narrative paragraphs from a YouTube description, without the timestamp list or a hashtag line. */
export function proseFromDescription(description: string) {
	return description
		.replace(/\r\n/g, '\n')
		.split(/\n\s*\n/)
		.map(paragraph => paragraph.trim())
		.filter(paragraph => {
			if (!paragraph) return false;
			const words = paragraph.split(/\s+/);
			if (words.length > 0 && words.every(word => word.startsWith('#'))) return false;
			if (isChapterBlock(paragraph)) return false;
			return true;
		});
}

export function linkParts(paragraph: string) {
	const parts: { text: string; href?: string }[] = [];
	const pattern = /https?:\/\/[^\s)]+/g;
	let last = 0;
	for (const match of paragraph.matchAll(pattern)) {
		const index = match.index ?? 0;
		if (index > last) parts.push({ text: paragraph.slice(last, index) });
		const href = match[0].replace(/[.,]$/, '');
		parts.push({ text: href, href });
		last = index + href.length;
		if (match[0].length > href.length) parts.push({ text: match[0].slice(href.length) });
	}
	if (last < paragraph.length) parts.push({ text: paragraph.slice(last) });
	if (parts.length === 0) parts.push({ text: paragraph });
	return parts;
}
