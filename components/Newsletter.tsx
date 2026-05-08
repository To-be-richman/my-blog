"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { useTranslations } from "next-intl";

export default function Newsletter() {
  const t =
    useTranslations("Newsletter");

  const [email, setEmail] =
    useState("");

  const [subscribed, setSubscribed] =
    useState(false);

  const handleSubscribe = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email) return;

    // 后面这里会接 Firebase
    console.log(
      "Subscribed:",
      email
    );

    setSubscribed(true);

    setEmail("");
  };

  return (
    <section className="mt-40">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        viewport={{ once: true }}
        className="
          relative
          overflow-hidden

          rounded-[2.5rem]

          border border-white/10

          bg-white/[0.03]

          backdrop-blur-2xl

          p-10
          md:p-16
        "
      >
        {/* Glow */}
        <div
          className="
            absolute
            top-[-120px]
            right-[-120px]

            h-[280px]
            w-[280px]

            rounded-full

            bg-cyan-500/10

            blur-3xl
          "
        />

        {/* Label */}
        <p
          className="
            relative z-10

            text-sm
            uppercase

            tracking-[0.35em]

            text-cyan-300/70

            mb-6
          "
        >
          {t("label")}
        </p>

        {/* Title */}
        <h2
          className="
            relative z-10

            text-4xl
            md:text-6xl

            font-bold
            leading-tight
            tracking-tight

            text-white

            max-w-4xl
          "
        >
          {t("title")}
        </h2>

        {/* Subtitle */}
        <p
          className="
            relative z-10

            mt-8

            max-w-2xl

            text-lg
            leading-relaxed

            text-white/60
          "
        >
          {t("subtitle")}
        </p>

        {/* Success */}
        {subscribed ? (
          <div
            className="
              relative z-10

              mt-10

              rounded-2xl

              border border-cyan-400/20

              bg-cyan-400/10

              px-6
              py-5

              text-cyan-200
            "
          >
            {t("success")}
          </div>
        ) : (
          <form
            onSubmit={
              handleSubscribe
            }
            className="
              relative z-10

              mt-10

              flex
              flex-col
              md:flex-row

              gap-4
            "
          >
            {/* Input */}
            <input
              type="email"
              placeholder={t(
                "placeholder"
              )}
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                flex-1

                rounded-full

                border border-white/10

                bg-white/[0.04]

                px-6
                py-5

                text-white

                outline-none

                placeholder:text-white/30

                focus:border-cyan-400/40
              "
            />

            {/* Button */}
            <button
              type="submit"
              className="
                rounded-full

                bg-cyan-400

                px-8
                py-5

                font-medium
                text-black

                transition
                duration-300

                hover:scale-[1.02]
                hover:bg-cyan-300
              "
            >
              {t("button")}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}