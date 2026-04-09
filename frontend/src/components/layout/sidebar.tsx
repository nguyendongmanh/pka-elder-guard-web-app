"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, MessageSquare, FileText, Settings, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patient List", icon: Users },
  { href: "/tracking", label: "Location Tracking", icon: MapPin },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/reports", label: "Reports", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-52 shrink-0 bg-white border-r border-[#E2E8F0] flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-[#E2E8F0]">
        <Image src="/logo.png" alt="ElderGuard" width={36} height={36} className="rounded" />
        <span className="font-bold text-[#0D9488] text-sm leading-tight">
          Elder
          <br />
          Guard
        </span>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-[#CCFBF1] text-[#0D9488]"
                  : "text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#0D9488]"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      {/* Bottom Settings */}
      <div className="px-3 py-4 border-t border-[#E2E8F0]">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#0D9488] transition-colors"
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>
    </aside>
  );
}
