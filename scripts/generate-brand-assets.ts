/**
 * Build downloadable brand kit variants from the official Sept 2026 masters:
 * - public/malaysian-ai-mark.png (black mark, transparent)
 * - public/malaysian-ai-logo-light.png (white horizontal lockup for dark fields)
 * - public/malaysian-ai-logo-dark.png (black horizontal lockup for light fields)
 *
 * Also derives wordmark-only crops, inverted white marks, stacked lockups,
 * sized PNGs, and SVG wrappers that embed the raster masters.
 */
import sharp from 'sharp';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

mkdirSync('public/brand', { recursive: true });

const MARK_SRC = 'public/malaysian-ai-mark.png';
const LOCKUP_ON_DARK_SRC = 'public/malaysian-ai-logo-light.png'; // white logo
const LOCKUP_ON_LIGHT_SRC = 'public/malaysian-ai-logo-dark.png'; // black logo
const BG_DARK = '#06090f';
const BG_LIGHT = '#f4efe6';

const wordmarkSource = readFileSync('public/malaysian-ai-wordmark.svg', 'utf8');
const BRAND_WORDMARK_PATH = wordmarkSource.match(/<path d="([^"]+)"/)?.[1];
if (!BRAND_WORDMARK_PATH) throw new Error('Could not read the Malaysian AI wordmark path.');

type Bounds = { left: number; top: number; width: number; height: number };

async function contentBounds(path: string): Promise<{ width: number; height: number; bounds: Bounds; gap: { start: number; end: number } }> {
	const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	const w = info.width;
	const h = info.height;
	let left = w;
	let right = 0;
	let top = h;
	let bottom = 0;
	const dens = Array.from({ length: w }, () => 0);
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			if (data[(y * w + x) * 4 + 3] > 8) {
				dens[x]!++;
				if (x < left) left = x;
				if (x > right) right = x;
				if (y < top) top = y;
				if (y > bottom) bottom = y;
			}
		}
	}
	let gapStart = -1;
	let gapEnd = -1;
	for (let x = Math.floor(w * 0.15); x < Math.floor(w * 0.55); x++) {
		if (dens[x]! < h * 0.02) {
			if (gapStart < 0) gapStart = x;
			gapEnd = x;
		} else if (gapStart >= 0 && dens[x]! >= h * 0.05) {
			break;
		}
	}
	if (gapStart < 0 || gapEnd < 0) throw new Error(`Could not find mark/wordmark gap in ${path}`);
	return {
		width: w,
		height: h,
		bounds: { left, top, width: right - left + 1, height: bottom - top + 1 },
		gap: { start: gapStart, end: gapEnd },
	};
}

function pngSvg(filename: string, title: string, width: number, height: number, pngBase64: string) {
	writeFileSync(
		`public/brand/${filename}`,
		`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title">
  <title id="title">${title}</title>
  <image href="data:image/png;base64,${pngBase64}" width="${width}" height="${height}"/>
</svg>
`,
	);
}

function wordmarkSvg(fill: string, filename: string) {
	writeFileSync(
		`public/brand/${filename}`,
		`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="284" height="68" viewBox="67.9183 0 284.0817 68" role="img" aria-labelledby="title">
  <title id="title">malaysian.ai wordmark</title>
  <path d="${BRAND_WORDMARK_PATH}" fill="${fill}"/>
</svg>
`,
	);
}

async function withBackground(input: Buffer, background: string, width: number, height: number) {
	return sharp({
		create: { width, height, channels: 3, background },
	})
		.composite([{ input, left: 0, top: 0 }])
		.png()
		.toBuffer();
}

// --- Square marks ---
const markBlack = sharp(MARK_SRC);
const markWhiteBuf = await markBlack
	.clone()
	.ensureAlpha()
	.raw()
	.toBuffer({ resolveWithObject: true })
	.then(({ data, info }) => {
		for (let i = 0; i < data.length; i += 4) {
			if (data[i + 3]! > 0) {
				data[i] = 255;
				data[i + 1] = 255;
				data[i + 2] = 255;
			}
		}
		return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
	});

