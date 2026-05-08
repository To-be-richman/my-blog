"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import Image from "next/image";

import { motion } from "framer-motion";

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
  // 分类
  const categories =
    useMemo(() => {
      const unique =
        new Set(
          posts.map(
            (post) =>
              post.category
          )
        );

      return [
        "ALL",
        ...Array.from(unique),
      ];
    }, [posts]);

  const [activeCategory, setActiveCategory] =
    useState("ALL");

  // 过滤
  const filteredPosts =
    activeCategory === "ALL"
      ? posts
      : posts.filter(
          (post) =>
            post.category ===
            activeCategory
        );

  return (
    <>
      {/* Sticky Filter */}
      <div
        className="
          sticky
          top-20
          z-30

          mb-20

          flex
          flex-wrap
          gap-4

          rounded-[1.5rem]

          border border-white/10

          bg-black/60

          backdrop-blur-2xl

          px-6
          py-5
        "
      >
        {categories.map(
          (category) => (
            <button
              key={category}
              onClick={() =>
                setActiveCategory(
                  category
                )
              }
              className={`
                relative

                rounded-full

                border

                px-6
                py-3

                text-sm
                uppercase

                tracking-[0.2em]

                transition-all
                duration-300

                ${
                  activeCategory ===
                  category
                    ? `
                      border-cyan-400
                      bg-cyan-400
                      text-black
                    `
                    : `
                      border-white/10
                      bg-white/[0.03]
                      text-white/60

                      hover:border-white/20
                      hover:text-white
                    `
                }
              `}
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Posts */}
      <div className="space-y-24">
        {filteredPosts.map(
          (post) => (
            <motion.div
              key={post.slug}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <Link
                href={`/${locale}/posts/${post.slug}`}
                className="
                  group
                  grid
                  lg:grid-cols-2
                  gap-14
                  items-center
                "
              >
                {/* Image */}
                <div
                  className="
                    relative
                    overflow-hidden

                    rounded-[2rem]

                    h-[420px]

                    bg-white/5
                  "
                >
                  <Image
                    src={
                      post.coverImage ||
                      "/images/ai.jpg"
                    }
                    alt={post.title}
                    fill
                    className="
                      object-cover

                      transition
                      duration-700

                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Content */}
                <div>
                  <p
                    className="
                      text-cyan-300
                      uppercase

                      tracking-[0.25em]

                      text-sm
                      mb-5
                    "
                  >
                    {post.category}
                  </p>

                  <h2
                    className="
                      text-5xl
                      font-bold

                      leading-tight

                      mb-6

                      transition
                      duration-300

                      group-hover:translate-x-2
                    "
                  >
                    {post.title}
                  </h2>

                  <p
                    className="
                      text-white/70
                      text-lg

                      leading-relaxed

                      mb-8
                    "
                  >
                    {post.excerpt}
                  </p>

                  <span
                    className="
                      text-cyan-300
                      uppercase

                      tracking-[0.2em]

                      text-sm
                    "
                  >
                    {readMore} →
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        )}
      </div>
    </>
  );
}