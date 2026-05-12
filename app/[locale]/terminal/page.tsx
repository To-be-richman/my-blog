import { trades } from "@/lib/trades";
import TerminalClient from "@/components/TerminalClient";

export default async function TerminalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-[1700px] mx-auto px-8">
        <header className="mb-16 pl-8 border-l-2 border-cyan-500">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic text-white">Alpha Logs</h1>
          <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.5em] mt-3">// SYSTEM_ACTIVE</p>
        </header>
        <TerminalClient trades={trades} locale={locale} />
      </div>
    </main>
  );
}
