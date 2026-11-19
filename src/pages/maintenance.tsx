import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Wrench, ShieldCheck, AlertCircle } from "lucide-react";
import { type MaintenanceRecord } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";

export default function MaintenancePage() {
  const { data: records, isLoading } = useQuery<MaintenanceRecord[]>({
    queryKey: ["/api/maintenance"],
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Texnik Xizmat va Ta'mir Moduli
        </h1>
        <p className="text-sm text-muted-foreground">
          Transport vositalarini davriy texnik ko‘rikdan o‘tkazish va ta'mirlash jurnali
        </p>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium border-b text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Sana</th>
              <th className="px-4 py-3">Transport ID</th>
              <th className="px-4 py-3">Ta'mir Turi</th>
              <th className="px-4 py-3">Tavsif</th>
              <th className="px-4 py-3">Bosib O‘tgan</th>
              <th className="px-4 py-3">Xarajat</th>
              <th className="px-4 py-3">Texnik Xodim</th>
            </tr>
          </thead>
          <tbody className="divide-y text-foreground">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-muted-foreground">
                  Yuklanmoqda...
                </td>
              </tr>
            ) : (
              records?.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{r.date}</td>
                  <td className="px-4 py-3 font-mono">{r.vehicleId}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{r.type}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs">{r.description}</td>
                  <td className="px-4 py-3 font-mono text-xs">{r.mileage.toLocaleString()} km</td>
                  <td className="px-4 py-3 font-bold">{formatCurrency(r.cost)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.technician}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