for (const size of [32, 64, 128, 256, 512, 1080]) {
	await markBlack.clone().resize(size, size, { kernel: 'lanczos3' }).png().toFile(`public/brand/malaysian-ai-mark-on-light-${size}.png`);
	await sharp(markWhiteBuf).resize(size, size, { kernel: 'lanczos3' }).png().toFile(`public/brand/malaysian-ai-mark-on-dark-${size}.png`);
}
await markBlack.clone().png().toFile('public/brand/malaysian-ai-mark-on-light.png');
await sharp(markWhiteBuf).png().toFile('public/brand/malaysian-ai-mark-on-dark.png');
// Canonical aliases used across the site / older links
await markBlack.clone().resize(512, 512).png().toFile('public/brand/malaysian-ai-mark.png');
await markBlack.clone().resize(512, 512).png().toFile('public/brand/malaysian-ai-mark-512.png');
await markBlack.clone().resize(256, 256).png().toFile('public/brand/malaysian-ai-mark-256.png');
await markBlack.clone().resize(128, 128).png().toFile('public/brand/malaysian-ai-mark-128.png');
await markBlack.clone().resize(64, 64).png().toFile('public/brand/malaysian-ai-mark-64.png');
await markBlack.clone().resize(32, 32).png().toFile('public/brand/malaysian-ai-mark-32.png');

const markOnLight512 = await markBlack.clone().resize(512, 512).png().toBuffer();
const markOnDark512 = await sharp(markWhiteBuf).resize(512, 512).png().toBuffer();
pngSvg('malaysian-ai-mark-on-light.svg', 'Malaysian AI mark (black, for light backgrounds)', 512, 512, markOnLight512.toString('base64'));
pngSvg('malaysian-ai-mark-on-dark.svg', 'Malaysian AI mark (white, for dark backgrounds)', 512, 512, markOnDark512.toString('base64'));
pngSvg('malaysian-ai-mark.svg', 'Malaysian AI mark', 512, 512, markOnLight512.toString('base64'));

// --- Wordmarks from official lockups + vector outlines ---
const lockupMeta = await contentBounds(LOCKUP_ON_DARK_SRC);
const wordmarkRegion: Bounds = {
	left: lockupMeta.gap.end + 1,
	top: lockupMeta.bounds.top,
	width: lockupMeta.bounds.left + lockupMeta.bounds.width - (lockupMeta.gap.end + 1),
	height: lockupMeta.bounds.height,
};

const wordmarkOnDarkPng = await sharp(LOCKUP_ON_DARK_SRC).extract(wordmarkRegion).png().toBuffer();
const wordmarkOnLightPng = await sharp(LOCKUP_ON_LIGHT_SRC).extract(wordmarkRegion).png().toBuffer();
await sharp(wordmarkOnDarkPng).png().toFile('public/brand/malaysian-ai-wordmark-on-dark.png');
await sharp(wordmarkOnLightPng).png().toFile('public/brand/malaysian-ai-wordmark-on-light.png');
for (const width of [400, 800, 1600]) {
	await sharp(wordmarkOnDarkPng).resize({ width }).png().toFile(`public/brand/malaysian-ai-wordmark-on-dark-${width}.png`);
	await sharp(wordmarkOnLightPng).resize({ width }).png().toFile(`public/brand/malaysian-ai-wordmark-on-light-${width}.png`);
}
wordmarkSvg('#FFFFFF', 'malaysian-ai-wordmark-on-dark.svg');
wordmarkSvg('#000000', 'malaysian-ai-wordmark-on-light.svg');
pngSvg(
	'malaysian-ai-wordmark-on-dark-raster.svg',
	'malaysian.ai wordmark (raster, for dark backgrounds)',
	wordmarkRegion.width,
	wordmarkRegion.height,
	wordmarkOnDarkPng.toString('base64'),
);
pngSvg(
	'malaysian-ai-wordmark-on-light-raster.svg',
	'malaysian.ai wordmark (raster, for light backgrounds)',
	wordmarkRegion.width,
	wordmarkRegion.height,
	wordmarkOnLightPng.toString('base64'),
);

