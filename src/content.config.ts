import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        description: z.string(),
        author: z.string(),
        tags: z.array(z.string()),
        draft: z.boolean().default(false),
    }),
});

const photos = defineCollection({
    loader: glob({ pattern: "**/*.yaml", base: "./src/content/photos" }),
    schema: z.object({
        src: z.string(),
        alt: z.string(),
        tags: z.array(z.enum(["film", "tmb", "japan", "life", "alberta"])),
        date: z.string(),
        caption: z.string().optional(),
        hover_info: z.string().optional(),
    }),
});

export const collections = { posts, photos };
