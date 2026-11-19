import React, { useState } from "react";
import {
  Fuel,
  Droplet,
  Plus,
  Search,
  Filter,
  Calendar,
  Truck,
  User,
  DollarSign,
  TrendingDown,
  Gauge,
  MapPin,
  X,
  ChevronRight,
  Receipt,
} from "lucide-react";
import { mockFuelRecords, type FuelRecordDemo } from "@/lib/mockData";
import { formatUZS, formatNumber } from "@/lib/utils";

export default function FuelPage() {
  const [fuelList, setFuelList] = useState<FuelRecordDemo[]>(mockFuelRecords);
  const [search, setSearch] = useState("");
  const [stationFilter, setStationFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<FuelRecordDemo | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding record
  const [formData, setFormData] = useState({
    vehiclePlate: "01 A 777 AA",
    vehicleModel: "Mercedes Actros",
    driverName: "Aziz Karimov",
    driverId: "DRV-001",
    liters: 200,
    pricePerLiter: 13000,
    station: "UNG Petro (Toshkent)",
    fuelType: "Dizel (Euro-5)",
    mileage: 149000,
  });

  const handleAddFuel = (e: React.FormEvent) => {
    e.preventDefault();
    const totalCost = Number(formData.liters) * Number(formData.pricePerLiter);

    const newRecord: FuelRecordDemo = {
      id: `fl-${Date.now()}`,
      vehiclePlate: formData.vehiclePlate,
      vehicleModel: formData.vehicleModel,
      driverId: formData.driverId,
      driverName: formData.driverName,
      date: "19.11.2026",
      liters: Number(formData.liters),
      pricePerLiter: Number(formData.pricePerLiter),
      totalCost,
      mileage: Number(formData.mileage),
      station: formData.station,
      fuelType: formData.fuelType,
    };

    setFuelList([newRecord, ...fuelList]);
    setShowAddModal(false);
  };

  const filtered = fuelList.filter((r) => {
    const query = search.toLowerCase();
    const matchSearch =
      r.vehiclePlate.toLowerCase().includes(query) ||
      r.vehicleModel.toLowerCase().includes(query) ||
      r.driverName.toLowerCase().includes(query) ||
      r.station.toLowerCase().includes(query);

    const matchStation =
      stationFilter === "all" || r.station.toLowerCase().includes(stationFilter.toLowerCase());

    return matchSearch && matchStation;
  });

  const totalFuelLiters = fuelList.reduce((acc, curr) => acc + curr.liters, 0);
  const totalFuelCost = fuelList.reduce((acc, curr) => acc + curr.totalCost, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Fuel className="h-6 w-6 text-primary" />
            Yoqilg‘i Boshqaruvi Moduli
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Yoqilg‘i quyish tranzaksiyalari, xarajatlar tahlili, o‘rtacha sarf va yoqilg‘i shoxobchalari nazorati
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 shadow-sm transition-all"
        >
          <Plus className="h-4 w-4" />
          Yoqilg‘i Kvitansiyasini Kiritish
        </button>
      </div>

      {/* Fuel Expense Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Oylik Yoqilg‘i Xarajati
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-foreground truncate" title="24,500,000 UZS">
              24,500,000 UZS
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>Umumiy xarajatlarning 48.4% qismi</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Jami Quyilgan Hajm
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Droplet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-foreground">
              {formatNumber(18840)} litr
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>Dizel Euro-5 / Euro-6</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              O‘rtacha Litr Narxi
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Receipt className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-500">13,000 UZS</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>Korporativ shartnoma asosida</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              O‘rtacha Sarf (100 km)
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Gauge className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-foreground">27.6 L</div>
            <div className="flex items-center gap-1 text-xs text-emerald-500 mt-1 font-semibold">
              <TrendingDown className="h-3.5 w-3.5" />
              <span>-1.2L tejash samaradorligi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fuel Consumption Statistics & Station Overview Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border bg-muted/20">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Yoqilg‘i Hamkorlari
          </span>
          <div className="flex items-center justify-between text-xs pt-1">
            <span>UNG Petro:</span>
            <strong className="text-foreground">58% (10,920 L)</strong>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Uzbekneftgaz:</span>
            <strong className="text-foreground">24% (4,520 L)</strong>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Lukoil / Boshqalar:</span>
            <strong className="text-foreground">18% (3,400 L)</strong>
          </div>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l md:pl-4 pt-2 md:pt-0">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Texnika Sarf Taqsimoti
          </span>
          <div className="flex items-center justify-between text-xs pt-1">
            <span>Mercedes Actros:</span>
            <strong className="font-mono text-foreground">28.5 L / 100km</strong>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>MAN TGX:</span>
            <strong className="font-mono text-foreground">29.2 L / 100km</strong>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Isuzu NPR:</span>
            <strong className="font-mono text-foreground">18.4 L / 100km</strong>
          </div>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l md:pl-4 pt-2 md:pt-0">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Avtomatlashtirilgan Nazorat
          </span>
          <p className="text-xs text-muted-foreground pt-1">
            Har bir transport vositasiga o‘rnatilgan raqamli yoqilg‘i sathi datchigi (DUT) real vaqtda CAN-shina orqali telematika serveriga uzatiladi.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Transport raqami, model, haydovchi yoki shoxobcha bo‘yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <select
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            <option value="all">Barcha shoxobchalar (All)</option>
            <option value="UNG">UNG Petro</option>
            <option value="Uzbekneftgaz">Uzbekneftgaz</option>
            <option value="Lukoil">Lukoil</option>
            <option value="Mustaqillik">Mustaqillik Petrol</option>
          </select>
        </div>
      </div>

      {/* Fuel Transaction History Table */}
      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-semibold border-b text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3.5">Sana</th>
                <th className="px-4 py-3.5">Transport & Model</th>
                <th className="px-4 py-3.5">Yoqilg‘i Turi</th>
                <th className="px-4 py-3.5">Mas'ul Haydovchi</th>
                <th className="px-4 py-3.5">Hajmi (Litr)</th>
                <th className="px-4 py-3.5">1 Litr Narxi</th>
                <th className="px-4 py-3.5">Jami Xarajat (UZS)</th>
                <th className="px-4 py-3.5">Shoxobcha (AQS)</th>
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
                    {r.date}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-mono font-bold text-xs text-primary">
                      {r.vehiclePlate}
                    </div>
                    <div className="text-xs text-muted-foreground">{r.vehicleModel}</div>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-medium">
                    {r.fuelType}
                  </td>
                  <td className="px-4 py-3.5 text-xs">
                    <div className="font-semibold text-foreground">{r.driverName}</div>
                    <div className="font-mono text-muted-foreground text-[11px]">{r.driverId}</div>
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-sm text-foreground">
                    {r.liters} L
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs">
                    {formatUZS(r.pricePerLiter)}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-sm text-emerald-500">
                    {formatUZS(r.totalCost)}
                  </td>
                  <td className="px-4 py-3.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-primary shrink-0" />
                      <span className="truncate max-w-xs">{r.station}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRecord(r);
                      }}
                      className="px-2.5 py-1 text-xs rounded border bg-card hover:bg-muted text-primary font-medium transition-colors"
                    >
                      Kvitansiya
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fuel Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-xs font-semibold text-muted-foreground">Yoqilg‘i Cheki / Kvitansiya</span>
                <h2 className="text-lg font-extrabold text-foreground mt-0.5">
                  {selectedRecord.vehicleModel} ({selectedRecord.vehiclePlate})
                </h2>
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
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sana va vaqt:</span>
                  <span className="font-semibold text-foreground">{selectedRecord.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mas'ul haydovchi:</span>
                  <span className="font-semibold text-foreground">{selectedRecord.driverName} ({selectedRecord.driverId})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yoqilg‘i shoxobchasi:</span>
                  <span className="font-semibold text-foreground text-right">{selectedRecord.station}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Yoqilg‘i hajmi</span>
                  <span className="font-mono font-bold text-base text-foreground block">
                    {selectedRecord.liters} Litr
                  </span>
                  <span className="text-muted-foreground text-[11px]">{selectedRecord.fuelType}</span>
                </div>

                <div className="p-3 rounded-lg border bg-muted/20 space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Jami To‘lov</span>
                  <span className="font-bold text-base text-emerald-500 block">
                    {formatUZS(selectedRecord.totalCost)}
                  </span>
                  <span className="text-muted-foreground text-[11px]">
                    1 L = {formatUZS(selectedRecord.pricePerLiter)}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg border bg-primary/5 text-muted-foreground text-xs flex items-center justify-between">
                <span>Spidometr ko‘rsatkichi:</span>
                <span className="font-mono font-bold text-foreground">{formatNumber(selectedRecord.mileage)} km</span>
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

      {/* Add Fuel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-bold text-foreground">Yoqilg‘i Kvitansiyasini Kiritish</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddFuel} className="space-y-3 text-xs">
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
                <label className="font-semibold text-muted-foreground block mb-1">Haydovchi Ismi</label>
                <input
                  type="text"
                  required
                  value={formData.driverName}
                  onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Hajm (Litr)</label>
                  <input
                    type="number"
                    required
                    value={formData.liters}
                    onChange={(e) => setFormData({ ...formData, liters: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="font-semibold text-muted-foreground block mb-1">Litr Narxi (UZS)</label>
                  <input
                    type="number"
                    required
                    value={formData.pricePerLiter}
                    onChange={(e) => setFormData({ ...formData, pricePerLiter: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Yoqilg‘i Shoxobchasi</label>
                <input
                  type="text"
                  required
                  value={formData.station}
                  onChange={(e) => setFormData({ ...formData, station: e.target.value })}
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
