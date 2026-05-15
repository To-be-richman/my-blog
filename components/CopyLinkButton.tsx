'use client';

import React, { useState } from 'react';

interface SharePanelProps {
  title?: string;
  url?: string;
  locale?: string;
}

const translations: Record<string, { shareText: string; copyText: string; copiedText: string }> = {
  en: {
    shareText: 'SHARE THIS NOTE',
    copyText: 'Copy Link',
    copiedText: 'Copied!',
  },
  jp: {
    shareText: 'このノートをシェアする',
    copyText: 'リンクをコピー',
    copiedText: 'コピーしました！',
  },
  tw: {
    shareText: 'SHARE THIS NOTE',
    copyText: '複製連結',
    copiedText: '已複製！',
  },
};

export default function CopyLinkButton({ title = 'WealthSuper Note', url, locale = 'tw' }: SharePanelProps) {
  const t = translations[locale] || translations['tw'];
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('複製失敗: ', err);
    }
  };

  return (
    <div className="my-12 flex flex-col items-center justify-center border-t border-b border-white/10 py-8">
      <p className="mb-5 text-xs tracking-[0.25em] text-white/40 uppercase font-medium">{t.shareText}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={`https://twitter.com{encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-base text-white/70 hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          𝕏
        </a>
        <a
          href={`https://facebook.com{encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-lg font-bold text-white/70 hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          f
        </a>
        <a
          href={`https://linkedin.com{encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-sm font-bold text-white/70 hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          in
        </a>
        <a
          href={`https://line.me{encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-xs font-black tracking-tighter text-white/70 hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          LINE
        </a>
        <div className="hidden sm:block h-6 w-[1px] bg-white/10 mx-2" />
        <button
          onClick={handleCopyLink}
          className={`flex h-11 px-6 items-center justify-center rounded-full border text-sm tracking-wide transition-all duration-300 gap-2 min-w-[145px] ${
            copied 
              ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20' 
              : 'border-white/20 text-white/80 hover:border-white hover:text-white bg-transparent'
          }`}
        >
          <span className="text-base">{copied ? '✅' : '🔗'}</span>
          <span className="font-medium">{copied ? t.copiedText : t.copyText}</span>
        </button>
      </div>
    </div>
  );
}
