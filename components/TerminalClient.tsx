"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TradeLog } from "@/lib/trades";
import { motion, AnimatePresence } from "framer-motion";

const TradeCardCinematic = dynamic(() => import("./TradeCardCinematic"), { ssr: false });

export default function TerminalClient({ trades, locale }: { trades: TradeLog[]; locale: string }) {
  const [selectedTrade, setSelectedTrade] = useState<TradeLog | null>(null);
  const currentLocale = (locale === 'en' || locale === 'tw' || locale === 'jp' ? locale : 'en') as 'en' | 'tw' | 'jp';

  useEffect(() => { if (trades.length > 0) setSelectedTrade(trades[0]); }, [trades]);
  if (!selectedTrade) return null;

  return (
    <div className="grid lg:grid-cols-12 gap-6 items-stretch min-h-[800px]">
      {/* 🔴 左侧：极窄列表 (1/12) */}
      <div className="lg:col-span-1 space-y-4 border-r border-white/5 pr-4 overflow-y-auto max-h-[75vh]">
        {trades.map((t) => (
          <button key={t.id} onClick={() => setSelectedTrade(t)} className={`w-full aspect-square rounded-lg border transition-all ${selectedTrade.id === t.id ? "border-cyan-500 scale-110 shadow-lg" : "border-white/5 opacity-40 hover:opacity-100"}`}>
            <img src={t.screenshot} className="w-full h-full object-cover" alt="" />
          </button>
        ))}
      </div>

      {/* 🟡 中间：3D 舞台 (7/12) */}
      <div className="lg:col-span-7 bg-zinc-950/20 rounded-[3rem] border border-white/5 relative overflow-hidden backdrop-blur-3xl">
        <AnimatePresence mode="wait">
          <motion.div key={selectedTrade.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full p-8">
            <TradeCardCinematic trade={selectedTrade} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🔵 右侧：垂直信息流 (4/12) */}
      <div className="lg:col-span-4 flex flex-col justify-center p-12 bg-black/60 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-12">
        <AnimatePresence mode="wait">
          <motion.div key={selectedTrade.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
            {/* 1. 商品大字 */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.5em]">Trading Asset</span>
              <h2 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-none">{selectedTrade.pair}</h2>
            </div>
            {/* 2. 垂直详情 */}
            <div className="space-y-8 py-10 border-y border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Market</span>
                <span className="text-2xl font-bold text-white uppercase">{selectedTrade.market} / {selectedTrade.market === 'CONTRACT' ? '合約' : '現貨'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Side</span>
                <span className={`text-2xl font-bold uppercase ${selectedTrade.type === 'LONG' ? 'text-cyan-400' : 'text-orange-400'}`}>{selectedTrade.type} @{selectedTrade.leverage}</span>
              </div>
            </div>
            {/* 3. 盈利大字 */}
            <div>
              <span className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest">Performance</span>
              <p className={`text-8xl font-mono font-bold leading-none mt-2 ${selectedTrade.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{selectedTrade.profit}</p>
            </div>
            {/* 4. 注解 */}
            <p className="text-zinc-400 text-lg font-light italic border-l-2 border-cyan-500/20 pl-6">"{selectedTrade.description[currentLocale]}"</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
