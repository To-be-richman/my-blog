"use client";

import React, { useState } from "react";
import Link from "next/link"; // 👈 導入路由跳轉組件
import TradeCardCinematic from "./TradeCardCinematic";
import { TradeLog } from "@/lib/trades";

export default function AlphaLogSection({ trade, locale }: { trade: TradeLog, locale: string }) {
  const [activeStep, setActiveStep] = useState(0);
  const currentLocale = (locale === 'en' || locale === 'tw' || locale === 'jp' ? locale : 'en') as 'en' | 'tw' | 'jp';

  const labels = {
    en: { asset: "ASSET", market: "TYPE", type: "DIR", profit: "ROI", strategy: "STRATEGY", step: "STEP", viewMore: "VIEW_MORE_DETAILS //" },
    tw: { asset: "資產", market: "類型", type: "方向", profit: "盈利率", strategy: "戰略要領", step: "步驟", viewMore: "查看更多詳細記錄 //" },
    jp: { asset: "資産", market: "タイプ", type: "方向", profit: "騰落率", strategy: "戦略要領", step: "ステップ", viewMore: "詳細データを表示 //" }
  }[currentLocale];

  const currentStepDetail = trade.stepDescriptions?.[activeStep] || trade.stepDescriptions;

  const marketMap = { SPOT: { en: "SPOT", tw: "現貨", jp: "現物" }, CONTRACT: { en: "PERP", tw: "合約", jp: "先物" }, OPTION: { en: "OPTION", tw: "期權", jp: "オプション" } };
  const typeMap = { LONG: { en: "LONG", tw: "看漲", jp: "ロング" }, SHORT: { en: "SHORT", tw: "看跌", jp: "ショート" }, UP: { en: "UP", tw: "看漲", jp: "UP" }, DOWN: { en: "DOWN", tw: "看跌", jp: "DOWN" } };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto px-6 py-12 items-center bg-black">
      
      {/* 🟢 左側：3D 智慧屏區域 */}
      <div className="h-[550px] w-full relative">
        <TradeCardCinematic 
          trade={trade} 
          locale={locale} 
          onStepChange={(step) => setActiveStep(step)} 
        />
      </div>

      {/* 🟢 右側：全新重構——金屬拉絲銘牌、字體放大與查看詳情按鈕復位面板 */}
      <div className="flex flex-col space-y-4 text-gray-200 font-mono tracking-wide bg-[#060606] border border-white/5 p-8 rounded-lg shadow-2xl">
        
        {/* 🎫 Item 01: 資產 (升級為金屬拉絲微光背板) */}
        <div className="flex items-center space-x-6 bg-gradient-to-r from-[#121212] to-[#181818] border border-white/5 p-4 rounded shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="w-28 flex-shrink-0 bg-cyan-500/10 text-cyan-400 text-sm font-black px-3 py-2 rounded text-center tracking-widest border border-cyan-500/30">
            {labels.asset}
          </div>
          {/* 字體放大：text-2xl */}
          <div className="text-2xl font-black font-sans tracking-tight text-white uppercase">
            {trade.pair.replace("/", "")}
          </div>
        </div>

        {/* 🎫 Item 02: 類型 */}
        <div className="flex items-center space-x-6 bg-gradient-to-r from-[#121212] to-[#181818] border border-white/5 p-4 rounded shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="w-28 flex-shrink-0 bg-cyan-500/10 text-cyan-400 text-sm font-black px-3 py-2 rounded text-center tracking-widest border border-cyan-500/30">
            {labels.market}
          </div>
          {/* 字體放大：text-lg */}
          <div className="text-lg font-bold text-gray-100">
            {marketMap[trade.market]?.[currentLocale] || trade.market}
          </div>
        </div>

        {/* 🎫 Item 03: 方向 */}
        <div className="flex items-center space-x-6 bg-gradient-to-r from-[#121212] to-[#181818] border border-white/5 p-4 rounded shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="w-28 flex-shrink-0 bg-cyan-500/10 text-cyan-400 text-sm font-black px-3 py-2 rounded text-center tracking-widest border border-cyan-500/30">
            {labels.type}
          </div>
          {/* 字體放大：text-lg */}
          <div className="text-lg font-black tracking-wider color-change animate-pulse duration-1000 ${trade.type === 'UP' || trade.type === 'LONG' ? 'text-emerald-400' : 'text-rose-400'}">
            {typeMap[trade.type]?.[currentLocale] || trade.type}
          </div>
        </div>

        {/* 🎫 Item 04: 盈利率 */}
        <div className="flex items-center space-x-6 bg-gradient-to-r from-[#121212] to-[#181818] border border-white/5 p-4 rounded shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="w-28 flex-shrink-0 bg-cyan-500/10 text-cyan-400 text-sm font-black px-3 py-2 rounded text-center tracking-widest border border-cyan-500/30">
            {labels.profit}
          </div>
          {/* 字體大幅度放大：text-3xl */}
          <div className="text-3xl font-black font-mono text-emerald-400 tracking-tight">
            {trade.profit}
          </div>
        </div>

        {/* 🎫 Item 05: 戰略要領 */}
        <div className="flex flex-col space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="w-28 bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1.5 rounded text-center tracking-widest border border-cyan-500/30">
              {labels.strategy}
            </div>
            <div className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/5">
              {labels.step} <span className="text-cyan-400 font-bold">{activeStep + 1}</span> / 4
            </div>
          </div>
          
          <div className="bg-black/60 border border-white/5 rounded p-4 min-h-[110px] flex flex-col justify-between transition-all duration-300">
            <div className="text-xs text-cyan-400/90 font-bold uppercase tracking-wider mb-2 font-sans">
              &gt;&gt; {currentStepDetail.title[currentLocale]}
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-sans font-normal italic">
              "{currentStepDetail.text[currentLocale]}"
            </p>
          </div>
        </div>

        {/* 🚀 核心復位：查看更多詳細記錄按鈕區域 */}
        <div className="pt-2">
          <Link 
             href={`/${locale}/terminal`}// 🎯 精準對齊您之前的 Terminal 路由與動態 Slug
            className="flex items-center justify-center w-full bg-gradient-to-b from-[#161616] to-[#0d0d0d] hover:from-[#222] hover:to-[#121212] border border-white/10 hover:border-cyan-500/40 text-xs font-bold text-gray-400 hover:text-cyan-400 py-3 rounded tracking-widest transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(0,255,255,0.08)]"
          >
            {labels.viewMore}
          </Link>
        </div>

        {/* 底條 */}
        <div className="flex justify-between items-center text-[9px] text-white/10 pt-1 font-mono uppercase tracking-widest">
          <span>DATE: {trade.date}</span>
          <span>MASTER TRADES ARCHIVE</span>
        </div>

      </div>

    </div>
  );
}
