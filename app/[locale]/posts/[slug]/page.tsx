import Image from "next/image";
import { notFound } from "next/navigation";

import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import RelatedPosts from "@/components/RelatedPosts";
import Newsletter from "@/components/Newsletter";

import {
  getAllPosts,
  getPost,
} from "@/lib/markdown";

export async function generateStaticParams() {
  const locales = ["en", "jp", "tw"];

  let paths: {
    locale: string;
    slug: string;
  }[] = [];

  locales.forEach((locale) => {
    const posts = getAllPosts(locale);

    const localePaths = posts.map(
      (post: any) => ({
        locale,
        slug: post.slug,
      })
    );

    paths = [...paths, ...localePaths];
  });

  return paths;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}) {
  // ✅ Next.js 16
  const { locale, slug } =
    await params;

  // ✅ 防止 undefined
  if (!locale || !slug) {
    notFound();
  }

  // ✅ 获取当前文章
  const post = getPost(
    slug,
    locale
  );

  // ✅ 文章不存在
  if (!post) {
    notFound();
  }

  // ✅ 获取相关文章
  const allPosts =
    getAllPosts(locale);

  const relatedPosts =
    allPosts
      .filter(
        (p) => p.slug !== slug
      )
      .slice(0, 3);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Reading Progress */}
      <ReadingProgress />

      {/* TOC */}
      <TableOfContents
        headings={post.headings || []}
      />

      {/* Hero */}
      <section className="relative h-[65vh] overflow-hidden">
        <Image
          src={
            post.coverImage ||
            "/images/ai.jpg"
          }
          alt={post.title}
          fill
          priority
          className="
            object-cover
            scale-[1.02]
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0

            bg-gradient-to-t
            from-black
            via-black/50
            to-black/20
          "
        />

        {/* Hero Content */}
        <div
          className="
            absolute
            bottom-0
            left-0
            z-10

            w-full

            p-8
            md:p-20
          "
        >
          <div className="max-w-5xl">
            {/* Category */}
            <p
              className="
                text-cyan-300

                uppercase
                tracking-[0.35em]

                text-sm
                mb-6
              "
            >
              {post.category}
            </p>

            {/* Title */}
            <h1
              className="
                text-5xl
                md:text-7xl
                lg:text-8xl

                font-bold
                leading-[0.95]
                tracking-tight

                mb-8
              "
            >
              {post.title}
            </h1>

            {/* Meta */}
            <p
              className="
                text-white/60
                text-lg
                tracking-wide
              "
            >
              {post.date}
              {" • "}
              {post.readingTime}
            </p>
          </div>
        </div>
      </section>

      {/* Article */}
      <article
        className="
          relative

          max-w-3xl
          mx-auto

          px-6
          py-28
        "
      >
        {/* Accent Line */}
        <div
          className="
            absolute
            left-0
            top-32

            hidden lg:block

            h-[300px]
            w-[1px]

            bg-gradient-to-b
            from-cyan-400/60
            to-transparent
          "
        />

        {/* Content */}
        <div
          className="
            prose
            prose-invert

            prose-lg
            md:prose-xl

            max-w-none

            prose-headings:text-white
            prose-headings:font-bold
            prose-headings:tracking-tight

            prose-h1:text-5xl
            prose-h2:text-4xl
            prose-h3:text-3xl

            prose-h2:mt-24
            prose-h2:mb-8

            prose-h3:mt-16
            prose-h3:mb-6

            prose-p:text-white/80
            prose-p:leading-[2]
            prose-p:mb-8

            prose-strong:text-white

            prose-a:text-cyan-300
            prose-a:no-underline

            hover:prose-a:text-cyan-200

            prose-blockquote:border-cyan-400
            prose-blockquote:bg-white/[0.03]

            prose-blockquote:rounded-2xl
            prose-blockquote:px-8
            prose-blockquote:py-6

            prose-blockquote:text-white
            prose-blockquote:text-2xl
            prose-blockquote:leading-relaxed

            prose-code:text-cyan-300

            prose-li:text-white/80

            prose-hr:border-white/10

            prose-img:rounded-2xl
          "
        >
          <div
            dangerouslySetInnerHTML={{
              __html:
                post.contentHtml,
            }}
          />
        </div>

        {/* Related Articles */}
        <RelatedPosts
          posts={relatedPosts}
          locale={locale}
        />

        {/* Newsletter */}
        <Newsletter />
      </article>
    </main>
  );
}