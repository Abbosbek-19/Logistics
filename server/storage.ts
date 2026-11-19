import {
  type User, type InsertUser,
  type Vehicle, type InsertVehicle,
  type Driver, type InsertDriver,
  type Shipment, type InsertShipment,
  type Route, type InsertRoute,
  type FuelRecord, type InsertFuelRecord,
  type MaintenanceRecord, type InsertMaintenanceRecord,
  type DashboardStats
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Vehicles
  getVehicles(): Promise<Vehicle[]>;
  getVehicle(id: string): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, vehicle: Partial<InsertVehicle>): Promise<Vehicle | undefined>;
  deleteVehicle(id: string): Promise<boolean>;

  // Drivers
  getDrivers(): Promise<Driver[]>;
  getDriver(id: string): Promise<Driver | undefined>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  updateDriver(id: string, driver: Partial<InsertDriver>): Promise<Driver | undefined>;
  deleteDriver(id: string): Promise<boolean>;

  // Shipments
  getShipments(): Promise<Shipment[]>;
  getShipment(id: string): Promise<Shipment | undefined>;
  createShipment(shipment: InsertShipment): Promise<Shipment>;
  updateShipment(id: string, shipment: Partial<InsertShipment>): Promise<Shipment | undefined>;
  deleteShipment(id: string): Promise<boolean>;

  // Routes
  getRoutes(): Promise<Route[]>;
  getRoute(id: string): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;
  updateRoute(id: string, route: Partial<InsertRoute>): Promise<Route | undefined>;
  deleteRoute(id: string): Promise<boolean>;

  // Fuel Records
  getFuelRecords(): Promise<FuelRecord[]>;
  createFuelRecord(record: InsertFuelRecord): Promise<FuelRecord>;

  // Maintenance Records
  getMaintenanceRecords(): Promise<MaintenanceRecord[]>;
  createMaintenanceRecord(record: InsertMaintenanceRecord): Promise<MaintenanceRecord>;

  // Sensor Data (IoT)
  saveSensorData(data: any): Promise<any>;
  getSensorData(): Promise<any[]>;

  // Dashboard Stats
  getDashboardStats(): Promise<DashboardStats>;
}

export class MemStorage implements IStorage {
  private users: Map<string, Vehicle | any> = new Map();
  private vehicles: Map<string, Vehicle> = new Map();
  private drivers: Map<string, Driver> = new Map();
  private shipments: Map<string, Shipment> = new Map();
  private routes: Map<string, Route> = new Map();
  private fuelRecords: Map<string, FuelRecord> = new Map();
  private maintenanceRecords: Map<string, MaintenanceRecord> = new Map();
  private sensorData: any[] = [];

  constructor() {
    this.seedSampleData();
  }

