import React from "react";
import { Link } from "wouter";
import {
  Truck,
  Users,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Fuel,
  ArrowUpRight,
  MapPin,
  Activity,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Gauge,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  mockDashboardStats,
  mockRecentActivities,
  mockVehicles,
  mockShipments,
  mockMonthlyPerformance,
  mockVehicleStatusDistribution,
  mockShipmentStatusDistribution,
} from "@/lib/mockData";
import { formatUZS, formatNumber } from "@/lib/utils";

export default function Dashboard() {
  const stats = mockDashboardStats;
  const inTransitShipments = mockShipments.filter((s) => s.status === "in_transit");

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Live Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1 border-b">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Boshqaruv Paneli
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Jonli Monitoring
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            TransLog transport-logistika tizimining asosiy operatsion ko‘rsatkichlari va tahlili
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-card text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium text-foreground">Noyabr, 2026</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-card text-xs text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-emerald-500" />
            <span>Tizim barqarorligi: <strong className="text-foreground">99.98%</strong></span>
          </div>
        </div>
      </div>

      {/* KPI Cards (6 Key Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1: Total Vehicles */}
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Avtopark
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Truck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold tracking-tight">{stats.totalVehicles} ta</div>
            <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
              <span>Faol: <strong className="text-emerald-500">{stats.activeVehicles}</strong></span>
              <span>Ta'mirda: <strong className="text-amber-500">{stats.maintenanceVehicles}</strong></span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Drivers */}
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Haydovchilar
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold tracking-tight">{stats.activeDrivers} nafar</div>
            <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
              <span>Jami: <strong className="text-foreground">{stats.totalDrivers}</strong></span>
              <span>Ta'tilda: <strong className="text-muted-foreground">{stats.onLeaveDrivers}</strong></span>
            </div>
          </div>
        </div>

        {/* Card 3: Active Shipments */}
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Faol Jo‘natmalar
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold tracking-tight">{stats.activeShipments} ta</div>
            <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
              <span>Yo'lda: <strong className="text-blue-500">{stats.activeShipments}</strong></span>
              <span>Kutilmoqda: <strong className="text-amber-500">{stats.pendingShipments}</strong></span>
            </div>
          </div>
        </div>

        {/* Card 4: Monthly Revenue */}
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Oylik Tushum
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-extrabold tracking-tight text-emerald-500 truncate" title="185,000,000 UZS">
              185 mln UZS
            </div>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-emerald-500">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+14.2% o‘sish</span>
            </div>
          </div>
        </div>

        {/* Card 5: Fuel Expenses */}
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Yoqilg‘i Xarajati
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Fuel className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-extrabold tracking-tight text-foreground truncate" title="24,500,000 UZS">
              24.5 mln UZS
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 truncate">
              {formatNumber(stats.totalFuelLitersThisMonth)} litr sarflandi
            </p>
          </div>
        </div>

        {/* Card 6: Completed Deliveries */}
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Yetkazilgan
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold tracking-tight text-foreground">
              {stats.completedDeliveries} ta
            </div>
            <p className="text-xs text-emerald-500 mt-1.5 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              <span>98.2% o‘z vaqtida</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Charts & Status Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Deliveries Chart (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-foreground">
                Oylik Daromad va Yetkazishlar Dinamikasi
              </h2>
              <p className="text-xs text-muted-foreground">
                2026-yil 6 oylik moliyaviy o‘sish va yetkazilgan buyurtmalar hajmi (UZS)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-muted-foreground">Daromad (UZS)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-muted-foreground">Yetkazilgan (ta)</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockMonthlyPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="oy"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.75rem",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(val: any, name: string) => {
                    if (name === "daromad") return [formatUZS(val), "Jami Daromad"];
                    if (name === "yetkazilgan") return [`${val} ta`, "Yetkazilgan"];
                    return [val, name];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="daromad"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t text-center text-xs">
            <div className="p-2 rounded-lg bg-muted/40">
              <span className="text-muted-foreground block text-[11px]">O‘rtacha Safar Vaqti</span>
              <span className="font-bold text-sm text-foreground">{stats.averageDeliveryTimeHours} soat</span>
            </div>
            <div className="p-2 rounded-lg bg-muted/40">
              <span className="text-muted-foreground block text-[11px]">Faol Marshrutlar</span>
              <span className="font-bold text-sm text-foreground">{stats.activeRoutes} ta yo‘nalish</span>
            </div>
            <div className="p-2 rounded-lg bg-muted/40">
              <span className="text-muted-foreground block text-[11px]">Oylik Masofa</span>
              <span className="font-bold text-sm text-foreground">248,500 km</span>
            </div>
          </div>
        </div>

        {/* Right Column: Fleet & Shipment Status Overview */}
        <div className="space-y-4">
          {/* Vehicle Status Overview Card */}
          <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                Avtotransport Holati (24 ta)
              </h3>
              <Link href="/vehicles">
                <span className="text-xs text-primary hover:underline flex items-center cursor-pointer">
                  Barchasi <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Faol va yo‘lda
                  </span>
                  <span className="font-semibold text-foreground">18 ta (75%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Texnik xizmat / Ta'mirda
                  </span>
                  <span className="font-semibold text-foreground">3 ta (12.5%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "12.5%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Garajda zaxirada (Bo‘sh)
                  </span>
                  <span className="font-semibold text-foreground">3 ta (12.5%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "12.5%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Status Overview Card */}
          <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                Jo‘natmalar Taqsimoti (48 ta)
              </h3>
              <Link href="/shipments">
                <span className="text-xs text-primary hover:underline flex items-center cursor-pointer">
                  Barchasi <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Yetkazilgan
                  </span>
                  <span className="font-semibold text-foreground">30 ta (62.5%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "62.5%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Ayni vaqtda trassada
                  </span>
                  <span className="font-semibold text-foreground">12 ta (25.0%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Yuklash kutilmoqda
                  </span>
                  <span className="font-semibold text-foreground">6 ta (12.5%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "12.5%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Activities & Live In-Transit Shipments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities (At least 5 entries - we display 6) */}
        <div className="lg:col-span-2 p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">So‘nggi Harakatlar va Hodisalar</h2>
              <p className="text-xs text-muted-foreground">
                Tizimdagi real vaqt rejimidagi yuk harakati va operatsion xabarlar
              </p>
            </div>
            <span className="text-xs text-muted-foreground">Oxirgi 8 soat</span>
          </div>

          <div className="divide-y border rounded-lg overflow-hidden bg-card/50">
            {mockRecentActivities.map((act) => {
              const badgeColors = {
                emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
                amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
                rose: "bg-rose-500/10 text-rose-500 border-rose-500/20",
                slate: "bg-slate-500/10 text-slate-400 border-slate-500/20",
              };

              return (
                <div
                  key={act.id}
                  className="p-3.5 flex items-start justify-between gap-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground leading-snug">
                        {act.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {act.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span
                      className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border ${
                        badgeColors[act.badgeVariant]
                      }`}
                    >
                      {act.badgeText}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live In-Transit Shipments Spotlight */}
        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Yo‘ldagi Muhim Yuklar
            </h2>
            <Link href="/shipments">
              <span className="text-xs text-primary hover:underline cursor-pointer">Hammasi</span>
            </Link>
          </div>

          <div className="space-y-3">
            {inTransitShipments.slice(0, 3).map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    {s.trackingNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    Yo‘lda
                  </span>
                </div>

                <div className="text-xs font-semibold text-foreground">
                  {s.origin} → {s.destination}
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t">
                  <span>{s.assignedDriverName}</span>
                  <span className="font-mono">{s.assignedVehiclePlate}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-muted-foreground flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>Barcha avtomobillar GPS telematika tizimiga ulangan.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
