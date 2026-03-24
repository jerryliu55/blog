import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const photos = defineCollection({
    loader: glob({ pattern: "**/*.yaml", base: "./src/content/photos" }),
    schema: z.object({
        src: z.string(),
        alt: z.string(),
        tags: z.array(z.enum(["film", "tmb", "japan", "life", "alberta"])),
        date: z.string(),
        caption: z.string().optional(),
    }),
});

export const collections = { photos };
