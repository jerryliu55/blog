// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://jerryliu.me",
  adapter: cloudflare(),
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"],
    },
    rehypePlugins: [rehypeMermaid],
  },
});
