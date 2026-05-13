import Hero from "@/components/Hero";
import MarketTicker from "@/components/MarketTicker";
import FeaturedPosts from "@/components/FeaturedPosts";
import EditorsNote from "@/components/EditorsNote";
import AlphaLogSection from "@/components/AlphaLogSection"; 
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

  // 1. 獲取翻譯
  const t = await getTranslations({ locale, namespace: "MarketNotes" });
  const t_cat = await getTranslations({ locale, namespace: "Categories" });
  const t_time = await getTranslations({ locale, namespace: "Time" });

  // 2. 獲取數據內容
  const allContent = await getUnifiedFeed(locale);
  
  // 🎯 深度防禦清洗函數：精準支持 YYYY-MM-DD 和 YYYY-MM-DDTHH:mm:ss 雙格式，消除時區回溯偏差
  const getSafeTimestamp = (item: any) => {
    const rawDate = item?.date || item?.frontmatter?.date || item?.meta?.date;
    if (!rawDate) return 0;

    const dateStr = String(rawDate).replace(/JST|UTC/gi, '').trim();
    
    // 如果包含 T 或者冒號，說明手動寫了精準時間，直接精確解析；否則拼接 00:00 降級處理
    const sanitizedStr = dateStr.includes('T') || dateStr.includes(':') 
      ? dateStr 
      : `${dateStr}T00:00:00`;

    const timestamp = Date.parse(sanitizedStr);
    return isNaN(timestamp) ? 0 : timestamp;
  };

  // 3. 實施硬核降序排序，並在時間戳完全相同時，使用 slug 進行二次防禦性排序，確保最新筆置頂
  const latestNotes = [...allContent]
    .filter(item => item.type === 'note')
    .sort((a, b) => {
      const timeA = getSafeTimestamp(a);
      const timeB = getSafeTimestamp(b);
      
      if (timeB !== timeA) {
        return timeB - timeA; // 優先按照時間從新到舊排列
      }
      
      // 💡 二級排序：若日期相同，按照 slug 的字母順序逆序排列，確保新文章精準排在第一位
      const slugA = a.slug || "";
      const slugB = b.slug || "";
      return slugB.localeCompare(slugA);
    })
    .slice(0, 4);

  // 4. 獲取最新一筆交易數據
  const featuredTrade = trades[0];

  return (
    <main className="bg-black text-white">
      <Hero />
      <MarketTicker />

      {/* --- Alpha Logs 3D 展示區域 --- */}
      <AlphaLogSection trade={featuredTrade} locale={locale} />

      {/* Market Notes 區域 */}
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
            
            // 🎯 精準對齊相對時間計算標籤，消除盲目回溯，支持真實現金流媒體規範
            const getTimeAgoLabel = () => {
              const postTimestamp = getSafeTimestamp(note);
              if (postTimestamp === 0) return t_time("justNow");

              const now = new Date();
              const diffInMs = now.getTime() - postTimestamp;

              const diffInMins = Math.floor(diffInMs / (1000 * 60));
              const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
              const diffInDays = Math.floor(diffInHours / 24);

              if (diffInDays > 0) {
                return diffInDays === 1 ? t_time("dayAgo") : t_time("daysAgo", { count: diffInDays });
              } else if (diffInHours > 0) {
                return diffInHours === 1 ? t_time("hourAgo") : t_time("hoursAgo", { count: diffInHours });
              } else if (diffInMins > 5) {
                return t_time("justNow") || `${diffInMins} mins ago`;
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
                      const rawCat = note.category || "Macro";
                      const isEnglish = /^[A-Za-z]+$/.test(rawCat);
                      const catKey = rawCat.toUpperCase();
                      
                      if (!isEnglish) return rawCat;
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
