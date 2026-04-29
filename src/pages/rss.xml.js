import rss from "@astrojs/rss";
import MarkdownIt from "markdown-it";
import { getCollection } from "astro:content";

export const prerender = true;

const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("posts", ({ data }) => import.meta.env.DEV || !data.draft);
  return rss({
    title: "Jerry Liu",
    description: "Writing by Jerry Liu",
    site: context.site,
    image: `${context.site}favicon.svg`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
      content: parser.render(post.body),
    })),
    customData: `<language>en-us</language>`,
  });
}
