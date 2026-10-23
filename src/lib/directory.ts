import { profiles } from '../data/profiles';
import type { Resident } from '../data/residents';

export type DirectoryPerson = {
	name: string;
	role: string;
	href: string;
};

function companyKey(value: string): string {
	return value.trim().toLowerCase();
}

/** People whose profile says they are building this company. Names and roles stay in profiles.ts. */
export function peopleForCompany(resident: Pick<Resident, 'name'>): DirectoryPerson[] {
	return profiles
		.filter(profile => companyKey(profile.building) === companyKey(resident.name))
		.map(profile => ({
			name: profile.name,
			role: profile.role,
			href: `/residents/${profile.slug}`,
		}))
		.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

export type DirectoryFilters = {
	q: string;
	cohort: string;
	focus: string;
	location: string;
	tag: string;
};

type DirectoryResident = Pick<Resident, 'name' | 'tag' | 'description' | 'focus' | 'location' | 'cohort' | 'tags'>;

export function residentSlug(name: string): string {
	const slug = name
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	if (!slug) throw new Error(`Cannot slug resident name: ${name}`);
	return slug;
}

export function directoryPath(name: string): string {
	return `/directory/${residentSlug(name)}`;
}

export function uniqueSorted(values: string[]): string[] {
	return [...new Set(values)].sort((a, b) => a.localeCompare(b, 'en'));
}

export function residentSearchText(resident: DirectoryResident): string {
	return [
		resident.name,
		resident.tag,
		resident.description,
		resident.focus,
		resident.location,
		resident.cohort,
		...resident.tags,
		...peopleForCompany(resident).flatMap(person => [person.name, person.role]),
	].join(' ').toLowerCase();
}

export function residentMatches(resident: DirectoryResident, filters: DirectoryFilters): boolean {
	if (filters.cohort && resident.cohort !== filters.cohort) return false;
	if (filters.focus && resident.focus !== filters.focus) return false;
	if (filters.location && resident.location !== filters.location) return false;
	if (filters.tag && !resident.tags.includes(filters.tag)) return false;
	const query = filters.q.trim().toLowerCase();
	if (!query) return true;
	return residentSearchText(resident).includes(query);
}

export function parseDirectoryFilters(params: URLSearchParams): DirectoryFilters {
	return {
		q: params.get('q') ?? '',
		cohort: params.get('cohort') ?? '',
		focus: params.get('focus') ?? '',
		location: params.get('location') ?? '',
		tag: params.get('tag') ?? '',
	};
}

export function directoryQueryString(filters: DirectoryFilters): string {
	const params = new URLSearchParams();
	const query = filters.q.trim();
	if (query) params.set('q', query);
	if (filters.cohort) params.set('cohort', filters.cohort);
	if (filters.focus) params.set('focus', filters.focus);
	if (filters.location) params.set('location', filters.location);
	if (filters.tag) params.set('tag', filters.tag);
	const serialized = params.toString();
	return serialized ? `?${serialized}` : '';
}

export function companyCountLabel(count: number): string {
	return count === 1 ? '1 company' : `${count} companies`;
}
