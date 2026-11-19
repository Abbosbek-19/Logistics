import React, { useState } from "react";
import { Settings, Bell, Building2, Globe, Shield, Mail } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("uz");
  const [emailNotify, setEmailNotify] = useState(true);
  const [smsNotify, setSmsNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Sozlamalar Moduli (3.10-rasm)
        </h1>
        <p className="text-sm text-muted-foreground">
          Tizim interfeysi, xabarnomalar, til va tashkilot parametrlarini sozlash
        </p>
      </div>

      {/* Appearance Section */}
      <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Settings className="h-4 w-4 text-primary" />
          Tizim Ko‘rinishi (Interfeys)
        </h3>
        <p className="text-xs text-muted-foreground">
          Foydalanuvchi interfeysining yorug‘ yoki qorong‘i rejimini tanlang
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setTheme("light")}
            className={`px-4 py-2 text-sm rounded-lg border font-medium transition-colors ${
              theme === "light"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/40 hover:bg-muted"
            }`}
          >
            Yorug‘ rejim (Light)
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-4 py-2 text-sm rounded-lg border font-medium transition-colors ${
              theme === "dark"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/40 hover:bg-muted"
            }`}
          >
            Qorong‘i rejim (Dark)
          </button>
        </div>
      </div>

      {/* Language Section */}
      <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          Tizim Tili
        </h3>
        <p className="text-xs text-muted-foreground">
          Asosiy interfeys tili
        </p>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border bg-background text-foreground max-w-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="uz">O‘zbek tili (Lotin)</option>
          <option value="ru">Русский язык</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Notifications Section */}
      <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          Bildirishnomalar (Xabarnomalar)
        </h3>
        <p className="text-xs text-muted-foreground">
          Buyurtma holati o‘zgarganda xabar yuborish kanallari
        </p>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotify}
              onChange={(e) => setEmailNotify(e.target.checked)}
              className="rounded text-primary focus:ring-primary h-4 w-4"
            />
            <span className="text-sm font-medium">Email orqali hisobot va xabarlar</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={smsNotify}
              onChange={(e) => setSmsNotify(e.target.checked)}
              className="rounded text-primary focus:ring-primary h-4 w-4"
            />
            <span className="text-sm font-medium">SMS orqali haydovchilarga bildirishnomalar</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={pushNotify}
              onChange={(e) => setPushNotify(e.target.checked)}
              className="rounded text-primary focus:ring-primary h-4 w-4"
            />
            <span className="text-sm font-medium">Brauzer Push bildirishnomalari</span>
          </label>
        </div>
      </div>

      {/* Company Info */}
      <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" />
          Logistika Kompaniyasi Ma'lumotlari
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Kompaniya nomi</label>
            <input
              type="text"
              defaultValue="TransLog Logistics Uzbekistan"
              className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background text-foreground"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground">Aloqa telefoni</label>
            <input
              type="text"
              defaultValue="+998 71 200 77 88"
              className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background text-foreground"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-muted-foreground">Bosh ofis manzili</label>
            <input
              type="text"
              defaultValue="O‘zbekiston, Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko‘chasi 1"
              className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background text-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
