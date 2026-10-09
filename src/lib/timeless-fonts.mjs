import { closeSync, openSync, readSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');

/** Private Blob prefix. Files are never committed; see scripts/fetch-fonts.mjs. */
export const TIMELESS_BLOB_PREFIX = 'fonts/timeless';

export const TIMELESS_FILENAMES = [
	'TimelessSerifVF.woff2',
	'TimelessSerifItalicVF.woff2',
	'TimelessSansVF.woff2',
];

export const DISPLAY_FALLBACKS = ['Georgia', 'Iowan Old Style', 'Times New Roman', 'serif'];
export const BODY_FALLBACKS = ['system-ui', 'sans-serif'];

const FONT_DIR = join(root, 'src/assets/fonts/timeless');
const RELATIVE_DIR = './src/assets/fonts/timeless';

/**
 * Timeless Sans STYL 0 is the Sans cut (STYL moves toward Grotesk).
 * Timeless Serif STYL 100 is the heavier display optical cut.
 * The italic serif file only has a weight axis.
 */
const SANS_STYLE = '"STYL" 0';
const SERIF_STYLE = '"STYL" 100';
const SANS_ITALIC = '"ital" 1, "STYL" 0';
const WEIGHT = '100 900';

export function timelessFontPath(filename) {
	return join(FONT_DIR, filename);
}

function isWoff2(file) {
	try {
		if (statSync(file).size < 256) return false;
		const handle = openSync(file, 'r');
		try {
			const bytes = new Uint8Array(4);
			readSync(handle, bytes, 0, 4, 0);
			return String.fromCharCode(...bytes) === 'wOF2';
		} finally {
			closeSync(handle);
		}
	} catch {
		return false;
	}
}

/** True only when all three private font files are present and look like woff2. */
export function timelessFontsReady() {
	return TIMELESS_FILENAMES.every((filename) => isWoff2(timelessFontPath(filename)));
}

function systemFallbackProvider(localName) {
	const face = (style) => ({
		src: [{ name: localName }],
		weight: WEIGHT,
		style,
		display: 'swap',
	});
	return {
		// Astro dedupes providers by name + config. The local face is closed over,
		// so each family needs its own config or both would share the first face.
		name: 'timeless-fallback',
		config: { localName },
		resolveFont() {
			return { fonts: [face('normal'), face('italic')] };
		},
	};
}

function localFace(src, style, variationSettings) {
	return {
		src: [`${RELATIVE_DIR}/${src}`],
		weight: WEIGHT,
		style,
		display: 'swap',
		...(variationSettings ? { variationSettings } : {}),
	};
}

/** Display and body families. Missing files keep the CSS variables on system fallbacks. */
export function timelessFamilies(createLocalProvider) {
	if (!timelessFontsReady()) {
		return [
			{
				provider: systemFallbackProvider('Georgia'),
				name: 'Timeless Serif',
				cssVariable: '--font-display',
				fallbacks: DISPLAY_FALLBACKS,
				optimizedFallbacks: false,
			},
			{
				provider: systemFallbackProvider('system-ui'),
				name: 'Timeless Sans',
				cssVariable: '--font-body',
				fallbacks: BODY_FALLBACKS,
				optimizedFallbacks: false,
			},
		];
	}

	return [
		{
			provider: createLocalProvider(),
			name: 'Timeless Serif',
			cssVariable: '--font-display',
			fallbacks: DISPLAY_FALLBACKS,
			options: {
				variants: [
					localFace('TimelessSerifVF.woff2', 'normal', SERIF_STYLE),
					localFace('TimelessSerifItalicVF.woff2', 'italic'),
				],
			},
		},
		{
			provider: createLocalProvider(),
			name: 'Timeless Sans',
			cssVariable: '--font-body',
			fallbacks: BODY_FALLBACKS,
			options: {
				variants: [
					localFace('TimelessSansVF.woff2', 'normal', SANS_STYLE),
					localFace('TimelessSansVF.woff2', 'italic', SANS_ITALIC),
				],
			},
		},
	];
}
