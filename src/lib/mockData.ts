// TransLog Logistics - Professional Demo Data Store
// Realist demo ma'lumotlar to'plami (O'zbekiston logistika tizimi)

export interface VehicleDemo {
  id: string;
  plateNumber: string;
  type: "truck" | "van" | "car";
  brand: string;
  model: string;
  year: number;
  capacity: number; // in kg
  fuelType: string;
  status: "active" | "maintenance" | "idle" | "en_route";
  currentLocation: string;
  lastMaintenance: string;
  nextMaintenance: string;
  fuelLevel: number;
  mileage: number;
  assignedDriverId: string;
  assignedDriverName: string;
}

export interface DriverDemo {
  id: string;
  drvId: string; // e.g. DRV-001
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: "active" | "on_duty" | "available" | "on_leave" | "off_duty";
  assignedVehicleId?: string;
  assignedVehiclePlate?: string;
  assignedVehicleModel?: string;
  rating: number;
  totalTrips: number;
  totalDistance: number; // in km
  joinDate: string;
  experience: string;
}

export interface ShipmentDemo {
  id: string;
  trackingNumber: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  origin: string;
  destination: string;
  cargoType: string;
  weight: number; // in kg
  description: string;
  status: "pending" | "in_transit" | "delivered" | "delayed";
  priority: "low" | "medium" | "high" | "urgent";
  assignedDriverId: string;
  assignedDriverName: string;
  assignedVehiclePlate: string;
  assignedVehicleModel: string;
  pickupDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  price: number;
}

export interface RouteDemo {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: number; // km
  estimatedTime: number; // minutes
  waypoints: string[];
  assignedVehiclePlate: string;
  assignedVehicleModel: string;
  assignedDriverName: string;
  status: "pending" | "in_progress" | "completed";
}

export interface FuelRecordDemo {
  id: string;
  vehiclePlate: string;
  vehicleModel: string;
  driverId: string;
  driverName: string;
  date: string;
  liters: number;
  pricePerLiter: number;
  totalCost: number;
  mileage: number;
  station: string;
  fuelType: string;
}

export interface MaintenanceRecordDemo {
  id: string;
  vehiclePlate: string;
  vehicleModel: string;
  type: string;
  description: string;
  serviceDate: string;
  nextServiceDate: string;
  serviceCost: number;
  mileage: number;
  nextMileage: number;
  technician: string;
  status: "completed" | "in_progress" | "scheduled";
}

export interface RecentActivityDemo {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "shipment" | "maintenance" | "fuel" | "driver" | "system";
  badgeText: string;
  badgeVariant: "emerald" | "blue" | "amber" | "rose" | "slate";
}

// ==========================================
// 1. DASHBOARD STATS
// ==========================================
export const mockDashboardStats = {
  totalVehicles: 24,
  activeVehicles: 18,
  maintenanceVehicles: 3,
  idleVehicles: 3,

  totalDrivers: 22,
  activeDrivers: 18,
  onLeaveDrivers: 4,

  totalShipments: 48,
  activeShipments: 12,
  deliveredShipments: 30,
  pendingShipments: 6,

  totalMonthlyRevenue: 185000000, // 185,000,000 UZS
  fuelExpensesThisMonth: 24500000, // 24,500,000 UZS
  totalFuelLitersThisMonth: 18840, // 18,840 Liters
  completedDeliveries: 156, // jami yetkazilgan yuklar
  totalRoutes: 14,
  activeRoutes: 6,
  averageDeliveryTimeHours: 6.4,
  onTimeDeliveryRate: 98.2, // %
};

