"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { TradeLog } from "@/lib/trades";

const TradeCardCinematic = dynamic(() => import("./TradeCardCinematic"), { ssr: false });

export default function AlphaLogSection({ trade, locale }: { trade: TradeLog, locale: string }) {
  const currentLocale = (locale === 'en' || locale === 'tw' || locale === 'jp' ? locale : 'en') as 'en' | 'tw' | 'jp';

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
      <div className="grid lg:grid-cols-12 gap-16 items-center">
        
        {/* 左侧 3D 舞台 (7/12) */}
        <div className="lg:col-span-7 aspect-square bg-zinc-900/20 rounded-[3rem] border border-white/5 overflow-hidden relative">
          <TradeCardCinematic trade={trade} />
        </div>

        {/* 右侧垂直详情 (5/12) */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
             <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.8em] block">Live Execution</span>
             <h2 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-none">{trade.pair}</h2>
             <p className={`text-6xl font-mono font-bold ${trade.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{trade.profit}</p>
          </div>

          <div className="py-10 border-y border-white/10 space-y-6">
             <div className="flex justify-between font-mono">
                <span className="text-zinc-600 text-xs uppercase tracking-widest">Market</span>
                <span className="text-white font-bold tracking-widest">{trade.market}</span>
             </div>
             <div className="flex justify-between font-mono">
                <span className="text-zinc-600 text-xs uppercase tracking-widest">Direction</span>
                <span className={trade.type === 'LONG' ? 'text-cyan-400' : 'text-orange-400'}>{trade.type} @{trade.leverage}</span>
             </div>
          </div>

          <p className="text-zinc-400 text-lg font-light leading-relaxed italic border-l border-white/10 pl-6">
            “{trade.description[currentLocale]}”
          </p>

          <Link href={`/${locale}/terminal`} className="inline-flex items-center gap-4 text-xs font-mono text-cyan-300 hover:text-white transition-colors group">
            <span className="border-b border-cyan-300 group-hover:border-white uppercase tracking-widest">Access Full Archive</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
