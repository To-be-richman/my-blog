// app/[locale]/terminal/page.tsx

import { trades } from "@/lib/trades";
import TerminalClient from "@/components/TerminalClient";

export default async function TerminalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titleDict: Record<string, string> = {
    en: "Master Trades",
    tw: "大師實盤記錄",
    jp: "マスター・トレード"
  };

  const pageTitle = titleDict[locale] || titleDict.en;

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 selection:bg-zinc-800">
      <div className="max-w-[1600px] mx-auto px-8">
        
        {/* 極簡金融風格 Header */}
        <header className="mb-20">
          <div className="space-y-4">
            <h1 className="text-6xl font-extrabold tracking-[ -0.04em] text-white">
              {pageTitle}
            </h1>
            <div className="flex items-center gap-4 text-zinc-500">
              <span className="h-[1px] w-12 bg-zinc-800"></span>
              <p className="text-xs font-medium uppercase tracking-[0.2em]">
                Excellence in Execution // {new Date().getFullYear()} Archive
              </p>
            </div>
          </div>
        </header>

        <TerminalClient trades={trades} locale={locale} />
      </div>
    </main>
  );
}
