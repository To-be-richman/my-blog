// lib/content.ts - 【安全恢复版】
import { getAllPosts } from "./markdown";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface UnifiedContent {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  type: 'post' | 'note';
  source: 'local' | 'firebase';
}

export async function getUnifiedFeed(locale: string): Promise<UnifiedContent[]> {
  // ✅ 暂时只读取本地数据，彻底跳过 Firebase 以解决报错
  const rawPosts = getAllPosts(locale);
  const posts: UnifiedContent[] = rawPosts.map(p => ({
    ...p,
    type: 'post' as const,
    source: 'local' as const
  }));

  const notesDirectory = path.join(process.cwd(), "content/notes", locale);
  let localNotes: UnifiedContent[] = [];

  if (fs.existsSync(notesDirectory)) {
    const fileNames = fs.readdirSync(notesDirectory);
    localNotes = fileNames.map(fileName => {
      const fileContents = fs.readFileSync(path.join(notesDirectory, fileName), "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug: fileName.replace(".md", ""),
        title: data.title || "",
        excerpt: content ? content.slice(0, 100) + "..." : "",
        date: data.date || "",
        category: data.category || "Macro",
        type: 'note' as const,
        source: 'local' as const
      };
    });
  }

  // 排序并返回
  return [...posts, ...localNotes].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
