import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

import readingTime from "reading-time";

interface Heading {
  id: string;
  text: string;
}

export function getAllPosts(locale: string) {
  const postsDirectory = path.join(
    process.cwd(),
    "content/posts",
    locale
  );

  // 防止目录不存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames =
    fs.readdirSync(postsDirectory);

  const posts = fileNames.map(
    (fileName) => {
      const slug = fileName.replace(
        ".md",
        ""
      );

      const fullPath = path.join(
        postsDirectory,
        fileName
      );

      const fileContents =
        fs.readFileSync(
          fullPath,
          "utf8"
        );

      const { data } =
        matter(fileContents);

      return {
        slug,

        title: data.title || "",

        excerpt:
          data.excerpt || "",

        date: data.date || "",

        coverImage:
          data.coverImage ||
          "/images/ai.jpg",

        category:
          data.category ||
          "Technology",
      };
    }
  );

  return posts.sort((a, b) =>
    a.date > b.date ? -1 : 1
  );
}

export function getPost(
  slug: string,
  locale: string
) {
  const postsDirectory = path.join(
    process.cwd(),
    "content/posts",
    locale
  );

  const fullPath = path.join(
    postsDirectory,
    `${slug}.md`
  );

  // 文件不存在
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents =
    fs.readFileSync(
      fullPath,
      "utf8"
    );

  const { data, content } =
    matter(fileContents);

  // 阅读时间
  const stats =
    readingTime(content);

  // 多语言阅读时间
  let localizedReadingTime =
    stats.text;

  // 日本语
  if (locale === "jp") {
    localizedReadingTime =
      `${Math.ceil(
        stats.minutes
      )}分で読める`;
  }

  // 繁体中文
  if (locale === "tw") {
    localizedReadingTime =
      `${Math.ceil(
        stats.minutes
      )} 分鐘閱讀`;
  }

  // TOC Headings
  const headings: Heading[] = [];

  // Markdown Renderer
  const renderer =
    new marked.Renderer();

  // 自动生成 Heading ID
  renderer.heading = ({
    tokens,
    depth,
  }: any) => {
    const text = tokens
      .map((token: any) => token.raw)
      .join("");

    const slug = text
      .toLowerCase()
      .replace(/[^\w]+/g, "-");

    // 只收集 h2 / h3
    if (depth === 2 || depth === 3) {
      headings.push({
        id: slug,
        text,
      });
    }

    return `
      <h${depth} id="${slug}">
        ${text}
      </h${depth}>
    `;
  };

  // Markdown → HTML
  const contentHtml = marked(
    content,
    {
      renderer,
    }
  );

  return {
    slug,

    title: data.title || "",

    excerpt:
      data.excerpt || "",

    date: data.date || "",

    coverImage:
      data.coverImage ||
      "/images/ai.jpg",

    category:
      data.category ||
      "Technology",

    contentHtml,

    // 阅读时间
    readingTime:
      localizedReadingTime,

    // TOC
    headings,
  };
}