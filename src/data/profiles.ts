export type ProfileLink = { label: string; href: string };

export type Portrait = {
	name: string;
	src: string;
	/** Shown instead of src on the light theme, for a portrait whose edge is cut for dark backgrounds. */
	lightSrc?: string;
	width: number;
	height: number;
};

export type Profile = {
	slug: string;
	name: string;
	firstName: string;
	role: string;
	building?: string;
	/** Optional link to a company in residents.ts, independent of its display name. */
	companySlug?: string;
	/** Search and share description. The page itself only shows the person's own words. */
	summary: string;
	/** Pixel portraits stored at 1x; the page scales them up by a whole number with nearest-neighbour. A pair gets one each. */
	portraits: Portrait[];
	/** Copy from the person's introduction doc. Wrap a phrase in *asterisks* to italicise it. */
	about: string[];
	work: string[];
	/** The first work link becomes the page's main button. */
	workLinks: ProfileLink[];
	profileLinks: ProfileLink[];
	/** Accent per theme, taken from the person's own site where they have one. */
	accent: { dark: string; light: string };
};

const a47Accent = { dark: '#f0806e', light: '#973126' };
const cleveAccent = { dark: '#7fb0ee', light: '#1d4f9a' };

export const profiles: Profile[] = [
	{
		slug: 'andrew-gostishchev',
		name: 'Andrew Gostishchev',
		firstName: 'Andrew',
		role: 'Senior software engineer and AI researcher in artificial life',
		building: 'Towards Artificial Life',
		summary:
			'Andrew Gostishchev is a senior software engineer and computational researcher building Towards Artificial Life, an open research project on embodied intelligence.',
		portraits: [{ name: 'Andrew Gostishchev', src: '/images/residents/andrew-gostishchev.png', width: 120, height: 120 }],
		about: [
			'I am a senior software engineer and computational researcher working in artificial life and theoretical neuroscience. My work investigates the physical foundations of intelligence and consciousness from first principles. I apply a systems engineering discipline to computational biology, exploring neural dynamics, active inference, and embodied cognition.',
		],
		work: [
			'*Towards Artificial Life* is an open research project where I build models to explore how adaptive behavior develops in living things. It centers on the idea that genuine agency comes from physical bodies, continuous sensory-motor feedback, and cellular mechanics.',
			'The project includes experiments in biophysical neuron modeling, active inference, and an interactive *C. elegans* simulation that models roundworm locomotion in real time. It’s an active, ongoing project with public codebases, research write-ups, and browser demos anyone can inspect and run.',
		],
		workLinks: [
			{ label: 'Project website', href: 'https://al.arteriali.st/' },
			{ label: 'Live C. elegans demo', href: 'https://jimmy.arteriali.st/' },
			{ label: 'Research code', href: 'https://github.com/arterialist/neuron-model' },
			{ label: 'Embodied simulations', href: 'https://github.com/arterialist/active-inference' },
		],
		profileLinks: [
			{ label: 'Personal site', href: 'https://arteriali.st/' },
			{ label: 'GitHub', href: 'https://github.com/arterialist' },
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/arterialist/' },
		],
		accent: { dark: '#34d399', light: '#047857' },
	},
	{
		slug: 'andre-teow',
		name: 'Andre Teow',
		firstName: 'Andre',
		role: 'Co-founder of A47 Media and co-lead of the residency',
		building: 'A47 Media',
		companySlug: 'a47-media',
		summary:
			'Andre Teow co-founded A47 Media, an AI content team that turns your industry’s news into ready-to-approve posts, and runs Build with AI, Malaysia’s most active builders community.',
		portraits: [{ name: 'Andre Teow', src: '/images/residents/andre-teow.png', width: 120, height: 120 }],
		about: [
			'I’m Andre. I co-lead the residency and I’m also a co-founder of A47 Media. Besides that, I run Build with AI, Malaysia’s most active builders community. Members have launched 200+ products, many by people who’d never built anything before. Earlier, I co-founded Tiki, an Indian short-video app with 30M MAU. If you’re building with AI, come say hi.',
		],
		work: [
			'*The content team you’ve been meaning to hire.*',
			'Everyone wants more content, but marketing is usually one person. They’re expected to post every day, on every channel, with plenty of ideas and not enough hours.',
			'We started as A47 News, an AI newsroom that checks its stories against independent sources. Now we repurpose that same engine to run content for companies. Each morning we read your industry’s news and trends and pick what your audience will care about. Then it writes the post and builds the Instagram graphic carousel in your voice, with a real source behind every story.',
			'Human editors check everything from a central Mission Control, the control room we built so one editor can look after many brands.',
			'We are live. Our new morning brief, where you wake up to posts ready to approve, is in paid beta.',
		],
		workLinks: [{ label: 'A47 Media website', href: 'https://a47media.com/' }],
		profileLinks: [
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/andreteow/' },
			{ label: 'Instagram', href: 'https://www.instagram.com/andreteow01' },
			{ label: 'X', href: 'https://x.com/andreteow' },
		],
		accent: a47Accent,
	},
	{
		slug: 'hong-bing',
		name: 'Hong Bing',
		firstName: 'Hong Bing',
		role: 'Founder, student builder and community lead',
		building: 'in stealth',
		summary:
			'Hong Bing is a Malaysian founder and builder, and co-founder of the AI Hackerdorm builder community.',
		portraits: [{ name: 'Hong Bing', src: '/images/residents/hong-bing.png', width: 120, height: 120 }],
		about: [
			'I\'m Hong Bing, a Malaysian founder and builder. I started coding at 12 and now build AI products, organise communities and bring people together to turn ideas into working projects.',
			'I co-founded AI Hackerdorm, now 700+ builders across four university chapters in Malaysia, to help more students access opportunities beyond campus. I also founded and chaired one of Malaysia\'s largest student-led conventions.',
			'Alongside organising, I compete in hackathons. I\'ve earned 19 competition awards, including a hardware special prize at HackMIT. After winning Student Builder Champion at the ASEAN AI Summit, one of the judges, Khailee Ng, invited me into 500 Global\'s AI residency.',
			'Today, I\'m building in stealth and helping grow Malaysia\'s AI builder community: more people building, sharing what they learn and taking their ideas beyond campus.',
		],
		work: [],
		workLinks: [
			{ label: 'Personal site', href: 'https://hong.build' },
		],
		profileLinks: [
			{ label: 'Personal site', href: 'https://hong.build' },
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/hong-bing' },
			{ label: 'AI Hackerdorm', href: 'https://www.aihackerdorm.com/' },
		],
		accent: { dark: '#a19cf2', light: '#5148c4' },
	},
	{
		slug: 'lizzie-tan',
		name: 'Lizzie Tan',
		firstName: 'Lizzie',
		role: 'Co-founder of Cleve',
		building: 'Cleve',
		companySlug: 'cleve',
		summary:
			'Lizzie Tan is the co-founder of Cleve, an AI second brain that keeps your docs and notes in one place so your AI always works from your full context.',
		portraits: [{ name: 'Lizzie Tan', src: '/images/residents/lizzie-tan.png', width: 120, height: 120 }],
		about: [
			'I studied psychology, then ended up running a content marketing agency for four years. I’ve always been super curious about what makes people tick and why some content works better than others.',
			'Back in my agency, my biggest headache was keeping track of client context. When you have a team and a bunch of clients, context gets scattered everywhere. I got into AI to build the thing I wished existed — AI second brains, or company brains where everything lives in one AI-searchable workspace, so everyone always has the latest context they and their AI can work with.',
			'These days, my life is split into two modes: product sprints and marketing sprints.',
		],
		work: [
			'Cleve is a second brain where you keep all your docs and notes in one place. I personally use it to dump all my documents and context I want AI to remember. Built-in memory from ChatGPT and Claude mostly relies on compressed summaries of who you are, so the nuance of your actual work gets lost.',
			'So Cleve acts as an external storage where all your docs live, and your AI can search through. Whenever you chat, it pulls from your full source documents so your context stays 100% intact. We’re live on web and mobile, with over 40,000 users.',
		],
		workLinks: [{ label: 'Cleve website', href: 'https://www.cleve.ai/' }],
		profileLinks: [
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/lizzietan' },
			{ label: 'Instagram', href: 'https://www.instagram.com/lizzietanqi' },
		],
		accent: cleveAccent,
	},
	{
		slug: 'ashvin-praveen',
		name: 'Ashvin Praveen',
		firstName: 'Ashvin',
		role: 'Co-founder and CEO of Cleve, and community lead at Malaysian AI',
		building: 'Cleve',
		summary:
			'Ashvin Praveen is the co-founder and CEO of Cleve, an AI second brain for people and teams, and helps run the Malaysian AI community and podcast.',
		portraits: [{ name: 'Ashvin Praveen', src: '/images/residents/ashvin-praveen.png', width: 120, height: 120 }],
		about: [
			'I’m Ashvin. I grew up in Miri and Bintulu in Sarawak and studied mechanical engineering at the University of Sheffield on a scholarship. I’m not a coder by training, and I don’t come from a business family. What I had was the willingness to be wrong quickly and keep going.',
			'Before Cleve, Lizzie and I ran *whacked*, a personal branding agency where we wrote for 40+ founders. That’s where I learned that the core of content isn’t the writing, it’s the message behind it.',
			'These days I also help run the Malaysian AI community, co-host the Malaysian AI podcast with Ken, and still make music and videos when I can.',
		],
		work: [
			'Cleve started as a LinkedIn writing tool trained on your past posts. Our LinkedIn Wrapped campaign brought in over 100,000 users in four weeks, and along the way we realised the memory layer was the real product.',
			'Today Cleve is a second brain for you and your team. Your docs and notes live in one place and your AI works from all of it, so it isn’t starting day one every time you open a chat.',
			'A lot of my time goes into being Cleve’s first trainer: teaching people and teams to set up AI systems that actually know their work.',
		],
		workLinks: [{ label: 'Cleve website', href: 'https://www.cleve.ai/' }],
		profileLinks: [
			{ label: 'Personal site', href: 'https://ashvinpraveen.com/' },
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashvinpraveen' },
			{ label: 'Instagram', href: 'https://www.instagram.com/ashvinpraveen' },
		],
		accent: cleveAccent,
	},
	{
		slug: 'mohtasham-murshid-madani',
		name: 'Mohtasham Murshid Madani',
		firstName: 'Mohtasham',
		role: 'Founder of Oikina and full-time AI engineer',
		building: 'Oikina',
		summary:
			'Mohtasham Murshid Madani is an AI engineer from Kashmir, now in Kuala Lumpur, building Oikina, a full-stack agent framework for deploying websites, and open-source tools for AI agents.',
		portraits: [
			{ name: 'Mohtasham Murshid Madani', src: '/images/residents/mohtasham-murshid-madani.png', width: 120, height: 120 },
		],
		about: [
			'I’m Mohtasham, an engineer from Kashmir now based in Kuala Lumpur. I tend to describe myself in four parts: founder of Oikina, AI engineer, open-source builder, and researcher. Day to day, I work full time as an AI engineer.',
		],
		work: [
			'Most of my own time goes into *Oikina*, my startup: a full-stack agent framework for deploying websites. I’m also building open-source tools for AI agents, like getdesign and md-to-docx.',
		],
		workLinks: [
			{ label: 'Oikina website', href: 'https://www.oikina.com/' },
			{ label: 'getdesign', href: 'https://www.getdesign.app/' },
		],
		profileLinks: [
			{ label: 'Personal site', href: 'https://www.mohtasham.dev/' },
			{ label: 'GitHub', href: 'https://github.com/MohtashamMurshid' },
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohtashammurshid/' },
			{ label: 'X', href: 'https://x.com/mohtashamdotdev' },
		],
		accent: { dark: '#f2b53a', light: '#8a5a00' },
	},
	{
		slug: 'ken-ooi',
		name: 'Ken Ooi',
		firstName: 'Ken',
		role: 'Product manager with a master’s in mechanical engineering with mechatronics',
		building: 'A47 Media',
		companySlug: 'a47-media',
		summary:
			'Ken Ooi is a product manager and mechatronics engineer building A47 Media, which gives creators and video editors full control over what they make with AI.',
		portraits: [{ name: 'Ken Ooi', src: '/images/residents/ken-ooi.png', width: 120, height: 120 }],
		about: [
			'Mechatronics engineer by training. Carrying the principles of engineering into the product world, I combined my interest in video editing and creation with the world of AI media.',
		],
		work: [
			'My goal with A47 Media is to enable creators and video editors to have full control over their creation, so everyone can express their creativity, from the shallowest brainrot content to their wildest dream.',
			'“Anyone can create” does not mean anyone can be a good creator, but a good creator can come from anywhere.',
		],
		workLinks: [{ label: 'A47 Media website', href: 'https://a47media.com/' }],
		profileLinks: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ken-ooi-00926b218' }],
		accent: a47Accent,
	},
	{
		slug: 'leong-shi-wei',
		name: 'Leong Shi Wei',
		firstName: 'Shi Wei',
		role: 'Software engineer at A47 Media',
		building: 'A47 Media',
		companySlug: 'a47-media',
		summary:
			'Leong Shi Wei is a software engineer at A47 Media, a content studio run with autonomous agents, and maintains Lostopedia, a campus lost and found app.',
		portraits: [{ name: 'Leong Shi Wei', src: '/images/residents/leong-shi-wei.png', width: 120, height: 120 }],
		about: [
			'Hello! I’m Shi Wei. I hate AI but I sometimes find myself talking to it more than living human beings. Sometimes I enjoy building with it but more often I resent it for accidentally doing all the thinking for me. Honestly I’m somewhat of a hypocrite, though I’m on a mission to make sure these geniuses in data centres compound our capabilities rather than replace us. HMU if you think it’s relatable.',
		],
		work: [
			'I’m helping Andre build A47 Media, a content studio for creators with autonomous agents streamlining content work. On the side, I tinker with AI projects with my AI buddies while I gradually transition from a vibe coder to a real engineer.',
			'I’m also maintaining a campus lost and found app for my university called Lostopedia, for completely no compensation lol. If you have any idea how to keep this sustainable, I’d love to talk.',
		],
		workLinks: [
			{ label: 'A47 Media website', href: 'https://a47media.com/' },
			{ label: 'Lostopedia', href: 'https://lostopedia.com/' },
		],
		profileLinks: [
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/shi-wei-leong' },
			{ label: 'GitHub', href: 'https://github.com/S-W-Leong' },
		],
		accent: a47Accent,
	},
	{
		slug: 'gabriel-yong',
		name: 'Gabriel Yong',
		firstName: 'Gabriel',
		role: 'Technical founder at Zedech Solutions',
		building: 'Zedech',
		summary:
			'Gabriel Yong is a technical founder at Zedech Solutions, building AutoFlow, an operations platform for automotive workshops, and HostPilot, AI agents for short-term rental hosts.',
		portraits: [{ name: 'Gabriel Yong', src: '/images/residents/gabriel-yong.png', width: 120, height: 120 }],
		about: [
			'Hi, I’m Gabriel, a technical founder at Zedech Solutions. Alongside my co-founder, I build AI agents, workflow automations and software for daily business operations. I previously co-founded a crypto DeFi startup, Polystream.xyz, and spent 4 years as a blockchain engineer and security auditor.',
		],
		work: [
			'AutoFlow is an operations platform for automotive workshops. It connects bookings, customer conversations, vehicle records, job stages, checklists, payments, parts, supplier orders, and reporting.',
			'HostPilot gives short-term rental hosts AI agents to answer guest questions across WhatsApp. The agents use custom context, retain conversation history, and support multiple properties from one inbox. HostPilot is available for demos.',
		],
		workLinks: [
			{ label: 'Zedech website', href: 'https://www.zedech.com/' },
			{ label: 'AutoFlow', href: 'https://tryautoflow.app/' },
			{ label: 'HostPilot', href: 'https://www.hostpilot.my/' },
		],
		profileLinks: [
			{ label: 'GitHub', href: 'https://github.com/gabr1234iel' },
			{ label: 'Instagram', href: 'https://www.instagram.com/gabrielyong.ai' },
			{ label: 'X', href: 'https://x.com/jalldoes' },
		],
		accent: { dark: '#5ab4e6', light: '#0069a8' },
	},
	{
		slug: 'vivien-and-kong',
		name: 'Vivien & Kong',
		firstName: 'Vivien & Kong',
		role: 'Co-founders of Pebble Tech. Vivien runs product and business, Kong writes the code.',
		building: 'Nudge',
		summary:
			'Vivien and Kong run Pebble Tech, a small product studio in Kuala Lumpur, and are building Nudge, an AI agent that answers enquiries, chases leads and remembers customers on WhatsApp.',
		portraits: [
			{ name: 'Vivien Wee', src: '/images/residents/vivien-wee.png', width: 120, height: 120 },
			{ name: 'Kong', src: '/images/residents/kong.png', width: 120, height: 120 },
		],
		about: [
			'We’re Vivien and Kong. We met as coursemates in 2012, started building things together, and never stopped. Today we run Pebble Tech, a small product studio in KL.',
			'For almost ten years we’ve worked with Malaysian SMBs, the kind of businesses where the boss is also the salesperson, the customer service team and the person replying to WhatsApp at 11pm. We kept seeing the same thing: great owners, drowning in messages. When AI got good enough to actually help, we wanted to build something those owners would trust, not just something that looks cool in a demo.',
		],
		work: [
			'Nudge is an AI agent that lives where Southeast Asian businesses already do their selling: WhatsApp. It answers enquiries, chases leads, reminds customers about appointments, and remembers who likes what. Think of it as that one staff member who knows every regular by name.',
			'We’re not chasing fully autonomous AI. Nudge follows the workflows you already have, and all its agents share one memory of your customers, from what they bought to how they like to be talked to. Every conversation builds on the last one, so your customers feel known. Anything it’s unsure about goes straight to you.',
			'Nudge is live with a few paying customers, and we’re currently focused on clinics and service businesses.',
		],
		// nudge.pebbletech.my, the link in their doc, does not resolve yet.
		workLinks: [{ label: 'Pebble Tech website', href: 'https://www.pebbletech.my/' }],
		profileLinks: [
			{ label: 'Vivien on LinkedIn', href: 'https://www.linkedin.com/in/vivien-wee-857885120/' },
			{ label: 'Kong on LinkedIn', href: 'https://www.linkedin.com/in/kongkw94/' },
			{ label: 'Vivien on Instagram', href: 'https://www.instagram.com/vivien.unfiltered/' },
			{ label: 'Kong on X', href: 'https://x.com/helloimkongv' },
		],
		accent: { dark: '#8aa5f5', light: '#1e40af' },
	},
	{
		slug: 'maxine-lai',
		name: 'Maxine Lai',
		firstName: 'Maxine',
		role: 'Co-founder of Hover Team',
		building: 'Hover Team',
		companySlug: 'hover-team',
		summary:
			'Maxine Lai is the co-founder of Hover Team, which gives companies a clear view of what’s going on in their business, built on the chats, email and spreadsheets they already use.',
		portraits: [{ name: 'Maxine Lai', src: '/images/residents/maxine-lai.png', lightSrc: '/images/residents/maxine-lai-light.png', width: 120, height: 120 }],
		about: [
			'I’m Maxine, co-founder of Hover Team. I started out as a data analyst at a property intelligence firm, where my co-founder and I turned messy market data into decisions businesses could act on.',
			'My first build was *Klovr*, WhatsApp automation for sales teams. Working on it, I saw that the chats, sheets and inboxes a business runs on already hold most of what you need to automate it. The data was all there. Nobody was reading it.',
			'I’m a data person at heart. I like finding the pattern behind why something works. After starting up, I went back for a computer science degree so I could build the product as well as I understand the problem.',
		],
		work: [
			'Most business owners can’t see half of how their company actually runs. What’s going on is scattered across group chats, inboxes and spreadsheets, and no single app shows the whole picture. Hover Team fits into the workflows a team already has and turns all of it into one clear view of the business.',
			'Every day, it shows what needs attention before it becomes a problem: the customer who never got a reply, the payment that’s overdue, the question everyone keeps answering. Then it takes the work that repeats off the team’s plate, and people still approve anything that matters. It’s already running across hundreds of group chats.',
			'Our vision is simple: every team knows what’s going on in its business, and the work that repeats runs itself.',
		],
		workLinks: [
			{ label: 'Hover Team website', href: 'https://www.hover.team/' },
			{ label: 'Klovr', href: 'https://klovr.co/' },
		],
		profileLinks: [
			{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/mmtmr' },
			{ label: 'GitHub', href: 'https://github.com/mmtmr' },
			{ label: 'X', href: 'https://x.com/maxinel_ai' },
			{ label: 'Instagram', href: 'https://www.instagram.com/maxinel.ai' },
		],
		accent: { dark: '#2297df', light: '#1a6fd1' },
	},
];
