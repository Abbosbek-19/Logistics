import React from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Truck,
  Users,
  Package,
  MapPin,
  BarChart3,
  Fuel,
  Wrench,
  Settings,
} from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { cn } from "@/lib/utils";

const navigationItems = [
  { path: "/", label: "Boshqaruv paneli", icon: LayoutDashboard },
  { path: "/vehicles", label: "Avtoparklar", icon: Truck },
  { path: "/drivers", label: "Haydovchilar", icon: Users },
  { path: "/shipments", label: "Jo‘natmalar", icon: Package },
  { path: "/routes", label: "Marshrutlar", icon: MapPin },
  { path: "/reports", label: "Hisobotlar", icon: BarChart3 },
  { path: "/fuel", label: "Yoqilg‘i", icon: Fuel },
  { path: "/maintenance", label: "Texnik xizmat", icon: Wrench },
  { path: "/settings", label: "Sozlamalar", icon: Settings },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { open } = useSidebar();

  return (
    <aside
      className={cn(
        "bg-card border-r flex flex-col transition-all duration-300 ease-in-out z-40 shrink-0",
        open ? "w-64" : "w-16",
      )}
    >
      {/* Brand Header */}
      <div className="h-14 border-b flex items-center px-4 gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-sm">
          <Truck className="h-5 w-5" />
        </div>
        {open && (
          <div className="flex flex-col overflow-hidden">
            <span className="font-bold text-base tracking-tight truncate text-foreground">
              TransLog
            </span>
            <span className="text-[10px] text-muted-foreground truncate uppercase tracking-wider font-medium">
              Logistika Tizimi
            </span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;

          return (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  !open && "justify-center px-2",
                )}
                title={!open ? item.label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {open && <span className="truncate">{item.label}</span>}
              </a>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      {open ? (
        <div className="p-3 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-foreground">Tizim holati: Faol</span>
          </div>
          <p className="text-[11px] truncate">Toshkent, O‘zbekiston</p>
        </div>
      ) : (
        <div className="p-3 border-t flex justify-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
      )}
    </aside>
  );
}
