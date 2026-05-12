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
  screenshots: {
    en: string;
    tw: string;
    jp: string;
  };
  description: {
    en: string;
    tw: string;
    jp: string;
  };
}

export const trades: TradeLog[] = [
  {
    id: "1",
    slug: "btc-long-breakout-001",
    date: "2024-05-12",
    pair: "BTC/USDT",
    market: "CONTRACT",
    type: "LONG",
    profit: "+125.4%",
    leverage: "50x",
    entryPrice: "61,500",
    exitPrice: "64,200",
    strategy: {
      en: "BREAKOUT_CONFIRMED",
      tw: "突破回踩確認",
      jp: "ブレイクアウト確認"
    },
    // ✅ 已修正為 trade-1.png
    screenshots: {
      en: "/images/trades/trade-1.png",
      tw: "/images/trades/trade-1.png",
      jp: "/images/trades/trade-1.png"
    },
    description: {
      en: "Entered after 61.5k resistance breakout, confirmed with volume expansion on retest. This position was scaled in after the H4 close above the key zone, maintaining a strict stop loss below the breakout candle low.",
      tw: "在 61.5k 阻力位突破後入場，隨後在回踩過程中觀察到成交量縮減確認支撐。該頭寸是在 H4 級別收盤高於關鍵區域後進行加倉的，並將止損嚴格設置在突破燭台底部下方。",
      jp: "61.5kの抵抗線を突破した後にエントリー。リテスト時にボリュームの減少でサポートを確認。H4足が重要ゾーンの上で確定した後にポジションを拡大し、ブレイクアウトしたローソク足の安値の下に厳格なストップロスを配置しました。"
    }
  },
  {
    id: "2",
    slug: "eth-short-rejection-002",
    date: "2024-05-15",
    pair: "ETH/USDT",
    market: "CONTRACT",
    type: "SHORT",
    profit: "+85.2%",
    leverage: "20x",
    entryPrice: "3,120",
    exitPrice: "2,950",
    strategy: {
      en: "RESISTANCE_REJECTION",
      tw: "高位縮量假突破",
      jp: "レジスタンス拒絶"
    },
    // ✅ 已修正為 trade-2.png
    screenshots: {
      en: "/images/trades/trade-2.png",
      tw: "/images/trades/trade-2.png",
      jp: "/images/trades/trade-2.png"
    },
    description: {
      en: "Failed to hold above 3,200 level. Entered short on the breakdown of the 1H trendline with bearish divergence on RSI. The target was the previous daily support level which was reached with high momentum.",
      tw: "ETH 無法企穩在 3,200 點上方，並在跌破小時級別上升趨勢線後果斷開空，同時觀察到 RSI 出現看跌背離信號。盈利目標設定在前一個日線級別支撐位，並以強勁動能達成目標。",
      jp: "3,200レベルを維持できず、1時間足のトレンドラインを割り込んだところでショートエントリー。RSIで弱気のダイバージェンスも確認。ターゲットは前日の日次サポートレベルに設定され、強い勢いで到達しました。"
    }
  },
  {
    id: "3",
    slug: "sol-trend-follow-003",
    date: "2024-05-20",
    pair: "SOL/USDT",
    market: "SPOT",
    type: "LONG",
    profit: "+45.1%",
    leverage: "1x",
    entryPrice: "145",
    exitPrice: "162",
    strategy: {
      en: "TREND_FOLLOWING",
      tw: "趨勢跟蹤策略",
      jp: "トレンドフォロー"
    },
    // ✅ 已修正為 trade-3.png
    screenshots: {
      en: "/images/trades/trade-3.png",
      tw: "/images/trades/trade-3.png",
      jp: "/images/trades/trade-3.png"
    },
    description: {
      en: "SOL showed strong relative strength during the market recovery. Spot buying on EMA20 support for mid-term holding. This trade focused on ecosystem growth and daily demand zone accumulation.",
      tw: "在市場整體回調中 SOL 展現出極強的韌性，在 EMA20 均線支撐位進行現貨買入，計畫作為中期持有頭寸。此項交易的核心在於生態系統的增長以及日線級別需求區的累積。",
      jp: "市場の回復期にSOLが強い相対的優位性を示した。中期保有のため、EMA20のサポートで現物を購入しました。このトレードは、エコシステムの成長と日次デマンドゾーンでの蓄積に焦点を当てています。"
    }
  }
];