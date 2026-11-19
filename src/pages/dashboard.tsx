import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Truck,
  Users,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
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
import { type DashboardStats, type Shipment, type Vehicle } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";

const monthlyData = [
  { month: "Yanvar", revenue: 4200000, deliveries: 28 },
  { month: "Fevral", revenue: 5800000, deliveries: 35 },
  { month: "Mart", revenue: 7100000, deliveries: 46 },
  { month: "Aprel", revenue: 8900000, deliveries: 54 },
  { month: "May", revenue: 10400000, deliveries: 68 },
  { month: "Iyun", revenue: 11200000, deliveries: 76 },
];

export default function Dashboard() {
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: shipments } = useQuery<Shipment[]>({
    queryKey: ["/api/shipments"],
  });

  const { data: vehicles } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
  });

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Boshqaruv Paneli
        </h1>
        <p className="text-sm text-muted-foreground">
          Transport-logistika boshqaruv tizimi asosiy ko‘rsatkichlari va tahlili
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Jami Transportlar</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
              <Truck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold">{stats?.totalVehicles ?? 4} ta</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-semibold">{stats?.activeVehicles ?? 2} ta</span> faol / yo‘lda
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Haydovchilar</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold">{stats?.totalDrivers ?? 3} nafar</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-semibold">{stats?.availableDrivers ?? 2} nafar</span> navbatchilikda
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Jo‘natmalar</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold">{stats?.totalShipments ?? 3} ta</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-blue-500 font-semibold">{stats?.inTransitShipments ?? 1} ta</span> yetkazilmoqda
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Oylik Daromad</span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold">
              {formatCurrency(stats?.monthlyRevenue ?? 11200000)}
            </div>
            <p className="text-xs text-emerald-500 font-semibold mt-1 flex items-center gap-1">
              ↑ +18.4% o‘tgan oyga nisbatan
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Chart (3.6-rasm from dissertation) */}
      <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Oylik Daromad va Yetkazish Tendensiyasi (3.6-rasm)
            </h2>
            <p className="text-xs text-muted-foreground">
              Yanvardan Iyungacha bo‘lgan yuk tashish daromadi dinamikasi
            </p>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)} mln`}
              />
              <Tooltip
                formatter={(value: any) => [formatCurrency(Number(value)), "Daromad"]}
                contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Row: Recent Shipments & Active Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">So‘nggi Jo‘natmalar</h3>
            <span className="text-xs text-muted-foreground">Real vaqt holati</span>
          </div>
          <div className="space-y-3">
            {shipments?.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      {s.trackingNumber}
                    </span>
                    <span className="text-xs text-muted-foreground">({s.weight} kg)</span>
                  </div>
                  <p className="text-xs font-medium text-foreground truncate max-w-xs">
                    {s.senderName} → {s.receiverName}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      s.status === "delivered"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                        : s.status === "in_transit"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                    }`}
                  >
                    {s.status === "delivered"
                      ? "Yetkazildi"
                      : s.status === "in_transit"
                      ? "Yo‘lda"
                      : "Kutilmoqda"}
                  </span>
                  <div className="text-xs font-semibold">{formatCurrency(s.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Vehicles */}
        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Avtopark Holati</h3>
            <span className="text-xs text-muted-foreground">Monitoring</span>
          </div>
          <div className="space-y-3">
            {vehicles?.map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-foreground font-mono">
                      {v.plateNumber}
                    </span>
                    <span className="text-xs font-medium text-foreground">
                      {v.brand} {v.model}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Joylashuv: {v.currentLocation || "Markaz"}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      v.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : v.status === "en_route"
                        ? "bg-blue-100 text-blue-700"
                        : v.status === "maintenance"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {v.status === "active"
                      ? "Faol"
                      : v.status === "en_route"
                      ? "Yo‘lda"
                      : v.status === "maintenance"
                      ? "Ta'mirda"
                      : "Bo‘sh"}
                  </span>
                  <div className="text-xs text-muted-foreground">
                    Yoqilg‘i: <span className="font-medium text-foreground">{v.fuelLevel}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
