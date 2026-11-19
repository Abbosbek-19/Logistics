import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, Phone, Mail, Award, CheckCircle2, Clock } from "lucide-react";
import { type Driver } from "@shared/schema";

export default function Drivers() {
  const { data: drivers, isLoading } = useQuery<Driver[]>({
    queryKey: ["/api/drivers"],
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Haydovchilar Moduli
        </h1>
        <p className="text-sm text-muted-foreground">
          Tizimga ro‘yxatdan o‘tgan haydovchilar, ularning reytingi va mas'uliyat holati
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading ? (
          <div className="col-span-3 text-center py-10 text-muted-foreground">
            Yuklanmoqda...
          </div>
        ) : (
          drivers?.map((d) => (
            <div
              key={d.id}
              className="p-5 rounded-xl border bg-card text-card-foreground shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-base">
                    {d.firstName[0]}
                    {d.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">
                      {d.firstName} {d.lastName}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Guvohnoma: <span className="font-mono font-medium">{d.licenseNumber}</span>
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    d.status === "on_duty"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400"
                      : d.status === "available"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                      : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {d.status === "on_duty"
                    ? "Navbatda"
                    : d.status === "available"
                    ? "Mavjud"
                    : "Dam olishda"}
                </span>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground border-y py-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <span className="font-medium text-foreground">{d.phone}</span>
                </div>
                {d.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>{d.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-amber-500" />
                  <span>
                    Reyting: <strong className="text-foreground">{d.rating} / 5.0</strong>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-muted/40 p-2 rounded-lg">
                  <span className="text-muted-foreground block text-[11px]">Jami Qatnovlar</span>
                  <span className="font-bold text-sm text-foreground">{d.totalTrips} marta</span>
                </div>
                <div className="bg-muted/40 p-2 rounded-lg">
                  <span className="text-muted-foreground block text-[11px]">Bosib O‘tgan</span>
                  <span className="font-bold text-sm text-foreground">
                    {d.totalDistance.toLocaleString()} km
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