// ==========================================
// 2. RECENT ACTIVITIES
// ==========================================
export const mockRecentActivities: RecentActivityDemo[] = [
  {
    id: "act-1",
    title: "SHP-2026-001 (Toshkent → Samarqand) trassada",
    description: "Mercedes-Benz Actros (01 A 777 AA) Jizzax nazorat postidan muvaffaqiyatli o'tdi",
    time: "12 daqiqa oldin",
    type: "shipment",
    badgeText: "Yo‘lda",
    badgeVariant: "blue",
  },
  {
    id: "act-2",
    title: "SHP-2026-002 yuk muvaffaqiyatli yetkazildi",
    description: "Buxoro Savdo Markazi buyurtmasi Sardor Rasulov tomonidan topshirildi va tasdiqlandi",
    time: "48 daqiqa oldin",
    type: "shipment",
    badgeText: "Yetkazildi",
    badgeVariant: "emerald",
  },
  {
    id: "act-3",
    title: "MAN TGX (01 B 456 BB) texnik ko'rikda",
    description: "Dvigatel diagnostikasi jarayoni TransLog Markaziy avtobazasida boshlandi",
    time: "2 soat oldin",
    type: "maintenance",
    badgeText: "Ta'mirda",
    badgeVariant: "amber",
  },
  {
    id: "act-4",
    title: "Yoqilg'i quyish qayd etildi",
    description: "Mercedes Actros (01 A 777 AA) uchun UNG Petro shoxobchasida 250 litr dizel quyildi",
    time: "3.5 soat oldin",
    type: "fuel",
    badgeText: "Yoqilg'i",
    badgeVariant: "emerald",
  },
  {
    id: "act-5",
    title: "Yangi jo'natma qabul qilindi (SHP-2026-003)",
    description: "Andijon To'qimachilik fabrikasidan 14,000 kg mato buyurtmasi ro'yxatga olindi",
    time: "5 soat oldin",
    type: "shipment",
    badgeText: "Kutilmoqda",
    badgeVariant: "amber",
  },
  {
    id: "act-6",
    title: "Haydovchi navbatchilikka kirdi",
    description: "Otabek Qodirov (DRV-005) Volvo FH16 transportida Farg'ona yo'nalishiga chiqdi",
    time: "7 soat oldin",
    type: "driver",
    badgeText: "Faol",
    badgeVariant: "emerald",
  },
];

// ==========================================
// 3. VEHICLES (AVTOPARKLAR)
// ==========================================
export const mockVehicles: VehicleDemo[] = [
  {
    id: "veh-001",
    plateNumber: "01 A 777 AA",
    brand: "Mercedes-Benz",
    model: "Actros 1845",
    type: "truck",
    year: 2023,
    capacity: 22000,
    fuelType: "Dizel (Euro-5)",
    status: "active",
    currentLocation: "Toshkent - Samarqand M39 (Jizzax)",
    lastMaintenance: "10.11.2026",
    nextMaintenance: "10.02.2027",
    fuelLevel: 85,
    mileage: 148200,
    assignedDriverId: "drv-001",
    assignedDriverName: "Aziz Karimov",
  },
  {
    id: "veh-002",
    plateNumber: "01 B 456 BB",
    brand: "MAN",
    model: "TGX 18.440",
    type: "truck",
    year: 2022,
    capacity: 20000,
    fuelType: "Dizel (Euro-5)",
    status: "maintenance",
    currentLocation: "TransLog Bosh Texnik Servis Markazi (Toshkent)",
    lastMaintenance: "18.11.2026",
    nextMaintenance: "25.11.2026",
    fuelLevel: 42,
    mileage: 185400,
    assignedDriverId: "drv-002",
    assignedDriverName: "Sardor Rasulov",
  },
  {
    id: "veh-003",
    plateNumber: "01 C 123 CC",
    brand: "Isuzu",
    model: "NPR 75L-K",
    type: "truck",
    year: 2021,
    capacity: 6500,
    fuelType: "Dizel",
    status: "active",
    currentLocation: "Andijon viloyati, Shahrixon",
    lastMaintenance: "20.10.2026",
    nextMaintenance: "22.11.2026",
    fuelLevel: 68,
    mileage: 96800,
    assignedDriverId: "drv-004",
    assignedDriverName: "Jasur Umarov",
  },
  {
    id: "veh-004",
    plateNumber: "01 D 890 DD",
    brand: "Volvo",
    model: "FH16 540 Globetrotter",
    type: "truck",
    year: 2024,
    capacity: 24000,
    fuelType: "Dizel (Euro-6)",
    status: "active",
    currentLocation: "Qamchiq dovoni yo'nalishi (Angren)",
    lastMaintenance: "05.11.2026",
    nextMaintenance: "05.03.2027",
    fuelLevel: 92,
    mileage: 62300,
    assignedDriverId: "drv-005",
    assignedDriverName: "Otabek Qodirov",
  },
  {
    id: "veh-005",
    plateNumber: "10 E 321 EE",
    brand: "KamAZ",
    model: "54901 Continent",
    type: "truck",
    year: 2022,
    capacity: 19000,
    fuelType: "Metan / Dizel",
    status: "active",
    currentLocation: "Sirdaryo - Jizzax oralig'i",
    lastMaintenance: "12.09.2026",
    nextMaintenance: "24.11.2026",
    fuelLevel: 55,
    mileage: 134100,
    assignedDriverId: "drv-006",
    assignedDriverName: "Dilshod Aliyev",
  },
  {
    id: "veh-006",
    plateNumber: "01 F 654 FF",
    brand: "DAF",
    model: "XF 480 Super Space",
    type: "truck",
    year: 2023,
    capacity: 21000,
    fuelType: "Dizel (Euro-5)",
    status: "en_route",
    currentLocation: "Navoiy - Buxoro A380 trassa",
    lastMaintenance: "01.10.2026",
    nextMaintenance: "01.01.2027",
    fuelLevel: 74,
    mileage: 112500,
    assignedDriverId: "drv-007",
    assignedDriverName: "Bobur Mirzayev",
  },
  {
    id: "veh-007",
    plateNumber: "01 G 987 GG",
    brand: "Gazel",
    model: "Next Furgon C41R92",
    type: "van",
    year: 2023,
    capacity: 3500,
    fuelType: "Metan Gaz (CNG)",
    status: "active",
    currentLocation: "Toshkent shahar ichi (Chilonzor / Mirobod)",
    lastMaintenance: "15.10.2026",
    nextMaintenance: "15.01.2027",
    fuelLevel: 80,
    mileage: 45900,
    assignedDriverId: "drv-008",
    assignedDriverName: "Farrux Toshmatov",
  },
  {
    id: "veh-008",
    plateNumber: "01 H 111 HH",
    brand: "Scania",
    model: "R500 V8 Streamline",
    type: "truck",
    year: 2022,
    capacity: 22000,
    fuelType: "Dizel (Euro-5)",
    status: "idle",
    currentLocation: "TransLog Bosh Garaji (Toshkent, Sergeli)",
    lastMaintenance: "14.11.2026",
    nextMaintenance: "14.02.2027",
    fuelLevel: 30,
    mileage: 172000,
    assignedDriverId: "",
    assignedDriverName: "Biriktirilmagan",
  },
];

