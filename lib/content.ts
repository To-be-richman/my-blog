// lib/content.ts - 【终端增强版】
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
  pinned?: boolean; // 新增：支持置顶标记
}

export async function getUnifiedFeed(locale: string): Promise<UnifiedContent[]> {
  // 1. 获取本地 Posts (文章)
  const rawPosts = getAllPosts(locale);
  const posts: UnifiedContent[] = rawPosts.map(p => ({
    ...p,
    type: 'post' as const,
    source: 'local' as const,
    pinned: false // 文章默认不置顶，如需置顶可在 MD 中添加
  }));

  // 2. 获取本地 Notes (动态笔记)
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
        pinned: data.pinned || false, // 从 MD 的 Front Matter 中读取 pinned 字段
        type: 'note' as const,
        source: 'local' as const
      };
    });
  }

  // 3. 复合排序逻辑：
  // 第一权重：pinned (置顶的文章/笔记排在最前)
  // 第二权重：date (日期倒序，最新的排在前面)
  return [...posts, ...localNotes].sort((a, b) => {
    // 处理置顶逻辑
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    // 处理时间逻辑
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
