export type Resident = {
	name: string;
	tag: string;
	logoClass?: string;
	wordmark?: string;
	focus: string;
	location: string;
	cohort: string;
	website: string;
	description: string;
	tags: string[];
	logo?: string;
	tile: 'light' | 'dark';
};

export const residents: Resident[] = [
	{
		name: 'Cleve',
		tag: 'Personal AI content assistant',
		logo: '/cleve-logo.svg',
		focus: 'Knowledge Systems',
		location: 'Penang',
		cohort: '01',
		website: 'https://cleve.ai',
		description:
			'Personal AI content assistant that learns from your notes, emails, and social profiles. Cleve helps users capture ideas and turn them into posts, blogs, and scripts in their own voice.',
		tags: ['RAG', 'Operations', 'Search'],
		tile: 'light',
	},
	{
		name: 'ReplyrAI',
		tag: 'AI growth platform for clinics',
		wordmark: 'Replyr.AI',
		focus: 'Customer Experience',
		location: 'Kuala Lumpur',
		cohort: '02',
		website: 'https://replyr.ai',
		description:
			'AI growth platform for clinics that turns inbound chats into booked patients. It combines AI chat, lead follow-up, and appointment workflows to help teams convert more enquiries.',
		tags: ['Support', 'Automation', 'B2B'],
		tile: 'light',
	},
	{
		name: 'DocuAsk',
		tag: 'Chat with your documents',
		wordmark: 'DocuAsk',
		focus: 'Document AI',
		location: 'Johor Bahru',
		cohort: '02',
		website: 'https://docuask.com',
		description:
			'No-code document chatbot platform that turns company files into searchable AI assistants. Teams can upload manuals, PDFs, and internal content so customers and staff can chat with their knowledge base.',
		tags: ['Analysis', 'Knowledge', 'Workflow'],
		tile: 'light',
	},
	{
		name: 'Blue Bolt Labs',
		tag: 'MVP studio for solo founders',
		logo: '/blueboltlabs.webp',
		focus: 'Industry 4.0',
		location: 'Shah Alam',
		cohort: '02',
		website: 'https://blueboltlabs.com',
		description:
			'MVP studio for solo founders that ships launch-ready products in a focused 21-day sprint. Blue Bolt Labs handles scoping, build, and handover so founders can validate ideas quickly with real users.',
		tags: ['Automation', 'IoT', 'Field Ops'],
		tile: 'light',
	},
	{
		name: 'Seavoice',
		tag: 'Enterprise voice AI agents',
		logo: '/seavoice_icon.png',
		focus: 'Voice & Speech',
		location: 'Kota Kinabalu',
		cohort: '01',
		website: 'https://seavoice.ai',
		description:
			'Enterprise voice AI platform for customer support, outbound sales, and appointment booking. Seavoice deploys human-like call agents with CRM and telephony integrations, including local-language conversations.',
		tags: ['Voice', 'Assistive', 'Real-time'],
		tile: 'light',
	},
	{
		name: 'Klovr',
		tag: 'AI copilot for real estate teams',
		logo: '/klovr_logo.webp',
		logoClass: 'is-wide',
		focus: 'Education',
		location: 'Petaling Jaya',
		cohort: '02',
		website: 'https://klovr.co/',
		description:
			'AI assistant for real estate sales teams that runs directly inside WhatsApp. Klovr captures top-agent playbooks from chat activity and gives junior agents instant reply guidance to improve conversions.',
		tags: ['Coaching', 'Personalization', 'Community'],
		tile: 'dark',
	},
	{
		name: 'Kelas Sekejap',
		tag: 'Learn English by speaking',
		logo: '/kelassekejaplogo.svg',
		logoClass: 'is-wide',
		focus: 'Education',
		location: 'Kuala Lumpur',
		cohort: '01',
		website: 'https://kelassekejap.com',
		description:
			'Malaysia-first AI English app focused on learning by speaking, not memorisation. Kelas Sekejap uses guided real-world conversations and instant feedback to build practical confidence.',
		tags: ['Learning', 'Content', 'Growth'],
		tile: 'light',
	},
];
