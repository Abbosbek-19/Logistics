import React, { useState } from "react";
import {
  Wrench,
  ShieldCheck,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  DollarSign,
  Truck,
  User,
  CheckCircle2,
  X,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import { mockMaintenanceRecords, type MaintenanceRecordDemo } from "@/lib/mockData";
import { formatUZS, formatNumber } from "@/lib/utils";

export default function MaintenancePage() {
  const [recordsList, setRecordsList] = useState<MaintenanceRecordDemo[]>(mockMaintenanceRecords);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecordDemo | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding maintenance record
  const [formData, setFormData] = useState({
    vehiclePlate: "01 A 777 AA",
    vehicleModel: "Mercedes Actros",
    type: "Moy almashtirish",
    description: "Rejali dvigatel texnik ko‘rigi",
    serviceCost: 1800000,
    serviceDate: "2026-11-19",
    nextServiceDate: "2027-02-19",
    mileage: 150000,
    technician: "Jamshid Rustamov",
    status: "in_progress" as MaintenanceRecordDemo["status"],
  });

  const handleAddMaintenance = (e: React.FormEvent) => {
    e.preventDefault();

    const newRec: MaintenanceRecordDemo = {
      id: `mnt-${Date.now()}`,
      vehiclePlate: formData.vehiclePlate,
      vehicleModel: formData.vehicleModel,
      type: formData.type,
      description: formData.description,
      serviceDate: formData.serviceDate,
      nextServiceDate: formData.nextServiceDate,
      serviceCost: Number(formData.serviceCost),
      mileage: Number(formData.mileage),
      nextMileage: Number(formData.mileage) + 15000,
      technician: formData.technician,
      status: formData.status,
    };

    setRecordsList([newRec, ...recordsList]);
    setShowAddModal(false);
  };

  const filtered = recordsList.filter((r) => {
    const query = search.toLowerCase();
    const matchSearch =
      r.vehiclePlate.toLowerCase().includes(query) ||
      r.vehicleModel.toLowerCase().includes(query) ||
      r.type.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.technician.toLowerCase().includes(query);

    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const upcomingRecords = recordsList.filter((r) => r.status === "scheduled" || r.status === "in_progress");
  const historyRecords = recordsList.filter((r) => r.status === "completed");

  const getStatusBadge = (status: MaintenanceRecordDemo["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Bajarilgan (Completed)
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Jarayonda (In progress)
          </span>
        );
      case "scheduled":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Rejalashtirilgan (Scheduled)
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
            <Wrench className="h-6 w-6 text-primary" />
            Texnik Xizmat va Ta'mir Moduli
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Transport vositalarini davriy texnik ko‘rikdan o‘tkazish, ta'mirlash jurnali va servis rejalari
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 shadow-sm transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi Ta'mir Qaydini Yaratish
        </button>
      </div>

      {/* Summary KPI Mini Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Jami Servis Xarajati
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-1 block truncate">
            15,950,000 UZS
          </span>
          <span className="text-xs text-muted-foreground mt-1 block">Joriy oy sarfi</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Bajarilgan Ishlar
          </span>
          <span className="text-2xl font-extrabold text-emerald-500 mt-1 block">
            12 ta
          </span>
          <span className="text-xs text-emerald-500/80 mt-1 block">Moy, tormoz, shina</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Ayni Vaqtda Jarayonda
          </span>
          <span className="text-2xl font-extrabold text-blue-500 mt-1 block">
            3 ta
          </span>
          <span className="text-xs text-blue-500/80 mt-1 block">Bosh servis markazida</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Navbatdagi Ko‘riklar
          </span>
          <span className="text-2xl font-extrabold text-amber-500 mt-1 block">
            5 ta
          </span>
          <span className="text-xs text-amber-500/80 mt-1 block">Kutilayotgan ta'mirlar</span>
        </div>
      </div>

      {/* Upcoming / In-Progress Maintenance Spotlight Section */}
      <div className="p-5 rounded-xl border bg-muted/20 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Kutilayotgan va Jarayondagi Texnik Xizmatlar (Upcoming & Active)
          </h2>
          <span className="text-xs text-muted-foreground">Nazorat ostidagi texnikalar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingRecords.map((r) => (
            <div
              key={r.id}
              className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm space-y-2.5 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded border bg-muted text-primary">
                    {r.vehiclePlate}
                  </span>
                  <h4 className="font-bold text-sm text-foreground mt-1">{r.type}</h4>
                </div>
                {getStatusBadge(r.status)}
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {r.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t">
                <div>
                  <span className="text-muted-foreground text-[11px] block">Xizmat sanasi:</span>
                  <span className="font-semibold text-foreground">{r.serviceDate}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[11px] block">Xarajat:</span>
                  <span className="font-bold text-foreground">{formatUZS(r.serviceCost)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                <span>Texnik: <strong className="text-foreground">{r.technician}</strong></span>
                <button
                  onClick={() => setSelectedRecord(r)}
                  className="text-primary font-semibold hover:underline"
                >
                  Ko‘rish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Transport raqami, ta'mir turi, tavsif yoki texnik ismi..."
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
            <option value="all">Barcha ta'mirlar (All)</option>
            <option value="completed">Bajarilgan (Completed)</option>
            <option value="in_progress">Jarayonda (In progress)</option>
            <option value="scheduled">Rejalashtirilgan (Scheduled)</option>
          </select>
        </div>
      </div>

      {/* Full Maintenance History Table */}
      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-primary" />
            Ta'mir va Texnik Ko‘rik Tarixi (Jurnal)
          </h3>
          <span className="text-xs text-muted-foreground">Jami qaydlar: {filtered.length} ta</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-semibold border-b text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Sana</th>
                <th className="px-4 py-3.5">Transport & Model</th>
                <th className="px-4 py-3.5">Ta'mir Turi</th>
                <th className="px-4 py-3.5">Bajarilgan Ish Tavsifi</th>
                <th className="px-4 py-3.5">Spidometr</th>
                <th className="px-4 py-3.5">Xizmat Qiymati</th>
                <th className="px-4 py-3.5">Navbatdagi Ko‘rik</th>
                <th className="px-4 py-3.5">Holati</th>
                <th className="px-4 py-3.5 text-right">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y text-foreground">
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-muted/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedRecord(r)}
                >
                  <td className="px-4 py-3.5 text-xs font-semibold text-muted-foreground">
                    {r.serviceDate}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-mono font-bold text-xs text-primary">
                      {r.vehiclePlate}
                    </div>
                    <div className="text-xs text-muted-foreground">{r.vehicleModel}</div>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-xs text-foreground">
                    {r.type}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-muted-foreground max-w-xs truncate">
                    {r.description}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs font-medium">
                    {formatNumber(r.mileage)} km
                  </td>
                  <td className="px-4 py-3.5 font-bold text-xs text-foreground">
                    {formatUZS(r.serviceCost)}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-muted-foreground font-medium">
                    {r.nextServiceDate}
                  </td>
                  <td className="px-4 py-3.5">
                    {getStatusBadge(r.status)}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRecord(r);
                      }}
                      className="px-2.5 py-1 text-xs rounded border bg-card hover:bg-muted text-primary font-medium transition-colors"
                    >
                      Batafsil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded border bg-muted text-primary">
                    {selectedRecord.vehiclePlate}
                  </span>
                  {getStatusBadge(selectedRecord.status)}
                </div>
                <h2 className="text-lg font-extrabold text-foreground mt-1">
                  {selectedRecord.type}
                </h2>
                <span className="text-xs text-muted-foreground">{selectedRecord.vehicleModel}</span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border bg-muted/20 space-y-2">
                <span className="font-semibold text-muted-foreground block text-[11px]">Bajarilgan Ish Tavsifi:</span>
                <p className="font-medium text-foreground text-xs leading-relaxed">
                  {selectedRecord.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Servis Xarajati</span>
                  <span className="font-bold text-sm text-foreground block">
                    {formatUZS(selectedRecord.serviceCost)}
                  </span>
                  <span className="text-muted-foreground text-[10px]">Ehtiyot qismlar hisobi bilan</span>
                </div>

                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Mas'ul Texnik Xodim</span>
                  <span className="font-bold text-sm text-foreground block">
                    {selectedRecord.technician}
                  </span>
                  <span className="text-muted-foreground text-[10px]">Katta mexanik</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border bg-primary/5 space-y-1.5 text-muted-foreground">
                <div className="flex justify-between">
                  <span>O‘tkazilgan sana:</span>
                  <strong className="text-foreground">{selectedRecord.serviceDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Navbatdagi tavsiya sanasi:</span>
                  <strong className="text-primary">{selectedRecord.nextServiceDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Spidometr:</span>
                  <strong className="font-mono text-foreground">{formatNumber(selectedRecord.mileage)} km</strong>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Maintenance Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-bold text-foreground">Yangi Ta'mir Qaydini Yaratish</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddMaintenance} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Davlat Raqami</label>
                  <input
                    type="text"
                    required
                    value={formData.vehiclePlate}
                    onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Model</label>
                  <input
                    type="text"
                    required
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Ta'mir Turi</label>
                <input
                  type="text"
                  required
                  placeholder="Moy almashtirish / Tormoz ta'miri"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Tavsif</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Xarajat (UZS)</label>
                  <input
                    type="number"
                    value={formData.serviceCost}
                    onChange={(e) => setFormData({ ...formData, serviceCost: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Holati</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  >
                    <option value="in_progress">Jarayonda</option>
                    <option value="completed">Bajarilgan</option>
                    <option value="scheduled">Rejalashtirilgan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Xizmat Sanasi</label>
                  <input
                    type="date"
                    value={formData.serviceDate}
                    onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Mas'ul Texnik</label>
                  <input
                    type="text"
                    value={formData.technician}
                    onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
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
