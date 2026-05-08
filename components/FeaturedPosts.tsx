import Image from "next/image";
import Link from "next/link";

import { getTranslations } from "next-intl/server";

import { getAllPosts } from "@/lib/markdown";

export default async function FeaturedPosts({
  locale,
}: {
  locale: string;
}) {
  const t = await getTranslations({
    locale,
    namespace: "Home",
  });

  // 自动读取文章
  const posts = getAllPosts(locale);

  // 没文章
  if (!posts.length) {
    return null;
  }

  // 主卡片
  const mainPost = posts[0];

  // 侧边卡片
  const sidePosts = posts.slice(1, 3);

  return (
    <section
      className="
        relative
        z-10

        max-w-7xl
        mx-auto

        px-6
        pb-40
      "
    >
      {/* Header */}
      <div className="mb-20">
        <p
          className="
            text-sm
            uppercase
            tracking-[0.35em]

            text-cyan-300/70

            mb-5
          "
        >
          {t("featuredTitle")}
        </p>

        <h2
          className="
            text-5xl
            md:text-7xl

            font-bold
            tracking-tight
            leading-[0.95]

            text-white

            max-w-5xl
          "
        >
          {t("featuredSubtitle")}
        </h2>
      </div>

      {/* Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Card */}
        <Link
          href={`/${locale}/posts/${mainPost.slug}`}
          className="
            lg:col-span-2

            group
            relative

            overflow-hidden
            rounded-[2.5rem]

            h-[760px]

            border border-white/10

            bg-white/[0.03]

            backdrop-blur-xl
          "
        >
          {/* Glow */}
          <div
            className="
              absolute inset-0

              rounded-[2.5rem]

              opacity-0
              transition
              duration-700

              group-hover:opacity-100

              ring-1
              ring-cyan-300/30
            "
          />

          {/* Image */}
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
                mainPost.coverImage ||
                "/images/ai.jpg"
              }
              alt={mainPost.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Overlay */}
          <div
            className="
              absolute inset-0

              bg-gradient-to-t
              from-black
              via-black/30
              to-black/10
            "
          />

          {/* Content */}
          <div
            className="
              absolute
              bottom-0
              left-0

              z-10

              p-12
              md:p-14
            "
          >
            <p
              className="
                text-cyan-300

                uppercase
                tracking-[0.3em]

                text-sm
                mb-6
              "
            >
              {mainPost.category}
            </p>

            <h3
              className="
                text-5xl
                md:text-6xl

                font-bold
                leading-[1.02]

                text-white

                max-w-4xl

                transition
                duration-700

                group-hover:translate-y-[-6px]
              "
            >
              {mainPost.title}
            </h3>
          </div>
        </Link>

        {/* Side Cards */}
        <div className="flex flex-col gap-8">
          {sidePosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/posts/${post.slug}`}
              className="
                group
                relative

                overflow-hidden
                rounded-[2rem]

                h-[366px]

                border border-white/10

                bg-white/[0.03]

                backdrop-blur-xl
              "
            >
              {/* Glow */}
              <div
                className="
                  absolute inset-0

                  rounded-[2rem]

                  opacity-0
                  transition
                  duration-700

                  group-hover:opacity-100

                  ring-1
                  ring-cyan-300/20
                "
              />

              {/* Image */}
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
                  from-black
                  via-black/40
                  to-transparent
                "
              />

              {/* Content */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0

                  z-10

                  p-8
                "
              >
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

                <h3
                  className="
                    text-3xl

                    font-bold
                    leading-snug

                    text-white

                    transition
                    duration-500

                    group-hover:translate-y-[-4px]
                  "
                >
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}