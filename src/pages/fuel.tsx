import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Fuel, Plus, Droplet } from "lucide-react";
import { type FuelRecord } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";

export default function FuelPage() {
  const { data: records, isLoading } = useQuery<FuelRecord[]>({
    queryKey: ["/api/fuel"],
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Yoqilg‘i Hisobi Moduli
        </h1>
        <p className="text-sm text-muted-foreground">
          Transport vositalariga quyilgan yoqilg‘i sarfi, narxlari va shoxobchalar
        </p>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground font-medium border-b text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Sana</th>
              <th className="px-4 py-3">Transport ID</th>
              <th className="px-4 py-3">Haydovchi ID</th>
              <th className="px-4 py-3">Miqdori (Litr)</th>
              <th className="px-4 py-3">Litr Narxi</th>
              <th className="px-4 py-3">Jami Qiymat</th>
              <th className="px-4 py-3">Yoqilg‘i Shoxobchasi</th>
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
                  <td className="px-4 py-3 font-mono">{r.driverId}</td>
                  <td className="px-4 py-3 font-bold">{r.liters} L</td>
                  <td className="px-4 py-3">{formatCurrency(r.pricePerLiter)}</td>
                  <td className="px-4 py-3 font-bold text-primary">
                    {formatCurrency(r.totalCost)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.station}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
