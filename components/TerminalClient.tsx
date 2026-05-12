"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { TradeLog } from "@/lib/trades";
import { motion, AnimatePresence } from "framer-motion";

// 异步加载 3D 引擎
const TradeCardCinematic = dynamic(() => import("./TradeCardCinematic"), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-white/[0.02] animate-pulse rounded-3xl flex items-center justify-center font-mono text-[10px] text-zinc-600">
      CONNECTING_TO_STATION...
    </div>
  )
});

export default function TerminalClient({ trades = [], locale }: { trades: TradeLog[]; locale: string }) {
  const [selectedTrade, setSelectedTrade] = useState<TradeLog | null>(null);
  const currentLocale = (locale === 'en' || locale === 'tw' || locale === 'jp' ? locale : 'en') as 'en' | 'tw' | 'jp';

  useEffect(() => {
    if (trades && trades.length > 0 && !selectedTrade) {
      setSelectedTrade(trades[0]);
    }
  }, [trades, selectedTrade]);

  if (!trades || trades.length === 0 || !selectedTrade) {
    return (
      <div className="h-[600px] w-full flex items-center justify-center border border-dashed border-white/10 rounded-[2rem] bg-white/5 font-mono text-zinc-500">
        [ SIGNAL_LOST: NO_DATA_DETECTED ]
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-5 items-stretch min-h-[850px]">
      
      {/* 左侧列表：极窄红框模式 (col-span-1) */}
      <div className="lg:col-span-1 flex flex-col border-r border-white/5 pr-4">
        <p className="text-[8px] font-mono text-zinc-600 uppercase mb-5 tracking-widest text-center">Archive</p>
        <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar max-h-[75vh]">
          {trades.map((trade) => (
            <motion.button
              key={trade.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTrade(trade)}
              className={`w-full group relative aspect-square border transition-all duration-500 overflow-hidden rounded-xl ${
                selectedTrade.id === trade.id 
                  ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] opacity-100" 
                  : "border-white/5 grayscale opacity-30 hover:opacity-100 hover:grayscale-0"
              }`}
            >
              <img src={trade.screenshots[currentLocale]} className="w-full h-full object-cover" alt={trade.pair} />
              <div className={`absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity ${selectedTrade.id === trade.id ? 'opacity-100' : ''}`} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* 中间舞台：3D 区域 (col-span-7) */}
      <div className="lg:col-span-7 relative bg-gradient-to-b from-white/[0.03] to-transparent rounded-[3rem] border border-white/5 overflow-hidden backdrop-blur-xl group">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTrade.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full p-10"
          >
            {/* ✅ 核心修复：在这里也补上了 locale={locale} */}
            <TradeCardCinematic trade={selectedTrade} locale={locale} />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute top-10 left-10 pointer-events-none opacity-20">
          <div className="text-[10px] font-mono text-white tracking-[0.5em] mb-1">STATION_ID // WS-TERM-04</div>
          <div className="h-px w-20 bg-gradient-to-r from-cyan-500 to-transparent" />
        </div>
      </div>

      {/* 右侧详情：垂直排版 (col-span-4) */}
      <div className="lg:col-span-4 p-16 flex flex-col justify-center bg-zinc-950/50 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`data-${selectedTrade.id}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12 relative z-10"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.6em]">Trading Asset</span>
              <h2 className="text-7xl font-black tracking-tighter text-white italic leading-none uppercase">
                {selectedTrade.pair}
              </h2>
            </div>

            <div className="space-y-8 py-10 border-y border-white/5">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-2">Market Type</span>
                <span className="text-2xl font-bold text-white tracking-widest uppercase">
                  {selectedTrade.market === 'CONTRACT' ? 'Contract / 合約' : 'Spot / 現貨'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-2">Position Side</span>
                <span className={`text-2xl font-bold tracking-widest uppercase ${selectedTrade.type === 'LONG' ? 'text-cyan-400' : 'text-orange-400'}`}>
                  {selectedTrade.type} <span className="text-zinc-600 ml-2 font-medium">@{selectedTrade.leverage}</span>
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.4em]">Performance</span>
              <p className={`text-8xl font-mono font-bold leading-none tracking-tighter ${selectedTrade.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {selectedTrade.profit}
              </p>
            </div>

            <div className="pt-8">
              <h3 className="text-[10px] font-mono text-cyan-500/40 uppercase tracking-[0.3em] mb-5">/ Strategy_Intelligence</h3>
              <p className="text-zinc-400 leading-relaxed font-light italic text-lg border-l-2 border-cyan-500/20 pl-6">
                "{selectedTrade.description[currentLocale]}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