// ==========================================
// 4. DRIVERS (HAYDOVCHILAR)
// ==========================================
export const mockDrivers: DriverDemo[] = [
  {
    id: "drv-001",
    drvId: "DRV-001",
    firstName: "Aziz",
    lastName: "Karimov",
    phone: "+998 90 123 45 67",
    email: "a.karimov@translog.uz",
    licenseNumber: "AA 1234567",
    licenseExpiry: "2030-05-15",
    status: "active",
    assignedVehicleId: "veh-001",
    assignedVehiclePlate: "01 A 777 AA",
    assignedVehicleModel: "Mercedes-Benz Actros",
    rating: 4.9,
    totalTrips: 142,
    totalDistance: 158400,
    joinDate: "2021-03-15",
    experience: "8 yil",
  },
  {
    id: "drv-002",
    drvId: "DRV-002",
    firstName: "Sardor",
    lastName: "Rasulov",
    phone: "+998 93 234 56 78",
    email: "s.rasulov@translog.uz",
    licenseNumber: "AB 7654321",
    licenseExpiry: "2029-11-20",
    status: "active",
    assignedVehicleId: "veh-002",
    assignedVehiclePlate: "01 B 456 BB",
    assignedVehicleModel: "MAN TGX",
    rating: 4.7,
    totalTrips: 98,
    totalDistance: 114200,
    joinDate: "2022-08-10",
    experience: "6 yil",
  },
  {
    id: "drv-003",
    drvId: "DRV-003",
    firstName: "Bekzod",
    lastName: "Tursunov",
    phone: "+998 97 345 67 89",
    email: "b.tursunov@translog.uz",
    licenseNumber: "AC 9876543",
    licenseExpiry: "2028-09-01",
    status: "on_leave",
    assignedVehicleId: undefined,
    assignedVehiclePlate: "Biriktirilmagan",
    assignedVehicleModel: "—",
    rating: 4.5,
    totalTrips: 76,
    totalDistance: 89500,
    joinDate: "2023-01-04",
    experience: "5 yil",
  },
  {
    id: "drv-004",
    drvId: "DRV-004",
    firstName: "Jasur",
    lastName: "Umarov",
    phone: "+998 91 456 78 90",
    email: "j.umarov@translog.uz",
    licenseNumber: "AD 5544332",
    licenseExpiry: "2031-02-14",
    status: "active",
    assignedVehicleId: "veh-003",
    assignedVehiclePlate: "01 C 123 CC",
    assignedVehicleModel: "Isuzu NPR",
    rating: 4.8,
    totalTrips: 115,
    totalDistance: 128700,
    joinDate: "2021-11-12",
    experience: "7 yil",
  },
  {
    id: "drv-005",
    drvId: "DRV-005",
    firstName: "Otabek",
    lastName: "Qodirov",
    phone: "+998 99 567 89 01",
    email: "o.qodirov@translog.uz",
    licenseNumber: "AE 6677889",
    licenseExpiry: "2032-08-30",
    status: "active",
    assignedVehicleId: "veh-004",
    assignedVehiclePlate: "01 D 890 DD",
    assignedVehicleModel: "Volvo FH16",
    rating: 4.9,
    totalTrips: 184,
    totalDistance: 215600,
    joinDate: "2020-06-01",
    experience: "10 yil",
  },
  {
    id: "drv-006",
    drvId: "DRV-006",
    firstName: "Dilshod",
    lastName: "Aliyev",
    phone: "+998 94 678 90 12",
    email: "d.aliyev@translog.uz",
    licenseNumber: "AF 3322114",
    licenseExpiry: "2029-04-18",
    status: "active",
    assignedVehicleId: "veh-005",
    assignedVehiclePlate: "10 E 321 EE",
    assignedVehicleModel: "KamAZ 54901",
    rating: 4.6,
    totalTrips: 62,
    totalDistance: 71400,
    joinDate: "2023-05-18",
    experience: "4 yil",
  },
  {
    id: "drv-007",
    drvId: "DRV-007",
    firstName: "Bobur",
    lastName: "Mirzayev",
    phone: "+998 90 789 01 23",
    email: "b.mirzayev@translog.uz",
    licenseNumber: "AG 4411990",
    licenseExpiry: "2031-10-10",
    status: "active",
    assignedVehicleId: "veh-006",
    assignedVehiclePlate: "01 F 654 FF",
    assignedVehicleModel: "DAF XF 480",
    rating: 4.8,
    totalTrips: 139,
    totalDistance: 164300,
    joinDate: "2021-02-14",
    experience: "9 yil",
  },
  {
    id: "drv-008",
    drvId: "DRV-008",
    firstName: "Farrux",
    lastName: "Toshmatov",
    phone: "+998 95 890 12 34",
    email: "f.toshmatov@translog.uz",
    licenseNumber: "AH 9988776",
    licenseExpiry: "2030-07-22",
    status: "active",
    assignedVehicleId: "veh-007",
    assignedVehiclePlate: "01 G 987 GG",
    assignedVehicleModel: "Gazel Next",
    rating: 4.7,
    totalTrips: 88,
    totalDistance: 52100,
    joinDate: "2023-09-11",
    experience: "3 yil",
  },
];

