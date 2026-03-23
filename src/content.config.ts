import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const beyondCode = defineCollection({
	loader: glob({ base: './src/content/beyond-code', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			private: z.boolean().optional(),
			video: z.boolean().optional(),
			tags: z.array(z.string()).optional(),
			relatedPosts: z.array(z.string()).optional(),
			keyInsights: z
				.array(
					z.object({
						number: z.string(),
						description: z.string(),
					}),
				)
				.length(3)
				.optional(),
		}),
});

export const collections = { 'beyond-code': beyondCode };
