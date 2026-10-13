import { residents } from '../data/residents';
import {
	companyCountLabel,
	directoryQueryString,
	parseDirectoryFilters,
	residentMatches,
	residentSlug,
	type DirectoryFilters,
} from './directory';

const filterNames = ['cohort', 'focus', 'location', 'tag'] as const;

function fieldValue(data: FormData, key: string): string {
	const raw = data.get(key);
	return typeof raw === 'string' ? raw : '';
}

function readFilters(form: HTMLFormElement): DirectoryFilters {
	const data = new FormData(form);
	return {
		q: fieldValue(data, 'q'),
		cohort: fieldValue(data, 'cohort'),
		focus: fieldValue(data, 'focus'),
		location: fieldValue(data, 'location'),
		tag: fieldValue(data, 'tag'),
	};
}

export function mountDirectory(root: HTMLElement): () => void {
	const form = root.querySelector('form');
	const count = root.querySelector<HTMLElement>('[data-count]');
	const empty = root.querySelector<HTMLElement>('[data-empty]');
	const cards = [...root.querySelectorAll<HTMLElement>('[data-company]')];
	if (!(form instanceof HTMLFormElement) || !count || !empty) return () => {};

	const bySlug = new Map(residents.map(resident => [residentSlug(resident.name), resident]));
	const controller = new AbortController();
	const { signal } = controller;

	const apply = () => {
		const filters = readFilters(form);
		let visible = 0;
		for (const card of cards) {
			const resident = bySlug.get(card.dataset.slug ?? '');
			const match = resident ? residentMatches(resident, filters) : false;
			card.hidden = !match;
			if (match) visible += 1;
		}
		count.textContent = companyCountLabel(visible);
		empty.hidden = visible !== 0;
	};

	const write = () => {
		const next = `${location.pathname}${directoryQueryString(readFilters(form))}${location.hash}`;
		const current = `${location.pathname}${location.search}${location.hash}`;
		if (next !== current) history.replaceState(null, '', next);
	};

	const fillFromUrl = () => {
		const filters = parseDirectoryFilters(new URLSearchParams(location.search));
		const search = form.querySelector('input[name="q"]');
		if (search instanceof HTMLInputElement) search.value = filters.q;
		for (const name of filterNames) {
			const select = form.querySelector(`select[name="${name}"]`);
			if (!(select instanceof HTMLSelectElement)) continue;
			const wanted = filters[name];
			const allowed = [...select.options].some(option => option.value === wanted);
			select.value = allowed ? wanted : '';
		}
	};

	const sync = () => {
		write();
		apply();
	};

	form.addEventListener('submit', event => {
		event.preventDefault();
		sync();
	}, { signal });
	form.addEventListener('input', sync, { signal });
	form.addEventListener('change', sync, { signal });
	form.addEventListener('reset', () => {
		requestAnimationFrame(sync);
	}, { signal });
	window.addEventListener('popstate', () => {
		fillFromUrl();
		apply();
	}, { signal });

	fillFromUrl();
	sync();
	return () => controller.abort();
}
