"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
}

export default function ArticlesFilter({
  posts,
  locale,
  readMore,
}: {
  posts: Post[];
  locale: string;
  readMore: string;
}) {
  const t = useTranslations("Categories");

  // 1. 提取分类：使用 MD 中的原始字符串
  const categories = useMemo(() => {
    const unique = new Set(posts.map((post) => post.category));
    return ["ALL", ...Array.from(unique)];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState("ALL");

  // 2. 过滤逻辑
  const filteredPosts =
    activeCategory === "ALL"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <>
      {/* 終端感毛玻璃 Filter：極簡、透明、不遮擋文章 */}
      <div
        className="
          sticky 
          top-20 
          z-30 
          mb-12 
          flex 
          flex-wrap 
          gap-2 
          rounded-xl
          border border-white/5 
          bg-black/40 
          backdrop-blur-md 
          p-2 
          md:p-3
        "
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              relative
              rounded-md
              px-3 
              py-1.5
              text-[10px] 
              font-mono 
              uppercase
              tracking-widest
              transition-all
              duration-300
              ${
                activeCategory === cat
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            {/* 核心防禦邏輯：解決 MISSING_MESSAGE 報錯 */}
            {(() => {
              try {
                // 1. 嘗試直接匹配 (如 "Technology • Macro")
                return t(cat);
              } catch (e) {
                try {
                  // 2. 如果失敗，嘗試匹配全大寫 (如 "TECHNOLOGY • MACRO")
                  return t(cat.toUpperCase());
                } catch (e2) {
                  // 3. 都失敗則直接顯示原始文字
                  return cat;
                }
              }
            })()}
          </button>
        ))}
      </div>

      {/* Posts 列表 */}
      <div className="space-y-16 md:space-y-24">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href={`/${locale}/posts/${post.slug}`}
              className="group grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
            >
              <div className="relative overflow-hidden rounded-2xl h-[240px] md:h-[420px] bg-white/5">
                <Image
                  src={post.coverImage || "/images/ai.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div>
                <p className="text-cyan-400 font-mono tracking-[0.2em] text-[10px] mb-3 uppercase">
                  [{post.category}]
                </p>
                <h2 className="text-2xl md:text-5xl font-bold leading-tight mb-4 md:mb-6 transition duration-300 group-hover:text-cyan-300">
                  {post.title}
                </h2>
                <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="text-cyan-400 font-mono tracking-[0.2em] text-xs">
                  {readMore} {"->"}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