  private seedSampleData() {
    // Seed Vehicles
    const v1: any = {
      id: "veh-1",
      plateNumber: "01 777 AAA",
      type: "truck",
      brand: "MAN",
      model: "TGS 33.400",
      year: 2022,
      capacity: 20000,
      fuelType: "Dizel",
      status: "active",
      currentLocation: "Toshkent logistika markazi",
      lastMaintenance: "2026-10-15",
      nextMaintenance: "2027-01-15",
      fuelLevel: 85,
      mileage: 42500,
    };
    const v2: any = {
      id: "veh-2",
      plateNumber: "01 234 BBB",
      type: "truck",
      brand: "Isuzu",
      model: "FVR 34",
      year: 2021,
      capacity: 12000,
      fuelType: "Dizel",
      status: "en_route",
      currentLocation: "Toshkent-Samarqand M39",
      lastMaintenance: "2026-09-20",
      nextMaintenance: "2026-12-20",
      fuelLevel: 60,
      mileage: 78900,
    };
    const v3: any = {
      id: "veh-3",
      plateNumber: "10 555 CCC",
      type: "van",
      brand: "Mercedes-Benz",
      model: "Sprinter 516",
      year: 2023,
      capacity: 3500,
      fuelType: "Dizel",
      status: "idle",
      currentLocation: "Samarqand ombori",
      lastMaintenance: "2026-11-01",
      nextMaintenance: "2027-02-01",
      fuelLevel: 95,
      mileage: 18200,
    };
    const v4: any = {
      id: "veh-4",
      plateNumber: "80 888 DDD",
      type: "truck",
      brand: "Kamaz",
      model: "5490 Neo",
      year: 2020,
      capacity: 18000,
      fuelType: "Metan / Dizel",
      status: "maintenance",
      currentLocation: "Buxoro servis markazi",
      lastMaintenance: "2026-11-10",
      nextMaintenance: "2026-11-25",
      fuelLevel: 30,
      mileage: 135000,
    };
    this.vehicles.set(v1.id, v1);
    this.vehicles.set(v2.id, v2);
    this.vehicles.set(v3.id, v3);
    this.vehicles.set(v4.id, v4);

    // Seed Drivers
    const d1: any = {
      id: "drv-1",
      firstName: "Rustam",
      lastName: "Karimov",
      phone: "+998 90 123 45 67",
      email: "r.karimov@translog.uz",
      licenseNumber: "AA 9876543",
      licenseExpiry: "2028-05-12",
      status: "on_duty",
      assignedVehicleId: "veh-2",
      rating: 4.9,
      totalTrips: 184,
      totalDistance: 74200,
      joinDate: "2022-03-15",
    };
    const d2: any = {
      id: "drv-2",
      firstName: "Alisher",
      lastName: "Umarov",
      phone: "+998 93 456 78 90",
      email: "a.umarov@translog.uz",
      licenseNumber: "AB 1234567",
      licenseExpiry: "2027-08-22",
      status: "available",
      assignedVehicleId: "veh-1",
      rating: 4.8,
      totalTrips: 142,
      totalDistance: 56300,
      joinDate: "2023-01-10",
    };
    const d3: any = {
      id: "drv-3",
      firstName: "Bobur",
      lastName: "Aliyev",
      phone: "+998 97 789 01 23",
      email: "b.aliyev@translog.uz",
      licenseNumber: "AC 8765432",
      licenseExpiry: "2029-11-04",
      status: "off_duty",
      assignedVehicleId: "veh-3",
      rating: 5.0,
      totalTrips: 96,
      totalDistance: 31200,
      joinDate: "2023-09-01",
    };
    this.drivers.set(d1.id, d1);
    this.drivers.set(d2.id, d2);
    this.drivers.set(d3.id, d3);

    // Seed Routes
    const r1: any = {
      id: "rt-1",
      name: "Toshkent – Samarqand",
      origin: "Toshkent",
      destination: "Samarqand",
      distance: 300,
      estimatedTime: 240,
      waypoints: JSON.stringify(["Toshkent", "Guliston", "Jizzax", "Samarqand"]),
      isActive: true,
      assignedVehicleId: "veh-2",
      assignedDriverId: "drv-1",
      status: "in_progress",
    };
    const r2: any = {
      id: "rt-2",
      name: "Toshkent – Buxoro",
      origin: "Toshkent",
      destination: "Buxoro",
      distance: 570,
      estimatedTime: 450,
      waypoints: JSON.stringify(["Toshkent", "Jizzax", "Samarqand", "Navoiy", "Buxoro"]),
      isActive: true,
      assignedVehicleId: "veh-1",
      assignedDriverId: "drv-2",
      status: "pending",
    };
    const r3: any = {
      id: "rt-3",
      name: "Toshkent – Farg‘ona",
      origin: "Toshkent",
      destination: "Farg‘ona",
      distance: 320,
      estimatedTime: 270,
      waypoints: JSON.stringify(["Toshkent", "Angren", "Qamchiq dovoni", "Qo‘qon", "Farg‘ona"]),
      isActive: true,
      assignedVehicleId: "veh-3",
      assignedDriverId: "drv-3",
      status: "completed",
    };
    const r4: any = {
      id: "rt-4",
      name: "Samarqand – Navoiy",
      origin: "Samarqand",
      destination: "Navoiy",
      distance: 150,
      estimatedTime: 120,
      waypoints: JSON.stringify(["Samarqand", "Kattaqo‘rg‘on", "Navoiy"]),
      isActive: true,
      assignedVehicleId: null,
      assignedDriverId: null,
      status: "completed",
    };
    this.routes.set(r1.id, r1);
    this.routes.set(r2.id, r2);
    this.routes.set(r3.id, r3);
    this.routes.set(r4.id, r4);

    // Seed Shipments
    const s1: any = {
      id: "shp-1",
      trackingNumber: "TL-982341",
      senderName: "Artel Electronics MCHJ",
      senderAddress: "Toshkent sh., Rohat ko'chasi 15",
      senderPhone: "+998 71 200 00 00",
      receiverName: "Samarqand Savdo Markazi",
      receiverAddress: "Samarqand sh., Registon ko'chasi 8",
      receiverPhone: "+998 66 233 44 55",
      weight: 4500,
      description: "Maishiy texnika va ehtiyot qismlar",
      status: "in_transit",
      priority: "high",
      assignedDriverId: "drv-1",
      assignedVehicleId: "veh-2",
      pickupDate: "2026-11-17 08:30",
      estimatedDelivery: "2026-11-17 14:00",
      actualDelivery: null,
      notes: null,
      price: 2450000,
    };
    const s2: any = {
      id: "shp-2",
      trackingNumber: "TL-551290",
      senderName: "Buxoro Tekstil Klasteri",
      senderAddress: "Buxoro sh., Sanoatchilar 4",
      senderPhone: "+998 65 221 11 22",
      receiverName: "Toshkent To'qimachilik Fabrikasi",
      receiverAddress: "Toshkent sh., Chilonzor 19",
      receiverPhone: "+998 90 999 88 77",
      weight: 12000,
      description: "Paxta tolasi va tayyor matolar",
      status: "pending",
      priority: "urgent",
      assignedDriverId: "drv-2",
      assignedVehicleId: "veh-1",
      pickupDate: "2026-11-18 09:00",
      estimatedDelivery: "2026-11-18 20:00",
      actualDelivery: null,
      notes: null,
      price: 6800000,
    };
    const s3: any = {
      id: "shp-3",
      trackingNumber: "TL-338190",
      senderName: "Farg'ona Agro Eksport",
      senderAddress: "Quva tumani, Bog'bonlar 1",
      senderPhone: "+998 73 543 21 00",
      receiverName: "Qo'yliq Ulgurji Bozor",
      receiverAddress: "Toshkent sh., Qo'yliq",
      receiverPhone: "+998 94 333 22 11",
      weight: 3200,
      description: "Qishloq xo'jaligi meva-sabzavot mahsulotlari",
      status: "delivered",
      priority: "medium",
      assignedDriverId: "drv-3",
      assignedVehicleId: "veh-3",
      pickupDate: "2026-11-16 06:00",
      estimatedDelivery: "2026-11-16 12:30",
      actualDelivery: "2026-11-16 12:15",
      notes: "O'z vaqtida yetkazildi",
      price: 1950000,
    };
    this.shipments.set(s1.id, s1);
    this.shipments.set(s2.id, s2);
    this.shipments.set(s3.id, s3);

    // Seed Fuel
    const f1: any = {
      id: "fl-1",
      vehicleId: "veh-1",
      driverId: "drv-2",
      date: "2026-11-15",
      liters: 120,
      pricePerLiter: 11500,
      totalCost: 1380000,
      mileage: 42100,
      station: "UNG Petro Toshkent",
    };
    const f2: any = {
      id: "fl-2",
      vehicleId: "veh-2",
      driverId: "drv-1",
      date: "2026-11-16",
      liters: 90,
      pricePerLiter: 11500,
      totalCost: 1035000,
      mileage: 78500,
      station: "Mustaqillik Yoqilg'i Samarqand",
    };
    this.fuelRecords.set(f1.id, f1);
    this.fuelRecords.set(f2.id, f2);

    // Seed Maintenance
    const m1: any = {
      id: "mnt-1",
      vehicleId: "veh-4",
      date: "2026-11-10",
      type: "Dvigatel va tormoz tizimi ta'miri",
      description: "Tormoz kolodkalari almashtirildi va moy yangilandi",
      cost: 3200000,
      mileage: 135000,
      nextMaintenanceMileage: 145000,
      technician: "Azizbek Usta",
    };
    this.maintenanceRecords.set(m1.id, m1);
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }
  async createUser(user: InsertUser): Promise<User> {
    const id = "usr-" + Date.now();
    const created: any = { ...user, id };
    this.users.set(id, created);
    return created;
  }

