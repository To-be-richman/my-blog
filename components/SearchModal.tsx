"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  Search,
  X,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useTranslations } from "next-intl";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
}

export default function SearchModal({
  posts,
  locale,
}: {
  posts: Post[];

  locale: string;
}) {
  const t =
    useTranslations("Search");

  const [open, setOpen] =
    useState(false);

  const [query, setQuery] =
    useState("");

  // ⌘K / Ctrl+K
  useEffect(() => {
    const down = (
      e: KeyboardEvent
    ) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key === "k"
      ) {
        e.preventDefault();

        setOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      down
    );

    return () =>
      window.removeEventListener(
        "keydown",
        down
      );
  }, []);

  // 搜索过滤
  const filteredPosts =
    useMemo(() => {
      if (!query) {
        return posts.slice(0, 6);
      }

      return posts.filter(
        (post) =>
          post.title
            .toLowerCase()
            .includes(
              query.toLowerCase()
            ) ||
          post.excerpt
            .toLowerCase()
            .includes(
              query.toLowerCase()
            ) ||
          post.category
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
      );
    }, [query, posts]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() =>
          setOpen(true)
        }
        className="
          flex
          items-center
          gap-3

          rounded-full

          border border-white/10

          bg-white/[0.03]

          px-5
          py-3

          text-white/60

          transition
          hover:bg-white/[0.06]
        "
      >
        <Search size={16} />

        <span>{t("button")}</span>

        <div
          className="
            rounded-md

            border border-white/10

            px-2
            py-1

            text-xs
            text-white/40
          "
        >
          ⌘K
        </div>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed inset-0
              z-[999]

              bg-black/70

              backdrop-blur-xl
            "
          >
            {/* Panel */}
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 20,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                absolute
                left-1/2
                top-24

                w-full
                max-w-2xl

                -translate-x-1/2

                rounded-[2rem]

                border border-white/10

                bg-[#050816]

                shadow-2xl
              "
            >
              {/* Header */}
              <div
                className="
                  flex
                  items-center

                  border-b border-white/10

                  px-6
                  py-5
                "
              >
                <Search
                  size={18}
                  className="text-white/40"
                />

                <input
                  autoFocus
                  value={query}
                  onChange={(e) =>
                    setQuery(
                      e.target.value
                    )
                  }
                  placeholder={t(
                    "placeholder"
                  )}
                  className="
                    ml-4
                    flex-1

                    bg-transparent

                    text-white

                    outline-none

                    placeholder:text-white/30
                  "
                />

                <button
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    text-white/40

                    transition
                    hover:text-white
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* Results */}
              <div
                className="
                  max-h-[500px]
                  overflow-y-auto

                  p-4
                "
              >
                {filteredPosts.length ===
                0 ? (
                  <div
                    className="
                      py-16
                      text-center
                      text-white/40
                    "
                  >
                    {t("empty")}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredPosts.map(
                      (post) => (
                        <Link
                          key={post.slug}
                          href={`/${locale}/posts/${post.slug}`}
                          onClick={() =>
                            setOpen(
                              false
                            )
                          }
                          className="
                            block

                            rounded-2xl

                            border border-white/10

                            bg-white/[0.03]

                            p-5

                            transition
                            hover:bg-white/[0.06]
                          "
                        >
                          {/* Category */}
                          <p
                            className="
                              text-xs
                              uppercase

                              tracking-[0.25em]

                              text-cyan-300

                              mb-3
                            "
                          >
                            {
                              post.category
                            }
                          </p>

                          {/* Title */}
                          <h3
                            className="
                              text-xl
                              font-bold

                              text-white

                              mb-2
                            "
                          >
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p
                            className="
                              text-white/50
                              leading-relaxed
                            "
                          >
                            {
                              post.excerpt
                            }
                          </p>
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}