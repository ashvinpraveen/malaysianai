import { get } from '@vercel/blob';
import { createWriteStream, existsSync, readFileSync } from 'node:fs';
import { mkdir, open, rename, rm } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { dirname, join } from 'node:path';
import {
	BODY_FALLBACKS,
	DISPLAY_FALLBACKS,
	TIMELESS_BLOB_PREFIX,
	TIMELESS_FILENAMES,
	timelessFontPath,
	timelessFontsReady,
} from '../src/lib/timeless-fonts.mjs';

const root = join(dirname(new URL(import.meta.url).pathname), '..');
const stagingDir = join(root, 'src/assets/fonts/timeless/.staging');
const quoteFamily = (name) => name.includes(' ') ? `"${name}"` : name;
const fallbackList = `Display falls back to ${DISPLAY_FALLBACKS.map(quoteFamily).join(', ')}. Body falls back to ${BODY_FALLBACKS.map(quoteFamily).join(', ')}.`;

loadEnvFiles();

try {
	await fetchTimelessFonts();
} catch (error) {
	await rm(stagingDir, { recursive: true, force: true });
	const reason = publicReason(error);
	if (timelessFontsReady()) {
		console.warn(`[fonts] Timeless could not be downloaded (${reason}). Using the copies already in src/assets/fonts/timeless/.`);
	} else {
		await removePartialFonts();
		console.warn(`[fonts] Timeless could not be downloaded (${reason}). ${fallbackList}`);
	}
}

async function fetchTimelessFonts() {
	const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
	if (!token) {
		if (timelessFontsReady()) {
			console.warn('[fonts] BLOB_READ_WRITE_TOKEN is not set. Using Timeless files already present in src/assets/fonts/timeless/.');
			return;
		}
		console.warn(`[fonts] BLOB_READ_WRITE_TOKEN is not set. Timeless will not be embedded. ${fallbackList}`);
		await removePartialFonts();
		return;
	}

	await rm(stagingDir, { recursive: true, force: true });
	await mkdir(stagingDir, { recursive: true });
	const downloads = await Promise.allSettled(TIMELESS_FILENAMES.map((filename) => downloadFont(filename, token)));
	const failed = downloads.find((result) => result.status === 'rejected');
	if (failed) throw failed.reason;
	await mkdir(dirname(timelessFontPath(TIMELESS_FILENAMES[0])), { recursive: true });
	for (const filename of TIMELESS_FILENAMES) {
		await rename(join(stagingDir, filename), timelessFontPath(filename));
	}
	await rm(stagingDir, { recursive: true, force: true });
}

async function downloadFont(filename, token) {
	const pathname = `${TIMELESS_BLOB_PREFIX}/${filename}`;
	const result = await get(pathname, { access: 'private', token, useCache: false });
	if (!result || result.statusCode !== 200 || !result.stream) {
		throw new Error(`${filename} is missing from the private store`);
	}
	const destination = join(stagingDir, filename);
	await pipeline(Readable.fromWeb(result.stream), createWriteStream(destination));
	if (!(await hasWoff2Signature(destination))) {
		throw new Error(`${filename} is not a woff2 font`);
	}
}

async function hasWoff2Signature(file) {
	const handle = await open(file, 'r');
	try {
		const bytes = new Uint8Array(4);
		const { bytesRead } = await handle.read(bytes, 0, 4, 0);
		return bytesRead === 4 && String.fromCharCode(...bytes) === 'wOF2';
	} finally {
		await handle.close();
	}
}

async function removePartialFonts() {
	await Promise.all(TIMELESS_FILENAMES.map((filename) => rm(timelessFontPath(filename), { force: true })));
}

function loadEnvFiles() {
	const preexisting = new Set(Object.keys(process.env));
	for (const filename of ['.env', '.env.local']) {
		const path = join(root, filename);
		if (!existsSync(path)) continue;
		for (const line of readFileSync(path, 'utf8').split('\n')) {
			const trimmed = line.trim();
			if (!trimmed || trimmed.startsWith('#')) continue;
			const eq = trimmed.indexOf('=');
			if (eq <= 0) continue;
			const key = trimmed.slice(0, eq).trim();
			if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key) || preexisting.has(key)) continue;
			let value = trimmed.slice(eq + 1).trim();
			if (
				(value.startsWith('"') && value.endsWith('"'))
				|| (value.startsWith("'") && value.endsWith("'"))
			) {
				value = value.slice(1, -1);
			}
			process.env[key] = value;
		}
	}
}

function publicReason(error) {
	const raw = error instanceof Error ? error.message : 'download failed';
	const redacted = raw
		.replace(/https?:\/\/\S+/g, '[url]')
		.replace(/vercel_blob_\S+/g, '[token]')
		.replace(/Bearer\s+\S+/g, 'Bearer [token]');
	const clipped = redacted.replace(/\s+/g, ' ').trim().slice(0, 180);
	return clipped || 'download failed';
}
