// app/[locale]/notes/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Newsletter from "@/components/Newsletter"; 
import CopyLinkButton from "@/components/CopyLinkButton"; // ✅ 完美引入極簡複製組件

export default async function NotePage({
  params,
}: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  const { locale, slug } = await params;

  const notesDirectory = path.join(process.cwd(), "content/notes", locale);
  const fullPath = path.join(notesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = marked(content);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero 區域 */}
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-cyan-950/10" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-36 pb-20">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70 mb-6">{data.category}</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight max-w-4xl">{data.title}</h1>
          <p className="mt-10 text-sm text-white/30">{data.date}</p>
        </div>
      </section>

      {/* 正文區域 */}
      <section className="px-6 py-24">
        <article
          className="prose prose-invert prose-headings:text-white prose-p:text-white/75 prose-strong:text-white prose-li:text-white/70 prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8 prose-p:text-xl prose-p:leading-[1.9] prose-p:mb-8 max-w-4xl mx-auto"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        
        {/* ✨ 在正文結束後、訂閱欄出現前，安全掛載極簡多語言複製按鈕 */}
        <div className="max-w-4xl mx-auto">
          <CopyLinkButton locale={locale} />
        </div>
        
        {/* 掛載訂閱組件 */}
        <div className="max-w-4xl mx-auto mt-20">
           <Newsletter />
        </div>
      </section>
    </main>
  );
}
