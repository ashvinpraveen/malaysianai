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
		usage: 'Optional soft wordmark fill on dark fields; default lockups use pure white.',
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
		usage: 'Headings on light surfaces.',
		theme: 'light',
	},
	{
		name: 'Ink',
		hex: '#000000',
		usage: 'Official mark and lockup fill on light backgrounds.',
		theme: 'shared',
	},
	{
		name: 'White',
		hex: '#FFFFFF',
		cssVar: '--color-white',
		usage: 'Official mark and lockup fill on dark backgrounds; buttons in dark theme.',
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
		notes: 'Serif display for page titles, section headings, and the malaysian.ai wordmark.',
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

export type BrandDownload = {
	label: string;
	href: string;
	format: string;
	/** Unique, crawlable alt for Google Images and accessibility. */
	alt: string;
};

export type BrandAsset = {
	id: string;
	label: string;
	description: string;
	alt: string;
	preview: string;
	previewClass?: 'square' | 'wide' | 'stacked';
	previewTheme?: 'dark' | 'light' | 'neutral';
	downloads: BrandDownload[];
};

/** Build a distinct alt per downloadable file so each URL is indexable in Google Images. */
export function brandDownloadAlt(assetAlt: string, label: string, format: string): string {
	return `${assetAlt} — ${label} ${format.toUpperCase()} official Malaysian AI brand logo download`;
}

function downloads(
	assetAlt: string,
	files: Array<{ label: string; href: string; format: string }>,
): BrandDownload[] {
	return files.map((file) => ({
		...file,
		alt: brandDownloadAlt(assetAlt, file.label, file.format),
	}));
}

const markLightAlt =
	'Malaysian AI square logo mark — black geometric songket-inspired emblem for light backgrounds';
const markDarkAlt =
	'Malaysian AI square logo mark — white geometric songket-inspired emblem for dark backgrounds';
const wordmarkDarkAlt = 'malaysian.ai wordmark in white Newsreader type for dark backgrounds';
const wordmarkLightAlt = 'malaysian.ai wordmark in black Newsreader type for light backgrounds';
const lockupHDarkAlt =
	'Malaysian AI horizontal logo lockup with geometric mark and malaysian.ai wordmark in white on dark navy';
const lockupHLightAlt =
	'Malaysian AI horizontal logo lockup with geometric mark and malaysian.ai wordmark in black on light sand';
const lockupSDarkAlt =
	'Malaysian AI stacked logo with geometric mark above malaysian.ai wordmark in white on dark navy';
const lockupSLightAlt =
	'Malaysian AI stacked logo with geometric mark above malaysian.ai wordmark in black on light sand';

export const brandAssets: BrandAsset[] = [
	{
		id: 'mark-light',
		label: 'Square mark · on light',
		description: 'Black geometric mark for light and sand fields. Use for favicons, avatars, app icons, and social profiles.',
		alt: markLightAlt,
		preview: '/brand/malaysian-ai-mark-on-light-256.png',
		previewClass: 'square',
		previewTheme: 'light',
		downloads: downloads(markLightAlt, [
			{ label: 'SVG', href: '/brand/malaysian-ai-mark-on-light.svg', format: 'svg' },
			{ label: 'PNG 1080', href: '/brand/malaysian-ai-mark-on-light-1080.png', format: 'png' },
			{ label: 'PNG 512', href: '/brand/malaysian-ai-mark-on-light-512.png', format: 'png' },
			{ label: 'PNG 256', href: '/brand/malaysian-ai-mark-on-light-256.png', format: 'png' },
			{ label: 'PNG 128', href: '/brand/malaysian-ai-mark-on-light-128.png', format: 'png' },
			{ label: 'PNG 64', href: '/brand/malaysian-ai-mark-on-light-64.png', format: 'png' },
			{ label: 'PNG 32', href: '/brand/malaysian-ai-mark-on-light-32.png', format: 'png' },
		]),
	},
	{
		id: 'mark-dark',
		label: 'Square mark · on dark',
		description: 'White mark for dark navy fields. Same geometry as the black mark — pick the contrast that matches the surface.',
		alt: markDarkAlt,
		preview: '/brand/malaysian-ai-mark-on-dark-256.png',
		previewClass: 'square',
		previewTheme: 'dark',
		downloads: downloads(markDarkAlt, [
			{ label: 'SVG', href: '/brand/malaysian-ai-mark-on-dark.svg', format: 'svg' },
			{ label: 'PNG 1080', href: '/brand/malaysian-ai-mark-on-dark-1080.png', format: 'png' },
			{ label: 'PNG 512', href: '/brand/malaysian-ai-mark-on-dark-512.png', format: 'png' },
			{ label: 'PNG 256', href: '/brand/malaysian-ai-mark-on-dark-256.png', format: 'png' },
			{ label: 'PNG 128', href: '/brand/malaysian-ai-mark-on-dark-128.png', format: 'png' },
			{ label: 'PNG 64', href: '/brand/malaysian-ai-mark-on-dark-64.png', format: 'png' },
			{ label: 'PNG 32', href: '/brand/malaysian-ai-mark-on-dark-32.png', format: 'png' },
		]),
	},
	{
		id: 'wordmark-dark',
		label: 'Wordmark · on dark',
		description: 'Newsreader “malaysian.ai” wordmark in white. Prefer the full lockup when the mark fits.',
		alt: wordmarkDarkAlt,
		preview: '/brand/malaysian-ai-wordmark-on-dark.png',
		previewClass: 'wide',
		previewTheme: 'dark',
		downloads: downloads(wordmarkDarkAlt, [
			{ label: 'SVG', href: '/brand/malaysian-ai-wordmark-on-dark.svg', format: 'svg' },
			{ label: 'PNG master', href: '/brand/malaysian-ai-wordmark-on-dark.png', format: 'png' },
			{ label: 'PNG 1600', href: '/brand/malaysian-ai-wordmark-on-dark-1600.png', format: 'png' },
			{ label: 'PNG 800', href: '/brand/malaysian-ai-wordmark-on-dark-800.png', format: 'png' },
			{ label: 'PNG 400', href: '/brand/malaysian-ai-wordmark-on-dark-400.png', format: 'png' },
		]),
	},
	{
		id: 'wordmark-light',
		label: 'Wordmark · on light',
		description: 'Same wordmark in black for sand and light surfaces.',
		alt: wordmarkLightAlt,
		preview: '/brand/malaysian-ai-wordmark-on-light.png',
		previewClass: 'wide',
		previewTheme: 'light',
		downloads: downloads(wordmarkLightAlt, [
			{ label: 'SVG', href: '/brand/malaysian-ai-wordmark-on-light.svg', format: 'svg' },
			{ label: 'PNG master', href: '/brand/malaysian-ai-wordmark-on-light.png', format: 'png' },
			{ label: 'PNG 1600', href: '/brand/malaysian-ai-wordmark-on-light-1600.png', format: 'png' },
			{ label: 'PNG 800', href: '/brand/malaysian-ai-wordmark-on-light-800.png', format: 'png' },
			{ label: 'PNG 400', href: '/brand/malaysian-ai-wordmark-on-light-400.png', format: 'png' },
		]),
	},
	{
		id: 'lockup-h-dark',
		label: 'Horizontal lockup · on dark',
		description: 'Primary lockup from the official master: mark beside wordmark in white. Prefer this on websites, decks, and banners.',
		alt: lockupHDarkAlt,
		preview: '/brand/malaysian-ai-lockup-horizontal-on-dark-704.png',
		previewClass: 'wide',
		previewTheme: 'dark',
		downloads: downloads(lockupHDarkAlt, [
			{ label: 'SVG', href: '/brand/malaysian-ai-lockup-horizontal-on-dark.svg', format: 'svg' },
			{ label: 'SVG + bg', href: '/brand/malaysian-ai-lockup-horizontal-on-dark-bg.svg', format: 'svg' },
			{ label: 'PNG master', href: '/brand/malaysian-ai-lockup-horizontal-on-dark.png', format: 'png' },
			{ label: 'PNG 2190', href: '/brand/malaysian-ai-lockup-horizontal-on-dark-2190.png', format: 'png' },
			{ label: 'PNG 1408', href: '/brand/malaysian-ai-lockup-horizontal-on-dark-1408.png', format: 'png' },
			{ label: 'PNG 704', href: '/brand/malaysian-ai-lockup-horizontal-on-dark-704.png', format: 'png' },
			{ label: 'PNG 352', href: '/brand/malaysian-ai-lockup-horizontal-on-dark-352.png', format: 'png' },
			{ label: 'PNG transparent 1408', href: '/brand/malaysian-ai-lockup-horizontal-on-dark-transparent-1408.png', format: 'png' },
		]),
	},
	{
		id: 'lockup-h-light',
		label: 'Horizontal lockup · on light',
		description: 'Official black lockup for sand surfaces and print on pale paper.',
		alt: lockupHLightAlt,
		preview: '/brand/malaysian-ai-lockup-horizontal-on-light-704.png',
		previewClass: 'wide',
		previewTheme: 'light',
		downloads: downloads(lockupHLightAlt, [
			{ label: 'SVG', href: '/brand/malaysian-ai-lockup-horizontal-on-light.svg', format: 'svg' },
			{ label: 'SVG + bg', href: '/brand/malaysian-ai-lockup-horizontal-on-light-bg.svg', format: 'svg' },
			{ label: 'PNG master', href: '/brand/malaysian-ai-lockup-horizontal-on-light.png', format: 'png' },
			{ label: 'PNG 2190', href: '/brand/malaysian-ai-lockup-horizontal-on-light-2190.png', format: 'png' },
			{ label: 'PNG 1408', href: '/brand/malaysian-ai-lockup-horizontal-on-light-1408.png', format: 'png' },
			{ label: 'PNG 704', href: '/brand/malaysian-ai-lockup-horizontal-on-light-704.png', format: 'png' },
			{ label: 'PNG 352', href: '/brand/malaysian-ai-lockup-horizontal-on-light-352.png', format: 'png' },
			{ label: 'PNG transparent 1408', href: '/brand/malaysian-ai-lockup-horizontal-on-light-transparent-1408.png', format: 'png' },
		]),
	},
	{
		id: 'lockup-s-dark',
		label: 'Stacked lockup · on dark',
		description: 'Mark above wordmark for square social posts, posters, and centred compositions.',
		alt: lockupSDarkAlt,
		preview: '/brand/malaysian-ai-lockup-stacked-on-dark-568.png',
		previewClass: 'stacked',
		previewTheme: 'dark',
		downloads: downloads(lockupSDarkAlt, [
			{ label: 'SVG', href: '/brand/malaysian-ai-lockup-stacked-on-dark.svg', format: 'svg' },
			{ label: 'SVG + bg', href: '/brand/malaysian-ai-lockup-stacked-on-dark-bg.svg', format: 'svg' },
			{ label: 'PNG master', href: '/brand/malaysian-ai-lockup-stacked-on-dark.png', format: 'png' },
			{ label: 'PNG 852', href: '/brand/malaysian-ai-lockup-stacked-on-dark-852.png', format: 'png' },
			{ label: 'PNG 568', href: '/brand/malaysian-ai-lockup-stacked-on-dark-568.png', format: 'png' },
			{ label: 'PNG 284', href: '/brand/malaysian-ai-lockup-stacked-on-dark-284.png', format: 'png' },
			{ label: 'PNG transparent 568', href: '/brand/malaysian-ai-lockup-stacked-on-dark-transparent-568.png', format: 'png' },
		]),
	},
	{
		id: 'lockup-s-light',
		label: 'Stacked lockup · on light',
		description: 'Stacked black lockup when vertical space works better than a wide bar.',
		alt: lockupSLightAlt,
		preview: '/brand/malaysian-ai-lockup-stacked-on-light-568.png',
		previewClass: 'stacked',
		previewTheme: 'light',
		downloads: downloads(lockupSLightAlt, [
			{ label: 'SVG', href: '/brand/malaysian-ai-lockup-stacked-on-light.svg', format: 'svg' },
			{ label: 'SVG + bg', href: '/brand/malaysian-ai-lockup-stacked-on-light-bg.svg', format: 'svg' },
			{ label: 'PNG master', href: '/brand/malaysian-ai-lockup-stacked-on-light.png', format: 'png' },
			{ label: 'PNG 852', href: '/brand/malaysian-ai-lockup-stacked-on-light-852.png', format: 'png' },
			{ label: 'PNG 568', href: '/brand/malaysian-ai-lockup-stacked-on-light-568.png', format: 'png' },
			{ label: 'PNG 284', href: '/brand/malaysian-ai-lockup-stacked-on-light-284.png', format: 'png' },
			{ label: 'PNG transparent 568', href: '/brand/malaysian-ai-lockup-stacked-on-light-transparent-568.png', format: 'png' },
		]),
	},
];
