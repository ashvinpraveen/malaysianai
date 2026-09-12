import type { PageMetadata } from './seo';

// Research-backed targets, not a ranking by search volume. See docs/seo-keywords.md.
export const communityKeywords = ['Malaysian AI', 'Malaysia AI community', 'Malaysian community'];
export const nicheKeywords = [
	'Malaysia AI',
	'AI community Malaysia',
	'artificial intelligence Malaysia',
	'AI events Malaysia',
	'AI workshops Malaysia',
	'AI meetup Kuala Lumpur',
	'AI hackathon Malaysia',
	'generative AI Malaysia',
	'AI startups Malaysia',
	'AI residency Malaysia',
];

export const communityDescription =
	'Malaysian AI connects the Malaysia AI community. Discover AI events, workshops, hackathons and builder groups across Malaysia, plus our Kuala Lumpur residency.';

// Head-only copy: page descriptions are sometimes also rendered in the body.
// Keep search metadata here so SEO edits do not alter the visible UI.
export const seoContentByPath: Record<string, Partial<Pick<PageMetadata, 'title' | 'description' | 'keywords'>>> = {
	'/': {
		title: 'Malaysian AI | Malaysia AI Community & Events',
		description: communityDescription,
		keywords: [...communityKeywords, ...nicheKeywords],
	},
	'/about': {
		title: 'About Our Malaysia AI Community',
		description: 'Meet Malaysian AI, a Malaysian community for AI builders and curious learners. Find workshops, meetups and founder support in Kuala Lumpur and across Malaysia.',
		keywords: [...communityKeywords, 'AI community Malaysia', 'artificial intelligence Malaysia'],
	},
	'/residency': {
		title: 'AI Residency Malaysia | Build in Kuala Lumpur',
		description: 'Build your AI startup at the Malaysian AI residency in Kuala Lumpur. Find co-working space, regular demos and support with product, engineering and fundraising.',
		keywords: ['Malaysian AI', 'AI residency Malaysia', 'AI startups Malaysia'],
	},
	'/residents': {
		title: 'AI Startups Malaysia | Meet the Residents',
		description: 'Meet the AI startups, founders and teams building products at Malaysian AI. Explore resident companies in our Kuala Lumpur AI residency.',
		keywords: ['Malaysian AI', 'AI startups Malaysia', 'AI residency Malaysia'],
	},
	'/blog': {
		title: 'Malaysia AI Community Stories & Updates',
		description: 'Read stories from the Malaysia AI community: AI events, hands-on learning, builder projects and updates from the Malaysian AI residency.',
		keywords: ['Malaysian AI', 'Malaysia AI community', 'AI events Malaysia', 'AI workshops Malaysia'],
	},
	'/contact': {
		title: 'Contact the Malaysia AI Community',
		description: 'Contact Malaysian AI about community events, workshops or the Kuala Lumpur residency. Add your Malaysian community to the directory or find an upcoming event.',
		keywords: [...communityKeywords, 'AI events Malaysia', 'AI workshops Malaysia'],
	},
	'/blog/largest-ai-learnathon': {
		keywords: ['Malaysian AI', 'Malaysia AI community', 'AI events Malaysia', 'AI workshops Malaysia', 'generative AI Malaysia'],
	},
	'/blog/applications-open-2026': {
		keywords: ['Malaysian AI', 'AI residency Malaysia', 'AI startups Malaysia'],
	},
	'/blog/inside-the-curriculum': {
		keywords: ['Malaysian AI', 'AI residency Malaysia'],
	},
};
