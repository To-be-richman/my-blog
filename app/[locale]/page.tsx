import Hero from "@/components/Hero";
import MarketTicker from "@/components/MarketTicker";
import FeaturedPosts from "@/components/FeaturedPosts";
import EditorsNote from "@/components/EditorsNote";
import AlphaLogSection from "@/components/AlphaLogSection"; // 引入新组件
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getUnifiedFeed } from "@/lib/content";
import { trades } from "@/lib/trades";

export default async function HomePage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  // 1. 获取翻译
  const t = await getTranslations({ locale, namespace: "MarketNotes" });
  const t_cat = await getTranslations({ locale, namespace: "Categories" });
  const t_time = await getTranslations({ locale, namespace: "Time" });

  // 2. 获取数据内容
  const allContent = await getUnifiedFeed(locale);
  const latestNotes = allContent.filter(item => item.type === 'note').slice(0, 4);

  // 3. 获取最新一笔交易数据
  const featuredTrade = trades[0];

  return (
    <main className="bg-black text-white">
      <Hero />
      <MarketTicker />

      {/* --- Alpha Logs 3D 展示区域 --- */}
      <AlphaLogSection trade={featuredTrade} locale={locale} />

      {/* Market Notes 区域 */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="mb-14 flex justify-between items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70 mb-5 font-mono">
              {t("terminal_label")}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-[0.95] tracking-tight text-white max-w-4xl">
              {t("title")}
            </h2>
          </div>
          <Link href={`/${locale}/notes`} className="hidden md:block font-mono text-xs text-gray-500 hover:text-cyan-300 transition-colors">
            {t("view_all")}
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/10 border border-white/10 overflow-hidden">
          {latestNotes.map((note) => {
            const getTimeAgoLabel = () => {
              const now = new Date();
              const postDate = new Date(note.date);
              const diffInMs = now.getTime() - postDate.getTime();
              const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
              const diffInDays = Math.floor(diffInHours / 24);

              if (diffInDays > 0) {
                return diffInDays === 1 ? t_time("dayAgo") : t_time("daysAgo", { count: diffInDays });
              } else if (diffInHours > 0) {
                return diffInHours === 1 ? t_time("hourAgo") : t_time("hoursAgo", { count: diffInHours });
              } else {
                return t_time("justNow");
              }
            };

            return (
              <Link
                key={note.slug}
                href={`/${locale}/notes/${note.slug}`}
                className="group relative bg-black p-8 transition-all duration-300 hover:bg-white/[0.03]"
              >
                <div className="flex justify-between items-center mb-6 font-mono text-[10px] tracking-tighter">
                  <span className="text-cyan-300/60 uppercase">
                    [{(() => {
                      const catKey = note.category.toUpperCase();
                      try { return t_cat(catKey); } catch (e) { return catKey; }
                    })()}]
                  </span>
                  <span className="text-gray-500 uppercase">{getTimeAgoLabel()}</span>
                </div>
                <h3 className="text-xl font-bold leading-tight text-white group-hover:text-cyan-300 transition-colors min-h-[3.5rem]">
                  {note.pinned && <span className="mr-2">📌</span>}
                  {note.title}
                </h3>
                <div className="mt-8 flex items-center justify-between font-mono text-[10px] text-white/20 group-hover:text-cyan-300">
                  <span>ACCESS_LOG</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </Link>
            );
          })}
        </div>
        
        <Link href={`/${locale}/notes`} className="md:hidden mt-8 block text-center font-mono text-xs text-gray-500">
          {t("view_all")}
        </Link>
      </section>

      <FeaturedPosts locale={locale} />
      <EditorsNote />
    </main>
  );
}
