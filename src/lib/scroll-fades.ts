// Mobile scroll story: the hero photo dims to black as the first paragraph
// arrives, and the hibiscus comes up out of the same black later on.
// Writes 0-1 progress into CSS variables; the styles decide what they do.

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

export function mountScrollFades() {
	const shell = document.querySelector<HTMLElement>('.hero-shell');
	const firstParagraph = document.querySelector<HTMLElement>('[data-word-reveal]');
	const flower = document.querySelector<HTMLElement>('.mission-flower');
	if (!shell || !firstParagraph || !flower) return () => {};

	let frame = 0;
	const update = () => {
		frame = 0;
		const viewport = window.innerHeight;
		// 0 until the first paragraph enters, 1 once it is 40% from the top.
		const dim = clamp((viewport - firstParagraph.getBoundingClientRect().top) / (viewport * 0.6));
		shell.style.setProperty('--hero-dim', dim.toFixed(3));
		// 0 until the flower enters, 1 once its top is halfway up the screen.
		const reveal = clamp((viewport * 0.95 - flower.getBoundingClientRect().top) / (viewport * 0.45));
		flower.style.setProperty('--flower-reveal', reveal.toFixed(3));
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
