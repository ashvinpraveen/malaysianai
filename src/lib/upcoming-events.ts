export const CALENDAR_FEED = 'https://api.luma.com/calendar/get-items?calendar_api_id=cal-pPgkuwCFrycSv1Z&period=future&pagination_limit=20';

export type UpcomingEvent = {
	id: string;
	name: string;
	href: string;
	startAt: string;
	endAt: string;
	cover: string;
	location: string;
};

const object = (value: unknown): Record<string, unknown> =>
	value && typeof value === 'object' ? value as Record<string, unknown> : {};

export function parseUpcomingEvents(value: unknown): UpcomingEvent[] {
	const data = object(value);
	if (!Array.isArray(data.entries)) throw new Error('Invalid calendar response');
	return data.entries.flatMap(entry => {
		const item = object(entry);
		const event = object(item.event);
		if (event.visibility !== 'public' || event.cancelled_at) return [];
		if (typeof event.api_id !== 'string' || typeof event.name !== 'string' ||
			typeof event.start_at !== 'string' || typeof event.end_at !== 'string' ||
			typeof event.url !== 'string' || !Number.isFinite(Date.parse(event.start_at)) ||
			!Number.isFinite(Date.parse(event.end_at))) return [];
		let href: URL;
		try { href = new URL(event.url, 'https://luma.com/'); } catch { return []; }
		if (href.origin !== 'https://luma.com') return [];
		const address = object(event.geo_address_info);
		const cover = typeof event.cover_url === 'string' && event.cover_url.startsWith('https://images.lumacdn.com/')
			? event.cover_url : '';
		return [{
			id: event.api_id, name: event.name, href: href.href,
			startAt: event.start_at, endAt: event.end_at, cover,
			// Show the public city label, never a hidden street address.
			location: event.location_type === 'online' ? 'Online' :
				typeof address.city === 'string' ? address.city : 'See event for location',
		}];
	});
}

export function nextEvents(events: UpcomingEvent[], now = Date.now()) {
	return events.filter(event => Date.parse(event.endAt) > now)
		.sort((a, b) => Date.parse(a.startAt) - Date.parse(b.startAt)).slice(0, 3);
}

export function eventDate(startAt: string) {
	return new Intl.DateTimeFormat('en-MY', {
		timeZone: 'Asia/Kuala_Lumpur', weekday: 'short', day: 'numeric', month: 'short',
	}).format(new Date(startAt));
}

export function eventTime(startAt: string) {
	return new Intl.DateTimeFormat('en-MY', {
		timeZone: 'Asia/Kuala_Lumpur', hour: 'numeric', minute: '2-digit', hour12: true,
	}).format(new Date(startAt));
}
