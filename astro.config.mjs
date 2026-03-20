// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://jerryliu.me",
  adapter: cloudflare(),
  image: {
    service: passthroughImageService(),
  },
});
