import React, { useState } from "react";
import {
  Truck,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Wrench,
  Clock,
  Fuel,
  Gauge,
  User,
  Calendar,
  MapPin,
  ChevronRight,
  LayoutGrid,
  List,
  X,
} from "lucide-react";
import { mockVehicles, type VehicleDemo } from "@/lib/mockData";
import { formatNumber } from "@/lib/utils";

export default function Vehicles() {
  const [vehiclesList, setVehiclesList] = useState<VehicleDemo[]>(mockVehicles);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleDemo | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding new vehicle
  const [formData, setFormData] = useState({
    plateNumber: "",
    brand: "",
    model: "",
    year: 2024,
    type: "truck" as "truck" | "van",
    capacity: 20000,
    fuelType: "Dizel (Euro-5)",
    assignedDriverName: "Aziz Karimov",
    status: "active" as "active" | "maintenance" | "idle" | "en_route",
    mileage: 50000,
  });

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.plateNumber || !formData.brand || !formData.model) return;

    const newVehicle: VehicleDemo = {
      id: `veh-${Date.now()}`,
      plateNumber: formData.plateNumber.toUpperCase(),
      brand: formData.brand,
      model: formData.model,
      year: Number(formData.year),
      type: formData.type,
      capacity: Number(formData.capacity),
      fuelType: formData.fuelType,
      status: formData.status,
      currentLocation: "TransLog Bosh Garaji (Toshkent)",
      lastMaintenance: "15.11.2026",
      nextMaintenance: "15.02.2027",
      fuelLevel: 100,
      mileage: Number(formData.mileage),
      assignedDriverId: "drv-001",
      assignedDriverName: formData.assignedDriverName,
    };

    setVehiclesList([newVehicle, ...vehiclesList]);
    setShowAddModal(false);
  };

  const filtered = vehiclesList.filter((v) => {
    const query = search.toLowerCase();
    const matchSearch =
      v.plateNumber.toLowerCase().includes(query) ||
      v.brand.toLowerCase().includes(query) ||
      v.model.toLowerCase().includes(query) ||
      v.assignedDriverName.toLowerCase().includes(query);

    const matchStatus = filterStatus === "all" || v.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: VehicleDemo["status"]) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Faol (Active)
          </span>
        );
      case "en_route":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Yo‘lda (En Route)
          </span>
        );
      case "maintenance":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Ta'mirda (Maintenance)
          </span>
        );
      case "idle":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            Bo‘sh (Idle)
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Truck className="h-6 w-6 text-primary" />
            Avtoparklar Moduli
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Barcha transport vositalari ro‘yxati, haydovchilar biriktiruvi, texnik holat va yoqilg‘i monitoringi
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 shadow-sm transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi Transport Qo‘shish
        </button>
      </div>

      {/* Fleet Summary Mini Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Jami Transport
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-1 block">
            24 ta
          </span>
          <span className="text-xs text-muted-foreground mt-1 block">8 ta asosiy model</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Faol / Yo‘nalishda
          </span>
          <span className="text-2xl font-extrabold text-emerald-500 mt-1 block">
            18 ta
          </span>
          <span className="text-xs text-emerald-500/80 mt-1 block">75% unumdorlik</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Texnik Ta'mirda
          </span>
          <span className="text-2xl font-extrabold text-rose-500 mt-1 block">
            3 ta
          </span>
          <span className="text-xs text-rose-500/80 mt-1 block">Servis markazida</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Garajda / Bo‘sh
          </span>
          <span className="text-2xl font-extrabold text-blue-500 mt-1 block">
            3 ta
          </span>
          <span className="text-xs text-blue-500/80 mt-1 block">Zaxiraga tayyor</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Davlat raqami, brend, model yoki haydovchi ismi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
            >
              <option value="all">Barcha holatlar (All)</option>
              <option value="active">Faol (Active)</option>
              <option value="en_route">Yo‘lda (En Route)</option>
              <option value="maintenance">Ta'mirda (Maintenance)</option>
              <option value="idle">Bo‘sh (Idle)</option>
            </select>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 border rounded-lg p-1 bg-muted/40 shrink-0">
          <button
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === "table"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Jadval</span>
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === "cards"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Kartochkalar</span>
          </button>
        </div>
      </div>

      {/* Modern Vehicles Table View */}
      {viewMode === "table" ? (
        <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-semibold border-b text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Davlat Raqami</th>
                  <th className="px-4 py-3.5">Brend va Model</th>
                  <th className="px-4 py-3.5">Turi & Yili</th>
                  <th className="px-4 py-3.5">Biriktirilgan Haydovchi</th>
                  <th className="px-4 py-3.5">Holati</th>
                  <th className="px-4 py-3.5">Bosib O‘tilgan</th>
                  <th className="px-4 py-3.5">Yoqilg‘i Turi & Baki</th>
                  <th className="px-4 py-3.5 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y text-foreground">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-muted-foreground">
                      Qidiruv bo‘yicha transport vositalari topilmadi.
                    </td>
                  </tr>
                ) : (
                  filtered.map((v) => (
                    <tr
                      key={v.id}
                      className="hover:bg-muted/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedVehicle(v)}
                    >
                      <td className="px-4 py-3.5">
                        <span className="font-mono font-bold text-sm px-2.5 py-1 rounded border bg-muted/60 text-foreground tracking-wide">
                          {v.plateNumber}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-medium">
                        <div className="text-foreground font-bold">{v.brand} {v.model}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 text-primary" />
                          <span className="truncate max-w-xs">{v.currentLocation}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="capitalize font-medium text-xs">
                          {v.type === "truck" ? "Yuk mashinasi" : "Furgon"}
                        </span>
                        <div className="text-xs text-muted-foreground">{v.year}-yil</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                            {v.assignedDriverName !== "Biriktirilmagan" ? v.assignedDriverName[0] : "—"}
                          </div>
                          <span className="font-medium text-xs">{v.assignedDriverName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        {getStatusBadge(v.status)}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs font-medium">
                        {formatNumber(v.mileage)} km
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{v.fuelType}</span>
                            <span className="font-semibold text-foreground">{v.fuelLevel}%</span>
                          </div>
                          <div className="w-24 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                v.fuelLevel < 25
                                  ? "bg-rose-500"
                                  : v.fuelLevel < 50
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              }`}
                              style={{ width: `${v.fuelLevel}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVehicle(v);
                          }}
                          className="px-2.5 py-1 text-xs rounded border bg-card hover:bg-muted text-primary font-medium transition-colors"
                        >
                          Batafsil
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Vehicle Details Cards Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((v) => (
            <div
              key={v.id}
              className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/50 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded border bg-muted/60 text-foreground">
                    {v.plateNumber}
                  </span>
                  <h3 className="font-bold text-base text-foreground mt-1.5">
                    {v.brand} {v.model}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {v.type === "truck" ? "Og'ir yuk mashinasi" : "Kichik furgon"} • {v.year}-yil
                  </p>
                </div>
                {getStatusBadge(v.status)}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs border-y py-3">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Haydovchi:</span>
                  <span className="font-semibold text-foreground truncate block">
                    {v.assignedDriverName}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Yuk sig‘imi:</span>
                  <span className="font-semibold text-foreground">
                    {(v.capacity / 1000).toFixed(1)} tonna
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Masofa:</span>
                  <span className="font-mono font-semibold text-foreground">
                    {formatNumber(v.mileage)} km
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Yoqilg‘i:</span>
                  <span className="font-semibold text-foreground">{v.fuelType}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground text-[11px]">Yoqilg‘i darajasi:</span>
                  <span className="font-bold text-xs">{v.fuelLevel}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      v.fuelLevel < 25
                        ? "bg-rose-500"
                        : v.fuelLevel < 50
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${v.fuelLevel}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                  {v.currentLocation}
                </span>
                <button
                  onClick={() => setSelectedVehicle(v)}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  Ko‘rish <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vehicle Details Slide-over / Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm px-2.5 py-0.5 rounded border bg-primary/10 text-primary">
                    {selectedVehicle.plateNumber}
                  </span>
                  {getStatusBadge(selectedVehicle.status)}
                </div>
                <h2 className="text-xl font-extrabold text-foreground mt-2">
                  {selectedVehicle.brand} {selectedVehicle.model}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Ishlab chiqarilgan yili: {selectedVehicle.year} | Turi: {selectedVehicle.type}
                </p>
              </div>

              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground block text-[11px]">Biriktirilgan haydovchi</span>
                <span className="font-bold text-sm text-foreground">
                  {selectedVehicle.assignedDriverName}
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground block text-[11px]">Yuk ko‘tarish quvvati</span>
                <span className="font-bold text-sm text-foreground">
                  {(selectedVehicle.capacity / 1000).toFixed(1)} tonna ({formatNumber(selectedVehicle.capacity)} kg)
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground block text-[11px]">Umumiy yurgan masofasi</span>
                <span className="font-mono font-bold text-sm text-foreground">
                  {formatNumber(selectedVehicle.mileage)} km
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground block text-[11px]">Yoqilg‘i turi</span>
                <span className="font-bold text-sm text-foreground">
                  {selectedVehicle.fuelType}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs border rounded-xl p-3.5 bg-muted/10">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Oxirgi texnik ko‘rik:</span>
                <span className="font-medium text-foreground">{selectedVehicle.lastMaintenance}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Navbatdagi texnik xizmat:</span>
                <span className="font-semibold text-primary">{selectedVehicle.nextMaintenance}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Hozirgi joylashuvi:</span>
                <span className="font-medium text-foreground">{selectedVehicle.currentLocation}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-bold text-foreground">Yangi Transport Qo‘shish</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-muted-foreground block mb-1">
                  Davlat Raqami (Masalan: 01 A 777 AA)
                </label>
                <input
                  type="text"
                  required
                  placeholder="01 X 777 XX"
                  value={formData.plateNumber}
                  onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground uppercase font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Brend</label>
                  <input
                    type="text"
                    required
                    placeholder="Mercedes-Benz"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Model</label>
                  <input
                    type="text"
                    required
                    placeholder="Actros 1845"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Yili</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Yuk Sig‘imi (kg)</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Mas'ul Haydovchi</label>
                <input
                  type="text"
                  value={formData.assignedDriverName}
                  onChange={(e) => setFormData({ ...formData, assignedDriverName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border bg-muted text-foreground hover:bg-muted/80 font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
