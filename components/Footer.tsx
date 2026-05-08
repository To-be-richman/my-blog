import Link from "next/link";

import {
  useTranslations,
  useLocale,
} from "next-intl";

export default function Footer() {
  const t =
    useTranslations("Footer");

  const locale = useLocale();

  return (
    <footer
      className="
        relative
        overflow-hidden

        border-t border-white/10

        bg-black

        mt-40
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          top-[-200px]
          left-1/2
          -translate-x-1/2

          h-[500px]
          w-[500px]

          rounded-full

          bg-cyan-500/10

          blur-3xl
        "
      />

      {/* Content */}
      <div
        className="
          relative z-10

          max-w-7xl
          mx-auto

          px-6
          md:px-12

          py-24
        "
      >
        <div
          className="
            grid
            md:grid-cols-2
            gap-20
          "
        >
          {/* Left */}
          <div>
            {/* Logo */}
            <h2
              className="
                text-3xl
                font-black
                tracking-[0.2em]

                text-white
              "
            >
              WEALTH·SUPER
            </h2>

            {/* Description */}
            <p
              className="
                mt-8

                max-w-md

                text-white/60
                leading-relaxed
              "
            >
              {t("description")}
            </p>
          </div>

          {/* Right */}
          <div
            className="
              flex
              flex-col
              md:items-end
            "
          >
            {/* Links */}
            <div
              className="
                flex
                flex-col
                gap-5
              "
            >
              <Link
                href={`/${locale}/articles`}
                className="
                  text-white/70

                  transition
                  hover:text-cyan-300
                "
              >
                {t("articles")}
              </Link>

              <Link
                href={`/${locale}/notes`}
                className="
                  text-white/70

                  transition
                  hover:text-cyan-300
                "
              >
                {t("notes")}
              </Link>

              <Link
                href={`/${locale}/about`}
                className="
                  text-white/70

                  transition
                  hover:text-cyan-300
                "
              >
                {t("about")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-20
            pt-8

            border-t border-white/10

            flex
            flex-col
            md:flex-row

            items-center
            justify-between

            gap-4
          "
        >
          <p className="text-white/40 text-sm">
            © 2026 WEALTH·SUPER
          </p>

          <p
            className="
              text-white/30
              text-sm

              tracking-[0.2em]
              uppercase
            "
          >
            Markets · Technology ·
            Human Behavior
          </p>
        </div>
      </div>
    </footer>
  );
}