export type ProfileLink = { label: string; href: string };

export type Profile = {
	slug: string;
	name: string;
	firstName: string;
	role: string;
	building: string;
	/** Search and share description. The page itself only shows the person's own words. */
	summary: string;
	/** Pixel portrait stored at 1x; the page scales it up by a whole number with nearest-neighbour. */
	portrait?: { src: string; width: number; height: number };
	/** Copy from the person's introduction doc. Wrap a phrase in *asterisks* to italicise it. */
	about: string[];
	work: string[];
	/** The first work link becomes the page's main button. */
	workLinks: ProfileLink[];
	profileLinks: ProfileLink[];
	/** Accent per theme, taken from the person's own site where they have one. */
	accent: { dark: string; light: string };
};

export const profiles: Profile[] = [
	{
		slug: 'andrew-gostishchev',
		name: 'Andrew Gostishchev',
		firstName: 'Andrew',
		role: 'Senior software engineer and AI researcher in artificial life',
		building: 'Towards Artificial Life',
		summary:
			'Andrew Gostishchev is a senior software engineer and computational researcher building Towards Artificial Life, an open research project on embodied intelligence.',
		portrait: { src: '/images/residents/andrew-gostishchev.png', width: 80, height: 80 },
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
];
