import rss from "@astrojs/rss";
import MarkdownIt from "markdown-it";

export const prerender = true;

const parser = new MarkdownIt();
const postFiles = import.meta.glob("./posts/*.md", { eager: true });

export async function GET(context) {
  return rss({
    title: "Jerry Liu",
    description: "Writing by Jerry Liu",
    site: context.site,
    items: Object.entries(postFiles).map(([path, post]) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.pubDate),
      description: post.frontmatter.description,
      link: path.replace(".", "").replace(".md", "/"),
      content: parser.render(post.rawContent()),
    })),
    customData: `<language>en-us</language>`,
  });
}
