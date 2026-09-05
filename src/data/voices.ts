type Segment = { text: string; strong?: boolean };

interface Voice {
	author: string;
	context: string;
	avatar: string;
	avatarColor: string;
	segments: Segment[];
}

export const voices: Voice[] = [
	{
		author: 'Workshop attendee',
		context: 'AI Builder Night, KL',
		avatar: 'W',
		avatarColor: '#1a73e8',
		segments: [
			{ text: 'SF vibes and atmosphere', strong: true },
			{ text: ', one-of-a-kind place in Malaysia.' },
		],
	},
	{
		author: 'Community member',
		context: 'AI Takeover',
		avatar: 'C',
		avatarColor: '#188038',
		segments: [
			{ text: 'You guys brought all the big guns.', strong: true },
			{
				text: ' That was insanely good to see the perspectives, hopes and dreams the way you guys prop up builders. ',
			},
			{ text: 'F***ing Awesome! A+', strong: true },
		],
	},
	{
		author: 'First-time builder',
		context: 'Build With AI workshop',
		avatar: 'F',
		avatarColor: '#a142f4',
		segments: [
			{ text: 'I felt the pulse of the community.', strong: true },
			{ text: ' It inspired me to build with AI. ' },
			{ text: 'I went home and learnt Claude Code.', strong: true },
			{
				text: ' I loved how supportive the community is to newbies. I felt very safe, heard and seen.',
			},
		],
	},
	{
		author: 'Startup operator',
		context: 'Founder session',
		avatar: 'S',
		avatarColor: '#d93025',
		segments: [
			{ text: 'One of the few sessions where we had a ' },
			{ text: 'serious discussion about AI', strong: true },
			{ text: ' and its implications for our companies, society, and the country as a whole. ' },
			{
				text: "It gave me the sense that people outside our builders' bubble genuinely care about our nation's future.",
				strong: true,
			},
		],
	},
	{
		author: 'Community member',
		context: 'Pasar AI demo day',
		avatar: 'C',
		avatarColor: '#e37400',
		segments: [
			{ text: 'Gave me hope about the state of Malaysian youth and builders', strong: true },
			{ text: ' \u2014 it was so refreshing!' },
		],
	},
	{
		author: 'Educator',
		context: 'Learnathon',
		avatar: 'E',
		avatarColor: '#007b83',
		segments: [
			{ text: 'Gave me the idea that ' },
			{ text: 'I should create', strong: true },
			{ text: ' similar programme where ' },
			{
				text: 'I can provide opportunity for the school students to learn vibe coding',
				strong: true,
			},
			{ text: ' and start building something, and also for myself to ' },
			{ text: 'try build something on my own.', strong: true },
		],
	},
];
