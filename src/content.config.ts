import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string().optional(),
		imageAlt: z.string().optional(),
		imageWidth: z.number().positive().optional(),
		imageHeight: z.number().positive().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: z.string(),
		authorType: z.enum(['Person', 'Organization']).default('Organization'),
		category: z.enum(['announcements', 'cohort-stories', 'curriculum', 'events']),
	}),
});

export const collections = { blog };
