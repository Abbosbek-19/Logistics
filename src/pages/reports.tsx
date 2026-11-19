import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { type DashboardStats } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";

const deliveryTrendData = [
  { oy: "Yanvar", yetkazilgan: 25, kechiktirilgan: 2, bekor_qilingan: 1 },
  { oy: "Fevral", yetkazilgan: 32, kechiktirilgan: 2, bekor_qilingan: 1 },
  { oy: "Mart", yetkazilgan: 42, kechiktirilgan: 3, bekor_qilingan: 1 },
  { oy: "Aprel", yetkazilgan: 50, kechiktirilgan: 3, bekor_qilingan: 1 },
  { oy: "May", yetkazilgan: 64, kechiktirilgan: 2, bekor_qilingan: 2 },
  { oy: "Iyun", yetkazilgan: 72, kechiktirilgan: 3, bekor_qilingan: 1 },
];

const vehicleUtilization = [
  { name: "Faol", value: 50, color: "#10b981" },
  { name: "Yo‘lda", value: 25, color: "#3b82f6" },
  { name: "Bo‘sh", value: 15, color: "#94a3b8" },
  { name: "Ta'mirda", value: 10, color: "#ef4444" },
];

export default function Reports() {
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Hisobotlar va Tahlil Moduli (3.9-rasm)
        </h1>
        <p className="text-sm text-muted-foreground">
          Yetkazish tendensiyalari, transport vositalaridan foydalanish va moliyaviy sarf-xarajatlar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Trends Bar Chart */}
        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm">
          <h3 className="font-semibold text-sm mb-1">Yetkazish Tendensiyalari</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Oylik yetkazilgan, kechiktirilgan va bekor qilingan buyurtmalar soni
          </p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="oy" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="yetkazilgan" name="Yetkazilgan" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="kechiktirilgan" name="Kechiktirilgan" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bekor_qilingan" name="Bekor qilingan" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Vehicle Utilization Pie Chart */}
        <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm">
          <h3 className="font-semibold text-sm mb-1">Avtomobillardan Foydalanish Darajasi</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Avtoparkdagi texnikalarning amaldagi holat ulushi (%)
          </p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehicleUtilization}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {vehicleUtilization.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary KPI Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs text-muted-foreground">O‘rtacha yetkazish vaqti</span>
          <div className="text-xl font-bold mt-1">4.2 soat</div>
          <span className="text-xs text-emerald-500 font-semibold mt-1 inline-block">
            -20% samaradorlik oshishi
          </span>
        </div>
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs text-muted-foreground">Oylik Yoqilg‘i Xarajati</span>
          <div className="text-xl font-bold mt-1">
            {formatCurrency(stats?.fuelCostsThisMonth ?? 2415000)}
          </div>
          <span className="text-xs text-muted-foreground mt-1 inline-block">
            210 litr sarflangan
          </span>
        </div>
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs text-muted-foreground">Oylik Texnik Ta'mir Xarajati</span>
          <div className="text-xl font-bold mt-1">
            {formatCurrency(stats?.maintenanceCostsThisMonth ?? 3200000)}
          </div>
          <span className="text-xs text-muted-foreground mt-1 inline-block">
            Rejali xizmat ko‘rsatish
          </span>
        </div>
      </div>
    </div>
  );
}
