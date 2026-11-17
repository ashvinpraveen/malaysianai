import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		image: image().optional(),
		imageAlt: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: z.string(),
		authorType: z.enum(['Person', 'Organization']).default('Organization'),
		category: z.enum(['announcements', 'cohort-stories', 'curriculum', 'events', 'podcast']),
		youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/).optional(),
		guest: z.string().optional(),
		/** When true, the episode page uses the written intro, takeaways, and links. Otherwise it shows the YouTube description. */
		complete: z.boolean().default(false),
		takeaways: z.array(z.string()).optional(),
		references: z.array(z.object({ label: z.string(), href: z.url() })).optional(),
		guestLinks: z.array(z.object({ label: z.string(), href: z.url() })).optional(),
	}).superRefine((entry, context) => {
		if (entry.category === 'podcast' && !entry.youtubeId) {
			context.addIssue({ code: 'custom', message: 'A podcast story needs a youtubeId.', path: ['youtubeId'] });
		}
	}),
});

export const collections = { blog };
