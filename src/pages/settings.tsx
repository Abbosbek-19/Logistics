import React, { useState } from "react";
import {
  Settings,
  Building2,
  User,
  Bell,
  Palette,
  Server,
  Shield,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Lock,
  Smartphone,
  Send,
  Database,
  Cpu,
  RefreshCw,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    "company" | "profile" | "notifications" | "appearance" | "system"
  >("company");

  // Notification state
  const [emailOrderNotify, setEmailOrderNotify] = useState(true);
  const [emailReportNotify, setEmailReportNotify] = useState(true);
  const [smsDriverNotify, setSmsDriverNotify] = useState(true);
  const [telegramBotNotify, setTelegramBotNotify] = useState(true);
  const [pushNotify, setPushNotify] = useState(false);

  // Appearance state
  const [language, setLanguage] = useState("uz");
  const [tableDensity, setTableDensity] = useState("normal");

  // Save feedback state
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Settings className="h-6 w-6 text-primary" />
            Tizim Sozlamalari
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            TransLog kompaniya profili, bildirishnomalar, interfeys va xavfsizlik konfiguratsiyasi
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="h-4 w-4" />
            Sozlamalar muvaffaqiyatli saqlandi!
          </div>
        )}
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("company")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors ${
            activeTab === "company"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Kompaniya Ma'lumotlari
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors ${
            activeTab === "profile"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <User className="h-4 w-4" />
          Foydalanuvchi Profili
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors ${
            activeTab === "notifications"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Bell className="h-4 w-4" />
          Xabarnomalar
        </button>

        <button
          onClick={() => setActiveTab("appearance")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors ${
            activeTab === "appearance"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Palette className="h-4 w-4" />
          Interfeys & Dizayn
        </button>

        <button
          onClick={() => setActiveTab("system")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-colors ${
            activeTab === "system"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Server className="h-4 w-4" />
          Tizim Ma'lumotlari
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. COMPANY INFORMATION */}
        {activeTab === "company" && (
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-6">
            <div className="border-b pb-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Kompaniya Ma'lumotlari (TransLog Logistics)
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Kompaniyaning rasmiy nomi, rekvizitlari, litsenziyasi va bosh ofis manzili
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-muted-foreground block mb-1">
                  Kompaniya Rasmiy Nomi
                </label>
                <input
                  type="text"
                  defaultValue="TransLog Logistics"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground font-semibold"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">
                  Yuridik Maqomi
                </label>
                <input
                  type="text"
                  defaultValue="MChJ (TransLog Logistics Uzbekistan LLC)"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">
                  Aloqa Telefoni
                </label>
                <input
                  type="text"
                  defaultValue="+998 71 200 77 88"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">
                  Korporativ Email
                </label>
                <input
                  type="email"
                  defaultValue="info@translog.uz"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-muted-foreground block mb-1">
                  Bosh Ofis Manzili
                </label>
                <input
                  type="text"
                  defaultValue="Toshkent shahri, O‘zbekiston (Chilonzor tumani, Bunyodkor shoh ko‘chasi 1-uy)"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">
                  STIR / INN
                </label>
                <input
                  type="text"
                  defaultValue="308 459 123"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">
                  Yuk Tashish Litsenziya Raqami
                </label>
                <input
                  type="text"
                  defaultValue="TL-UZ-2024/8892 (Vazirlar Mahkamasi huzuridagi Transport vazirligi)"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. USER PROFILE SETTINGS */}
        {activeTab === "profile" && (
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-6">
            <div className="border-b pb-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Foydalanuvchi Profili Sozlamalari
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tizim administratori hisob qaydnomasi, lavozimi va kirish xavfsizligi
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-700 text-primary-foreground font-extrabold text-2xl flex items-center justify-center shadow-lg">
                AZ
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground">Alisher Zokirov</h4>
                <p className="text-xs text-muted-foreground">Bosh logist & Tizim administratori</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">
                  Super Administrator
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-muted-foreground block mb-1">To‘liq Ism</label>
                <input
                  type="text"
                  defaultValue="Alisher Zokirov"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Lavozim</label>
                <input
                  type="text"
                  defaultValue="Bosh Logistika Dispetcheri"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="alisher.z@translog.uz"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Telefon</label>
                <input
                  type="text"
                  defaultValue="+998 90 321 00 11"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono"
                />
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-primary" />
                Xavfsizlik & Parolni Yangilash
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Yangi Parol</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Parolni Tasdiqlang</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. NOTIFICATION PREFERENCES */}
        {activeTab === "notifications" && (
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-6">
            <div className="border-b pb-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Bildirishnoma va Xabardor Qilish Sozlamalari
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Buyurtma yangilanishlari, haydovchilar marshruti va texnik ko‘rik signallari
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">
                      Email orqali oylik moliyaviy hisobotlar
                    </span>
                    <span className="text-muted-foreground text-[11px]">
                      Har oy yakunida daromad va yoqilg‘i sarfi tahlilini yuborish
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailReportNotify}
                  onChange={(e) => setEmailReportNotify(e.target.checked)}
                  className="h-4 w-4 rounded border-primary text-primary focus:ring-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                <div className="flex items-start gap-3">
                  <Smartphone className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">
                      SMS orqali haydovchilarga yo‘l xabarnomalari
                    </span>
                    <span className="text-muted-foreground text-[11px]">
                      Yangi buyurtma tayinlanganda haydovchi telefoniga SMS yuborish
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={smsDriverNotify}
                  onChange={(e) => setSmsDriverNotify(e.target.checked)}
                  className="h-4 w-4 rounded border-primary text-primary focus:ring-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                <div className="flex items-start gap-3">
                  <Send className="h-4 w-4 text-blue-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">
                      Telegram Bot Integratsiyasi (@TransLogDispatchBot)
                    </span>
                    <span className="text-muted-foreground text-[11px]">
                      Jonli dispetcherlik ogohlantirishlari va reys yakunlari
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={telegramBotNotify}
                  onChange={(e) => setTelegramBotNotify(e.target.checked)}
                  className="h-4 w-4 rounded border-primary text-primary focus:ring-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                <div className="flex items-start gap-3">
                  <Bell className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">
                      Brauzer Push Xabarnomalari
                    </span>
                    <span className="text-muted-foreground text-[11px]">
                      Real vaqtda tizim ekranida qalqib chiquvchi xabarlar
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={pushNotify}
                  onChange={(e) => setPushNotify(e.target.checked)}
                  className="h-4 w-4 rounded border-primary text-primary focus:ring-primary cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. APPEARANCE SETTINGS */}
        {activeTab === "appearance" && (
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-6">
            <div className="border-b pb-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Interfeys va Tashqi Ko‘rinish Sozlamalari
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Mavzu rejimi (Dark theme), ranglar palitrasi va jadval qulayligi
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-bold text-xs text-foreground block mb-2">
                  Asosiy Mavzu Rejimi (Theme Mode)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`p-3 rounded-xl border text-left font-semibold text-xs flex flex-col gap-1 transition-all ${
                      theme === "dark"
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="font-bold text-sm">Qorong‘i (Dark)</span>
                    <span className="text-[11px] text-muted-foreground">Standart tavsiya etilgan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`p-3 rounded-xl border text-left font-semibold text-xs flex flex-col gap-1 transition-all ${
                      theme === "light"
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="font-bold text-sm">Yorug‘ (Light)</span>
                    <span className="text-[11px] text-muted-foreground">Klassik oq interfeys</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTheme("system")}
                    className={`p-3 rounded-xl border text-left font-semibold text-xs flex flex-col gap-1 transition-all ${
                      theme === "system"
                        ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="font-bold text-sm">Tizim (Auto)</span>
                    <span className="text-[11px] text-muted-foreground">Qurilma rejimiga mos</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="font-bold text-xs text-foreground block mb-1">
                    Tizim Tili
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-lg border bg-background text-foreground"
                  >
                    <option value="uz">O‘zbek tili (Lotin alifbosi)</option>
                    <option value="ru">Русский язык</option>
                    <option value="en">English (International)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-xs text-foreground block mb-1">
                    Jadval Zichligi (Table Density)
                  </label>
                  <select
                    value={tableDensity}
                    onChange={(e) => setTableDensity(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-lg border bg-background text-foreground"
                  >
                    <option value="normal">Qulay (Normal)</option>
                    <option value="compact">Ixcham (Compact)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-muted-foreground flex items-center justify-between">
                <span>Aksent Rang (Brand Accent):</span>
                <span className="flex items-center gap-2 font-mono font-bold text-primary">
                  <span className="w-3.5 h-3.5 rounded-full bg-primary inline-block"></span>
                  TransLog Blue (#3b82f6)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 5. SYSTEM INFORMATION */}
        {activeTab === "system" && (
          <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm space-y-6">
            <div className="border-b pb-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Tizim Ma'lumotlari va Xavfsizlik Holati
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                TransLog tizimi arxitekturasi, server barqarorligi va dasturiy ta'minot versiyasi
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground text-[11px] block">Dasturiy Ta'minot Versiyasi</span>
                <span className="font-mono font-extrabold text-sm text-foreground block">
                  TransLog TMS Enterprise v2.4.0
                </span>
                <span className="text-muted-foreground text-[11px]">Build 2026.11 (React 18 + Vite)</span>
              </div>

              <div className="p-3.5 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground text-[11px] block">Server Holati (Uptime)</span>
                <span className="font-bold text-sm text-emerald-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  99.98% Barqaror ish faoliyati
                </span>
                <span className="text-muted-foreground text-[11px]">Toshkent DC Cluster #1</span>
              </div>

              <div className="p-3.5 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground text-[11px] block">Ma'lumotlar Rejimi</span>
                <span className="font-bold text-sm text-foreground block">
                  Mahalliy Namoyish Rejimi (High-speed Mock Engine)
                </span>
                <span className="text-muted-foreground text-[11px]">Statik xotira integratsiyasi</span>
              </div>

              <div className="p-3.5 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground text-[11px] block">Zaxira Nusxa (Backup)</span>
                <span className="font-bold text-sm text-foreground block">
                  Bugun, 04:00 (Muvaffaqiyatli)
                </span>
                <span className="text-muted-foreground text-[11px]">256-bit AES shifrlangan</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border bg-muted/10 space-y-2 text-xs">
              <span className="font-bold text-foreground block">Litsenziya va Huquqlar:</span>
              <p className="text-muted-foreground leading-relaxed">
                Ushbu tizim O‘zbekiston Respublikasining intellektual mulk to‘g‘risidagi qonunchiligiga muvofiq ro‘yxatga olingan. Litsenziya amal qilish muddati: 2028-yil 31-dekabrgacha.
              </p>
            </div>
          </div>
        )}

        {/* Save Action Bar */}
        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-xs text-muted-foreground">
            Barcha kiritilgan o‘zgarishlar faqat ushbu sessiya uchun saqlanadi.
          </span>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 shadow transition-all"
          >
            <Save className="h-4 w-4" />
            Sozlamalarni Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}
