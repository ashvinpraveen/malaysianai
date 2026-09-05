import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { parse } from 'parse5';

const root = resolve('dist');
const origin = 'https://malaysian.ai';
async function filesIn(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	return (await Promise.all(entries.map(entry => entry.isDirectory()
		? filesIn(resolve(directory, entry.name)) : resolve(directory, entry.name)))).flat();
}
function* elements(node) {
	if (node.tagName) yield node;
	for (const child of node.childNodes ?? []) yield* elements(child);
}
const files = await filesIn(root);
const available = new Set(files);
const pages = new Map();
for (const file of files.filter(file => file.endsWith('.html'))) {
	pages.set(file, [...elements(parse(await readFile(file, 'utf8')))]);
}
const errors = new Set();
for (const [file, nodes] of pages) {
	const pathname = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
	for (const node of nodes) {
		for (const { name, value } of node.attrs) {
			if (!['href', 'src', 'srcset'].includes(name) || !value) continue;
			const references = name === 'srcset' ? value.split(',').map(item => item.trim().split(/\s+/)[0]) : [value];
			for (const reference of references) {
				const url = new URL(reference, origin + pathname);
				if (url.origin !== origin) continue;
				const target = resolve(root, '.' + decodeURIComponent(url.pathname));
				const destination = available.has(target) ? target : resolve(target, 'index.html');
				if (!available.has(destination)) {
					errors.add(`${pathname}: missing ${reference}`);
				} else if (url.hash && !url.hash.startsWith('#:~:') && pages.has(destination)) {
					const id = decodeURIComponent(url.hash.slice(1));
					if (!pages.get(destination).some(element => element.attrs.some(attr => ['id', 'name'].includes(attr.name) && attr.value === id))) {
						errors.add(`${pathname}: missing anchor ${reference}`);
					}
				}
			}
		}
	}
}
// Catch accidental regressions to the original multi-megabyte hero.
const home = pages.get(resolve(root, 'index.html'));
const hero = home?.find(node => node.attrs.some(attr => attr.name === 'class' && attr.value.split(' ').includes('hero-art')));
const heroSrc = hero?.attrs.find(attr => attr.name === 'src')?.value;
if (!heroSrc || !hero.attrs.some(attr => attr.name === 'srcset')) errors.add('Homepage hero must have responsive sources.');
if (heroSrc && (await stat(resolve(root, '.' + heroSrc))).size > 500_000) errors.add('Homepage hero exceeds 500 KB.');
if (errors.size) {
	console.error([...errors].join('\n'));
	process.exitCode = 1;
} else {
	console.log(`Checked ${pages.size} pages: local links, anchors, assets and hero budget pass.`);
}
