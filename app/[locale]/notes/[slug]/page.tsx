import fs from "fs";

import path from "path";

import matter from "gray-matter";

import { marked } from "marked";

import Image from "next/image";

import { notFound } from "next/navigation";

export default async function NotePage({
  params,
}: {
  params: Promise<{
    locale: string;

    slug: string;
  }>;
}) {
  const {
    locale,
    slug,
  } = await params;

  // Notes Directory
  const notesDirectory =
    path.join(
      process.cwd(),

      "content/notes",

      locale
    );

  const fullPath =
    path.join(
      notesDirectory,

      `${slug}.md`
    );

  // File not found
  if (
    !fs.existsSync(fullPath)
  ) {
    notFound();
  }

  // Read file
  const fileContents =
    fs.readFileSync(
      fullPath,

      "utf8"
    );

  const {
    data,
    content,
  } = matter(fileContents);

  // Markdown → HTML
  const contentHtml =
    marked(content);

  return (
    <main
      className="
        bg-black
        text-white

        min-h-screen
      "
    >
      {/* Hero */}
      <section
        className="
          relative

          overflow-hidden

          border-b border-white/10
        "
      >
        {/* Background */}
        <div
          className="
            absolute inset-0

            bg-gradient-to-br
            from-black
            via-black/80
            to-cyan-950/20
          "
        />

        {/* Content */}
        <div
          className="
            relative z-10

            max-w-5xl
            mx-auto

            px-6

            pt-40
            pb-24
          "
        >
          {/* Category */}
          <p
            className="
              text-sm

              uppercase

              tracking-[0.35em]

              text-cyan-300/70

              mb-6
            "
          >
            {data.category}
          </p>

          {/* Title */}
          <h1
            className="
              text-5xl
              md:text-7xl

              font-bold

              leading-[0.95]
              tracking-tight

              max-w-4xl
            "
          >
            {data.title}
          </h1>

          {/* Excerpt */}
          <p
            className="
              mt-10

              text-xl

              leading-relaxed

              text-white/60

              max-w-3xl
            "
          >
            {data.excerpt}
          </p>

          {/* Date */}
          <p
            className="
              mt-10

              text-sm

              text-white/30
            "
          >
            {data.date}
          </p>
        </div>
      </section>

      {/* Cover */}
      <section className="px-6 py-20">
        <div
          className="
            relative

            max-w-6xl
            mx-auto

            overflow-hidden

            rounded-[2rem]

            h-[500px]
          "
        >
          <Image
            src={
              data.coverImage ||
              "/images/boj.jpg"
            }
            alt={data.title}
            fill
            className="
              object-cover
            "
          />
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-32">
        <article
          className="
            prose
            prose-invert

            prose-headings:text-white
            prose-p:text-white/75
            prose-strong:text-white
            prose-li:text-white/70

            prose-h2:text-4xl
            prose-h2:mt-20
            prose-h2:mb-8

            prose-p:text-lg
            prose-p:leading-relaxed

            max-w-4xl
            mx-auto
          "
          dangerouslySetInnerHTML={{
            __html:
              contentHtml,
          }}
        />
      </section>
    </main>
  );
}