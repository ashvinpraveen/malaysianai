// Shared search logic. Keep content imports out of this module: it also runs in the browser.
export const filterKeys = ['cohort', 'focus', 'location', 'tag'] as const;
export type FilterKey = typeof filterKeys[number];
export const filterLabels: Record<FilterKey, string> = {
	cohort: 'Cohort', focus: 'Industry', location: 'Location', tag: 'Tag',
};
export type DirectoryFilters = Record<FilterKey | 'q', string> & { sort: 'name' | 'cohort' };
export type DirectoryEntry = {
	slug: string;
	name: string;
	cohort: string;
	focus: string;
	location: string;
	tags: string[];
	searchText: string;
};

export function directoryPath(company: { slug: string }): string {
	return `/directory/${company.slug}`;
}

export function uniqueSorted(values: string[]): string[] {
	return [...new Set(values)].sort((a, b) => a.localeCompare(b, 'en'));
}

/** Accent, case and punctuation insensitive; query words can appear in any order. */
export function normalizeSearch(value: string): string {
	return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
		.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

export function residentMatches(entry: DirectoryEntry, filters: DirectoryFilters, omit?: FilterKey): boolean {
	for (const key of filterKeys) {
		if (key === omit || !filters[key]) continue;
		if (key === 'tag' ? !entry.tags.includes(filters[key]) : entry[key] !== filters[key]) return false;
	}
	return normalizeSearch(filters.q).split(/\s+/).every(word => entry.searchText.includes(word));
}

/** Counts ignore their own facet, so users can see alternatives before switching it. */
export function facetCounts(entries: DirectoryEntry[], filters: DirectoryFilters, key: FilterKey): Map<string, number> {
	const counts = new Map<string, number>();
	for (const entry of entries) {
		if (!residentMatches(entry, filters, key)) continue;
		for (const value of key === 'tag' ? entry.tags : [entry[key]]) {
			counts.set(value, (counts.get(value) ?? 0) + 1);
		}
	}
	return counts;
}

export function sortDirectory(entries: DirectoryEntry[], sort: DirectoryFilters['sort']): DirectoryEntry[] {
	return [...entries].sort((a, b) =>
		(sort === 'cohort' ? b.cohort.localeCompare(a.cohort, 'en', { numeric: true }) : 0)
		|| a.name.localeCompare(b.name, 'en'),
	);
}

export function parseDirectoryFilters(params: URLSearchParams): DirectoryFilters {
	return {
		q: params.get('q') ?? '',
		cohort: params.get('cohort') ?? '',
		focus: params.get('focus') ?? '',
		location: params.get('location') ?? '',
		tag: params.get('tag') ?? '',
		sort: params.get('sort') === 'cohort' ? 'cohort' : 'name',
	};
}

/** Preserve unrelated query parameters (e.g. campaign attribution). */
export function directoryQueryString(filters: DirectoryFilters, existing = new URLSearchParams()): string {
	const params = new URLSearchParams(existing);
	for (const key of ['q', ...filterKeys, 'sort'] as const) {
		params.delete(key);
		const value = key === 'q' ? filters.q.trim() : filters[key];
		if (value && !(key === 'sort' && value === 'name')) params.set(key, value);
	}
	const serialized = params.toString();
	return serialized ? `?${serialized}` : '';
}

export function companyCountLabel(count: number): string {
	return count === 1 ? '1 company' : `${count} companies`;
}
