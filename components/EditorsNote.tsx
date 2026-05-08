"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function EditorsNote() {
  const t = useTranslations("EditorsNote");

  return (
    <section
      className="
        relative
        z-10
        max-w-6xl
        mx-auto
        px-6
        pb-40
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Label */}
        <p
          className="
            text-cyan-300
            uppercase
            tracking-[0.35em]
            text-sm
            mb-10
          "
        >
          {t("tag")}
        </p>

        {/* Title */}
        <h2
          className="
            text-5xl
            md:text-7xl
            font-bold
            leading-[1.05]
            tracking-tight
            text-white
            max-w-5xl
          "
        >
          {t("title")}
        </h2>

        {/* Description */}
        <p
          className="
            mt-12
            text-xl
            leading-relaxed
            text-white/70
            max-w-4xl
          "
        >
          {t("description")}
        </p>
      </motion.div>
    </section>
  );
}