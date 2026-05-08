"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  useTranslations,
  useLocale,
} from "next-intl";

import MouseGlow from "@/components/MouseGlow";
import GlowBackground from "@/components/GlowBackground";

export default function Hero() {
  const t =
    useTranslations("Hero");

  const locale =
    useLocale();

  return (
    <section
      className="
        relative

        overflow-hidden

        bg-black
      "
    >
      {/* Aurora Background */}
      <GlowBackground />

      {/* Mouse Glow */}
      <MouseGlow />

      {/* Overlay */}
      <div
        className="
          absolute inset-0

          bg-gradient-to-br
          from-black
          via-black/80
          to-[#07111f]/70

          z-[1]
        "
      />

      {/* Cyan Orb */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute

          top-[-220px]
          left-[-140px]

          h-[520px]
          w-[520px]

          rounded-full

          bg-cyan-500/10

          blur-3xl

          z-[1]
        "
      />

      {/* Violet Orb */}
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute

          bottom-[-240px]
          right-[-140px]

          h-[520px]
          w-[520px]

          rounded-full

          bg-violet-500/10

          blur-3xl

          z-[1]
        "
      />

      {/* Grid */}
      <motion.div
        animate={{
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
          absolute inset-0

          z-[1]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",

          backgroundSize:
            "80px 80px",
        }}
      />

      {/* Noise */}
      <div
        className="
          absolute inset-0

          opacity-[0.02]

          mix-blend-soft-light

          z-[1]
        "
        style={{
          backgroundImage:
            "url('/images/noise.png')",
        }}
      />

      {/* Content */}
      <div
        className="
          relative z-10

          max-w-7xl
          mx-auto

          px-6
          md:px-12

          pt-32
          md:pt-40

          pb-16
          md:pb-20
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="max-w-5xl"
        >
          {/* Label */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="
              text-xs
              md:text-sm

              uppercase

              tracking-[0.35em]

              text-cyan-300/80

              mb-6
            "
          >
            {t("tag")}
          </motion.p>

          {/* Title */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="
              text-5xl
              md:text-7xl
              lg:text-[6.5rem]

              font-bold

              leading-[0.95]
              tracking-tight

              text-white
            "
          >
            <span>
              {t("title1")}
            </span>

            <span
              className="
                text-cyan-300

                drop-shadow-[0_0_40px_rgba(34,211,238,0.35)]
              "
            >
              {t("title2")}
            </span>

            <br />

            {t("title3")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
            }}
            className="
              mt-8

              max-w-3xl

              text-base
              md:text-xl

              leading-relaxed

              text-white/60
            "
          >
            {t("subtitle")}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
            }}
            className="mt-12"
          >
            <Link
              href={`/${locale}/articles`}
              className="
                group

                inline-flex
                items-center

                rounded-full

                border border-white/10

                bg-white/[0.04]

                px-8
                py-4

                text-white
                text-sm

                tracking-wide

                backdrop-blur-xl

                transition-all
                duration-300

                hover:border-cyan-300/40
                hover:bg-white/[0.08]

                hover:shadow-[0_0_50px_rgba(34,211,238,0.15)]
              "
            >
              <span>
                {t("button")}
              </span>

              <span
                className="
                  ml-3

                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}