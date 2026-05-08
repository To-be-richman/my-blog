import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        px-6
        py-40
      "
    >
      <div
        className="
          max-w-5xl
          mx-auto
        "
      >
        {/* Label */}
        <p
          className="
            text-cyan-300
            uppercase
            tracking-[0.3em]
            text-sm
            mb-8
          "
        >
          ABOUT
        </p>

        {/* Title */}
        <h1
          className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            tracking-tight
            max-w-4xl
          "
        >
          {t("headline")}
        </h1>

        {/* Description */}
        <p
          className="
            mt-12
            text-xl
            leading-relaxed
            text-white/70
            max-w-3xl
          "
        >
          {t("description")}
        </p>

        {/* Extra */}
        <div
          className="
            mt-24
            border-t border-white/10
            pt-12
          "
        >
          <p
            className="
              text-white/50
              leading-relaxed
              max-w-2xl
            "
          >
            {t("extra")}
          </p>
        </div>
      </div>
    </main>
  );
}