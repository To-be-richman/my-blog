import { getTranslations } from "next-intl/server";

import { getAllPosts } from "@/lib/markdown";

import ArticlesFilter from "@/components/ArticlesFilter";

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Articles",
  });

  // ✅ 当前语言文章
  const posts =
    getAllPosts(locale);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section
        className="
          px-6
          pt-28
          pb-24

          border-b border-white/10
        "
      >
        <div className="max-w-7xl mx-auto">
          <p
            className="
              text-cyan-300
              uppercase

              tracking-[0.3em]

              text-sm
              mb-8
            "
          >
            {t("title")}
          </p>

          <h1
            className="
              text-6xl
              md:text-8xl

              font-bold

              leading-[0.95]
              tracking-tight

              max-w-6xl
            "
          >
            {t("headline")}
          </h1>

          <p
            className="
              mt-10

              text-xl
              text-white/70

              max-w-3xl

              leading-relaxed
            "
          >
            {t("description")}
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <ArticlesFilter
            posts={posts}
            locale={locale}
            readMore={t("readMore")}
          />
        </div>
      </section>
    </main>
  );
}