"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, User } from "lucide-react";
import { useTranslations } from "next-intl";

export default function MobileDock({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = useTranslations("Home");
  
  const navItems = [
    { icon: Home, label: t("navHome") || "Home", href: `/${locale}` },
    { icon: Zap, label: t("navNotes") || "Notes", href: `/${locale}/notes` },
    { icon: User, label: t("navAbout") || "About", href: `/${locale}/about` },
  ];

  return (
    /**
     * ✅ 重点修改：
     * 1. z-[9999] - 使用一个极大的数值，确保它穿透所有背景光晕
     * 2. fixed bottom-10 - 稍微调高位置，避免被手机底部白条或浏览器工具栏挡住
     * 3. pointer-events-auto - 确保它是可点击的
     */
    <div className="md:hidden fixed bottom-10 left-0 w-full flex justify-center z-[9999] pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-around bg-black/80 backdrop-blur-3xl border border-white/20 rounded-full px-8 py-5 shadow-[0_15px_50px_rgba(0,0,0,0.8)] w-[90%] max-w-[380px]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`relative flex flex-col items-center gap-1 transition-all duration-500 ${
                isActive 
                  ? 'text-cyan-400 scale-110 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' 
                  : 'text-white/30'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] uppercase tracking-[0.2em] font-black">
                {item.label}
              </span>
              
              {/* 激活时底部的小光点 */}
              {isActive && (
                <div className="absolute -bottom-2 h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
