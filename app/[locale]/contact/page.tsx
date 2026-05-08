import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Contact");

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
          max-w-4xl
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
          {t("label")}
        </p>

        {/* Title */}
        <h1
          className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            tracking-tight
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
            max-w-2xl
          "
        >
          {t("description")}
        </p>

        {/* Email */}
        <div className="mt-20">
          <a
            href="mailto:hello@wealth-super.com"
            className="
              text-2xl
              md:text-4xl
              font-semibold
              text-cyan-300
              hover:text-cyan-200
              transition
            "
          >
            hello@wealth-super.com
          </a>
        </div>
      </div>
    </main>
  );
}