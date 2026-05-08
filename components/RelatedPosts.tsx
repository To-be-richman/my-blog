import Image from "next/image";
import Link from "next/link";

import { useTranslations } from "next-intl";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
}

export default function RelatedPosts({
  posts,
  locale,
}: {
  posts: Post[];

  locale: string;
}) {
  const t =
    useTranslations(
      "RelatedPosts"
    );

  // 没文章
  if (!posts.length) {
    return null;
  }

  return (
    <section className="mt-40">
      {/* Header */}
      <div className="mb-14">
        <p
          className="
            text-sm
            uppercase
            tracking-[0.35em]

            text-cyan-300/70

            mb-4
          "
        >
          {t("label")}
        </p>

        <h2
          className="
            text-4xl
            md:text-5xl

            font-bold
            tracking-tight

            text-white
          "
        >
          {t("title")}
        </h2>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/posts/${post.slug}`}
            className="
              group
              relative

              overflow-hidden
              rounded-[2rem]

              border border-white/10

              bg-white/[0.03]

              backdrop-blur-xl
            "
          >
            {/* Image */}
            <div
              className="
                relative
                h-[260px]
                overflow-hidden
              "
            >
              <div
                className="
                  absolute inset-0

                  transition-transform
                  duration-[2000ms]
                  ease-out

                  group-hover:scale-105
                "
              >
                <Image
                  src={
                    post.coverImage ||
                    "/images/ai.jpg"
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Overlay */}
              <div
                className="
                  absolute inset-0

                  bg-gradient-to-t
                  from-black/70
                  to-transparent
                "
              />
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Category */}
              <p
                className="
                  text-cyan-300

                  uppercase
                  tracking-[0.25em]

                  text-xs
                  mb-4
                "
              >
                {post.category}
              </p>

              {/* Title */}
              <h3
                className="
                  text-2xl

                  font-bold
                  leading-snug

                  text-white

                  mb-4

                  transition
                  duration-300

                  group-hover:translate-y-[-2px]
                "
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p
                className="
                  text-white/60
                  leading-relaxed
                "
              >
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}