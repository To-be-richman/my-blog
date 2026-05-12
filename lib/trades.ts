// lib/trades.ts - 最终校准版

export interface TradeLog {
  id: string;
  slug: string;
  date: string;
  pair: string;          
  market: 'SPOT' | 'CONTRACT'; 
  type: 'LONG' | 'SHORT'; 
  profit: string;        
  leverage: string;      
  entryPrice: string;    
  exitPrice: string;
  strategy: {
    en: string;
    tw: string;
    jp: string;
  };
  screenshot: string;    
  description: {
    en: string;
    tw: string;
    jp: string;
  };
}

export const trades: TradeLog[] = [
  {
    id: "1",
    slug: "binance-contract-001",
    date: "2024-05-12",
    pair: "BTC/USDT",
    market: "CONTRACT",
    type: "LONG",
    profit: "+272.05%",
    leverage: "50x",
    entryPrice: "61,500",
    exitPrice: "64,200",
    strategy: {
      en: "H4_BREAKOUT",
      tw: "H4 級別突破",
      jp: "H4ブレイクアウト"
    },
    screenshot: "/images/trades/trade-1.png", 
    description: {
      en: "Binance contract execution. Entered on H4 resistance flip with strong volume confirmation.",
      tw: "幣安合約執行。在 H4 阻力位轉換後進場，伴隨強大的成交量確認。",
      jp: "バイナンス先物取引。H4抵抗線の転換と強いボリュームを確認してエントリー。"
    }
  },
  {
    id: "2",
    slug: "market-analysis-002",
    date: "2024-05-15",
    pair: "ETH/USDT",
    market: "SPOT",
    type: "LONG",
    profit: "+15.40%",
    leverage: "1x",
    entryPrice: "3,120",
    exitPrice: "3,600",
    strategy: {
      en: "TREND_FOLLOWING",
      tw: "趨勢跟蹤",
      jp: "トレンドフォロー"
    },
    screenshot: "/images/trades/trade-2.png", 
    description: {
      en: "Spot market trend analysis. Monitoring accumulation patterns near local demand zones.",
      tw: "現貨市場趨勢分析。監測局部需求區附近的累積模式。",
      jp: "現物市場のトレンド分析。ローカルな需要ゾーン付近での蓄積パターンを監視。"
    }
  },
  {
    id: "3",
    slug: "okx-transfer-003",
    date: "2024-05-20",
    pair: "SOL/USDT",
    market: "SPOT",
    type: "LONG",
    profit: "+45.1%",
    leverage: "1x",
    entryPrice: "145",
    exitPrice: "162",
    strategy: {
      en: "PORTFOLIO_REBALANCE",
      tw: "資產配置調整",
      jp: "リバランス"
    },
    screenshot: "/images/trades/trade-3.png", 
    description: {
      en: "OKX asset management. Execution of cross-platform rebalancing strategy.",
      tw: "OKX 資產管理。執行跨平台倉位平衡策略。",
      jp: "OKX資産管理。クロスプラットフォームの再調整戦略の実行。"
    }
  }
];
