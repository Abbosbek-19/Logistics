import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Package, Search, Calendar, MapPin } from "lucide-react";
import { type Shipment } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";

export default function Shipments() {
  const [search, setSearch] = useState("");
  const { data: shipments, isLoading } = useQuery<Shipment[]>({
    queryKey: ["/api/shipments"],
  });

  const filtered = shipments?.filter((s) => {
    return (
      s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.senderName.toLowerCase().includes(search.toLowerCase()) ||
      s.receiverName.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Jo‘natmalar Moduli
          </h1>
          <p className="text-sm text-muted-foreground">
            Barcha logistika buyurtmalari va yuk tashish jarayoni nazorati
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Trek-raqam yoki mijoz nomi bo‘yicha qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-medium border-b text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Trek-Raqam</th>
                <th className="px-4 py-3">Yuboruvchi</th>
                <th className="px-4 py-3">Qabul Qiluvchi</th>
                <th className="px-4 py-3">Vazni</th>
                <th className="px-4 py-3">Narxi</th>
                <th className="px-4 py-3">Muhimligi</th>
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
                    Jo‘natmalar topilmadi.
                  </td>
                </tr>
              ) : (
                filtered?.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-primary">
                      {s.trackingNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{s.senderName}</div>
                      <div className="text-xs text-muted-foreground">{s.senderAddress}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{s.receiverName}</div>
                      <div className="text-xs text-muted-foreground">{s.receiverAddress}</div>
                    </td>
                    <td className="px-4 py-3 font-mono">{s.weight} kg</td>
                    <td className="px-4 py-3 font-semibold">{formatCurrency(s.price)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                          s.priority === "urgent"
                            ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                            : s.priority === "high"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {s.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          s.status === "delivered"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                            : s.status === "in_transit"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400"
                        }`}
                      >
                        {s.status === "delivered"
                          ? "Yetkazildi"
                          : s.status === "in_transit"
                          ? "Yo‘lda"
                          : "Kutilmoqda"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
