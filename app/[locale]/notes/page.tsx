// app/[locale]/notes/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default async function NotesListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const notesDirectory = path.join(process.cwd(), "content/notes", locale);

  let notes: any[] = [];
  if (fs.existsSync(notesDirectory)) {
    const filenames = fs.readdirSync(notesDirectory);
    notes = filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => {
        const filePath = path.join(notesDirectory, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        return {
          slug: filename.replace(".md", ""),
          ...data,
        };
      });
    
    // 📌 核心置頂排序演算法：
    notes.sort((a, b) => {
      // 1. 同時判斷前端可能用的 pin 或 sticky 標籤 (支援布林值或字串)
      const aPinned = a.pin === true || a.pin === "true" || a.sticky === true || a.sticky === "true";
      const bPinned = b.pin === true || b.pin === "true" || b.sticky === true || b.sticky === "true";

      // 2. 如果一個置頂一個沒置頂，置頂的排前面
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      // 3. 如果置頂狀態相同，則嚴格按照日期（最新在前面）倒序排列
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  return (
    <main className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* 頂部高端 Cyan 環境光暈 */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-36 pb-24 relative z-10">
        {/* 頂部標題區 */}
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-400/80 mb-4 font-semibold">MARKET NOTES</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.1] mb-20 text-white">
          Global macro,<br />
          semiconductors, crypto and<br />
          liquidity research.
        </h1>

        {/* 3 列網格卡片佈局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Link 
              key={note.slug} 
              href={`/${locale}/notes/${note.slug}`}
              className="group block relative bg-zinc-950/40 rounded-2xl border border-white/5 p-6 hover:border-white/10 hover:bg-zinc-950/80 transition-all duration-300 min-h-[320px] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center">
                  {/* 類別標籤 */}
                  <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-medium group-hover:text-cyan-400 transition-colors">
                    {note.category || 'MACRO'}
                  </span>
                  {/* 📌 如果是置頂文章，右上角低調顯示一個小圖標提示 */}
                  {(note.pin === true || note.pin === "true" || note.sticky === true || note.sticky === "true") && (
                    <span className="text-xs text-cyan-400/50" title="Pinned">📌</span>
                  )}
                </div>
                
                {/* 文章標題 */}
                <h2 className="text-xl font-bold mt-4 mb-3 leading-snug text-white/90 group-hover:text-white transition-colors line-clamp-2">
                  {note.title || note.slug}
                </h2>
                
                {/* 核心共識摘要 */}
                <p className="text-xs text-white/40 leading-relaxed line-clamp-4 font-light group-hover:text-white/50 transition-colors">
                  {note.summary || note.description || (note.content ? note.content.slice(0, 120) : '')}
                </p>
              </div>

              {/* 底部日期 */}
              <div className="mt-8 pt-4 border-t border-white/5 text-[11px] text-white/20 tracking-wider">
                {note.date}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
