// Residents can swap owed push-ups for one continuous forearm plank.
// Push-ups cleared = 10 · tanh(0.004x) · √(0.7x), where x is the hold in seconds.
// Short holds earn little per second, the rate peaks near four and a half
// minutes, then flattens so marathon holds stop paying off.

export function plankToPushUps(seconds: number) {
	if (!(seconds > 0)) return 0;
	return 10 * Math.tanh((0.04 * seconds) / 10) * Math.sqrt((7 * seconds) / 10);
}

/** Shortest whole-second hold that clears `pushUps`. The formula always rises, so a binary search is exact. */
export function plankSecondsFor(pushUps: number) {
	let low = 0;
	let high = 1;
	while (plankToPushUps(high) < pushUps) high *= 2;
	while (low < high) {
		const middle = Math.floor((low + high) / 2);
		if (plankToPushUps(middle) >= pushUps) high = middle;
		else low = middle + 1;
	}
	return low;
}

/** The hold length, in whole seconds, that clears the most push-ups per second. */
export const bestRateSeconds = (() => {
	let best = 1;
	for (let seconds = 2; seconds <= 3600; seconds++) {
		if (plankToPushUps(seconds) / seconds > plankToPushUps(best) / best) best = seconds;
	}
	return best;
})();

export function formatHold(totalSeconds: number) {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.round(totalSeconds % 60);
	if (!minutes) return `${seconds} s`;
	return seconds ? `${minutes} min ${seconds} s` : `${minutes} min`;
}
