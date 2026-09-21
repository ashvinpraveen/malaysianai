/** Downloadable brand assets and guidelines shown on /brand. */

export type BrandColor = {
	name: string;
	hex: string;
	cssVar?: string;
	usage: string;
	theme: 'dark' | 'light' | 'shared';
};

export const brandColors: BrandColor[] = [
	{
		name: 'Night sky',
		hex: '#06090F',
		cssVar: '--page-background',
		usage: 'Primary dark page background and lockup backdrop.',
		theme: 'dark',
	},
	{
		name: 'Deep navy',
		hex: '#07101A',
		cssVar: '--site-background',
		usage: 'Site chrome and footer on dark theme.',
		theme: 'dark',
	},
	{
		name: 'Cloud text',
		hex: '#E0E8F4',
		cssVar: '--page-text',
		usage: 'Body copy on dark surfaces.',
		theme: 'dark',
	},
	{
		name: 'Bright heading',
		hex: '#F4F7FC',
		cssVar: '--text-heading',
		usage: 'Headings and high-emphasis text in dark theme.',
		theme: 'dark',
	},
	{
		name: 'Wordmark cream',
		hex: '#FCFBF4',
		usage: 'Official wordmark fill on dark backgrounds.',
		theme: 'dark',
	},
	{
		name: 'Accent line',
		hex: '#315D9F',
		cssVar: '--accent-line',
		usage: 'Subtle accent and border emphasis.',
		theme: 'dark',
	},
	{
		name: 'Sand page',
		hex: '#F4EFE6',
		cssVar: '--page-background',
		usage: 'Primary light page background and lockup backdrop.',
		theme: 'light',
	},
	{
		name: 'Warm site',
		hex: '#EFE8D8',
		cssVar: '--site-background',
		usage: 'Site chrome and footer on light theme.',
		theme: 'light',
	},
	{
		name: 'Teal ink',
		hex: '#102B2A',
		cssVar: '--page-text',
		usage: 'Body copy and button fill on light surfaces.',
		theme: 'light',
	},
	{
		name: 'Deep heading',
		hex: '#0C2221',
		cssVar: '--text-heading',
		usage: 'Official wordmark fill on light backgrounds; headings.',
		theme: 'light',
	},
	{
		name: 'White',
		hex: '#FFFFFF',
		cssVar: '--color-white',
		usage: 'Buttons and high-contrast marks on dark theme.',
		theme: 'shared',
	},
];

export type BrandFont = {
	name: string;
	role: string;
	cssVar: string;
	weights: string;
	sample: string;
	notes: string;
};

export const brandFonts: BrandFont[] = [
	{
		name: 'Newsreader',
		role: 'Display',
		cssVar: '--font-display',
		weights: '400',
		sample: 'malaysian.ai',
		notes: 'Serif display for page titles, section headings, and the outlined wordmark.',
	},
	{
		name: 'Atkinson',
		role: 'Body',
		cssVar: '--font-body',
		weights: '400, 700',
		sample: 'Learn, build and experience Malaysian AI.',
		notes: 'Accessible sans for UI, body copy, and navigation.',
	},
	{
		name: 'Mondwest',
		role: 'Accent',
		cssVar: '--font-pixel',
		weights: '400',
		sample: 'Show & Tell',
		notes: 'Pixel accent for occasional editorial moments. Use sparingly.',
	},
];

export type BrandAsset = {
	id: string;
	label: string;
	description: string;
	alt: string;
	preview: string;
	previewClass?: 'square' | 'wide' | 'stacked';
	previewTheme?: 'dark' | 'light' | 'neutral';
	downloads: Array<{ label: string; href: string; format: string }>;
};