// ==========================================
// 5. SHIPMENTS (JO'NATMALAR)
// ==========================================
export const mockShipments: ShipmentDemo[] = [
  {
    id: "shp-001",
    trackingNumber: "SHP-2026-001",
    senderName: "O‘zbekneftgaz AJ",
    senderAddress: "Toshkent sh., Istiqbol ko'chasi 21",
    senderPhone: "+998 71 232 10 20",
    receiverName: "Samarqand Kimyo MChJ",
    receiverAddress: "Samarqand sh., Sanoat zonasi 4",
    receiverPhone: "+998 66 230 45 60",
    origin: "Tashkent",
    destination: "Samarkand",
    cargoType: "Sanoat uskunalari",
    weight: 18500,
    description: "Og'ir sanoat nasoslari va kompressor qismlari",
    status: "in_transit",
    priority: "high",
    assignedDriverId: "drv-001",
    assignedDriverName: "Aziz Karimov",
    assignedVehiclePlate: "01 A 777 AA",
    assignedVehicleModel: "Mercedes-Benz Actros",
    pickupDate: "2026-11-18",
    estimatedDelivery: "2026-11-19 16:00",
    price: 14500000,
  },
  {
    id: "shp-002",
    trackingNumber: "SHP-2026-002",
    senderName: "Artel Electronics",
    senderAddress: "Toshkent sh., Chilonzor tumani 19-mavze",
    senderPhone: "+998 78 148 88 88",
    receiverName: "Buxoro Savdo Markazi",
    receiverAddress: "Buxoro sh., G'ijduvon shoh ko'chasi 12",
    receiverPhone: "+998 65 221 34 50",
    origin: "Tashkent",
    destination: "Bukhara",
    cargoType: "Maishiy texnika",
    weight: 8200,
    description: "Muzlatgichlar va konditsionerlar partiyasi",
    status: "delivered",
    priority: "medium",
    assignedDriverId: "drv-002",
    assignedDriverName: "Sardor Rasulov",
    assignedVehiclePlate: "01 B 456 BB",
    assignedVehicleModel: "MAN TGX",
    pickupDate: "2026-11-17",
    estimatedDelivery: "2026-11-18 12:00",
    actualDelivery: "2026-11-18 11:30",
    price: 18200000,
  },
  {
    id: "shp-003",
    trackingNumber: "SHP-2026-003",
    senderName: "Andijon To‘qimachilik",
    senderAddress: "Andijon sh., Bog'ishamol ko'chasi 8",
    senderPhone: "+998 74 223 90 00",
    receiverName: "Toshkent Tekstil Logistika",
    receiverAddress: "Toshkent sh., Bektemir tumani, Oltintopgan 5",
    receiverPhone: "+998 71 290 12 34",
    origin: "Andijan",
    destination: "Tashkent",
    cargoType: "Ip-kalava va mato",
    weight: 14000,
    description: "Eksportbop paxta tolasidan tayyorlangan kalava",
    status: "pending",
    priority: "medium",
    assignedDriverId: "drv-004",
    assignedDriverName: "Jasur Umarov",
    assignedVehiclePlate: "01 C 123 CC",
    assignedVehicleModel: "Isuzu NPR",
    pickupDate: "2026-11-19",
    estimatedDelivery: "2026-11-20 18:00",
    price: 11800000,
  },
  {
    id: "shp-004",
    trackingNumber: "SHP-2026-004",
    senderName: "O‘zavtosanoat AJ",
    senderAddress: "Toshkent sh., Amir Temur shoh ko'chasi 13",
    senderPhone: "+998 71 140 05 05",
    receiverName: "Namangan Ehtiyot Qismlar",
    receiverAddress: "Namangan sh., To'raqo'rg'on yo'li 1",
    receiverPhone: "+998 69 226 77 11",
    origin: "Tashkent",
    destination: "Namangan",
    cargoType: "Avtomobil ehtiyot qismlari",
    weight: 12400,
    description: "Dvigatel va transmissiya uzellari",
    status: "in_transit",
    priority: "urgent",
    assignedDriverId: "drv-006",
    assignedDriverName: "Dilshod Aliyev",
    assignedVehiclePlate: "10 E 321 EE",
    assignedVehicleModel: "KamAZ 54901",
    pickupDate: "2026-11-18",
    estimatedDelivery: "2026-11-19 14:00",
    price: 13400000,
  },
  {
    id: "shp-005",
    trackingNumber: "SHP-2026-005",
    senderName: "Farg‘ona Neft Qayta Ishlash",
    senderAddress: "Farg'ona sh., Sanoat ko'chasi 1",
    senderPhone: "+998 73 244 50 00",
    receiverName: "TransLog Terminal",
    receiverAddress: "Toshkent sh., Sergeli logistika parki",
    receiverPhone: "+998 71 200 77 88",
    origin: "Fergana",
    destination: "Tashkent",
    cargoType: "Texnik moylar",
    weight: 22000,
    description: "Sintetik moy va kimyoviy reagentlar sisternasi",
    status: "delivered",
    priority: "high",
    assignedDriverId: "drv-005",
    assignedDriverName: "Otabek Qodirov",
    assignedVehiclePlate: "01 D 890 DD",
    assignedVehicleModel: "Volvo FH16",
    pickupDate: "2026-11-16",
    estimatedDelivery: "2026-11-17 15:00",
    actualDelivery: "2026-11-17 14:15",
    price: 16800000,
  },
  {
    id: "shp-006",
    trackingNumber: "SHP-2026-006",
    senderName: "Universal Qurilish Mollari",
    senderAddress: "Toshkent viloyati, Yangiyo'l tumani",
    senderPhone: "+998 90 999 11 22",
    receiverName: "Qoraqalpoq Qurilish MChJ",
    receiverAddress: "Nukus sh., Dosnazarov ko'chasi 45",
    receiverPhone: "+998 61 222 88 99",
    origin: "Tashkent",
    destination: "Nukus",
    cargoType: "Qurilish materiallari",
    weight: 19800,
    description: "Armatura va profnastil listlari",
    status: "in_transit",
    priority: "high",
    assignedDriverId: "drv-007",
    assignedDriverName: "Bobur Mirzayev",
    assignedVehiclePlate: "01 F 654 FF",
    assignedVehicleModel: "DAF XF 480",
    pickupDate: "2026-11-19",
    estimatedDelivery: "2026-11-21 11:00",
    price: 26500000,
  },
];

