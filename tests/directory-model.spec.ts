import { test, expect } from '@playwright/test';
import { directoryCompanies, directoryIndex, peopleForCompany } from '../src/lib/directory-data';
import {
	directoryPath, directoryQueryString, facetCounts, normalizeSearch,
	parseDirectoryFilters, residentMatches, sortDirectory,
} from '../src/lib/directory';

const filters = (query = '') => parseDirectoryFilters(new URLSearchParams(query));

test('search handles accents, punctuation, spacing, people and unordered words', () => {
	expect(normalizeSearch('  LÍZZIE—Tán  ')).toBe('lizzie tan');
	expect(directoryIndex.filter(entry => residentMatches(entry, filters('q=tan+cléve'))).map(entry => entry.slug)).toEqual(['cleve']);
	expect(directoryIndex.filter(entry => residentMatches(entry, filters('q=API+Hong+Bing'))).map(entry => entry.slug)).toEqual(['codekite']);
	expect(directoryIndex.filter(entry => residentMatches(entry, filters('q=---')))).toHaveLength(directoryCompanies.length);
});

test('facet counts ignore their own selection and include the other filters', () => {
	const state = filters('cohort=01&focus=Education');
	expect(facetCounts(directoryIndex, state, 'focus').get('Education')).toBe(1);
	expect(facetCounts(directoryIndex, state, 'focus').get('Voice & Speech')).toBe(1);
	expect(facetCounts(directoryIndex, state, 'location').get('Kuala Lumpur')).toBe(1);
	expect(facetCounts(directoryIndex, state, 'tag').get('API')).toBeUndefined();
	expect(directoryIndex.filter(entry => residentMatches(entry, state)).map(entry => entry.slug)).toEqual(['kelas-sekejap']);
});

test('query serialization is canonical, round trips, and preserves unrelated parameters', () => {
	const state = filters('q=+Lizzie+&cohort=01&sort=cohort');
	const query = directoryQueryString(state, new URLSearchParams('utm_source=community&cohort=02&cohort=03&sort=bad'));
	expect(query).toBe('?utm_source=community&q=Lizzie&cohort=01&sort=cohort');
	expect(filters(query)).toEqual({ ...state, q: 'Lizzie' });
	expect(directoryQueryString(filters(), new URLSearchParams('utm_source=community&q=old'))).toBe('?utm_source=community');
	expect(filters('sort=invalid').sort).toBe('name');
});

test('company URLs and people links remain stable across display-name changes', () => {
	const company = directoryCompanies.find(company => company.slug === 'cleve')!;
	const renamed = { ...company, name: 'A new display name' };
	expect(directoryPath(renamed)).toBe('/directory/cleve');
	expect(peopleForCompany(renamed).map(person => person.slug)).toEqual(['lizzie-tan']);
	expect(peopleForCompany({ slug: 'replyrai' })).toEqual([]);
});

test('sorting keeps the search index intact and orders cohort ties alphabetically', () => {
	const original = directoryIndex.map(entry => entry.slug);
	const newest = sortDirectory(directoryIndex, 'cohort');
	expect(newest.map(entry => entry.cohort)).toEqual(['02', '02', '02', '02', '02', '01', '01', '01']);
	expect(newest[0].name).toBe('A47 Media');
	expect(sortDirectory(directoryIndex, 'name').at(-1)?.name).toBe('Seavoice');
	expect(directoryIndex.map(entry => entry.slug)).toEqual(original);
});
