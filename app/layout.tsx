import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Blog",
  description: "Personal blog website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        {/* ✅ 导航栏 */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 40px",
            borderBottom: "1px solid #eee",
          }}
        >
          {/* 🔥 修复点击问题 */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "black",
                cursor: "pointer",
              }}
            >
              My Blog
            </div>
          </Link>

          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/" style={{ color: "#333" }}>
              首页
            </Link>
            <Link href="/blog" style={{ color: "#333" }}>
              博客
            </Link>
          </div>
        </nav>

        {/* 页面内容 */}
        <main style={{ flex: 1 }}>{children}</main>

      </body>
    </html>
  );
}