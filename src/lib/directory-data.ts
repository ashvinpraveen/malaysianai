import { profiles, type Profile } from '../data/profiles';
import { residents } from '../data/residents';
import { normalizeSearch, type DirectoryEntry } from './directory';

// Fail the build for broken relationships rather than silently dropping a person's link.
const slugs = new Set<string>();
for (const resident of residents) {
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(resident.slug) || slugs.has(resident.slug)) {
		throw new Error(`Invalid or duplicate company slug: ${resident.slug}`);
	}
	slugs.add(resident.slug);
}
for (const profile of profiles) {
	if (profile.companySlug && !slugs.has(profile.companySlug)) {
		throw new Error(`Unknown company ${profile.companySlug} on profile ${profile.slug}`);
	}
}

export function peopleForCompany(company: { slug: string }): Profile[] {
	return profiles.filter(profile => profile.companySlug === company.slug)
		.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

export const directoryCompanies = [...residents].sort((a, b) => a.name.localeCompare(b.name, 'en'));

// Only this compact index crosses the client boundary. Full profiles and bios stay on the server.
export const directoryIndex: DirectoryEntry[] = directoryCompanies.map(company => ({
	slug: company.slug,
	name: company.name,
	cohort: company.cohort,
	focus: company.focus,
	location: company.location,
	tags: company.tags,
	searchText: normalizeSearch([
		company.name, company.tag, company.description, company.focus, company.location, company.cohort,
		new URL(company.website).hostname, ...company.tags,
		...peopleForCompany(company).flatMap(person => [person.name, person.role]),
	].join(' ')),
}));
