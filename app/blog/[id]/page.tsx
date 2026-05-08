import { posts } from "../../data/posts";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import Image from "next/image";


import TableOfContents from "../../components/TableOfContents";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        文章不存在
      </div>
    );
  }

  // 自动提取 Markdown H2 标题
  const headings =
    post.content.match(/^##\s(.+)/gm)?.map((heading) => {
      const text = heading.replace(/^##\s/, "");

      return {
        text,
        id: text.toLowerCase().replace(/\s+/g, "-"),
      };
    }) || [];

  return (
    <div className="relative z-10">
   

      {/* ===== Hero ===== */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">

        {/* Cover */}
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-5xl px-6 pb-24 md:px-10">

            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-gray-300 backdrop-blur-md">
              Editorial
            </div>

            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white md:text-7xl">
              {post.title}
            </h1>

            <p className="mt-6 text-sm uppercase tracking-[0.25em] text-gray-400">
              {post.date}
            </p>

          </div>
        </div>
      </section>

      {/* ===== Article ===== */}
      <section className="relative">

        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl gap-20 px-6 py-24">

          {/* ===== Article Content ===== */}
          <div className="flex-1 max-w-3xl">

            <article
              className="
                prose
                prose-invert
                prose-lg
                max-w-none

                prose-headings:tracking-tight
                prose-headings:text-white

                prose-h1:text-5xl

                prose-h2:mt-20
                prose-h2:text-3xl
                prose-h2:font-semibold
                prose-h2:scroll-mt-32

                prose-h3:text-2xl

                prose-p:text-gray-300
                prose-p:leading-8

                prose-a:text-cyan-400
                prose-a:no-underline
                hover:prose-a:text-cyan-300

                prose-strong:text-white

                prose-blockquote:border-cyan-400/30
                prose-blockquote:bg-white/5
                prose-blockquote:px-6
                prose-blockquote:py-4
                prose-blockquote:rounded-2xl
                prose-blockquote:text-gray-300

                prose-code:text-cyan-300
                prose-code:bg-white/5
                prose-code:px-1.5
                prose-code:py-1
                prose-code:rounded-md
                prose-code:before:content-none
                prose-code:after:content-none

                prose-pre:border
                prose-pre:border-white/10
                prose-pre:bg-black/60
                prose-pre:rounded-2xl

                prose-img:rounded-2xl
                prose-img:shadow-2xl
                prose-img:border
                prose-img:border-white/10

                prose-hr:border-white/10
              "
            >
              <ReactMarkdown rehypePlugins={[rehypeSlug]}>
                {post.content}
              </ReactMarkdown>
            </article>

          </div>

          {/* ===== TOC ===== */}
          <TableOfContents headings={headings} />

        </div>
      </section>

    </div>
  );
}