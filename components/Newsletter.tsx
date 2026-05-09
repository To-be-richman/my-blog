"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { db } from "@/lib/firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Newsletter() {
  const t = useTranslations("Newsletter");
  const locale = useLocale(); // 获取当前网站语言（en/tw/jp）

  const [contact, setContact] = useState("");
  const [platform, setPlatform] = useState("Email"); // 默认选择 Email
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // 平台选项定义
  const platforms = [
    { id: "Email", label: "Email" },
    { id: "WhatsApp", label: "WhatsApp" },
    { id: "Telegram", label: "Telegram" },
    { id: "WeChat", label: "WeChat" }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;

    setLoading(true);
    try {
      /**
       * ✅ 核心升级：实时写入 Firebase
       * 数据会存放在名为 "subscribers" 的集合中
       */
      await addDoc(collection(db, "subscribers"), {
        contact: contact,       // 用户填写的账号/邮箱
        platform: platform,     // 用户选择的平台
        locale: locale,         // 订阅时的语言版本
        timestamp: serverTimestamp(), // 服务器时间
        status: "active"        // 默认状态
      });
      
      setSubscribed(true);
      setContact(""); // 清空输入框
    } catch (error) {
      console.error("Firebase Subscription Error:", error);
      alert("Subscription failed. Please check your Firebase configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-40">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-10 md:p-16"
      >
        {/* 背景装饰光晕 */}
        <div className="absolute top-[-120px] right-[-120px] h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/70 mb-6">
            {t("label")}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white max-w-4xl">
            {t("title")}
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60">
            {t("subtitle")}
          </p>

          {subscribed ? (
            /* 成功状态 */
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-8 text-center text-cyan-200"
            >
              <h3 className="text-2xl font-bold mb-2">✓</h3>
              <p>{t("success")}</p>
            </motion.div>
          ) : (
            /* 订阅表单 */
            <div className="mt-10 space-y-6">
              {/* 平台切换按钮组 */}
              <div className="flex flex-wrap gap-3">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                      platform === p.id 
                        ? "bg-cyan-400 border-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]" 
                        : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
                <input
                  type={platform === "Email" ? "email" : "text"}
                  required
                  placeholder={platform === "Email" ? t("placeholder") : `${t("phonePlaceholder")} (${platform})`}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-8 py-5 text-white outline-none focus:border-cyan-400/40 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-cyan-400 px-10 py-5 font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-cyan-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "..." : t("button")}
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
