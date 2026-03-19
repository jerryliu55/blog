import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();
const postFiles = import.meta.glob("./posts/*.md", { eager: true });

export async function GET(context) {
  return rss({
    title: "Jerry Liu | Blog",
    description: "Writing by Jerry Liu",
    site: context.site,
    items: Object.entries(postFiles).map(([path, post]) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.pubDate),
      description: post.frontmatter.description,
      link: path.replace(".", "").replace(".md", "/"),
      content: sanitizeHtml(parser.render(post.rawContent())),
    })),
    customData: `<language>en-us</language>`,
  });
}
