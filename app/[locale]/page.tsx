import Hero from "@/components/Hero";

import MarketTicker from "@/components/MarketTicker";

import FeaturedPosts from "@/components/FeaturedPosts";

import EditorsNote from "@/components/EditorsNote";

import Link from "next/link";

import {
  getTranslations,
} from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } =
    await params;

  const t =
    await getTranslations({
      locale,

      namespace:
        "MarketNotes",
    });

  // Market Notes
  const marketNotes = [
    {
      title:
        t("note1Title"),

      category:
        t("note1Category"),

      href:  
    `/${locale}/notes/boj-policy-shift`,
},
    

    {
      title:
        t("note2Title"),

      category:
        t("note2Category"),

      href: "#",
    },

    {
      title:
        t("note3Title"),

      category:
        t("note3Category"),

      href: "#",
    },

    {
      title:
        t("note4Title"),

      category:
        t("note4Category"),

      href: "#",
    },
  ];

  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <Hero />

      {/* TradingView */}
      <MarketTicker />

      {/* Market Notes */}
      <section
        className="
          relative

          z-10

          max-w-7xl
          mx-auto

          px-6

          py-32
        "
      >
        {/* Header */}
        <div className="mb-14">
          <p
            className="
              text-sm

              uppercase

              tracking-[0.35em]

              text-cyan-300/70

              mb-5
            "
          >
            {t("label")}
          </p>

          <h2
            className="
              text-4xl
              md:text-6xl

              font-bold

              leading-[0.95]
              tracking-tight

              text-white

              max-w-4xl
            "
          >
            {t("title")}
          </h2>
        </div>

        {/* Grid */}
        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-4

            gap-6
          "
        >
          {marketNotes.map(
            (note) => (
              <Link
                key={note.title}
                href={note.href}
                className="
                  group

                  relative

                  overflow-hidden

                  rounded-[2rem]

                  border border-white/10

                  bg-white/[0.03]

                  backdrop-blur-2xl

                  p-8

                  transition-all
                  duration-500

                  hover:border-cyan-300/20
                  hover:bg-white/[0.05]
                "
              >
                {/* Glow */}
                <div
                  className="
                    absolute

                    top-[-80px]
                    right-[-80px]

                    h-[180px]
                    w-[180px]

                    rounded-full

                    bg-cyan-500/10

                    blur-3xl

                    opacity-0

                    transition
                    duration-700

                    group-hover:opacity-100
                  "
                />

                {/* Category */}
                <p
                  className="
                    relative z-10

                    text-xs

                    uppercase

                    tracking-[0.3em]

                    text-cyan-300/70

                    mb-5
                  "
                >
                  {note.category}
                </p>

                {/* Title */}
                <h3
                  className="
                    relative z-10

                    text-2xl

                    font-bold

                    leading-snug

                    text-white

                    transition
                    duration-500

                    group-hover:translate-y-[-4px]
                  "
                >
                  {note.title}
                </h3>

                {/* Arrow */}
                <div
                  className="
                    relative z-10

                    mt-10

                    text-white/30

                    transition
                    duration-500

                    group-hover:text-cyan-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </div>
              </Link>
            )
          )}
        </div>
      </section>

      {/* Featured */}
      <FeaturedPosts
        locale={locale}
      />

      {/* Editor */}
      <EditorsNote />
    </main>
  );
}