import React, { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Plus,
  MapPin,
  Calendar,
  Clock,
  Truck,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  List,
  X,
  ChevronRight,
  DollarSign,
  Weight,
} from "lucide-react";
import { mockShipments, type ShipmentDemo } from "@/lib/mockData";
import { formatUZS, formatNumber } from "@/lib/utils";

export default function Shipments() {
  const [shipmentsList, setShipmentsList] = useState<ShipmentDemo[]>(mockShipments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedShipment, setSelectedShipment] = useState<ShipmentDemo | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    senderName: "",
    senderAddress: "Toshkent sh.",
    receiverName: "",
    receiverAddress: "Samarqand sh.",
    origin: "Tashkent",
    destination: "Samarkand",
    cargoType: "Sanoat mollari",
    weight: 15000,
    price: 12000000,
    assignedDriverName: "Aziz Karimov",
    assignedVehiclePlate: "01 A 777 AA",
    status: "in_transit" as ShipmentDemo["status"],
  });

  const handleAddShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.receiverName) return;

    const newShp: ShipmentDemo = {
      id: `shp-${Date.now()}`,
      trackingNumber: `SHP-2026-00${shipmentsList.length + 1}`,
      senderName: formData.senderName,
      senderAddress: formData.senderAddress,
      senderPhone: "+998 71 200 00 00",
      receiverName: formData.receiverName,
      receiverAddress: formData.receiverAddress,
      receiverPhone: "+998 90 000 00 00",
      origin: formData.origin,
      destination: formData.destination,
      cargoType: formData.cargoType,
      weight: Number(formData.weight),
      description: "Buyurtmachi talabiga binoan xavfsiz qadoqlangan yuk",
      status: formData.status,
      priority: "medium",
      assignedDriverId: "drv-001",
      assignedDriverName: formData.assignedDriverName,
      assignedVehiclePlate: formData.assignedVehiclePlate,
      assignedVehicleModel: "Og'ir yuk mashinasi",
      pickupDate: "2026-11-19",
      estimatedDelivery: "2026-11-20 18:00",
      price: Number(formData.price),
    };

    setShipmentsList([newShp, ...shipmentsList]);
    setShowAddModal(false);
  };

  const filtered = shipmentsList.filter((s) => {
    const query = search.toLowerCase();
    const matchSearch =
      s.trackingNumber.toLowerCase().includes(query) ||
      s.senderName.toLowerCase().includes(query) ||
      s.receiverName.toLowerCase().includes(query) ||
      s.origin.toLowerCase().includes(query) ||
      s.destination.toLowerCase().includes(query) ||
      s.cargoType.toLowerCase().includes(query) ||
      s.assignedDriverName.toLowerCase().includes(query) ||
      s.assignedVehiclePlate.toLowerCase().includes(query);

    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: ShipmentDemo["status"]) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Yetkazilgan (Delivered)
          </span>
        );
      case "in_transit":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Yo‘lda (In transit)
          </span>
        );
      case "pending":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Kutilmoqda (Pending)
          </span>
        );
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Package className="h-6 w-6 text-primary" />
            Jo‘natmalar Moduli
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Barcha logistika buyurtmalari, yo‘nalishlar, yuk holati va yetkazish vaqtlari monitoringi
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 shadow-sm transition-all"
        >
          <Plus className="h-4 w-4" />
          Yangi Jo‘natma Yaratish
        </button>
      </div>

      {/* Summary KPI Mini Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Jami Jo‘natmalar
          </span>
          <span className="text-2xl font-extrabold text-foreground mt-1 block">
            48 ta
          </span>
          <span className="text-xs text-muted-foreground mt-1 block">Joriy oylik hajm</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Ayni Vaqtda Yo‘lda
          </span>
          <span className="text-2xl font-extrabold text-blue-500 mt-1 block">
            12 ta
          </span>
          <span className="text-xs text-blue-500/80 mt-1 block">Trassada yetkazilmoqda</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Yetkazib Berilgan
          </span>
          <span className="text-2xl font-extrabold text-emerald-500 mt-1 block">
            30 ta
          </span>
          <span className="text-xs text-emerald-500/80 mt-1 block">Muvaffaqiyatli yakunlangan</span>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
            Yuklash Kutilmoqda
          </span>
          <span className="text-2xl font-extrabold text-amber-500 mt-1 block">
            6 ta
          </span>
          <span className="text-xs text-amber-500/80 mt-1 block">Omborlarda tayyor</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Trek-raqam (SHP-2026-001), yuboruvchi, qabul qiluvchi, yuk turi..."
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
              <option value="all">Barcha jo‘natmalar (All)</option>
              <option value="in_transit">Yo‘lda (In transit)</option>
              <option value="delivered">Yetkazilgan (Delivered)</option>
              <option value="pending">Kutilmoqda (Pending)</option>
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

      {/* TABLE VIEW */}
      {viewMode === "table" ? (
        <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-semibold border-b text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5">Trek-Raqam</th>
                  <th className="px-4 py-3.5">Yo‘nalish (Origin → Dest)</th>
                  <th className="px-4 py-3.5">Yuboruvchi & Qabul Qiluvchi</th>
                  <th className="px-4 py-3.5">Yuk Turi & Vazni</th>
                  <th className="px-4 py-3.5">Haydovchi / Mashina</th>
                  <th className="px-4 py-3.5">Jo‘natilgan Sana</th>
                  <th className="px-4 py-3.5">Narxi</th>
                  <th className="px-4 py-3.5">Holati</th>
                  <th className="px-4 py-3.5 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y text-foreground">
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-muted/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedShipment(s)}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded border bg-primary/10 text-primary">
                        {s.trackingNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-medium">
                      <div className="flex items-center gap-1.5 text-foreground font-semibold">
                        <span>{s.origin}</span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span>{s.destination}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs">
                      <div className="font-semibold text-foreground">{s.senderName}</div>
                      <div className="text-muted-foreground">→ {s.receiverName}</div>
                    </td>
                    <td className="px-4 py-3.5 text-xs">
                      <div className="font-medium text-foreground">{s.cargoType}</div>
                      <div className="text-muted-foreground font-mono">
                        {formatNumber(s.weight)} kg ({(s.weight / 1000).toFixed(1)} t)
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs">
                      <div className="font-semibold text-foreground">{s.assignedDriverName}</div>
                      <div className="font-mono text-muted-foreground text-[11px]">
                        {s.assignedVehiclePlate}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">
                      {s.pickupDate}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-xs text-foreground">
                      {formatUZS(s.price)}
                    </td>
                    <td className="px-4 py-3.5">
                      {getStatusBadge(s.status)}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedShipment(s);
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
      ) : (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-primary/50 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded border bg-primary/10 text-primary">
                    {s.trackingNumber}
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-base text-foreground mt-2">
                    <span>{s.origin}</span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{s.destination}</span>
                  </div>
                </div>
                {getStatusBadge(s.status)}
              </div>

              <div className="space-y-2 text-xs border-y py-3 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Yuboruvchi:</span>
                  <span className="font-semibold text-foreground text-right">{s.senderName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Qabul qiluvchi:</span>
                  <span className="font-semibold text-foreground text-right">{s.receiverName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Yuk turi:</span>
                  <span className="font-semibold text-foreground">{s.cargoType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vazni:</span>
                  <span className="font-mono font-semibold text-foreground">
                    {formatNumber(s.weight)} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Haydovchi & Texnika:</span>
                  <span className="font-semibold text-foreground text-right">
                    {s.assignedDriverName} ({s.assignedVehiclePlate})
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground block font-medium">Qiymati</span>
                  <span className="font-bold text-sm text-emerald-500">{formatUZS(s.price)}</span>
                </div>
                <button
                  onClick={() => setSelectedShipment(s)}
                  className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  Ko‘rish <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Shipment Detail Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm px-2.5 py-0.5 rounded border bg-primary/10 text-primary">
                    {selectedShipment.trackingNumber}
                  </span>
                  {getStatusBadge(selectedShipment.status)}
                </div>
                <div className="flex items-center gap-2 text-lg font-extrabold text-foreground mt-2">
                  <span>{selectedShipment.origin}</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <span>{selectedShipment.destination}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedShipment(null)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg border bg-muted/20 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Yuboruvchi:</span>
                  <span className="font-bold text-foreground text-right">
                    {selectedShipment.senderName} ({selectedShipment.senderAddress})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-medium">Qabul qiluvchi:</span>
                  <span className="font-bold text-foreground text-right">
                    {selectedShipment.receiverName} ({selectedShipment.receiverAddress})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Yuk tavsifi</span>
                  <span className="font-bold text-foreground block">{selectedShipment.cargoType}</span>
                  <span className="text-muted-foreground text-[11px]">{selectedShipment.description}</span>
                </div>
                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Vazni & Narxi</span>
                  <span className="font-mono font-bold text-foreground block">
                    {formatNumber(selectedShipment.weight)} kg ({(selectedShipment.weight / 1000).toFixed(1)} t)
                  </span>
                  <span className="font-bold text-emerald-500 block">{formatUZS(selectedShipment.price)}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                <span className="text-muted-foreground text-[11px] block">Ijrochi Haydovchi va Transport</span>
                <div className="flex items-center justify-between font-bold text-foreground">
                  <span>{selectedShipment.assignedDriverName}</span>
                  <span className="font-mono text-primary">{selectedShipment.assignedVehiclePlate}</span>
                </div>
                <span className="text-muted-foreground text-[11px] block">
                  Model: {selectedShipment.assignedVehicleModel}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-muted-foreground">
                <span>Jo‘natilgan: <strong className="text-foreground">{selectedShipment.pickupDate}</strong></span>
                <span>Kutilmoqda: <strong className="text-foreground">{selectedShipment.estimatedDelivery}</strong></span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedShipment(null)}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Shipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-bold text-foreground">Yangi Jo‘natma Yaratish</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddShipment} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Yuboruvchi shahar</label>
                  <input
                    type="text"
                    required
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Yetkazish shahri</label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Yuboruvchi Tashkilot / Shaxs</label>
                <input
                  type="text"
                  required
                  placeholder="O‘zbekneftgaz AJ"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Qabul Qiluvchi</label>
                <input
                  type="text"
                  required
                  placeholder="Samarqand Kimyo MChJ"
                  value={formData.receiverName}
                  onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Yuk Turi</label>
                  <input
                    type="text"
                    required
                    value={formData.cargoType}
                    onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Vazni (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Narxi (UZS)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
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
                    <option value="in_transit">Yo‘lda</option>
                    <option value="pending">Kutilmoqda</option>
                    <option value="delivered">Yetkazilgan</option>
                  </select>
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
