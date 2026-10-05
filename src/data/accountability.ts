import { formatHold, plankSecondsFor, plankToPushUps } from '../lib/plank-conversion';
import type { FaqItem } from './faq';

/** One place for the house rules. Page copy, the stack meter and the plank calculator all read these. */
export const stakes = {
	pushUpsPerTask: 50,
	ringgitPerTask: 50,
	/** Push-up debt resets at this cap and is paid off in cash. */
	pushUpCap: 500,
	clearWithinWeeks: 2,
	/** Push-ups still owed after the deadline convert to RM1 for every two. */
	pushUpsPerRinggit: 2,
} as const;

export const tasksToCap = stakes.pushUpCap / stakes.pushUpsPerTask;

/** Monday to Monday. Days with a title get a label on the week strip. */
export const accountabilityWeek = [
	{ day: 'Mon', title: 'Declare', body: 'Say out loud what you will finish by next Monday. You pick the tasks.' },
	{ day: 'Tue' },
	{ day: 'Wed' },
	{ day: 'Thu' },
	{ day: 'Fri' },
	{ day: 'Sat' },
	{ day: 'Sun' },
	{ day: 'Mon', title: 'Report & settle', body: 'Done or not done. Each miss costs a stake, then you declare the next week.' },
] as const;

export const accountabilityFaqs: FaqItem[] = [
	{
		question: 'What is an accountability session?',
		answer:
			'Every Monday, Malaysian AI residents meet at the residency space in Kuala Lumpur. Each person names the tasks they will finish by the following Monday. A week later everyone reports back, and each missed task costs a stake.',
	},
	{
		question: 'Is it mandatory?',
		answer:
			'No. Accountability Mondays are optional and nobody is forced to stake anything. Most residents take part because a goal said out loud to the room is easier to keep.',
	},
	{
		question: 'Who decides what counts as a task?',
		answer:
			'You do. Tasks are self-declared: ship a feature, call ten customers, publish a post. The room only holds you to what you said you would finish by the next Monday.',
	},
	{
		question: 'What happens if I miss a task?',
		answer: `For each missed task you choose ${stakes.pushUpsPerTask} push-ups or RM${stakes.ringgitPerTask}. Cash goes straight into the common pool.`,
	},
	{
		question: 'How long do I have to finish my push-ups?',
		answer: `${stakes.clearWithinWeeks} weeks. Any push-ups still owed after that convert to cash at RM1 for every ${stakes.pushUpsPerRinggit} push-ups, paid into the common pool. Thirty push-ups left over becomes RM15.`,
	},
	{
		question: 'Is there a limit to how many push-ups I can owe?',
		answer: `Yes. Push-ups stack up to ${stakes.pushUpCap}, which is ${tasksToCap} missed tasks. When your stack reaches ${stakes.pushUpCap} it resets to zero and you pay it off in cash instead.`,
	},
	{
		question: 'Can I plank instead of doing push-ups?',
		answer: `Yes. One continuous forearm plank converts to push-ups with the formula 10 · tanh(0.004x) · √(0.7x), where x is the hold in seconds. A ${formatHold(plankSecondsFor(stakes.pushUpsPerTask))} plank clears one task (${stakes.pushUpsPerTask} push-ups), and a 5 min plank clears ${Math.floor(plankToPushUps(300))}.`,
	},
	{
		question: 'Why does a longer plank earn less per second?',
		answer:
			'The formula is built to reward a solid hold, not an endless one. It earns slowly for short holds, is most generous at about four and a half minutes, then flattens. Clearing a full 500 push-up stack would take an hour-long plank.',
	},
	{
		question: 'Can visitors join an accountability session?',
		answer:
			'No, accountability sessions are for residents only. Visitors are welcome at the open Thursday Show & Tell, and you can apply to the residency to join the sessions.',
	},
];
