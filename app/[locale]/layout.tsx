import type { Metadata } from "next";

import {
  NextIntlClientProvider,
} from "next-intl";

import {
  getMessages,
} from "next-intl/server";

import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "WEALTH·SUPER",

  description:
    "Markets, Technology & Human Behavior",
};

const locales = [
  "en",
  "jp",
  "tw",
];

// ✅ 静态 locale
export function generateStaticParams() {
  return locales.map(
    (locale) => ({
      locale,
    })
  );
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
  const { locale } =
    await params;

  // ✅ 防止非法 locale
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages =
    await getMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <div className="bg-black text-white min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        {children}

        {/* Footer */}
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}