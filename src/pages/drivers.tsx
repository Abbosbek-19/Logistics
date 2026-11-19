import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Award,
  Star,
  Truck,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  List,
  LayoutGrid,
  X,
  UserCheck,
} from "lucide-react";
import { mockDrivers, type DriverDemo } from "@/lib/mockData";
import { formatNumber } from "@/lib/utils";

export default function Drivers() {
  const [driversList, setDriversList] = useState<DriverDemo[]>(mockDrivers);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedDriver, setSelectedDriver] = useState<DriverDemo | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form for adding a new driver
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "+998 90 ",
    email: "",
    licenseNumber: "",
    assignedVehiclePlate: "01 A 777 AA",
    experience: "5 yil",
    rating: 5.0,
    status: "active" as "active" | "on_leave",
  });

  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.licenseNumber) return;

    const newDriver: DriverDemo = {
      id: `drv-${Date.now()}`,
      drvId: `DRV-00${driversList.length + 1}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email || `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}@translog.uz`,
      licenseNumber: formData.licenseNumber.toUpperCase(),
      licenseExpiry: "2032-12-31",
      status: formData.status,
      assignedVehiclePlate: formData.assignedVehiclePlate,
      assignedVehicleModel: "Yuk mashinasi",
      rating: Number(formData.rating),
      totalTrips: 1,
      totalDistance: 450,
      joinDate: "2026-11-19",
      experience: formData.experience,
    };

    setDriversList([newDriver, ...driversList]);
    setShowAddModal(false);
  };

  const filtered = driversList.filter((d) => {
    const query = search.toLowerCase();
    const fullName = `${d.firstName} ${d.lastName}`.toLowerCase();
    const matchSearch =
      fullName.includes(query) ||
      d.drvId.toLowerCase().includes(query) ||
      d.phone.toLowerCase().includes(query) ||
      d.licenseNumber.toLowerCase().includes(query) ||
      (d.assignedVehiclePlate && d.assignedVehiclePlate.toLowerCase().includes(query));

    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && (d.status === "active" || d.status === "on_duty" || d.status === "available")) ||
      (filterStatus === "on_leave" && (d.status === "on_leave" || d.status === "off_duty"));

    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: DriverDemo["status"]) => {
    if (status === "active" || status === "on_duty" || status === "available") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Faol (Active)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        Dam olishda (On Leave)
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Users className="h-6 w-6 text-primary" />
            Haydovchilar Moduli
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Tizimga ro‘yxatdan o‘tgan professional haydovchilar, guvohnomalar, reyting va biriktirilgan texnikalar
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 shadow-sm transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi Haydovchi Qo‘shish
        </button>
      </div>

      {/* Driver Summary Mini Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Jami Haydovchilar
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-1 block">
            22 nafar
          </span>
          <span className="text-xs text-muted-foreground mt-1 block">Shtat bo‘yicha to‘liq</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Faol / Navbatchilikda
          </span>
          <span className="text-2xl font-extrabold text-emerald-500 mt-1 block">
            18 nafar
          </span>
          <span className="text-xs text-emerald-500/80 mt-1 block">Harakatdagi reyslarda</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Dam Olishda / Ta'tilda
          </span>
          <span className="text-2xl font-extrabold text-amber-500 mt-1 block">
            4 nafar
          </span>
          <span className="text-xs text-amber-500/80 mt-1 block">Rejali dam olish</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            O‘rtacha Reyting
          </span>
          <span className="text-2xl font-extrabold text-primary mt-1 block flex items-center gap-1.5">
            4.8 <Star className="h-5 w-5 fill-amber-400 text-amber-400 inline" />
          </span>
          <span className="text-xs text-muted-foreground mt-1 block">5.0 shkala bo‘yicha</span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Haydovchi ismi, ID (DRV-001), telefon yoki transport raqami..."
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
              <option value="active">Faol / Navbatchilikda (Active)</option>
              <option value="on_leave">Dam olishda (On Leave)</option>
            </select>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 border rounded-lg p-1 bg-muted/40 shrink-0">
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
        </div>
      </div>

      {/* DRIVERS CARDS VIEW */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-muted-foreground border rounded-xl bg-card">
              Qidiruv bo‘yicha haydovchilar topilmadi.
            </div>
          ) : (
            filtered.map((d) => (
              <div
                key={d.id}
                className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/50 transition-all space-y-4"
              >
                {/* Driver Top Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 text-primary font-bold flex items-center justify-center text-lg border border-primary/30 shadow-inner">
                      {d.firstName[0]}
                      {d.lastName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-foreground">
                          {d.firstName} {d.lastName}
                        </h3>
                      </div>
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-muted text-primary">
                        ID: {d.drvId}
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(d.status)}
                </div>

                {/* Key Driver Credentials */}
                <div className="space-y-2 text-xs border-y py-3 text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      Telefon:
                    </span>
                    <span className="font-semibold text-foreground">{d.phone}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      Guvohnoma:
                    </span>
                    <span className="font-mono font-semibold text-foreground">{d.licenseNumber}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Truck className="h-3.5 w-3.5 text-primary" />
                      Biriktirilgan texnika:
                    </span>
                    <span className="font-semibold text-foreground">
                      {d.assignedVehiclePlate ? `${d.assignedVehiclePlate} (${d.assignedVehicleModel})` : "Biriktirilmagan"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      Ish tajribasi:
                    </span>
                    <span className="font-semibold text-foreground">{d.experience}</span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-muted/30 p-2 rounded-lg">
                    <span className="text-muted-foreground block text-[10px] uppercase font-medium">Reyting</span>
                    <span className="font-bold text-sm text-foreground flex items-center justify-center gap-1 mt-0.5">
                      {d.rating} <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    </span>
                  </div>

                  <div className="bg-muted/30 p-2 rounded-lg">
                    <span className="text-muted-foreground block text-[10px] uppercase font-medium">Yetkazilgan</span>
                    <span className="font-bold text-sm text-foreground mt-0.5 block">
                      {d.totalTrips} ta
                    </span>
                  </div>

                  <div className="bg-muted/30 p-2 rounded-lg">
                    <span className="text-muted-foreground block text-[10px] uppercase font-medium">Masofa</span>
                    <span className="font-bold text-sm text-foreground mt-0.5 block truncate">
                      {(d.totalDistance / 1000).toFixed(0)}k km
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-muted-foreground">
                    Ishga qabul: {d.joinDate}
                  </span>
                  <button
                    onClick={() => setSelectedDriver(d)}
                    className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    Profilni ko‘rish <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* DRIVERS TABLE VIEW */
        <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-semibold border-b text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">ID & Haydovchi</th>
                  <th className="px-4 py-3.5">Telefon</th>
                  <th className="px-4 py-3.5">Guvohnoma</th>
                  <th className="px-4 py-3.5">Biriktirilgan Transport</th>
                  <th className="px-4 py-3.5">Tajriba</th>
                  <th className="px-4 py-3.5">Reyting</th>
                  <th className="px-4 py-3.5">Qatnovlar</th>
                  <th className="px-4 py-3.5">Holati</th>
                  <th className="px-4 py-3.5 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y text-foreground">
                {filtered.map((d) => (
                  <tr
                    key={d.id}
                    className="hover:bg-muted/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedDriver(d)}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                          {d.firstName[0]}
                          {d.lastName[0]}
                        </div>
                        <div>
                          <div className="font-bold text-foreground">
                            {d.firstName} {d.lastName}
                          </div>
                          <span className="font-mono text-xs text-primary font-semibold">
                            {d.drvId}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-medium text-xs">
                      {d.phone}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs font-medium">
                      {d.licenseNumber}
                    </td>
                    <td className="px-4 py-3.5 text-xs">
                      <div className="font-bold text-foreground">
                        {d.assignedVehiclePlate || "Biriktirilmagan"}
                      </div>
                      <div className="text-muted-foreground text-[11px]">
                        {d.assignedVehicleModel}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs font-medium">
                      {d.experience}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 font-bold text-xs">
                        <span>{d.rating}</span>
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs font-semibold">
                      {d.totalTrips} ta
                    </td>
                    <td className="px-4 py-3.5">
                      {getStatusBadge(d.status)}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDriver(d);
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
      )}

      {/* Driver Detail Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 text-primary-foreground font-bold flex items-center justify-center text-xl shadow">
                  {selectedDriver.firstName[0]}
                  {selectedDriver.lastName[0]}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">
                    {selectedDriver.firstName} {selectedDriver.lastName}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted text-primary font-bold">
                      {selectedDriver.drvId}
                    </span>
                    {getStatusBadge(selectedDriver.status)}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedDriver(null)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground block text-[11px]">Aloqa telefoni</span>
                <span className="font-bold text-sm text-foreground">{selectedDriver.phone}</span>
              </div>
              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground block text-[11px]">Korporativ email</span>
                <span className="font-bold text-sm text-foreground truncate block">{selectedDriver.email}</span>
              </div>
              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground block text-[11px]">Haydovchilik guvohnomasi</span>
                <span className="font-mono font-bold text-sm text-foreground">
                  {selectedDriver.licenseNumber} (amal qilish muddati: {selectedDriver.licenseExpiry})
                </span>
              </div>
              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground block text-[11px]">Biriktirilgan transport</span>
                <span className="font-bold text-sm text-foreground">
                  {selectedDriver.assignedVehiclePlate} ({selectedDriver.assignedVehicleModel})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs border rounded-xl p-3 bg-muted/10">
              <div>
                <span className="text-muted-foreground block text-[11px]">Mijozlar bahosi</span>
                <span className="font-extrabold text-base text-foreground flex items-center justify-center gap-1 mt-0.5">
                  {selectedDriver.rating} <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Muvaffaqiyatli qatnov</span>
                <span className="font-extrabold text-base text-foreground mt-0.5 block">
                  {selectedDriver.totalTrips} ta
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Umumiy masofa</span>
                <span className="font-mono font-extrabold text-base text-foreground mt-0.5 block">
                  {formatNumber(selectedDriver.totalDistance)} km
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedDriver(null)}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-bold text-foreground">Yangi Haydovchi Qo‘shish</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddDriver} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Ism</label>
                  <input
                    type="text"
                    required
                    placeholder="Aziz"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Familiya</label>
                  <input
                    type="text"
                    required
                    placeholder="Karimov"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Telefon Raqami</label>
                <input
                  type="text"
                  required
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">
                  Haydovchilik Guvohnomasi Raqami (Masalan: AA 1234567)
                </label>
                <input
                  type="text"
                  required
                  placeholder="AA 1234567"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Tajribasi</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Boshlang‘ich Reyting</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Biriktirilgan Transport</label>
                <input
                  type="text"
                  value={formData.assignedVehiclePlate}
                  onChange={(e) => setFormData({ ...formData, assignedVehiclePlate: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground font-mono"
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
