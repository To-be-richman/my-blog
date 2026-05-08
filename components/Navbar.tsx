"use client";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useLocale,
  useTranslations,
} from "next-intl";

import SearchModal from "@/components/SearchModal";

// ✅ 多语言搜索数据
const localizedPosts = {
  en: [
    {
      slug: "ai-semiconductor",

      title:
        "AI & Semiconductor Strategy",

      excerpt:
        "How AI is reshaping the semiconductor industry.",

      category: "Technology",
    },

    {
      slug: "crypto-market",

      title:
        "Crypto Market Psychology",

      excerpt:
        "Understanding investor emotions in crypto cycles.",

      category: "Investment",
    },

    {
      slug: "global-liquidity",

      title:
        "Global Liquidity & Markets",

      excerpt:
        "Liquidity remains the foundation of market cycles.",

      category: "Macro",
    },
  ],

  tw: [
    {
      slug: "ai-semiconductor",

      title:
        "AI 與半導體戰略",

      excerpt:
        "AI 正在重塑全球半導體產業。",

      category: "科技",
    },

    {
      slug: "crypto-market",

      title:
        "加密市場心理學",

      excerpt:
        "理解加密市場週期中的投資者情緒。",

      category: "投資",
    },

    {
      slug: "global-liquidity",

      title:
        "全球流動性與市場",

      excerpt:
        "流動性始終是市場週期的核心。",

      category: "宏觀",
    },
  ],

  jp: [
    {
      slug: "ai-semiconductor",

      title:
        "AIと半導体戦略",

      excerpt:
        "AI は半導体産業を大きく変えつつある。",

      category: "テクノロジー",
    },

    {
      slug: "crypto-market",

      title:
        "暗号市場の心理学",

      excerpt:
        "暗号市場サイクルにおける投資家心理を理解する。",

      category: "投資",
    },

    {
      slug: "global-liquidity",

      title:
        "グローバル流動性と市場",

      excerpt:
        "流動性は市場サイクルの基盤である。",

      category: "マクロ",
    },
  ],
};

export default function Navbar() {
  const locale = useLocale();

  const t =
    useTranslations("Home");

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <>
      <header
        className="
          fixed
          top-0
          left-0
          w-full
          z-50

          border-b border-white/5

          bg-black/30

          backdrop-blur-2xl
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto

            px-6

            h-20

            flex
            items-center
            justify-between
          "
        >
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="
              text-white
              text-xl
              font-semibold

              tracking-[0.25em]

              transition
              hover:opacity-80
            "
          >
            WEALTH·SUPER
          </Link>

          {/* Desktop Nav */}
          <nav
            className="
              hidden md:flex
              items-center

              gap-10
            "
          >
            <Link
              href={`/${locale}/articles`}
              className="
                text-sm
                text-white/70

                transition
                hover:text-white
              "
            >
              {t("navArticles")}
            </Link>

            <Link
              href={`/${locale}/notes`}
              className="
                text-sm
                text-white/70

                transition
                hover:text-white
              "
            >
              {t("navNotes")}
            </Link>

            <Link
              href={`/${locale}/about`}
              className="
                text-sm
                text-white/70

                transition
                hover:text-white
              "
            >
              {t("navAbout")}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="
                text-sm
                text-white/70

                transition
                hover:text-white
              "
            >
              {t("navContact")}
            </Link>
          </nav>

          {/* Right */}
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            {/* Search */}
            <div className="hidden lg:block">
              <SearchModal
                posts={
                  localizedPosts[
                    locale as keyof typeof localizedPosts
                  ]
                }
                locale={locale}
              />
            </div>

            {/* Languages */}
            <div
              className="
                hidden md:flex
                items-center
                gap-4

                text-sm
              "
            >
              <Link
                href="/en"
                className={`
                  transition
                  hover:text-white

                  ${
                    locale === "en"
                      ? "text-white"
                      : "text-white/60"
                  }
                `}
              >
                EN
              </Link>

              <Link
                href="/tw"
                className={`
                  transition
                  hover:text-white

                  ${
                    locale === "tw"
                      ? "text-white"
                      : "text-white/60"
                  }
                `}
              >
                繁體中文
              </Link>

              <Link
                href="/jp"
                className={`
                  transition
                  hover:text-white

                  ${
                    locale === "jp"
                      ? "text-white"
                      : "text-white/60"
                  }
                `}
              >
                日本語
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
              className="
                md:hidden

                flex
                flex-col
                gap-1.5

                relative
                z-[60]
              "
            >
              <span
                className={`
                  block
                  h-[2px]
                  w-6

                  bg-white

                  transition-all

                  ${
                    menuOpen
                      ? "rotate-45 translate-y-[7px]"
                      : ""
                  }
                `}
              />

              <span
                className={`
                  block
                  h-[2px]
                  w-6

                  bg-white

                  transition-all

                  ${
                    menuOpen
                      ? "opacity-0"
                      : ""
                  }
                `}
              />

              <span
                className={`
                  block
                  h-[2px]
                  w-6

                  bg-white

                  transition-all

                  ${
                    menuOpen
                      ? "-rotate-45 -translate-y-[7px]"
                      : ""
                  }
                `}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
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
            transition={{
              duration: 0.3,
            }}
            className="
              fixed
              inset-0

              z-40

              bg-black/90

              backdrop-blur-3xl
            "
          >
            <div
              className="
                flex
                flex-col

                items-center
                justify-center

                h-full

                gap-10
              "
            >
              <Link
                href={`/${locale}/articles`}
                onClick={() =>
                  setMenuOpen(
                    false
                  )
                }
                className="
                  text-3xl
                  font-bold

                  text-white
                "
              >
                {t("navArticles")}
              </Link>

              <Link
                href={`/${locale}/notes`}
                onClick={() =>
                  setMenuOpen(
                    false
                  )
                }
                className="
                  text-3xl
                  font-bold

                  text-white
                "
              >
                {t("navNotes")}
              </Link>

              <Link
                href={`/${locale}/about`}
                onClick={() =>
                  setMenuOpen(
                    false
                  )
                }
                className="
                  text-3xl
                  font-bold

                  text-white
                "
              >
                {t("navAbout")}
              </Link>

              <Link
                href={`/${locale}/contact`}
                onClick={() =>
                  setMenuOpen(
                    false
                  )
                }
                className="
                  text-3xl
                  font-bold

                  text-white
                "
              >
                {t("navContact")}
              </Link>

              {/* Languages */}
              <div
                className="
                  flex
                  gap-6

                  pt-10
                "
              >
                <Link
                  href="/en"
                  className="
                    text-white/60
                  "
                >
                  EN
                </Link>

                <Link
                  href="/tw"
                  className="
                    text-white/60
                  "
                >
                  TW
                </Link>

                <Link
                  href="/jp"
                  className="
                    text-white/60
                  "
                >
                  JP
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}