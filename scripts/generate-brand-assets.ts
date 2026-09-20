import sharp from 'sharp';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { BRAND_WORDMARK_PATH } from '../src/lib/brand';

mkdirSync('public/brand', { recursive: true });

const mark = sharp('public/malaysian-ai-mark.png');
for (const size of [32, 64, 128, 256, 512]) {
	await mark
		.clone()
		.resize(size, size, { kernel: 'lanczos3' })
		.png()
		.toFile(`public/brand/malaysian-ai-mark-${size}.png`);
}
await mark.clone().png().toFile('public/brand/malaysian-ai-mark.png');

const markBuf = await sharp('public/malaysian-ai-mark.png').png().toBuffer();
const markB64 = markBuf.toString('base64');

function wordmarkOnly(fill: string, filename: string) {
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

function lockupHorizontal(fill: string, filename: string, bg: string | null = null) {
	const bgRect = bg ? `<rect width="352" height="68" fill="${bg}"/>` : '';
	writeFileSync(
		`public/brand/${filename}`,
		`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="352" height="68" viewBox="0 0 352 68" fill="none" role="img" aria-labelledby="title">
  <title id="title">Malaysian AI logo lockup</title>
  ${bgRect}
  <image href="data:image/png;base64,${markB64}" x="0" y="0" width="67.9183" height="67.9183"/>
  <path d="${BRAND_WORDMARK_PATH}" fill="${fill}"/>
</svg>
`,
	);
}

function lockupStacked(fill: string, filename: string, bg: string | null = null) {
	const w = 284;
	const markSize = 96;
	const gap = 16;
	const wordH = 68;
	const totalH = markSize + gap + wordH;
	const markX = (w - markSize) / 2;
	const scale = w / 284.0817;
	const bgRect = bg ? `<rect width="${w}" height="${totalH}" fill="${bg}"/>` : '';
	writeFileSync(
		`public/brand/${filename}`,
		`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${totalH}" viewBox="0 0 ${w} ${totalH}" fill="none" role="img" aria-labelledby="title">
  <title id="title">Malaysian AI stacked logo</title>
  ${bgRect}
  <image href="data:image/png;base64,${markB64}" x="${markX}" y="0" width="${markSize}" height="${markSize}"/>
  <g transform="translate(0 ${markSize + gap}) scale(${scale}) translate(-67.9183 0)">
    <path d="${BRAND_WORDMARK_PATH}" fill="${fill}"/>
  </g>
</svg>
`,
	);
}

wordmarkOnly('#FCFBF4', 'malaysian-ai-wordmark-on-dark.svg');
wordmarkOnly('#0c2221', 'malaysian-ai-wordmark-on-light.svg');
lockupHorizontal('#FCFBF4', 'malaysian-ai-lockup-horizontal-on-dark.svg');
lockupHorizontal('#0c2221', 'malaysian-ai-lockup-horizontal-on-light.svg');
lockupHorizontal('#FCFBF4', 'malaysian-ai-lockup-horizontal-on-dark-bg.svg', '#06090f');
lockupHorizontal('#0c2221', 'malaysian-ai-lockup-horizontal-on-light-bg.svg', '#f4efe6');
lockupStacked('#FCFBF4', 'malaysian-ai-lockup-stacked-on-dark.svg');
lockupStacked('#0c2221', 'malaysian-ai-lockup-stacked-on-light.svg');
lockupStacked('#FCFBF4', 'malaysian-ai-lockup-stacked-on-dark-bg.svg', '#06090f');
lockupStacked('#0c2221', 'malaysian-ai-lockup-stacked-on-light-bg.svg', '#f4efe6');

writeFileSync(
	'public/brand/malaysian-ai-mark.svg',
	`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512" role="img" aria-labelledby="title">
  <title id="title">Malaysian AI mark</title>
  <image href="data:image/png;base64,${markB64}" width="512" height="512"/>
</svg>
`,
);

async function renderLockupPng(svgPath: string, outPath: string, width: number) {
	await sharp(readFileSync(svgPath)).resize({ width }).png().toFile(outPath);
}

for (const width of [352, 704, 1408]) {
	await renderLockupPng(
		'public/brand/malaysian-ai-lockup-horizontal-on-dark-bg.svg',
		`public/brand/malaysian-ai-lockup-horizontal-on-dark-${width}.png`,
		width,
	);
	await renderLockupPng(
		'public/brand/malaysian-ai-lockup-horizontal-on-light-bg.svg',
		`public/brand/malaysian-ai-lockup-horizontal-on-light-${width}.png`,
		width,
	);
}

for (const width of [284, 568]) {
	await renderLockupPng(
		'public/brand/malaysian-ai-lockup-stacked-on-dark-bg.svg',
		`public/brand/malaysian-ai-lockup-stacked-on-dark-${width}.png`,
		width,
	);
	await renderLockupPng(
		'public/brand/malaysian-ai-lockup-stacked-on-light-bg.svg',
		`public/brand/malaysian-ai-lockup-stacked-on-light-${width}.png`,
		width,
	);
}

console.log('Brand assets written to public/brand/');