// ==========================================
// 6. ROUTES (MARSHRUTLAR)
// ==========================================
export const mockRoutes: RouteDemo[] = [
  {
    id: "rt-001",
    name: "Toshkent — Samarqand Ekspress",
    origin: "Tashkent",
    destination: "Samarkand",
    distance: 310,
    estimatedTime: 270, // 4 soat 30 daqiqa
    waypoints: ["Toshkent (Sergeli)", "Yangiyo'l", "Sirdaryo", "Jizzax dovoni", "Samarqand sh."],
    assignedVehiclePlate: "01 A 777 AA",
    assignedVehicleModel: "Mercedes-Benz Actros",
    assignedDriverName: "Aziz Karimov",
    status: "in_progress",
  },
  {
    id: "rt-002",
    name: "Toshkent — Buxoro Magistrali",
    origin: "Tashkent",
    destination: "Bukhara",
    distance: 580,
    estimatedTime: 465, // 7 soat 45 daqiqa
    waypoints: ["Toshkent", "Jizzax", "Samarqand aylanma", "Navoiy", "G'ijduvon", "Buxoro"],
    assignedVehiclePlate: "01 B 456 BB",
    assignedVehicleModel: "MAN TGX",
    assignedDriverName: "Sardor Rasulov",
    status: "completed",
  },
  {
    id: "rt-003",
    name: "Toshkent — Andijon (Vodiy Yulduzi)",
    origin: "Tashkent",
    destination: "Andijan",
    distance: 350,
    estimatedTime: 315, // 5 soat 15 daqiqa
    waypoints: ["Toshkent", "Ohangaron", "Qamchiq dovoni", "Qo'qon", "Shahrixon", "Andijon"],
    assignedVehiclePlate: "01 C 123 CC",
    assignedVehicleModel: "Isuzu NPR",
    assignedDriverName: "Jasur Umarov",
    status: "pending",
  },
  {
    id: "rt-004",
    name: "Toshkent — Farg‘ona Logistika Yo'lagi",
    origin: "Tashkent",
    destination: "Fergana",
    distance: 315,
    estimatedTime: 285, // 4 soat 45 daqiqa
    waypoints: ["Toshkent", "Angren", "Qamchiq dovoni", "Beshariq", "Rishton", "Farg'ona"],
    assignedVehiclePlate: "01 D 890 DD",
    assignedVehicleModel: "Volvo FH16",
    assignedDriverName: "Otabek Qodirov",
    status: "in_progress",
  },
  {
    id: "rt-005",
    name: "Toshkent — Qarshi Janubiy Trassa",
    origin: "Tashkent",
    destination: "Qarshi",
    distance: 460,
    estimatedTime: 380, // 6 soat 20 daqiqa
    waypoints: ["Toshkent", "Guliston", "Jizzax", "Samarqand janubiy trassa", "Qarshi sh."],
    assignedVehiclePlate: "10 E 321 EE",
    assignedVehicleModel: "KamAZ 54901",
    assignedDriverName: "Dilshod Aliyev",
    status: "in_progress",
  },
  {
    id: "rt-006",
    name: "Samarqand — Xiva Qadimiy Yo'l",
    origin: "Samarkand",
    destination: "Khiva",
    distance: 510,
    estimatedTime: 430, // 7 soat 10 daqiqa
    waypoints: ["Samarqand", "Navoiy kon hududi", "Buxoro", "Qizilqum trassa", "Urganch", "Xiva"],
    assignedVehiclePlate: "01 F 654 FF",
    assignedVehicleModel: "DAF XF 480",
    assignedDriverName: "Bobur Mirzayev",
    status: "completed",
  },
];