export const brandAssets: BrandAsset[] = [
	{
		id: 'mark',
		label: 'Square mark',
		description: 'Use alone when space is tight: favicons, avatars, app icons, and social profile images.',
		alt: 'Malaysian AI square logo mark — geometric emblem in grayscale on transparent background',
		preview: '/brand/malaysian-ai-mark-256.png',
		previewClass: 'square',
		previewTheme: 'neutral',
		downloads: [
			{ label: 'SVG', href: '/brand/malaysian-ai-mark.svg', format: 'svg' },
			{ label: 'PNG 512', href: '/brand/malaysian-ai-mark-512.png', format: 'png' },
			{ label: 'PNG 256', href: '/brand/malaysian-ai-mark-256.png', format: 'png' },
			{ label: 'PNG 128', href: '/brand/malaysian-ai-mark-128.png', format: 'png' },
			{ label: 'PNG 64', href: '/brand/malaysian-ai-mark-64.png', format: 'png' },
			{ label: 'PNG 32', href: '/brand/malaysian-ai-mark-32.png', format: 'png' },
		],
	},
	{
		id: 'wordmark-dark',
		label: 'Wordmark on dark',
		description: 'Outlined Newsreader “malaysian.ai” for dark backgrounds. Pair with the mark in the full lockup when possible.',
		alt: 'malaysian.ai wordmark in cream outlined Newsreader type for dark backgrounds',
		preview: '/brand/malaysian-ai-wordmark-on-dark.svg',
		previewClass: 'wide',
		previewTheme: 'dark',
		downloads: [
			{ label: 'SVG', href: '/brand/malaysian-ai-wordmark-on-dark.svg', format: 'svg' },
		],
	},
	{
		id: 'wordmark-light',
		label: 'Wordmark on light',
		description: 'Same wordmark in deep teal for light and sand backgrounds.',
		alt: 'malaysian.ai wordmark in deep teal outlined Newsreader type for light backgrounds',
		preview: '/brand/malaysian-ai-wordmark-on-light.svg',
		previewClass: 'wide',
		previewTheme: 'light',
		downloads: [
			{ label: 'SVG', href: '/brand/malaysian-ai-wordmark-on-light.svg', format: 'svg' },
		],
	},
	{
		id: 'lockup-h-dark',
		label: 'Horizontal lockup · dark',
		description: 'Primary brand lockup: square mark beside the wordmark. Prefer this on websites, decks, and banners.',
		alt: 'Malaysian AI horizontal logo lockup with square mark and malaysian.ai wordmark on dark navy background',
		preview: '/brand/malaysian-ai-lockup-horizontal-on-dark-bg.svg',
		previewClass: 'wide',
		previewTheme: 'dark',
		downloads: [
			{ label: 'SVG', href: '/brand/malaysian-ai-lockup-horizontal-on-dark.svg', format: 'svg' },
			{ label: 'SVG + bg', href: '/brand/malaysian-ai-lockup-horizontal-on-dark-bg.svg', format: 'svg' },
			{ label: 'PNG 1408', href: '/brand/malaysian-ai-lockup-horizontal-on-dark-1408.png', format: 'png' },
			{ label: 'PNG 704', href: '/brand/malaysian-ai-lockup-horizontal-on-dark-704.png', format: 'png' },
			{ label: 'PNG 352', href: '/brand/malaysian-ai-lockup-horizontal-on-dark-352.png', format: 'png' },
		],
	},
	{
		id: 'lockup-h-light',
		label: 'Horizontal lockup · light',
		description: 'Horizontal lockup for light sand surfaces and print on pale paper.',
		alt: 'Malaysian AI horizontal logo lockup with square mark and malaysian.ai wordmark on light sand background',
		preview: '/brand/malaysian-ai-lockup-horizontal-on-light-bg.svg',
		previewClass: 'wide',
		previewTheme: 'light',
		downloads: [
			{ label: 'SVG', href: '/brand/malaysian-ai-lockup-horizontal-on-light.svg', format: 'svg' },
			{ label: 'SVG + bg', href: '/brand/malaysian-ai-lockup-horizontal-on-light-bg.svg', format: 'svg' },
			{ label: 'PNG 1408', href: '/brand/malaysian-ai-lockup-horizontal-on-light-1408.png', format: 'png' },
			{ label: 'PNG 704', href: '/brand/malaysian-ai-lockup-horizontal-on-light-704.png', format: 'png' },
			{ label: 'PNG 352', href: '/brand/malaysian-ai-lockup-horizontal-on-light-352.png', format: 'png' },
		],
	},
	{
		id: 'lockup-s-dark',
		label: 'Stacked lockup · dark',
		description: 'Mark above wordmark for square social posts, posters, and centred compositions.',
		alt: 'Malaysian AI stacked logo with square mark above malaysian.ai wordmark on dark navy background',
		preview: '/brand/malaysian-ai-lockup-stacked-on-dark-bg.svg',
		previewClass: 'stacked',
		previewTheme: 'dark',
		downloads: [
			{ label: 'SVG', href: '/brand/malaysian-ai-lockup-stacked-on-dark.svg', format: 'svg' },
			{ label: 'SVG + bg', href: '/brand/malaysian-ai-lockup-stacked-on-dark-bg.svg', format: 'svg' },
			{ label: 'PNG 568', href: '/brand/malaysian-ai-lockup-stacked-on-dark-568.png', format: 'png' },
			{ label: 'PNG 284', href: '/brand/malaysian-ai-lockup-stacked-on-dark-284.png', format: 'png' },
		],
	},
	{
		id: 'lockup-s-light',
		label: 'Stacked lockup · light',
		description: 'Stacked lockup for light backgrounds when vertical space works better than a wide bar.',
		alt: 'Malaysian AI stacked logo with square mark above malaysian.ai wordmark on light sand background',
		preview: '/brand/malaysian-ai-lockup-stacked-on-light-bg.svg',
		previewClass: 'stacked',
		previewTheme: 'light',
		downloads: [
			{ label: 'SVG', href: '/brand/malaysian-ai-lockup-stacked-on-light.svg', format: 'svg' },
			{ label: 'SVG + bg', href: '/brand/malaysian-ai-lockup-stacked-on-light-bg.svg', format: 'svg' },
			{ label: 'PNG 568', href: '/brand/malaysian-ai-lockup-stacked-on-light-568.png', format: 'png' },
			{ label: 'PNG 284', href: '/brand/malaysian-ai-lockup-stacked-on-light-284.png', format: 'png' },
		],
	},
];
