"use client";

import { useEffect } from "react";

export default function MarketTicker() {
  useEffect(() => {
    const container =
      document.getElementById(
        "tradingview_ticker"
      );

    // 防止重複加載
    if (
      !container ||
      container.hasChildNodes()
    ) {
      return;
    }

    const script =
      document.createElement(
        "script"
      );

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";

    script.type =
      "text/javascript";

    script.async = true;

    // ✅ 這裡精確拼接你提供的第二段 JSON，並修復了括號閉合
    script.innerHTML = `
      {
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500"
          },

          {
            "proName": "NASDAQ:QQQ",
            "title": "QQQ"
          },

          {
            "proName": "NASDAQ:NVDA",
            "title": "NVIDIA"
          },

          {
            "proName": "NASDAQ:TSLA",
            "title": "TESLA"
          },

          {
            "proName": "INDEX:BTCUSD",
            "title": "Bitcoin"
          },

          {
            "proName": "INDEX:ETHUSD",
            "title": "Ethereum"
          },

          {
            "proName": "OANDA:XAUUSD",
            "title": "Gold"
          },

          {
            "proName": "TVC:USOIL",
            "title": "Crude Oil"
          },

          {
            "proName": "FX_IDC:USDJPY",
            "title": "USD/JPY"
          }
        ],
        "showSymbolLogo": true,

        "isTransparent": true,

        "displayMode": "adaptive",

        "colorTheme": "dark",

        "locale": "en"
      }
    `;

    container.appendChild(
      script
    );
  }, []);

  return (
    <div
      className="
        sticky
        top-20

        z-40

        border-b border-white/5

        bg-black/90

        backdrop-blur-2xl
      "
    >
      <div
        className="
          tradingview-widget-container
        "
      >
        <div
          id="tradingview_ticker"

          className="
            tradingview-widget-container__widget
          "
        />
      </div>
    </div>
  );
}
