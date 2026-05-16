'use client';

import React, { useState, useEffect } from 'react';

interface CopyLinkButtonProps {
  url?: string;
  locale?: string;
}

const translations: Record<string, { shareText: string; copyText: string; copiedText: string }> = {
  en: { shareText: 'SHARE THIS NOTE', copyText: 'Copy Link', copiedText: 'Copied!' },
  jp: { shareText: 'このノートをシェアする', copyText: 'リンクをコピー', copiedText: 'コピーしました！' },
  tw: { shareText: 'SHARE THIS NOTE', copyText: '複製連結', copiedText: '已複製！' },
};

export default function CopyLinkButton({ url, locale = 'tw' }: CopyLinkButtonProps) {
  const t = translations[locale] || translations['tw'];
  
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 安全獲取當前頁面乾淨的完整網址
    setShareUrl(url || window.location.href.split('?')[0].split('#')[0]);
  }, [url]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('複製失敗: ', err);
    }
  };

  if (!shareUrl) return null;

  return (
    <div className="my-12 flex flex-col items-center justify-center border-t border-b border-white/10 py-8">
      <p className="mb-5 text-xs tracking-[0.25em] text-white/40 uppercase font-medium">{t.shareText}</p>
      
      {/* 僅保留唯一的、具備動態反饋的極簡複製按鈕 */}
      <button
        onClick={handleCopyLink}
        className={`flex h-11 px-8 items-center justify-center rounded-full border text-sm tracking-wide transition-all duration-300 gap-2 min-w-[150px] ${
          copied 
            ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
            : 'border-white/20 text-white/80 hover:border-white hover:text-white bg-transparent'
        }`}
        title="複製連結"
      >
        <span className="text-base">{copied ? '✅' : '🔗'}</span>
        <span className="font-medium">{copied ? t.copiedText : t.copyText}</span>
      </button>
    </div>
  );
}
