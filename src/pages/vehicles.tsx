import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Truck, Plus, Search, Filter } from "lucide-react";
import { type Vehicle, type InsertVehicle } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Vehicles() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
  });

  const [form, setForm] = useState<Partial<InsertVehicle>>({
    plateNumber: "",
    type: "truck",
    brand: "",
    model: "",
    year: 2023,
    capacity: 5000,
    fuelType: "Dizel",
    status: "idle",
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertVehicle) => {
      const res = await apiRequest("POST", "/api/vehicles", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
      setShowAddModal(false);
      setForm({
        plateNumber: "",
        type: "truck",
        brand: "",
        model: "",
        year: 2023,
        capacity: 5000,
        fuelType: "Dizel",
        status: "idle",
      });
    },
  });

  const filtered = vehicles?.filter((v) => {
    const matchSearch =
      v.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || v.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Avtoparklar Moduli (3.7-rasm)
          </h1>
          <p className="text-sm text-muted-foreground">
            Barcha transport vositalari ro‘yxati, texnik holati va yoqilg‘i monitoringi
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          Yangi Transport Qo‘shish
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Davlat raqami, brend yoki model bo‘yicha qidiruv..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          <option value="all">Barcha holatlar</option>
          <option value="active">Faol</option>
          <option value="en_route">Yo‘lda</option>
          <option value="idle">Bo‘sh</option>
          <option value="maintenance">Ta'mirda</option>
        </select>
      </div>

      {/* Vehicles Table */}
      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Davlat Raqami</th>
                <th className="px-4 py-3">Transport</th>
                <th className="px-4 py-3">Sig‘imi</th>
                <th className="px-4 py-3">Yoqilg‘i turi</th>
                <th className="px-4 py-3">Yoqilg‘i darajasi</th>
                <th className="px-4 py-3">Masofa (km)</th>
                <th className="px-4 py-3">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y text-foreground">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    Yuklanmoqda...
                  </td>
                </tr>
              ) : filtered?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    Transport vositalari topilmadi.
                  </td>
                </tr>
              ) : (
                filtered?.map((v) => (
                  <tr key={v.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-primary">
                      {v.plateNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{v.brand} {v.model}</div>
                      <div className="text-xs text-muted-foreground capitalize">{v.type} ({v.year})</div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {(v.capacity / 1000).toFixed(1)} tonna
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{v.fuelType}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              (v.fuelLevel || 0) < 20
                                ? "bg-red-500"
                                : (v.fuelLevel || 0) < 50
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${v.fuelLevel || 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{v.fuelLevel}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {v.mileage?.toLocaleString()} km
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          v.status === "active"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                            : v.status === "en_route"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400"
                            : v.status === "maintenance"
                            ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400"
                            : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold">Yangi Transport Qo‘shish</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Davlat Raqami</label>
                <input
                  type="text"
                  placeholder="Masalan: 01 777 AAA"
                  value={form.plateNumber}
                  onChange={(e) => setForm({ ...form, plateNumber: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background text-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Brend</label>
                  <input
                    type="text"
                    placeholder="MAN, Isuzu, Kamaz..."
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Model</label>
                  <input
                    type="text"
                    placeholder="TGS, NPR, 5490..."
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background text-foreground"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Sig‘imi (kg)</label>
                  <input
                    type="number"
                    value={(form.capacity as any) ?? ""}
                    onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Yoqilg‘i turi</label>
                  <select
                    value={form.fuelType}
                    onChange={(e) => setForm({ ...form, fuelType: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-background text-foreground"
                  >
                    <option value="Dizel">Dizel</option>
                    <option value="Benzin">Benzin</option>
                    <option value="Metan">Metan</option>
                    <option value="Elektr">Elektr</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-muted"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={() => createMutation.mutate(form as InsertVehicle)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
