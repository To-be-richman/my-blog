"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TradeLog } from "@/lib/trades";
import { motion, AnimatePresence } from "framer-motion";

// 动态加载 3D 引擎，保持高档加载质感
const TradeCardCinematic = dynamic(() => import("./TradeCardCinematic"), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-zinc-900/10 animate-pulse rounded-2xl flex items-center justify-center">
      <span className="text-zinc-600 font-medium text-xs tracking-widest">LOADING ASSET...</span>
    </div>
  )
});

export default function TerminalClient({ trades = [], locale }: { trades: TradeLog[]; locale: string }) {
  // ✅ 1. 初始化保护：默认设为 null，并在渲染前做严格检查
  const [selectedTrade, setSelectedTrade] = useState<TradeLog | null>(null);
  const currentLocale = (locale === 'en' || locale === 'tw' || locale === 'jp' ? locale : 'en') as 'en' | 'tw' | 'jp';

  // ✅ 2. 国际化词典 (金融专业术语)
  const dict = {
    en: { 
      asset: "ASSET", 
      market: "MARKET", 
      side: "POSITION", 
      roi: "TOTAL RETURN", 
      notes: "STRATEGY BRIEF", 
      index: "ARCHIVE",
      contract: "Contract",
      spot: "Spot",
      long: "Long",
      short: "Short"
    },
    tw: { 
      asset: "交易資產", 
      market: "市場類型", 
      side: "持倉方向", 
      roi: "投資回報", 
      notes: "策略要點", 
      index: "實盤存檔",
      contract: "合約",
      spot: "現貨",
      long: "看多",
      short: "看空"
    },
    jp: { 
      asset: "資産", 
      market: "市場", 
      side: "方向", 
      roi: "騰落率", 
      notes: "戦略要領", 
      index: "アーカイブ",
      contract: "先物",
      spot: "現物",
      long: "ロング",
      short: "ショート"
    }
  };

  const t = dict[currentLocale];

  // ✅ 3. 数据同步与安全挂载
  useEffect(() => {
    if (trades && trades.length > 0 && !selectedTrade) {
      setSelectedTrade(trades[0]);
    }
  }, [trades, selectedTrade]);

  // ✅ 4. 报错拦截：如果数据没准备好，渲染空状态而不是崩溃
  if (!trades || trades.length === 0 || !selectedTrade) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center border border-zinc-900 rounded-3xl bg-zinc-950/50">
        <p className="text-zinc-700 font-medium tracking-widest">INITIALIZING DATA STREAM...</p>
      </div>
    );
  }

  // ✅ 5. 安全的颜色判断逻辑
  const isPositive = selectedTrade.profit?.startsWith('+');

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-screen lg:min-h-[850px] pb-32 lg:pb-0">
      
      {/* 🔴 列表区：左侧(PC)/底部(手机) - 金融画廊风格 */}
      <div className="order-3 lg:order-1 lg:col-span-1 flex lg:flex-col border-t lg:border-t-0 lg:border-r border-zinc-900 pt-8 lg:pt-0 lg:pr-8">
        <p className="hidden lg:block text-[10px] font-bold text-zinc-600 uppercase mb-8 tracking-[0.2em] text-center">
          {t.index}
        </p>
        <div className="flex lg:flex-col gap-5 overflow-x-auto lg:overflow-y-auto custom-scrollbar pb-4 lg:pb-0 px-4 lg:px-0">
          {trades.map((trade) => (
            <motion.button
              key={trade.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTrade(trade)}
              className={`flex-shrink-0 w-16 lg:w-full aspect-square transition-all duration-500 rounded-none border-b-2 ${
                selectedTrade.id === trade.id 
                  ? "border-white opacity-100 shadow-sm" 
                  : "border-transparent opacity-20 hover:opacity-50"
              }`}
            >
              <img src={trade.screenshots[currentLocale]} className="w-full h-full object-cover grayscale" alt="" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* 🟡 中间：3D 舞台 - 极简背景，强调物体质感 */}
      <div className="order-1 lg:order-2 lg:col-span-7 relative h-[450px] lg:h-full bg-[#080808] rounded-sm border border-zinc-900 overflow-hidden shadow-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTrade.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="w-full h-full"
          >
            <TradeCardCinematic trade={selectedTrade} locale={locale} />
          </motion.div>
        </AnimatePresence>
        {/* 右上角装饰 ID */}
        <div className="absolute top-8 right-8 pointer-events-none opacity-10 hidden lg:block">
          <span className="text-[10px] font-medium text-white tracking-[0.3em]">ID // {selectedTrade.id.padStart(3, '0')}</span>
        </div>
      </div>

      {/* 🔵 右侧：详情注解 - 报表排版，去程序化 */}
      <div className="order-2 lg:order-3 lg:col-span-4 flex flex-col justify-center py-4 lg:py-10 px-4 lg:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedTrade.id}-${locale}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.5 }}
            className="space-y-12 lg:space-y-16"
          >
            {/* 商品标题 */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em]">{t.asset}</span>
              <h2 className="text-5xl lg:text-7xl font-light text-white tracking-tighter uppercase leading-none">
                {selectedTrade.pair}
              </h2>
            </div>

            {/* 核心报表数据 */}
            <div className="grid grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 border-t border-zinc-900 pt-10">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em]">{t.market}</span>
                <p className="text-xl text-zinc-200 font-medium uppercase tracking-tight">
                  {selectedTrade.market === 'CONTRACT' ? t.contract : t.spot}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em]">{t.side}</span>
                <p className={`text-xl font-bold tracking-tight text-white`}>
                  {selectedTrade.type === 'LONG' ? t.long : t.short} 
                  <span className="text-zinc-600 font-light ml-2">@{selectedTrade.leverage}</span>
                </p>
              </div>
            </div>

            {/* 盈利率：使用高级绿色 #00FF88 */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em]">{t.roi}</span>
              <p className={`text-7xl lg:text-8xl font-medium tracking-[-0.05em] leading-none ${isPositive ? 'text-[#00FF88]' : 'text-[#FF4444]'}`}>
                {selectedTrade.profit}
              </p>
            </div>

            {/* 策略说明：优雅的斜体引用感 */}
            <div className="pt-10 border-t border-zinc-900">
              <h3 className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-6">{t.notes}</h3>
              <p className="text-zinc-400 text-lg leading-[1.8] font-light italic border-l border-zinc-800 pl-6">
                "{selectedTrade.description[currentLocale]}"
              </p>
            </div>

            <div className="pt-6 text-[10px] text-zinc-800 font-medium uppercase tracking-widest flex justify-between">
              <span>Date: {selectedTrade.date}</span>
              <span>Master Trades Archive</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
