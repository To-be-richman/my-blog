"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { TradeLog } from "@/lib/trades";
import { motion } from "framer-motion";

// 動態加載 3D 渲染引擎
const TradeCardCinematic = dynamic(() => import("./TradeCardCinematic"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-zinc-900/10 animate-pulse rounded-2xl" />
});

export default function AlphaLogSection({ trade, locale }: { trade: TradeLog, locale: string }) {
  // ✅ 完善三語翻譯詞典
  const dict = {
    en: {
      label: "Featured Execution",
      button: "View Master Trades"
    },
    tw: {
      label: "精選執行記錄",
      button: "查看大師實盤"
    },
    jp: {
      label: "注目トレード",
      button: "マスター・トレードを表示"
    }
  };

  const t = dict[locale as keyof typeof dict] || dict.en;

  return (
    <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 border-t border-zinc-900/30">
      <div className="flex flex-col items-center">
        
        {/* 1. 頂部標籤 - 已實現多語言 */}
        <div className="flex flex-col items-center space-y-3 mb-12">
          <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
            {t.label}
          </span>
          <div className="h-[1px] w-8 bg-zinc-800"></div>
        </div>

        {/* 2. 核心 3D 展示區 */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full aspect-[3/4] md:aspect-square max-h-[500px] bg-gradient-to-b from-[#080808] to-transparent rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <TradeCardCinematic trade={trade} locale={locale} />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </motion.div>

        {/* 3. 底部按鈕 - 已實現多語言 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <Link 
            href={`/${locale}/terminal`} 
            className="group flex flex-col items-center space-y-3"
          >
            <span className="text-[11px] font-semibold text-zinc-500 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
              {t.button}
            </span>
            <div className="relative w-12 h-px bg-zinc-800 overflow-hidden">
               <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
