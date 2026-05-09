import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";

export const metadata: Metadata = {
  title: "WEALTH·SUPER",
  description: "Markets, Technology & Human Behavior",
};

const locales = ["en", "jp", "tw"];

// ✅ 静态路由生成
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } = await params;

  // ✅ 防止非法 locale 进入
  if (!locales.includes(locale)) {
    notFound();
  }

  // ✅ 获取当前语言的翻译包
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* 
          ✅ 核心布局容器：
          1. relative: 为 MobileDock 提供定位基准
          2. min-h-screen: 确保背景色撑满全屏
          3. flex flex-col: 保证 Footer 始终在底部
      */}
      <div className="bg-black text-white min-h-screen relative flex flex-col">
        {/* 顶部导航 */}
        <Navbar />

        {/* 
            页面主体内容：
            flex-grow 确保内容不足时也将 Footer 顶至页面最下方
        */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 
            ✅ 移动端底部悬浮导航：
            由于它在 main 之外且处于 relative 容器的末尾，
            配合内部的 z-index，它将绝对悬浮在所有内容之上。
        */}
        <MobileDock locale={locale} />

        {/* 页脚 */}
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
