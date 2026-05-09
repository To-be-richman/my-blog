import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock"; // 确保这一行存在

export const metadata: Metadata = {
  title: "WEALTH·SUPER",
  description: "Markets, Technology & Human Behavior",
};

const locales = ["en", "jp", "tw"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="bg-black text-white min-h-screen relative">
        <Navbar />
        
        {/* 页面内容 */}
        {children}

        {/* 底部导航栏：它会悬浮在所有内容之上 */}
        <MobileDock locale={locale} />
        
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