  // Vehicles
  async getVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values());
  }
  async getVehicle(id: string): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }
  async createVehicle(insert: InsertVehicle): Promise<Vehicle> {
    const id = "veh-" + Date.now();
    const created: any = {
      ...insert,
      id,
      currentLocation: insert.currentLocation ?? null,
      lastMaintenance: insert.lastMaintenance ?? null,
      nextMaintenance: insert.nextMaintenance ?? null,
      fuelLevel: insert.fuelLevel ?? 100,
      mileage: insert.mileage ?? 0,
      status: insert.status ?? "idle",
    };
    this.vehicles.set(id, created);
    return created;
  }
  async updateVehicle(id: string, patch: Partial<InsertVehicle>): Promise<Vehicle | undefined> {
    const existing = this.vehicles.get(id);
    if (!existing) return undefined;
    const updated: any = { ...existing, ...patch };
    this.vehicles.set(id, updated);
    return updated;
  }
  async deleteVehicle(id: string): Promise<boolean> {
    return this.vehicles.delete(id);
  }

  // Drivers
  async getDrivers(): Promise<Driver[]> {
    return Array.from(this.drivers.values());
  }
  async getDriver(id: string): Promise<Driver | undefined> {
    return this.drivers.get(id);
  }
  async createDriver(insert: InsertDriver): Promise<Driver> {
    const id = "drv-" + Date.now();
    const created: any = {
      ...insert,
      id,
      email: insert.email ?? null,
      status: insert.status ?? "available",
      assignedVehicleId: insert.assignedVehicleId ?? null,
      rating: insert.rating ?? 5.0,
      totalTrips: insert.totalTrips ?? 0,
      totalDistance: insert.totalDistance ?? 0,
    };
    this.drivers.set(id, created);
    return created;
  }
  async updateDriver(id: string, patch: Partial<InsertDriver>): Promise<Driver | undefined> {
    const existing = this.drivers.get(id);
    if (!existing) return undefined;
    const updated: any = { ...existing, ...patch };
    this.drivers.set(id, updated);
    return updated;
  }
  async deleteDriver(id: string): Promise<boolean> {
    return this.drivers.delete(id);
  }

  // Shipments
  async getShipments(): Promise<Shipment[]> {
    return Array.from(this.shipments.values());
  }
  async getShipment(id: string): Promise<Shipment | undefined> {
    return this.shipments.get(id);
  }
  async createShipment(insert: InsertShipment): Promise<Shipment> {
    const id = "shp-" + Date.now();
    const created: any = {
      ...insert,
      id,
      description: insert.description ?? null,
      status: insert.status ?? "pending",
      priority: insert.priority ?? "medium",
      assignedDriverId: insert.assignedDriverId ?? null,
      assignedVehicleId: insert.assignedVehicleId ?? null,
      actualDelivery: insert.actualDelivery ?? null,
      notes: insert.notes ?? null,
    };
    this.shipments.set(id, created);
    return created;
  }
  async updateShipment(id: string, patch: Partial<InsertShipment>): Promise<Shipment | undefined> {
    const existing = this.shipments.get(id);
    if (!existing) return undefined;
    const updated: any = { ...existing, ...patch };
    this.shipments.set(id, updated);
    return updated;
  }
  async deleteShipment(id: string): Promise<boolean> {
    return this.shipments.delete(id);
  }

  // Routes
  async getRoutes(): Promise<Route[]> {
    return Array.from(this.routes.values());
  }
  async getRoute(id: string): Promise<Route | undefined> {
    return this.routes.get(id);
  }
  async createRoute(insert: InsertRoute): Promise<Route> {
    const id = "rt-" + Date.now();
    const created: any = {
      ...insert,
      id,
      waypoints: insert.waypoints ?? null,
      isActive: insert.isActive ?? true,
      assignedVehicleId: insert.assignedVehicleId ?? null,
      assignedDriverId: insert.assignedDriverId ?? null,
      status: insert.status ?? "pending",
    };
    this.routes.set(id, created);
    return created;
  }
  async updateRoute(id: string, patch: Partial<InsertRoute>): Promise<Route | undefined> {
    const existing = this.routes.get(id);
    if (!existing) return undefined;
    const updated: any = { ...existing, ...patch };
    this.routes.set(id, updated);
    return updated;
  }
  async deleteRoute(id: string): Promise<boolean> {
    return this.routes.delete(id);
  }

  // Fuel Records
  async getFuelRecords(): Promise<FuelRecord[]> {
    return Array.from(this.fuelRecords.values());
  }
  async createFuelRecord(insert: InsertFuelRecord): Promise<FuelRecord> {
    const id = "fl-" + Date.now();
    const created: any = {
      ...insert,
      id,
      station: insert.station ?? null,
    };
    this.fuelRecords.set(id, created);
    return created;
  }

  // Maintenance Records
  async getMaintenanceRecords(): Promise<MaintenanceRecord[]> {
    return Array.from(this.maintenanceRecords.values());
  }
  async createMaintenanceRecord(insert: InsertMaintenanceRecord): Promise<MaintenanceRecord> {
    const id = "mnt-" + Date.now();
    const created: any = {
      ...insert,
      id,
      nextMaintenanceMileage: insert.nextMaintenanceMileage ?? null,
      technician: insert.technician ?? null,
    };
    this.maintenanceRecords.set(id, created);
    return created;
  }

  // IoT Sensor Data
  async saveSensorData(data: any): Promise<any> {
    const record = { ...data, timestamp: new Date().toISOString() };
    this.sensorData.push(record);
    if (data.vehicle_id) {
      const v = Array.from(this.vehicles.values()).find(veh => veh.id === String(data.vehicle_id) || veh.plateNumber === String(data.vehicle_id));
      if (v) {
        if (data.latitude && data.longitude) {
          v.currentLocation = `${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}`;
        }
      }
    }
    return record;
  }
  async getSensorData(): Promise<any[]> {
    return this.sensorData;
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    const vList = Array.from(this.vehicles.values());
    const dList = Array.from(this.drivers.values());
    const sList = Array.from(this.shipments.values());
    const rList = Array.from(this.routes.values());
    const fList = Array.from(this.fuelRecords.values());
    const mList = Array.from(this.maintenanceRecords.values());

    const totalVehicles = vList.length;
    const activeVehicles = vList.filter(v => v.status === "active" || v.status === "en_route").length;
    const totalDrivers = dList.length;
    const availableDrivers = dList.filter(d => d.status === "available" || d.status === "on_duty").length;
    const totalShipments = sList.length;
    const pendingShipments = sList.filter(s => s.status === "pending").length;
    const inTransitShipments = sList.filter(s => s.status === "in_transit").length;
    const deliveredShipments = sList.filter(s => s.status === "delivered").length;
    const totalRoutes = rList.length;
    const activeRoutes = rList.filter(r => r.status === "in_progress" || r.isActive).length;

    const monthlyRevenue = sList.reduce((acc, s) => acc + (s.price || 0), 0);
    const monthlyDeliveries = deliveredShipments;
    const averageDeliveryTime = 4.2;
    const fuelCostsThisMonth = fList.reduce((acc, f) => acc + (f.totalCost || 0), 0);
    const maintenanceCostsThisMonth = mList.reduce((acc, m) => acc + (m.cost || 0), 0);

    return {
      totalVehicles,
      activeVehicles,
      totalDrivers,
      availableDrivers,
      totalShipments,
      pendingShipments,
      inTransitShipments,
      deliveredShipments,
      totalRoutes,
      activeRoutes,
      monthlyRevenue,
      monthlyDeliveries,
      averageDeliveryTime,
      fuelCostsThisMonth,
      maintenanceCostsThisMonth,
    };
  }
}

export const storage = new MemStorage();