// ==========================================
// 7. FUEL RECORDS (YOQILG'I)
// ==========================================
export const mockFuelRecords: FuelRecordDemo[] = [
  {
    id: "fl-001",
    vehiclePlate: "01 A 777 AA",
    vehicleModel: "Mercedes Actros",
    driverId: "DRV-001",
    driverName: "Aziz Karimov",
    date: "18.11.2026",
    liters: 250,
    pricePerLiter: 13000,
    totalCost: 3250000, // 3,250,000 UZS
    mileage: 147950,
    station: "UNG Petro (Chilonzor shoxobchasi)",
    fuelType: "Dizel (Euro-5)",
  },
  {
    id: "fl-002",
    vehiclePlate: "01 B 456 BB",
    vehicleModel: "MAN TGX",
    driverId: "DRV-002",
    driverName: "Sardor Rasulov",
    date: "17.11.2026",
    liters: 180,
    pricePerLiter: 13000,
    totalCost: 2340000, // 2,340,000 UZS
    mileage: 184800,
    station: "Uzbekneftgaz (Sergeli terminali)",
    fuelType: "Dizel (Euro-5)",
  },
  {
    id: "fl-003",
    vehiclePlate: "01 C 123 CC",
    vehicleModel: "Isuzu NPR",
    driverId: "DRV-004",
    driverName: "Jasur Umarov",
    date: "18.11.2026",
    liters: 100,
    pricePerLiter: 13000,
    totalCost: 1300000, // 1,300,000 UZS
    mileage: 96200,
    station: "Mustaqillik Petrol (Toshkent)",
    fuelType: "Dizel (Euro-5)",
  },
  {
    id: "fl-004",
    vehiclePlate: "01 D 890 DD",
    vehicleModel: "Volvo FH16",
    driverId: "DRV-005",
    driverName: "Otabek Qodirov",
    date: "16.11.2026",
    liters: 300,
    pricePerLiter: 13000,
    totalCost: 3900000, // 3,900,000 UZS
    mileage: 61700,
    station: "UNG Petro (Bektemir trassa)",
    fuelType: "Dizel (Euro-6)",
  },
  {
    id: "fl-005",
    vehiclePlate: "10 E 321 EE",
    vehicleModel: "KamAZ 54901",
    driverId: "DRV-006",
    driverName: "Dilshod Aliyev",
    date: "15.11.2026",
    liters: 220,
    pricePerLiter: 13000,
    totalCost: 2860000, // 2,860,000 UZS
    mileage: 133400,
    station: "Lukoil (Toshkent halqa yo'li)",
    fuelType: "Dizel (Euro-5)",
  },
  {
    id: "fl-006",
    vehiclePlate: "01 F 654 FF",
    vehicleModel: "DAF XF 480",
    driverId: "DRV-007",
    driverName: "Bobur Mirzayev",
    date: "14.11.2026",
    liters: 280,
    pricePerLiter: 13000,
    totalCost: 3640000, // 3,640,000 UZS
    mileage: 111800,
    station: "UNG Petro (Samarqand trassa)",
    fuelType: "Dizel (Euro-5)",
  },
];

