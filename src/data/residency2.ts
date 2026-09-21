import type { FaqItem } from './faq';
import { residents } from './residents';

/** Programme facts shown in the residency2 hero strip. */
export const residency2Facts = [
	{ label: 'Cohort', value: '1 October – 30 November 2026' },
	{ label: 'Format', value: 'Full-time, in person · Kuala Lumpur' },
	{ label: 'Deadline', value: 'Apply by 1 October 2026' },
] as const;

export const residency2For = [
	'Founders and small teams already shipping an AI-native product — or ready to go full-time on one.',
	'Builders who want peer density: people next to them who are also all-in.',
	'Teams that will treat the 500 Global space as their daily working base for eight weeks.',
] as const;

export const residency2NotFor = [
	'Idea-only decks with no product in motion and no plan to ship during the cohort.',
	'Part-time side projects alongside a full-time job or full course load.',
	'People looking for a classroom course, a tourism co-working pass, or remote-only participation.',
] as const;

export const residency2Offer = [
	{
		title: 'A working home',
		body: 'A permanent desk at 500 Global in Kuala Lumpur, fast internet, meeting rooms, and a place your team shows up every day.',
	},
	{
		title: 'Weekly Show & Tell',
		body: 'Ship in public every Thursday. Demo what you built, take hard feedback, and watch what peers are actually shipping.',
	},
	{
		title: 'Hands-on support',
		body: 'Practical help across product, engineering, go-to-market, content, and fundraising — not slide-deck mentorship theatre.',
	},
	{
		title: 'Builder density',
		body: 'Live inside Malaysia’s AI community hub: workshops, hackathons, and founders who treat KL as a place to build for a global market.',
	},
	{
		title: '500 Global network',
		body: 'The residency sits inside a 500 Global initiative — intros, operator context, and a room that investors and builders already visit.',
	},
	{
		title: 'Try before you apply',
		body: 'Open Thursday Show & Tell sessions let you meet the room first. Feel the intensity before you commit eight weeks.',
	},
] as const;

export const residency2ApplySteps = [
	{
		title: 'Apply',
		body: 'Submit on the residency platform. Tell us what you are building, who is on the team, and why now.',
	},
	{
		title: 'Review',
		body: 'We read applications on a rolling basis and shortlist teams that look like a fit for an all-in cohort.',
	},
	{
		title: 'Conversation',
		body: 'Selected teams talk with us about product, commitment, and how you will use the space.',
	},
	{
		title: 'Start 1 October',
		body: 'Accepted residents begin the eight-week cohort at 500 Global, Kuala Lumpur.',
	},
] as const;

export type ResidenceStory = {
	/** Must match a name in `residents`. */
	name: string;
	story: string;
};

/** Narrative arcs for a few residents — proof by people, not only logos. */
export const residency2Stories: ResidenceStory[] = [
	{
		name: 'Cleve',
		story:
			'Cleve is building a personal AI content assistant that learns from notes, email, and social profiles — then writes in the user’s own voice. In residency they get a daily base to ship RAG workflows, pressure-test output quality, and raise the product past “demo clever” into something people rely on.',
	},
	{
		name: 'Seavoice',
		story:
			'Seavoice deploys human-like voice agents for support, outbound sales, and booking — including local-language calls. The residency gives them a KL working home to harden telephony integrations, run demos in front of operators, and push enterprise readiness with peers who ship every week.',
	},
	{
		name: 'DocuAsk',
		story:
			'DocuAsk turns company files into searchable AI assistants without a custom engineering project. During residency the team is deep in real knowledge-base installs — manuals, PDFs, internal docs — with weekly demos forcing clarity on what actually works for customers.',
	},
	{
		name: 'ReplyrAI',
		story:
			'ReplyrAI turns inbound clinic chats into booked patients with follow-up and appointment workflows. In the cohort they sit beside other B2B AI teams, stress-test conversion loops, and use Show & Tell as a forcing function to ship measurable growth, not just chatbot novelty.',
	},
];

export function residency2StoryEntries() {
	return residency2Stories.map((entry) => {
		const resident = residents.find((item) => item.name === entry.name);
		if (!resident) throw new Error(`Unknown residency2 story resident: ${entry.name}`);
		return { resident, story: entry.story };
	});
}

export const residency2Faqs: FaqItem[] = [
	{
		question: 'What is the Malaysian AI residency?',
		answer:
			'An eight-week, full-time, in-person cohort at 500 Global in Kuala Lumpur for founders building AI-native products. You get a working home, weekly Show & Tell demos, peer density, and hands-on support across product, engineering, go-to-market, and fundraising.',
	},
	{
		question: 'Who should apply?',
		answer:
			'Early teams already shipping — or ready to go all-in — on an AI-native product. We look for clear product direction and a commitment to treat the KL space as a daily base. Idea-only decks and part-time side projects are not a fit.',
	},
	{
		question: 'Who should not apply?',
		answer:
			'Anyone who cannot go full-time for the cohort, anyone looking for a remote or classroom programme, and teams that only want a co-working pass without shipping pressure.',
	},
	{
		question: 'What do residents get?',
		answer:
			'A permanent desk at 500 Global, fast internet and meeting rooms, weekly Show & Tell, hands-on support across technical work, product, go-to-market, content, and fundraising, plus access to the Malaysian AI community and 500 Global network.',
	},
	{
		question: 'How long is the cohort?',
		answer:
			'Eight weeks, full-time and in person: 1 October to 30 November 2026. Applications close 1 October 2026.',
	},
	{
		question: 'Is there a fee?',
		answer:
			'The residency is invitation-based for selected teams. Programme terms, including any fees, are shared during the review process after you apply.',
	},
	{
		question: 'Do I need to relocate to Kuala Lumpur?',
		answer:
			'Yes for the cohort window. The programme is centred on the 500 Global space as a daily working base. Remote-only participation is not offered.',
	},
	{
		question: 'Can I visit before I apply?',
		answer:
			'Yes. Join an open Thursday Show & Tell to meet residents and feel the room before you commit. Register via the Malaysian AI Luma calendar.',
	},
	{
		question: 'How do I apply?',
		answer:
			'Use Apply now on this page to open the residency platform. We review on a rolling basis, then follow up with teams that look like a fit for a conversation.',
	},
	{
		question: 'Who runs the residency?',
		answer:
			'Malaysian AI is an initiative started by 500 Global. The residency is the all-in founder track inside that community programme, based at 500 Global, Bangunan AICB in Kuala Lumpur.',
	},
];

/** Logos strip uses the full resident directory. */
export const residency2LogoResidents = residents;
