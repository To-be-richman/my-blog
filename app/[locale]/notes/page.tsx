import fs from "fs";

import path from "path";

import matter from "gray-matter";

import Link from "next/link";

export default async function NotesPage({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } =
    await params;

  // Notes Directory
  const notesDirectory =
    path.join(
      process.cwd(),

      "content/notes",

      locale
    );

  // 防止不存在
  if (
    !fs.existsSync(
      notesDirectory
    )
  ) {
    return null;
  }

  const fileNames =
    fs.readdirSync(
      notesDirectory
    );

  const notes =
    fileNames.map(
      (fileName) => {
        const slug =
          fileName.replace(
            ".md",
            ""
          );

        const fullPath =
          path.join(
            notesDirectory,

            fileName
          );

        const fileContents =
          fs.readFileSync(
            fullPath,

            "utf8"
          );

        const {
          data,
          content,
        } = matter(
          fileContents
        );

        return {
          slug,

          title:
            data.title || "",

          excerpt:
            content.slice(
              0,
              180
            ) + "...",

          date:
            data.date || "",

          category:
            data.category ||
            "Macro",
        };
      }
    );

  // 最新排序
  notes.sort((a, b) =>
    a.date > b.date ? -1 : 1
  );

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
          border-b border-white/10

          px-6

          pt-32
          pb-20
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
          "
        >
          <p
            className="
              text-sm

              uppercase

              tracking-[0.35em]

              text-cyan-300/70

              mb-6
            "
          >
            MARKET NOTES
          </p>

          <h1
            className="
              text-5xl
              md:text-7xl

              font-bold

              leading-[0.95]
              tracking-tight

              max-w-5xl
            "
          >
            Global macro,
            semiconductors,
            crypto and
            liquidity research.
          </h1>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 py-24">
        <div
          className="
            max-w-7xl
            mx-auto

            grid
            md:grid-cols-2
            xl:grid-cols-3

            gap-8
          "
        >
          {notes.map(
            (note) => (
              <Link
                key={note.slug}
                href={`/${locale}/notes/${note.slug}`}
                className="
                  group

                  rounded-[2rem]

                  border border-white/10

                  bg-white/[0.02]

                  p-8

                  transition-all
                  duration-500

                  hover:border-cyan-400/30
                  hover:bg-white/[0.04]
                "
              >
                {/* Category */}
                <p
                  className="
                    text-xs

                    uppercase

                    tracking-[0.3em]

                    text-cyan-300/70

                    mb-6
                  "
                >
                  {
                    note.category
                  }
                </p>

                {/* Title */}
                <h2
                  className="
                    text-3xl

                    font-bold

                    tracking-tight

                    leading-snug

                    mb-6

                    group-hover:text-cyan-100

                    transition
                  "
                >
                  {note.title}
                </h2>

                {/* Excerpt */}
                <p
                  className="
                    text-white/60

                    leading-relaxed

                    mb-10
                  "
                >
                  {
                    note.excerpt
                  }
                </p>

                {/* Date */}
                <p
                  className="
                    text-sm

                    text-white/30
                  "
                >
                  {note.date}
                </p>
              </Link>
            )
          )}
        </div>
      </section>
    </main>
  );
}