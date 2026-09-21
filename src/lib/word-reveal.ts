// Scroll-linked, word-by-word reveal for elements marked [data-word-reveal].
// Words switch on instantly (no fade); styling lives in global.css.

function splitWords(block: HTMLElement) {
	if (block.dataset.wordRevealReady) return;
	block.dataset.wordRevealReady = 'true';
	const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
	const nodes: Text[] = [];
	while (walker.nextNode()) nodes.push(walker.currentNode as Text);
	for (const node of nodes) {
		const parts = node.data.split(/(\s+)/);
		const fragment = document.createDocumentFragment();
		for (const part of parts) {
			if (!part) continue;
			if (/^\s+$/.test(part)) {
				fragment.append(part);
				continue;
			}
			const word = document.createElement('span');
			word.className = 'reveal-word';
			word.textContent = part;
			fragment.append(word);
		}
		node.replaceWith(fragment);
	}
}

export function mountWordReveal() {
	const blocks = [...document.querySelectorAll<HTMLElement>('[data-word-reveal]')];
	if (!blocks.length) return () => {};
	blocks.forEach(splitWords);
	// One sequence across every block, so only one word switches on at a time.
	const words = blocks.flatMap(block => [...block.querySelectorAll<HTMLElement>('.reveal-word')]);
	const first = blocks[0];
	const last = blocks[blocks.length - 1];

	let frame = 0;
	const update = () => {
		frame = 0;
		const viewport = window.innerHeight;
		const top = first.getBoundingClientRect().top;
		const span = last.getBoundingClientRect().bottom - top;
		// Starts when the first block enters the lower 10% of the screen and
		// finishes as the last block's last line passes 60% of the way down.
		const progress = (viewport * 0.9 - top) / (span + viewport * 0.3);
		const shown = Math.round(Math.min(Math.max(progress, 0), 1) * words.length);
		words.forEach((word, index) => word.classList.toggle('is-shown', index < shown));
	};
	const schedule = () => {
		if (!frame) frame = requestAnimationFrame(update);
	};

	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', schedule);
	update();
	return () => {
		cancelAnimationFrame(frame);
		window.removeEventListener('scroll', schedule);
		window.removeEventListener('resize', schedule);
	};
}
