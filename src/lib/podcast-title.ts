const TRAILING_SHOW_NAME = /\s*[|–—-]\s*(?:the\s+)?Malaysian(?:\.ai| AI)(?:\s+Podcast)?\s*$/i;

/** Card titles drop a trailing show name such as "| Malaysian AI Podcast". */
export function displayTitle(title: string) {
	const cleaned = title.replace(TRAILING_SHOW_NAME, '').trim();
	return cleaned || title.trim();
}
