import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Clock,
  Truck,
  User,
  ArrowRight,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Compass,
  Milestone,
  X,
} from "lucide-react";
import { mockRoutes, type RouteDemo } from "@/lib/mockData";
import { formatNumber } from "@/lib/utils";

export default function Routes() {
  const [routesList, setRoutesList] = useState<RouteDemo[]>(mockRoutes);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRoute, setSelectedRoute] = useState<RouteDemo | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    origin: "Tashkent",
    destination: "Samarkand",
    distance: 310,
    estimatedHours: 4,
    estimatedMinutes: 30,
    assignedDriverName: "Aziz Karimov",
    assignedVehiclePlate: "01 A 777 AA",
    status: "in_progress" as RouteDemo["status"],
    waypoints: "Toshkent, Jizzax, Samarqand",
  });

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newRt: RouteDemo = {
      id: `rt-${Date.now()}`,
      name: formData.name,
      origin: formData.origin,
      destination: formData.destination,
      distance: Number(formData.distance),
      estimatedTime: Number(formData.estimatedHours) * 60 + Number(formData.estimatedMinutes),
      waypoints: formData.waypoints.split(",").map((w) => w.trim()),
      assignedVehiclePlate: formData.assignedVehiclePlate,
      assignedVehicleModel: "Og'ir yuk furgoni",
      assignedDriverName: formData.assignedDriverName,
      status: formData.status,
    };

    setRoutesList([newRt, ...routesList]);
    setShowAddModal(false);
  };

  const filtered = routesList.filter((r) => {
    const query = search.toLowerCase();
    const matchSearch =
      r.name.toLowerCase().includes(query) ||
      r.origin.toLowerCase().includes(query) ||
      r.destination.toLowerCase().includes(query) ||
      r.assignedDriverName.toLowerCase().includes(query) ||
      r.assignedVehiclePlate.toLowerCase().includes(query);

    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: RouteDemo["status"]) => {
    switch (status) {
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Harakatda (Jarayonda)
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Tugatilgan (Completed)
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Rejalashtirilgan (Kutilmoqda)
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
            <MapPin className="h-6 w-6 text-primary" />
            Marshrutlar Moduli
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Shaharlararo yuk tashish koridorlari, oraliq nazorat nuqtalari, masofalar va navigatsiya
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 shadow-sm transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi Marshrut Qo‘shish
        </button>
      </div>

      {/* Summary KPI Mini Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Jami Marshrutlar
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-1 block">
            14 ta
          </span>
          <span className="text-xs text-muted-foreground mt-1 block">Asosiy logistika yo‘llari</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Aktiv Qatnovlar
          </span>
          <span className="text-2xl font-extrabold text-blue-500 mt-1 block">
            6 ta
          </span>
          <span className="text-xs text-blue-500/80 mt-1 block">Reyslar harakatda</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            O‘rtacha Masofa
          </span>
          <span className="text-2xl font-extrabold text-emerald-500 mt-1 block">
            420 km
          </span>
          <span className="text-xs text-emerald-500/80 mt-1 block">Bitta yo‘nalish bo‘yicha</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Hududiy Qamrov
          </span>
          <span className="text-2xl font-extrabold text-primary mt-1 block">
            12 viloyat
          </span>
          <span className="text-xs text-muted-foreground mt-1 block">+ Qoraqalpog‘iston Resp.</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Marshrut nomi, shahar yoki haydovchi bo‘yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            <option value="all">Barcha marshrutlar (All)</option>
            <option value="in_progress">Harakatda (Jarayonda)</option>
            <option value="completed">Tugatilgan (Completed)</option>
            <option value="pending">Kutilmoqda (Pending)</option>
          </select>
        </div>
      </div>

      {/* Visual Routes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((r) => {
          const hours = Math.floor(r.estimatedTime / 60);
          const minutes = r.estimatedTime % 60;

          return (
            <div
              key={r.id}
              className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/50 transition-all space-y-4"
            >
              {/* Route Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Navigation className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground leading-snug">
                      {r.name}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <span className="font-semibold text-foreground">{r.origin}</span>
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <span className="font-semibold text-foreground">{r.destination}</span>
                    </p>
                  </div>
                </div>
                {getStatusBadge(r.status)}
              </div>

              {/* Visual Route Progress Representation */}
              <div className="p-3.5 rounded-xl bg-muted/20 border space-y-2.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <strong>{r.origin}</strong>
                  </span>
                  <span className="font-mono text-primary font-bold">
                    {r.distance} km
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-rose-500" />
                    <strong>{r.destination}</strong>
                  </span>
                </div>

                {/* Progress track */}
                <div className="relative flex items-center">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        r.status === "completed"
                          ? "w-full bg-emerald-500"
                          : r.status === "in_progress"
                          ? "w-3/5 bg-blue-500"
                          : "w-1/12 bg-amber-500"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                  <span>Harakat vaqti:</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3 text-primary" />
                    {hours} soat {minutes > 0 ? `${minutes} daqiqa` : ""}
                  </span>
                </div>
              </div>

              {/* Waypoints Tags */}
              {r.waypoints.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground block mb-1.5 uppercase tracking-wider">
                    Yo‘nalish oralig‘i (Nazorat nuqtalari):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {r.waypoints.map((pt, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-xs bg-muted/60 text-foreground font-medium flex items-center gap-1 border border-border/50"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Assigned Vehicle & Driver Info Footer */}
              <div className="flex items-center justify-between pt-2 border-t text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <Truck className="h-3.5 w-3.5 text-primary" />
                    <span className="font-mono font-bold">{r.assignedVehiclePlate}</span>
                    <span className="text-muted-foreground text-[11px]">({r.assignedVehicleModel})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span>Haydovchi: <strong className="text-foreground">{r.assignedDriverName}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRoute(r)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border bg-card hover:bg-muted text-primary transition-colors flex items-center gap-1"
                >
                  Tafsilotlar <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Route Detail Modal */}
      {selectedRoute && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-foreground">{selectedRoute.name}</h2>
                  {getStatusBadge(selectedRoute.status)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Masofa: {selectedRoute.distance} km • Taxminiy vaqt: {Math.floor(selectedRoute.estimatedTime / 60)} soat {selectedRoute.estimatedTime % 60} daq
                </p>
              </div>

              <button
                onClick={() => setSelectedRoute(null)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border bg-muted/20 space-y-2">
                <span className="font-bold text-foreground block text-sm">Yo‘nalish bosqichlari</span>
                <div className="space-y-2 pl-2 border-l-2 border-primary/50">
                  {selectedRoute.waypoints.map((pt, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        {pt}
                      </span>
                      <span className="text-muted-foreground font-mono text-[11px]">
                        Nuqta {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Mas'ul transport</span>
                  <span className="font-mono font-bold text-sm text-foreground block">
                    {selectedRoute.assignedVehiclePlate}
                  </span>
                  <span className="text-muted-foreground text-[11px]">{selectedRoute.assignedVehicleModel}</span>
                </div>

                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Mas'ul haydovchi</span>
                  <span className="font-bold text-sm text-foreground block">
                    {selectedRoute.assignedDriverName}
                  </span>
                  <span className="text-emerald-500 font-semibold text-[11px]">Aloqada (Faol reys)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRoute(null)}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Route Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-bold text-foreground">Yangi Marshrut Qo‘shish</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddRoute} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Marshrut Nomi</label>
                <input
                  type="text"
                  required
                  placeholder="Toshkent — Samarqand Ekspress"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Boshlang‘ich nuqta</label>
                  <input
                    type="text"
                    required
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Yakuniy nuqta</label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Masofa (km)</label>
                  <input
                    type="number"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Soat</label>
                  <input
                    type="number"
                    value={formData.estimatedHours}
                    onChange={(e) => setFormData({ ...formData, estimatedHours: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Daqiqa</label>
                  <input
                    type="number"
                    value={formData.estimatedMinutes}
                    onChange={(e) => setFormData({ ...formData, estimatedMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Oraliq Nuqtalar (vergul bilan)</label>
                <input
                  type="text"
                  placeholder="Toshkent, Guliston, Jizzax, Samarqand"
                  value={formData.waypoints}
                  onChange={(e) => setFormData({ ...formData, waypoints: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Haydovchi</label>
                  <input
                    type="text"
                    value={formData.assignedDriverName}
                    onChange={(e) => setFormData({ ...formData, assignedDriverName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Transport Raqami</label>
                  <input
                    type="text"
                    value={formData.assignedVehiclePlate}
                    onChange={(e) => setFormData({ ...formData, assignedVehiclePlate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground uppercase font-mono"
                  />
                </div>
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
