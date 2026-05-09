"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, User } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Wealthsuper Mobile Dock - 移动端底部导航
 * ---------------------------------------
 * 功能：
 * 1. 响应式显示：仅在 md 断点（768px）以下显示
 * 2. 国际化：自动根据当前 locale 读取 Home 命名空间下的翻译
 * 3. 视觉反馈：当前激活页面图标放大、变青色并带有外发光 (Glow)
 */
export default function MobileDock({ locale }: { locale: string }) {
  const pathname = usePathname();
  
  // ✅ 接入 next-intl 翻译逻辑
  const t = useTranslations("Home");
  
  // ✅ 定义导航项数据
  const navItems = [
    { 
      icon: Home, 
      label: t("navHome") || "Home", 
      href: `/${locale}` 
    },
    { 
      icon: Zap, 
      label: t("navNotes") || "Notes", 
      href: `/${locale}/notes` 
    },
    { 
      icon: User, 
      label: t("navAbout") || "About", 
      href: `/${locale}/about` 
    },
  ];

  return (
    <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[400px]">
      {/* 导航条容器：背景半透明磨砂，带微弱描边和深邃阴影 */}
      <nav className="flex items-center justify-around bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full px-6 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {navItems.map((item) => {
          // 💡 判断当前页面路径是否与按钮链接匹配
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`
                flex flex-col items-center gap-1.5 
                transition-all duration-500 ease-out
                ${isActive 
                  ? 'text-cyan-300 scale-110 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]' 
                  : 'text-white/40 hover:text-white/70'
                }
              `}
            >
              {/* 图标：激活态增加描边粗细 */}
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              
              {/* 文字标签：极小字号、全大写、宽字间距，营造终端感 */}
              <span className="text-[10px] uppercase tracking-[0.15em] font-bold">
                {item.label}
              </span>

              {/* 💡 隐藏的激活点：如果激活，在图标下方显示一个小点 */}
              {isActive && (
                <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
