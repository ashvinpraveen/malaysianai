import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION } from '../consts';

export const GET: APIRoute = async ({ site }) => {
	if (!site) throw new Error('The production site URL is required for llms.txt.');
	const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	const link = (title: string, path: string, description: string) => `- [${title}](${new URL(path, site).href}): ${description}`;
	const content = [
		'# Malaysian AI', '', `> ${SITE_DESCRIPTION}`, '',
		'Malaysian AI is a community initiative started by 500 Global, based in Kuala Lumpur, Malaysia.', '',
		'## Pages', '',
		link('Home', '/', 'Workshops, events, communities, and the AI Residency.'),
		link('About', '/about', 'Who we are, what we do, and how to take part.'),
		link('Residency', '/residency', 'A working home for founders building AI products; includes an application link and venue details.'),
		link('Residents', '/residents', 'Companies and teams in the residency.'),
		link('Blog', '/blog', 'Community stories and programme updates.'),
		link('Contact', '/contact', 'Contact the team on WhatsApp and find venue directions.'),
		link('Privacy', '/privacy', 'The residency privacy policy.'),
		link('Terms', '/terms', 'The residency terms of service.'), '',
		'## Homepage sections', '',
		link('Events', '/#events', 'Community events and a link to the Luma calendar.'),
		link('Communities', '/#communities', 'Independent AI communities and organisers.'), '',
		'## Blog posts', '',
		...posts.map(post => link(post.data.title, `/blog/${post.id}`, post.data.description)), '',
	].join('\n');
	return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