// --- Horizontal lockups from official masters ---
async function exportHorizontal(src: string, slug: string, bg: string) {
	const master = await sharp(src).png().toBuffer();
	const meta = await sharp(master).metadata();
	const width = meta.width!;
	const height = meta.height!;
	await sharp(master).toFile(`public/brand/malaysian-ai-lockup-horizontal-${slug}.png`);
	pngSvg(
		`malaysian-ai-lockup-horizontal-${slug}.svg`,
		`Malaysian AI horizontal lockup (${slug.replace(/-/g, ' ')})`,
		width,
		height,
		master.toString('base64'),
	);

	const padded = await withBackground(master, bg, width, height);
	await sharp(padded).toFile(`public/brand/malaysian-ai-lockup-horizontal-${slug}-bg.png`);
	pngSvg(
		`malaysian-ai-lockup-horizontal-${slug}-bg.svg`,
		`Malaysian AI horizontal lockup on ${slug.includes('dark') ? 'dark' : 'light'} background`,
		width,
		height,
		padded.toString('base64'),
	);

	for (const target of [352, 704, 1408, 2190]) {
		await sharp(padded).resize({ width: target }).png().toFile(`public/brand/malaysian-ai-lockup-horizontal-${slug}-${target}.png`);
		await sharp(master).resize({ width: target }).png().toFile(`public/brand/malaysian-ai-lockup-horizontal-${slug}-transparent-${target}.png`);
	}
}

await exportHorizontal(LOCKUP_ON_DARK_SRC, 'on-dark', BG_DARK);
await exportHorizontal(LOCKUP_ON_LIGHT_SRC, 'on-light', BG_LIGHT);

// --- Stacked lockups: mark above wordmark ---
async function exportStacked(markBuf: Buffer, wordmarkBuf: Buffer, slug: string, bg: string) {
	const markSize = 720;
	const gap = 120;
	const wordWidth = 2200;
	const markResized = await sharp(markBuf).resize(markSize, markSize).png().toBuffer();
	const wordResized = await sharp(wordmarkBuf).resize({ width: wordWidth }).png().toBuffer();
	const wordMeta = await sharp(wordResized).metadata();
	const wordHeight = wordMeta.height!;
	const canvasW = Math.max(markSize, wordWidth);
	const canvasH = markSize + gap + wordHeight;
	const stacked = await sharp({
		create: { width: canvasW, height: canvasH, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
	})
		.composite([
			{ input: markResized, left: Math.round((canvasW - markSize) / 2), top: 0 },
			{ input: wordResized, left: Math.round((canvasW - wordWidth) / 2), top: markSize + gap },
		])
		.png()
		.toBuffer();

	await sharp(stacked).toFile(`public/brand/malaysian-ai-lockup-stacked-${slug}.png`);
	pngSvg(
		`malaysian-ai-lockup-stacked-${slug}.svg`,
		`Malaysian AI stacked lockup (${slug.replace(/-/g, ' ')})`,
		canvasW,
		canvasH,
		stacked.toString('base64'),
	);

	const padded = await withBackground(stacked, bg, canvasW, canvasH);
	await sharp(padded).toFile(`public/brand/malaysian-ai-lockup-stacked-${slug}-bg.png`);
	pngSvg(
		`malaysian-ai-lockup-stacked-${slug}-bg.svg`,
		`Malaysian AI stacked lockup on ${slug.includes('dark') ? 'dark' : 'light'} background`,
		canvasW,
		canvasH,
		padded.toString('base64'),
	);

	for (const target of [284, 568, 852]) {
		await sharp(padded).resize({ width: target }).png().toFile(`public/brand/malaysian-ai-lockup-stacked-${slug}-${target}.png`);
		await sharp(stacked).resize({ width: target }).png().toFile(`public/brand/malaysian-ai-lockup-stacked-${slug}-transparent-${target}.png`);
	}
}

await exportStacked(markWhiteBuf, wordmarkOnDarkPng, 'on-dark', BG_DARK);
await exportStacked(await markBlack.png().toBuffer(), wordmarkOnLightPng, 'on-light', BG_LIGHT);

// Remove obsolete composites that used the previous mark silhouette if any leftover names confuse downloads.
for (const stale of [
	'malaysian-ai-lockup-horizontal-on-dark-bg.svg',
	'malaysian-ai-lockup-horizontal-on-light-bg.svg',
]) {
	// kept — we rewrote these paths above
	void stale;
}

console.log('Brand assets written to public/brand/');
console.log(`Wordmark crop: x=${wordmarkRegion.left} w=${wordmarkRegion.width} h=${wordmarkRegion.height}`);
