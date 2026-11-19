import React, { useState } from "react";
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
  AreaChart,
  Area,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Truck,
  Users,
  Package,
  Calendar,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  FileSpreadsheet,
} from "lucide-react";
import {
  mockMonthlyPerformance,
  mockVehicleStatusDistribution,
  mockShipmentStatusDistribution,
  mockExpensesBreakdown,
  mockDriverLeaderboard,
  mockVehicles,
} from "@/lib/mockData";
import { formatUZS, formatNumber } from "@/lib/utils";

export default function Reports() {
  const [activeTab, setActiveTab] = useState<"financial" | "vehicles" | "drivers">("financial");
  const [selectedPeriod, setSelectedPeriod] = useState("2026-11");

  // Delivery trend detailed data
  const deliveryTrends = [
    { oy: "Iyun", bajarilgan: 124, kutilayotgan: 6, kechikkan: 2, bekor: 0 },
    { oy: "Iyul", bajarilgan: 132, kutilayotgan: 5, kechikkan: 3, bekor: 1 },
    { oy: "Avgust", bajarilgan: 141, kutilayotgan: 7, kechikkan: 2, bekor: 0 },
    { oy: "Sentabr", bajarilgan: 148, kutilayotgan: 8, kechikkan: 3, bekor: 1 },
    { oy: "Oktabr", bajarilgan: 152, kutilayotgan: 6, kechikkan: 2, bekor: 0 },
    { oy: "Noyabr", bajarilgan: 156, kutilayotgan: 6, kechikkan: 3, bekor: 1 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <BarChart3 className="h-6 w-6 text-primary" />
            Hisobotlar va Tahlil Moduli
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Oylik jo‘natmalar tahlili, transport va haydovchilar samaradorligi hamda moliyaviy balans
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border bg-card text-foreground cursor-pointer"
          >
            <option value="2026-11">Noyabr, 2026 (Joriy oy)</option>
            <option value="2026-10">Oktabr, 2026</option>
            <option value="2026-q3">3-Chorak (Q3 2026)</option>
          </select>

          <button
            onClick={() => alert("Hisobot PDF/Excel formatida eksport qilindi.")}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border bg-card hover:bg-muted text-foreground text-xs font-semibold shadow-sm transition-colors"
          >
            <Download className="h-3.5 w-3.5 text-primary" />
            Eksport (PDF/XLS)
          </button>
        </div>
      </div>

      {/* Top 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Jami Oylik Daromad
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-foreground">185,000,000 UZS</div>
            <div className="flex items-center gap-1 text-xs text-emerald-500 mt-1 font-semibold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>+14.2% o‘tgan oyga nisbatan</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Jami Oylik Xarajatlar
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-foreground">50,650,000 UZS</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>Yoqilg‘i + Texnik xizmat</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Sof Operatsion Foyda
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-blue-500">134,350,000 UZS</div>
            <div className="flex items-center gap-1 text-xs text-blue-500 mt-1 font-semibold">
              <span>Rentabellik marjasi: 72.6%</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Yetkazish Samaradorligi
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-500">98.2%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>156 ta buyurtma o‘z vaqtida</span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Category Switcher Tabs */}
      <div className="flex items-center gap-2 border-b pb-2">
        <button
          onClick={() => setActiveTab("financial")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === "financial"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          1. Oylik Yuk Tashish va Moliya Hisoboti
        </button>
        <button
          onClick={() => setActiveTab("vehicles")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === "vehicles"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          2. Avtotransport Unumdorligi Hisoboti
        </button>
        <button
          onClick={() => setActiveTab("drivers")}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            activeTab === "drivers"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          3. Haydovchilar Samaradorligi Hisoboti
        </button>
      </div>

      {/* TAB 1: MONTHLY SHIPMENT & FINANCIAL REPORT */}
      {activeTab === "financial" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 1: Revenue vs Expenses BarChart (2 cols) */}
            <div className="lg:col-span-2 p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-base text-foreground">
                  Oylik Daromad va Xarajatlar Taqqoslovi (UZS)
                </h3>
                <p className="text-xs text-muted-foreground">
                  Oxirgi 6 oylik dinamika: tushumlar va asosiy operatsion xarajatlar balansi
                </p>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockMonthlyPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="oy" fontSize={11} stroke="hsl(var(--muted-foreground))" />
                    <YAxis
                      fontSize={11}
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(val) => `${(val / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "0.75rem",
                        color: "hsl(var(--foreground))",
                      }}
                      formatter={(val: any, name: string) => {
                        if (name === "daromad") return [formatUZS(val), "Jami Daromad"];
                        if (name === "xarajat") return [formatUZS(val), "Xarajatlar"];
                        return [val, name];
                      }}
                    />
                    <Legend />
                    <Bar dataKey="daromad" name="Daromad (Revenue)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="xarajat" name="Xarajat (Expenses)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Expenses Breakdown PieChart */}
            <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-base text-foreground">
                  Xarajatlar Tarkibi Taqsimoti
                </h3>
                <p className="text-xs text-muted-foreground">
                  Jami 50,650,000 UZS sarf-xarajatning kategoriyalar bo‘yicha ulushi
                </p>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockExpensesBreakdown}
                      dataKey="amount"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {mockExpensesBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: any) => [formatUZS(Number(val)), "Qiymat"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 pt-1 border-t text-xs">
                {mockExpensesBreakdown.map((exp, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: exp.color }}></span>
                      {exp.name}
                    </span>
                    <span className="font-semibold text-foreground">{exp.percent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Deliveries Table: Completed vs Pending vs Delayed */}
          <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-foreground">
                  Bajarilgan va Kutilayotgan Buyurtmalar Balansi
                </h3>
                <p className="text-xs text-muted-foreground">
                  Oylar kesimida yetkazilgan, kutilayotgan va kechiktirilgan qatnovlar dinamikasi
                </p>
              </div>
              <span className="text-xs text-muted-foreground">Reja bajarilishi: 100.6%</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/50 text-muted-foreground font-semibold border-b uppercase">
                  <tr>
                    <th className="px-4 py-3">Oy</th>
                    <th className="px-4 py-3">Yetkazilgan (Completed)</th>
                    <th className="px-4 py-3">Kutilmoqda (Pending)</th>
                    <th className="px-4 py-3">Kechiktirilgan (Delayed)</th>
                    <th className="px-4 py-3">Bekor qilingan</th>
                    <th className="px-4 py-3">Samaradorlik Koeffitsienti</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-foreground">
                  {deliveryTrends.map((dt, idx) => (
                    <tr key={idx} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-bold">{dt.oy} 2026</td>
                      <td className="px-4 py-3 font-semibold text-emerald-500">
                        {dt.bajarilgan} ta
                      </td>
                      <td className="px-4 py-3 font-medium text-amber-500">
                        {dt.kutilayotgan} ta
                      </td>
                      <td className="px-4 py-3 font-medium text-rose-500">
                        {dt.kechikkan} ta
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {dt.bekor} ta
                      </td>
                      <td className="px-4 py-3 font-mono font-bold">
                        {( (dt.bajarilgan / (dt.bajarilgan + dt.kechikkan + dt.bekor)) * 100 ).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VEHICLE PERFORMANCE REPORT */}
      {activeTab === "vehicles" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vehicle Utilization Status Chart */}
            <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-base text-foreground">
                  Avtoparkdan Foydalanish Ulushi
                </h3>
                <p className="text-xs text-muted-foreground">
                  24 ta transport vositasining ekspluatatsiya ko‘rsatkichi
                </p>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockVehicleStatusDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {mockVehicleStatusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 border-t pt-2 text-xs">
                {mockVehicleStatusDistribution.map((v, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v.color }}></span>
                      {v.name}
                    </span>
                    <span className="font-bold text-foreground">{v.value} ta ({v.percent})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Fleet Metrics Table (2 cols) */}
            <div className="lg:col-span-2 p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    Transport Vositalari Unumdorligi Reytingi
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Bosib o‘tilgan masofa, yoqilg‘i sarfi va texnik holat reytingi
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">Avtopark o‘rtacha unumi: 94.4%</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/50 text-muted-foreground font-semibold border-b uppercase">
                    <tr>
                      <th className="px-4 py-3">Davlat Raqami</th>
                      <th className="px-4 py-3">Model</th>
                      <th className="px-4 py-3">Jami Yurgan Masofa</th>
                      <th className="px-4 py-3">O‘rtacha Sarf (100km)</th>
                      <th className="px-4 py-3">Unumdorlik</th>
                      <th className="px-4 py-3">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-foreground">
                    {mockVehicles.slice(0, 6).map((v) => (
                      <tr key={v.id} className="hover:bg-muted/30">
                        <td className="px-4 py-3 font-mono font-bold text-primary">
                          {v.plateNumber}
                        </td>
                        <td className="px-4 py-3 font-medium">
                          {v.brand} {v.model}
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold">
                          {formatNumber(v.mileage)} km
                        </td>
                        <td className="px-4 py-3 font-mono">
                          {v.brand === "Mercedes-Benz" ? "28.5 L" : v.brand === "MAN" ? "29.2 L" : v.brand === "Volvo" ? "27.8 L" : "21.4 L"}
                        </td>
                        <td className="px-4 py-3 font-bold text-emerald-500">
                          {v.status === "maintenance" ? "68%" : "96%"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              v.status === "active"
                                ? "bg-emerald-500/10 text-emerald-500"
                                : v.status === "maintenance"
                                ? "bg-rose-500/10 text-rose-500"
                                : "bg-blue-500/10 text-blue-500"
                            }`}
                          >
                            {v.status === "active" ? "Faol" : v.status === "maintenance" ? "Ta'mirda" : "Yo‘lda"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DRIVER PERFORMANCE REPORT */}
      {activeTab === "drivers" && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-foreground">
                  Haydovchilar Ish Faoliyati va KPI Ko‘rsatkichlari
                </h3>
                <p className="text-xs text-muted-foreground">
                  Yetkazilgan buyurtmalar soni, o‘z vaqtida yetkazish intizomi va xavfsizlik reytingi
                </p>
              </div>
              <span className="text-xs text-muted-foreground">Baholangan haydovchilar: 18 nafar</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/50 text-muted-foreground font-semibold border-b uppercase">
                  <tr>
                    <th className="px-4 py-3">O‘rin & Haydovchi</th>
                    <th className="px-4 py-3">Yetkazilgan Qatnovlar</th>
                    <th className="px-4 py-3">O‘z Vaqtida Yetkazish (On-Time)</th>
                    <th className="px-4 py-3">Reyting Bahosi</th>
                    <th className="px-4 py-3">Samaradorlik Toifasi</th>
                    <th className="px-4 py-3">Mukofot / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-foreground">
                  {mockDriverLeaderboard.map((drv, idx) => (
                    <tr key={idx} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-semibold flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{drv.name}</span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold">
                        {drv.trips} ta reys
                      </td>
                      <td className="px-4 py-3 font-semibold text-emerald-500">
                        {drv.onTimeRate}
                      </td>
                      <td className="px-4 py-3 font-bold text-amber-500">
                        {drv.rating} / 5.0
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-muted text-primary">
                          {drv.efficiency}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-emerald-500 font-semibold">
                        A'lo (Bonusga tavsiya)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
