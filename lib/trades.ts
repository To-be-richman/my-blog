// lib/trades.ts - 🚀 終端大盤頁與 3D 智慧屏雙軌完美兼容最終版

export interface TradeStepDetail {
  title: { en: string; tw: string; jp: string };
  text: { en: string; tw: string; jp: string };
}

export interface TradeLog {
  id: string;
  slug: string;
  date: string;
  pair: string;          
  market: 'SPOT' | 'CONTRACT' | 'OPTION'; 
  type: 'LONG' | 'SHORT' | 'UP' | 'DOWN'; 
  profit: string;        
  leverage: string;      
  entryPrice: string;    
  exitPrice: string;
  strategy: { en: string; tw: string; jp: string };
  description: { en: string; tw: string; jp: string }; 
  stepDescriptions: TradeStepDetail[]; 
  backStepsCount: number; 

  // 🎯 核心補齊：保留此舊字段，徹底根治 TerminalClient 組件因找不到圖片路徑引發的 reading 'en' 崩潰
  screenshots: {
    en: string;
    tw: string;
    jp: string;
  };
}

export const trades: TradeLog[] = [
  {
    id: "1",
    slug: "btc-option-up-001", 
    date: "2026-05-13",
    pair: "BTC/USDT",
    market: "OPTION",
    type: "UP",
    profit: "+15.00%",
    leverage: "10,000 USDT",
    entryPrice: "81,033.70",
    exitPrice: "81,250.00",
    backStepsCount: 3, 
    strategy: { en: "OPTION_UP_60S", tw: "60秒極速期權突破", jp: "60秒バイナリー選定" },
    description: { en: "Option contract simulation.", tw: "期權合約實盤模擬。", jp: "オプション実盤シミュレーション。" },
    
    // 🎯 精準指引：讓終端大盤頁面能夠順利抓取到您的全新全小寫主圖，阻止報錯
    screenshots: {
      en: "/images/trades/btc-option-up-001/main.png",
      tw: "/images/trades/btc-option-up-001/main.png",
      jp: "/images/trades/btc-option-up-001/main.png"
    },

    stepDescriptions: [
      {
        title: { en: "PHASE_01: ORDER BOOK SCANNING", tw: "步驟一：流動性深度與決策原點", jp: "ステップ１：板情報の流動性スキャン" },
        text: { en: "Scan order book buy limit walls.", tw: "實時監控微觀訂單流，捕獲大口限價買單牆。", jp: "板情報の買い流動性密集を確認。" }
      },
      {
        title: { en: "PHASE_02: PARAMS CONFIGURATION", tw: "步驟二：期權級別與倉位配置", jp: "ステップ２：オプションパラメータの選定" },
        text: { en: "Set expiration to 60s contract.", tw: "切換進入期權面板，設定60秒極速交割週期。", jp: "満期を60秒の短期契約に設定。" }
      },
      {
        title: { en: "PHASE_03: SPLIT-SECOND EXECUTION", tw: "步驟三：訂單擊發與最佳點位鎖定", jp: "ステップ３：注文執行と約定価格の確保" },
        text: { en: "Trigger buy on liquidity pool contact.", tw: "在價格精確向下踩中多頭蓄水池瞬間，擊發綠色Buy按鈕。", jp: "流動性ポケット接触の瞬間、緑のBuyを約定。" }
      },
      {
        title: { en: "PHASE_04: VOLATILITY SETTLEMENT", tw: "步驟四：交割清算與利潤落袋", jp: "ステップ４：満期決済と利益の確定" },
        text: { en: "Expired safely above entry trigger.", tw: "期權成功交割於入場觸發線上方，Delta波動率溢價順利落袋。", jp: "権利行使価格を上回り満期決済、純益を確定。" }
      }
    ]
  }
];
