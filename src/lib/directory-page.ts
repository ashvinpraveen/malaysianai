import {
	companyCountLabel, directoryQueryString, facetCounts, filterKeys, filterLabels,
	parseDirectoryFilters, residentMatches, sortDirectory,
	type DirectoryEntry, type DirectoryFilters, type FilterKey,
} from './directory';

export function mountDirectory(root: HTMLElement): () => void {
	const form = root.querySelector('form');
	const count = root.querySelector<HTMLElement>('[data-count]');
	const empty = root.querySelector<HTMLElement>('[data-empty]');
	const active = root.querySelector<HTMLElement>('[data-active-filters]');
	const list = root.querySelector<HTMLElement>('.company-list');
	const index = root.querySelector('[data-directory-index]');
	if (!form || !count || !empty || !active || !list || !index) return () => {};

	const entries: DirectoryEntry[] = JSON.parse(index.textContent || '[]');
	const cards = new Map([...list.querySelectorAll<HTMLElement>('[data-company]')].map(card => [card.dataset.slug, card]));
	const search = form.querySelector<HTMLInputElement>('[name="q"]')!;
	const sort = form.querySelector<HTMLSelectElement>('[name="sort"]')!;
	const selects = Object.fromEntries(filterKeys.map(key => [key, form.querySelector<HTMLSelectElement>(`[name="${key}"]`)!])) as Record<FilterKey, HTMLSelectElement>;
	const controller = new AbortController();
	const { signal } = controller;
	let pendingWrite: ReturnType<typeof setTimeout> | undefined;
	let previousSort: DirectoryFilters['sort'] = 'name';

	const read = (): DirectoryFilters => ({
		q: search.value, cohort: selects.cohort.value, focus: selects.focus.value,
		location: selects.location.value, tag: selects.tag.value,
		sort: sort.value === 'cohort' ? 'cohort' : 'name',
	});
	const write = () => {
		clearTimeout(pendingWrite);
		pendingWrite = undefined;
		const next = `${window.location.pathname}${directoryQueryString(read(), new URLSearchParams(window.location.search))}${window.location.hash}`;
		const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
		// Astro owns history.state (including scroll restoration). Preserve it when updating filters.
		if (next !== current) window.history.replaceState(window.history.state, '', next);
	};
	const fillFromUrl = () => {
		clearTimeout(pendingWrite);
		pendingWrite = undefined;
		const filters = parseDirectoryFilters(new URLSearchParams(window.location.search));
		search.value = filters.q;
		sort.value = filters.sort;
		for (const key of filterKeys) {
			const allowed = [...selects[key].options].some(option => option.value === filters[key]);
			selects[key].value = allowed ? filters[key] : '';
		}
	};
	const render = () => {
		const filters = read();
		let visible = 0;
		for (const entry of entries) {
			const card = cards.get(entry.slug);
			const matches = residentMatches(entry, filters);
			if (card) card.hidden = !matches;
			if (matches) visible++;
		}
		if (previousSort !== filters.sort) {
			for (const entry of sortDirectory(entries, filters.sort)) {
				const card = cards.get(entry.slug);
				if (card) list.append(card);
			}
			previousSort = filters.sort;
		}
		count.textContent = companyCountLabel(visible);
		empty.hidden = visible !== 0;
		list.hidden = visible === 0;
		for (const key of filterKeys) {
			const counts = facetCounts(entries, filters, key);
			for (const option of selects[key].options) {
				if (!option.value) continue;
				const available = counts.get(option.value) ?? 0;
				option.textContent = `${option.value} (${available})`;
				option.disabled = available === 0 && option.value !== filters[key];
			}
		}
		const applied = (['q', ...filterKeys] as const).filter(key => filters[key].trim());
		active.hidden = applied.length === 0;
		active.replaceChildren(...applied.map(key => {
			const button = document.createElement('button');
			button.type = 'button';
			button.dataset.remove = key;
			const label = `${key === 'q' ? 'Search' : filterLabels[key]}: ${filters[key].trim()}`;
			button.textContent = `${label} ×`;
			button.setAttribute('aria-label', `Remove ${label}`);
			return button;
		}));
		const summary = root.querySelector('[data-filter-summary]');
		const facetTotal = filterKeys.filter(key => filters[key]).length;
		if (summary) summary.textContent = facetTotal ? `${facetTotal} active` : 'All companies';
		for (const button of root.querySelectorAll<HTMLElement>('.results-toolbar [data-clear]')) button.hidden = applied.length === 0;
	};
	const sync = () => { render(); write(); };
	const clear = () => {
		search.value = '';
		for (const key of filterKeys) selects[key].value = '';
		search.focus({ preventScroll: true });
		sync();
	};

	form.addEventListener('submit', event => { event.preventDefault(); sync(); }, { signal });
	form.addEventListener('input', event => {
		if (event.target !== search || (event as InputEvent).isComposing) return;
		render();
		clearTimeout(pendingWrite);
		pendingWrite = setTimeout(write, 180);
	}, { signal });
	form.addEventListener('change', sync, { signal });
	form.addEventListener('reset', event => { event.preventDefault(); clear(); }, { signal });
	root.addEventListener('click', event => {
		if (!(event.target instanceof Element)) return;
		const remove = event.target.closest<HTMLButtonElement>('[data-remove]');
		if (remove) {
			const key = remove.dataset.remove as 'q' | FilterKey;
			const field = key === 'q' ? search : selects[key];
			field.value = '';
			// Move focus before removing the clicked chip from the DOM.
			if (key !== 'q') form.querySelector('details')!.open = true;
			field.focus({ preventScroll: true });
			sync();
		} else if (event.target.closest('[data-clear]')) {
			clear();
		} else {
			const tag = event.target.closest<HTMLAnchorElement>('[data-directory-tag]');
			// Keep modified clicks and new-tab navigation working as ordinary links.
			if (tag && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
				event.preventDefault();
				selects.tag.value = tag.dataset.directoryTag ?? '';
				sync();
				active.querySelector<HTMLButtonElement>('[data-remove="tag"]')?.focus();
			} else if (event.target.closest('a') && pendingWrite) write();
		}
	}, { signal });
	// Flush a pending search before navigation through the header/footer as well as cards.
	document.addEventListener('click', event => {
		if (pendingWrite && event.target instanceof Element && event.target.closest('a')) write();
	}, { signal, capture: true });
	window.addEventListener('popstate', () => { fillFromUrl(); render(); }, { signal });
	window.addEventListener('pagehide', () => { if (pendingWrite) write(); }, { signal });

	fillFromUrl();
	if (filterKeys.some(key => selects[key].value)) form.querySelector('details')!.open = true;
	sync();
	form.hidden = false;
	return () => { clearTimeout(pendingWrite); controller.abort(); };
}