// ==========================================
// 8. MAINTENANCE (TEXNIK XIZMAT)
// ==========================================
export const mockMaintenanceRecords: MaintenanceRecordDemo[] = [
  {
    id: "mnt-001",
    vehiclePlate: "01 A 777 AA",
    vehicleModel: "Mercedes Actros",
    type: "Moy almashtirish (Oil change)",
    description: "Dvigatel sintetik moyi (Mobil Delvac 10W-40), yog' va havo filtrlari to'liq yangilandi",
    serviceDate: "10.11.2026",
    nextServiceDate: "10.02.2027",
    serviceCost: 1850000,
    mileage: 146500,
    nextMileage: 165000,
    technician: "Jamshid Rustamov",
    status: "completed",
  },
  {
    id: "mnt-002",
    vehiclePlate: "01 B 456 BB",
    vehicleModel: "MAN TGX",
    type: "Dvigatel diagnostikasi (Engine inspection)",
    description: "Silindrlar kompressiyasi tekshirildi, yonilg'i purkagichlar (forsunka) stendda sozlanmoqda",
    serviceDate: "18.11.2026",
    nextServiceDate: "25.11.2026",
    serviceCost: 3200000,
    mileage: 185400,
    nextMileage: 200000,
    technician: "Shavkat Mahmudov",
    status: "in_progress",
  },
  {
    id: "mnt-003",
    vehiclePlate: "01 C 123 CC",
    vehicleModel: "Isuzu NPR",
    type: "Shinalarni almashtirish (Tire replacement)",
    description: "6 dona yangi qishki Bridgestone shinalarini o'rnatish, g'ildiraklar balansi va razval-sxojdeniye",
    serviceDate: "22.11.2026",
    nextServiceDate: "22.05.2027",
    serviceCost: 5600000,
    mileage: 96800,
    nextMileage: 130000,
    technician: "Akmal Saidov",
    status: "scheduled",
  },
  {
    id: "mnt-004",
    vehiclePlate: "01 D 890 DD",
    vehicleModel: "Volvo FH16",
    type: "Tormoz tizimi ta'miri",
    description: "Old va orqa diskli tormoz kolodkalarini almashtirish, pnevmatik tizim germetikligini tekshirish",
    serviceDate: "05.11.2026",
    nextServiceDate: "05.03.2027",
    serviceCost: 2400000,
    mileage: 60000,
    nextMileage: 85000,
    technician: "Jamshid Rustamov",
    status: "completed",
  },
  {
    id: "mnt-005",
    vehiclePlate: "10 E 321 EE",
    vehicleModel: "KamAZ 54901",
    type: "Xodovoy qism ta'miri",
    description: "Old ressor vtulkalari, amortizatorlar va rul tyagalari sharnirlarini profilaktik yangilash",
    serviceDate: "24.11.2026",
    nextServiceDate: "24.03.2027",
    serviceCost: 2900000,
    mileage: 134100,
    nextMileage: 155000,
    technician: "Shavkat Mahmudov",
    status: "scheduled",
  },
];

