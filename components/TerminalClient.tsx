"use client";

import React, { useState, useMemo } from "react";
import TradeCardCinematic from "./TradeCardCinematic";
import { TradeLog } from "@/lib/trades";

export default function TerminalClient({ trades, locale }: { trades: TradeLog[], locale: string }) {
  // 1. 核心狀態：追蹤當前選中的交易記錄 ID (默認第一筆) 以及 3D 卡片當前推進到第幾步 (0~3)
  const [selectedId, setSelectedId] = useState(trades[0]?.id || "1");
  const [activeStep, setActiveStep] = useState(0);
  
  const currentLocale = (locale === 'en' || locale === 'tw' || locale === 'jp' ? locale : 'en') as 'en' | 'tw' | 'jp';

  // 2. 動態選取當前激活的交易記錄對象
  const activeTrade = useMemo(() => {
    return trades.find(t => t.id === selectedId) || trades[0];
  }, [trades, selectedId]);

  // 3. 靜態多國語言標籤與變量映射字典 (放大字體與高對比度銘牌專用)
  const labels = {
    en: { asset: "ASSET", market: "TYPE", type: "DIR", profit: "ROI", strategy: "STRATEGY", step: "STEP", archive: "ARCHIVE" },
    tw: { asset: "資產", market: "類型", type: "方向", profit: "盈利率", strategy: "戰略要領", step: "步驟", archive: "歷史存檔" },
    jp: { asset: "資産", market: "タイプ", type: "方向", profit: "騰落率", strategy: "戦略要領", step: "ステップ", archive: "履歴記録" }
  }[currentLocale];

  const marketMap = { 
    SPOT: { en: "SPOT", tw: "現貨", jp: "現物" }, 
    CONTRACT: { en: "PERP", tw: "合約", jp: "先物" }, 
    OPTION: { en: "OPTION", tw: "期權", jp: "オプション" } 
  };
  const typeMap = { 
    LONG: { en: "LONG", tw: "看漲", jp: "ロング" }, 
    SHORT: { en: "SHORT", tw: "看跌", jp: "ショート" }, 
    UP: { en: "UP", tw: "看漲", jp: "UP" }, 
    DOWN: { en: "DOWN", tw: "看跌", jp: "DOWN" } 
  };

  // 4. 安全獲取當前步驟的動態文字描述
  const currentStepDetail = useMemo(() => {
    if (!activeTrade?.stepDescriptions || activeTrade.stepDescriptions.length === 0) {
      return { 
        title: { en: "DATA_EMPTY", tw: "無數據", jp: "データなし" }, 
        text: activeTrade?.description || { en: "", tw: "", jp: "" } 
      };
    }
    return activeTrade.stepDescriptions[activeStep] || activeTrade.stepDescriptions[0];
  }, [activeTrade, activeStep]);

  return (
    <div className="flex h-screen w-full bg-black text-white font-mono overflow-hidden select-none">
      
      {/* 🔴 左側一體化：歷史存檔縮略圖歸檔列表 (藍框區域隔離) */}
      <div className="w-24 h-full border-r border-white/5 bg-[#030303] flex flex-col items-center py-6 space-y-4 overflow-y-auto flex-shrink-0">
        <div className="text-[9px] text-white/30 uppercase tracking-widest text-center border-b border-white/5 pb-2 w-full font-bold">
          {labels.archive}
        </div>
        {trades.map((t) => {
          const isSelected = t.id === selectedId;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSelectedId(t.id);
                setActiveStep(0); // 切換交易時重置步驟
              }}
              className={`w-16 h-28 rounded border overflow-hidden relative transition-all duration-300 flex-shrink-0 ${
                isSelected 
                  ? "border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.25)] scale-105" 
                  : "border-white/10 opacity-40 hover:opacity-80 hover:border-white/30"
              }`}
            >
              {/* 縮略圖背景，精確讀取各自專屬文件夾下的獨立主圖 */}
              <img 
                src={`/images/trades/${t.slug}/main.png`} 
                alt={t.pair} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-center py-0.5 font-sans font-bold truncate px-0.5">
                {t.pair.replace("/", "")}
              </div>
            </button>
          );
        })}
      </div>

      {/* 🔴 中間一體化：3D 核心智慧屏 Canvas 渲染區 */}
      <div className="flex-1 h-full relative bg-[#010101]">
        <TradeCardCinematic 
          trade={activeTrade} 
          locale={locale} 
          // 🎯 核心聯動：當用戶在 3D 卡片上點擊前進時，實時更新詳情頁步驟
          onStepChange={(step) => setActiveStep(step)} 
        />
      </div>

      {/* 🔴 右側一體化：全新重構金屬拉絲銘牌均勻並列面板 (精準同步視覺調性) */}
      <div className="w-[460px] h-full border-l border-white/5 bg-[#050505] p-8 flex flex-col justify-between overflow-y-auto flex-shrink-0 shadow-2xl">
        
        <div className="space-y-4">
          
          {/* 🎫 銘牌 01: 資產 */}
          <div className="flex items-center space-x-6 bg-gradient-to-r from-[#121212] to-[#181818] border border-white/5 p-4 rounded shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="w-28 flex-shrink-0 bg-cyan-500/10 text-cyan-400 text-sm font-black px-3 py-2 rounded text-center tracking-widest border border-cyan-500/30">
              {labels.asset}
            </div>
            <div className="text-2xl font-black font-sans tracking-tight text-white uppercase">
              {activeTrade.pair.replace("/", "")}
            </div>
          </div>

          {/* 🎫 銘牌 02: 類型 */}
          <div className="flex items-center space-x-6 bg-gradient-to-r from-[#121212] to-[#181818] border border-white/5 p-4 rounded shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="w-28 flex-shrink-0 bg-cyan-500/10 text-cyan-400 text-sm font-black px-3 py-2 rounded text-center tracking-widest border border-cyan-500/30">
              {labels.market}
            </div>
            <div className="text-lg font-bold text-gray-100">
              {marketMap[activeTrade.market]?.[currentLocale] || activeTrade.market}
            </div>
          </div>

          {/* 🎫 銘牌 03: 方向 */}
          <div className="flex items-center space-x-6 bg-gradient-to-r from-[#121212] to-[#181818] border border-white/5 p-4 rounded shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="w-28 flex-shrink-0 bg-cyan-500/10 text-cyan-400 text-sm font-black px-3 py-2 rounded text-center tracking-widest border border-cyan-500/30">
              {labels.type}
            </div>
            <div className={`text-lg font-black tracking-wider ${activeTrade.type === 'UP' || activeTrade.type === 'LONG' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {typeMap[activeTrade.type]?.[currentLocale] || activeTrade.type}
            </div>
          </div>

          {/* 🎫 銘牌 04: 盈利率 */}
          <div className="flex items-center space-x-6 bg-gradient-to-r from-[#121212] to-[#181818] border border-white/5 p-4 rounded shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="w-28 flex-shrink-0 bg-cyan-500/10 text-cyan-400 text-sm font-black px-3 py-2 rounded text-center tracking-widest border border-cyan-500/30">
              {labels.profit}
            </div>
            <div className="text-3xl font-black font-mono text-emerald-400 tracking-tight">
              {activeTrade.profit}
            </div>
          </div>

          {/* 🎫 銘牌 05: 戰略要領 (深度動態步驟解釋器) */}
          <div className="flex flex-col space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="w-28 bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1.5 rounded text-center tracking-widest border border-cyan-500/30">
                {labels.strategy}
              </div>
              <div className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/5">
                {labels.step} <span className="text-cyan-400 font-bold">{activeStep + 1}</span> / {activeTrade.backStepsCount + 1}
              </div>
            </div>
            
            <div className="bg-black/60 border border-white/5 rounded p-5 min-h-[140px] flex flex-col justify-between transition-all duration-300">
              <div className="text-xs text-cyan-400/90 font-bold uppercase tracking-wider mb-2 font-sans">
                &gt;&gt; {currentStepDetail.title[currentLocale]}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed font-sans font-normal italic">
                "{currentStepDetail.text[currentLocale]}"
              </p>
            </div>
          </div>

        </div>

        {/* 頁腳核心存檔標籤 */}
        <div className="flex justify-between items-center text-[9px] text-white/10 pt-4 border-t border-white/5 font-mono uppercase tracking-widest">
          <span>RECORD_DATE: {activeTrade.date}</span>
          <span>QUANT_ANALYSIS_SYS</span>
        </div>

      </div>

    </div>
  );
}
