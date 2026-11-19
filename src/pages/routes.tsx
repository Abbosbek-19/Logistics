import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Navigation, Clock } from "lucide-react";
import { type Route } from "@shared/schema";

export default function Routes() {
  const { data: routes, isLoading } = useQuery<Route[]>({
    queryKey: ["/api/routes"],
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Marshrutlar Moduli (3.8-rasm)
        </h1>
        <p className="text-sm text-muted-foreground">
          Asosiy transport yo‘nalishlari, masofasi va kutilayotgan harakat vaqti
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {isLoading ? (
          <div className="col-span-2 text-center py-10 text-muted-foreground">
            Yuklanmoqda...
          </div>
        ) : (
          routes?.map((r) => {
            const waypoints = r.waypoints ? JSON.parse(r.waypoints) : [];

            return (
              <div
                key={r.id}
                className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center">
                      <Navigation className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-foreground">{r.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {r.origin} → {r.destination}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      r.status === "in_progress"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400"
                        : r.status === "completed"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400"
                    }`}
                  >
                    {r.status === "in_progress"
                      ? "Jarayonda"
                      : r.status === "completed"
                      ? "Tugatilgan"
                      : "Kutilmoqda"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-2 border-y text-xs">
                  <div>
                    <span className="text-muted-foreground block">Masofa:</span>
                    <span className="font-bold text-sm text-foreground">{r.distance} km</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Taxminiy Vaqt:</span>
                    <span className="font-bold text-sm text-foreground">
                      {Math.floor(r.estimatedTime / 60)} soat {r.estimatedTime % 60} daqiqa
                    </span>
                  </div>
                </div>

                {waypoints.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground block mb-2">
                      Yo‘nalish nuqtalari:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {waypoints.map((pt: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-muted text-foreground text-xs rounded font-medium flex items-center gap-1"
                        >
                          <MapPin className="h-3 w-3 text-primary" />
                          {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