// ==========================================
// 9. REPORTS DATA (HISOBOTLAR)
// ==========================================
export const mockMonthlyPerformance = [
  { oy: "Iyun", daromad: 152000000, xarajat: 41200000, yetkazilgan: 124, reja: 120 },
  { oy: "Iyul", daromad: 161000000, xarajat: 43500000, yetkazilgan: 132, reja: 130 },
  { oy: "Avgust", daromad: 172000000, xarajat: 46800000, yetkazilgan: 141, reja: 138 },
  { oy: "Sentabr", daromad: 179000000, xarajat: 48300000, yetkazilgan: 148, reja: 145 },
  { oy: "Oktabr", daromad: 183500000, xarajat: 49700000, yetkazilgan: 152, reja: 150 },
  { oy: "Noyabr", daromad: 185000000, xarajat: 50650000, yetkazilgan: 156, reja: 155 },
];

export const mockVehicleStatusDistribution = [
  { name: "Faol (Yo'nalishda)", value: 18, color: "#10b981", percent: "75%" },
  { name: "Texnik ta'mirda", value: 3, color: "#f59e0b", percent: "12.5%" },
  { name: "Garajda (Bo'sh)", value: 3, color: "#3b82f6", percent: "12.5%" },
];

export const mockShipmentStatusDistribution = [
  { name: "Yetkazilgan", value: 30, color: "#10b981" },
  { name: "Yetkazilmoqda (Yo'lda)", value: 12, color: "#3b82f6" },
  { name: "Kutilmoqda", value: 6, color: "#f59e0b" },
];

export const mockExpensesBreakdown = [
  { name: "Yoqilg'i-moylash (GSM)", amount: 24500000, percent: "48.4%", color: "#3b82f6" },
  { name: "Texnik xizmat va ehtiyot qismlar", amount: 15950000, percent: "31.5%", color: "#f59e0b" },
  { name: "Yo'l to'lovlari va sug'urta", amount: 5800000, percent: "11.5%", color: "#10b981" },
  { name: "Boshqa operatsion xarajatlar", amount: 4400000, percent: "8.6%", color: "#8b5cf6" },
];

export const mockDriverLeaderboard = [
  { name: "Aziz Karimov", trips: 142, rating: 4.9, onTimeRate: "99.2%", efficiency: "A+" },
  { name: "Otabek Qodirov", trips: 184, rating: 4.9, onTimeRate: "98.9%", efficiency: "A+" },
  { name: "Jasur Umarov", trips: 115, rating: 4.8, onTimeRate: "98.1%", efficiency: "A" },
  { name: "Bobur Mirzayev", trips: 139, rating: 4.8, onTimeRate: "97.8%", efficiency: "A" },
  { name: "Sardor Rasulov", trips: 98, rating: 4.7, onTimeRate: "96.5%", efficiency: "B+" },
];
