// @ts-check
import { defineConfig } from "astro/config";
import rehypeMermaid from "rehype-mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://jerryliu.me",
  output: "static",
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      excludeLangs: ["mermaid"],
    },
    rehypePlugins: [rehypeMermaid],
  },
});
