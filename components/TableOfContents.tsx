"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

interface Heading {
  id: string;
  text: string;
}

export default function TableOfContents({
  headings,
}: {
  headings: Heading[];
}) {
  const [activeId, setActiveId] =
    useState("");

  useEffect(() => {
    const handleScroll = () => {
      const headingElements =
        headings.map(
          (heading) => ({
            id: heading.id,

            element:
              document.getElementById(
                heading.id
              ),
          })
        );

      const visibleHeadings =
        headingElements.filter(
          (heading) => {
            if (!heading.element)
              return false;

            const rect =
              heading.element.getBoundingClientRect();

            return (
              rect.top <= 180
            );
          }
        );

      if (
        visibleHeadings.length > 0
      ) {
        setActiveId(
          visibleHeadings[
            visibleHeadings.length -
              1
          ].id
        );
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [headings]);

  // 没目录
  if (!headings.length) {
    return null;
  }

  return (
    <aside
      className="
        hidden
        lg:block

        fixed

        right-10
        top-1/2

        -translate-y-1/2

        w-72

        z-40
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          x: 40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          relative
          overflow-hidden

          rounded-[2rem]

          border border-white/10

          bg-black/50

          backdrop-blur-3xl

          p-8
        "
      >
        {/* Glow */}
        <div
          className="
            absolute

            top-[-80px]
            right-[-80px]

            h-[200px]
            w-[200px]

            rounded-full

            bg-cyan-500/10

            blur-3xl
          "
        />

        {/* Label */}
        <p
          className="
            relative
            z-10

            text-xs

            uppercase

            tracking-[0.35em]

            text-cyan-300/70

            mb-8
          "
        >
          Contents
        </p>

        {/* Items */}
        <div
          className="
            relative
            z-10

            space-y-5
          "
        >
          {headings.map(
            (heading) => {
              const active =
                activeId ===
                heading.id;

              return (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className="
                    group
                    relative

                    block

                    pl-6
                  "
                >
                  {/* Active Line */}
                  <motion.div
                    animate={{
                      opacity: active
                        ? 1
                        : 0.25,

                      height: active
                        ? 28
                        : 16,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={`
                      absolute

                      left-0
                      top-1/2

                      -translate-y-1/2

                      w-[2px]

                      rounded-full

                      ${
                        active
                          ? "bg-cyan-300"
                          : "bg-white/10"
                      }
                    `}
                  />

                  {/* Text */}
                  <span
                    className={`
                      text-sm

                      leading-relaxed

                      transition-all
                      duration-300

                      ${
                        active
                          ? `
                            text-white

                            translate-x-1
                          `
                          : `
                            text-white/45

                            hover:text-cyan-200
                          `
                      }
                    `}
                  >
                    {heading.text}
                  </span>
                </a>
              );
            }
          )}
        </div>
      </motion.div>
    </aside>
  );
}