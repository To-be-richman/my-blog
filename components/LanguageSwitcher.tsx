"use client";

import Link from "next/link";

export default function LanguageSwitcher() {
  return (
    <div className="fixed top-6 right-6 z-50 flex gap-5 text-sm font-medium text-white/80">
      <Link href="/en" className="hover:text-white transition">
        EN
      </Link>

      <Link href="/tw" className="hover:text-white transition">
        繁體中文
      </Link>

      <Link href="/jp" className="hover:text-white transition">
        日本語
      </Link>
    </div>
  );
}