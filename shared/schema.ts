import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Vehicle status types
export const vehicleStatuses = ["active", "maintenance", "idle", "en_route"] as const;
export type VehicleStatus = typeof vehicleStatuses[number];

// Vehicle types
export const vehicleTypes = ["truck", "van", "car", "motorcycle"] as const;
export type VehicleType = typeof vehicleTypes[number];

// Vehicles table
export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  plateNumber: text("plate_number").notNull().unique(),
  type: text("type").notNull(), // truck, van, car, motorcycle
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  capacity: real("capacity").notNull(), // in kg
  fuelType: text("fuel_type").notNull(),
  status: text("status").notNull().default("idle"), // active, maintenance, idle, en_route
  currentLocation: text("current_location"),
  lastMaintenance: text("last_maintenance"),
  nextMaintenance: text("next_maintenance"),
  fuelLevel: integer("fuel_level").default(100), // percentage
  mileage: integer("mileage").default(0),
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
});

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;

// Driver status types
export const driverStatuses = ["available", "on_duty", "off_duty", "on_leave"] as const;
export type DriverStatus = typeof driverStatuses[number];

// Drivers table
export const drivers = pgTable("drivers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  licenseNumber: text("license_number").notNull().unique(),
  licenseExpiry: text("license_expiry").notNull(),
  status: text("status").notNull().default("available"), // available, on_duty, off_duty, on_leave
  assignedVehicleId: varchar("assigned_vehicle_id"),
  rating: real("rating").default(5.0),
  totalTrips: integer("total_trips").default(0),
  totalDistance: integer("total_distance").default(0), // in km
  joinDate: text("join_date").notNull(),
});

export const insertDriverSchema = createInsertSchema(drivers).omit({
  id: true,
});

export type InsertDriver = z.infer<typeof insertDriverSchema>;
export type Driver = typeof drivers.$inferSelect;

// Shipment status types
export const shipmentStatuses = ["pending", "picked_up", "in_transit", "delivered", "delayed", "cancelled"] as const;
export type ShipmentStatus = typeof shipmentStatuses[number];

// Priority types
export const priorityTypes = ["low", "medium", "high", "urgent"] as const;
export type Priority = typeof priorityTypes[number];

// Shipments table
export const shipments = pgTable("shipments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  trackingNumber: text("tracking_number").notNull().unique(),
  senderName: text("sender_name").notNull(),
  senderAddress: text("sender_address").notNull(),
  senderPhone: text("sender_phone").notNull(),
  receiverName: text("receiver_name").notNull(),
  receiverAddress: text("receiver_address").notNull(),
  receiverPhone: text("receiver_phone").notNull(),
  weight: real("weight").notNull(), // in kg
  description: text("description"),
  status: text("status").notNull().default("pending"),
  priority: text("priority").notNull().default("medium"),
  assignedDriverId: varchar("assigned_driver_id"),
  assignedVehicleId: varchar("assigned_vehicle_id"),
  pickupDate: text("pickup_date").notNull(),
  estimatedDelivery: text("estimated_delivery").notNull(),
  actualDelivery: text("actual_delivery"),
  notes: text("notes"),
  price: real("price").notNull(),
});

export const insertShipmentSchema = createInsertSchema(shipments).omit({
  id: true,
});

export type InsertShipment = z.infer<typeof insertShipmentSchema>;
export type Shipment = typeof shipments.$inferSelect;

// Routes table
export const routes = pgTable("routes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  distance: real("distance").notNull(), // in km
  estimatedTime: integer("estimated_time").notNull(), // in minutes
  waypoints: text("waypoints"), // JSON string of waypoints
  isActive: boolean("is_active").notNull().default(true),
  assignedVehicleId: varchar("assigned_vehicle_id"),
  assignedDriverId: varchar("assigned_driver_id"),
  status: text("status").notNull().default("pending"), // pending, in_progress, completed
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  id: true,
});

export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type Route = typeof routes.$inferSelect;

// Fuel Records table
export const fuelRecords = pgTable("fuel_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleId: varchar("vehicle_id").notNull(),
  driverId: varchar("driver_id").notNull(),
  date: text("date").notNull(),
  liters: real("liters").notNull(),
  pricePerLiter: real("price_per_liter").notNull(),
  totalCost: real("total_cost").notNull(),
  mileage: integer("mileage").notNull(),
  station: text("station"),
});

export const insertFuelRecordSchema = createInsertSchema(fuelRecords).omit({
  id: true,
});

export type InsertFuelRecord = z.infer<typeof insertFuelRecordSchema>;
export type FuelRecord = typeof fuelRecords.$inferSelect;

// Maintenance Records table
export const maintenanceRecords = pgTable("maintenance_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleId: varchar("vehicle_id").notNull(),
  date: text("date").notNull(),
  type: text("type").notNull(), // oil_change, tire, brake, engine, etc.
  description: text("description").notNull(),
  cost: real("cost").notNull(),
  mileage: integer("mileage").notNull(),
  nextMaintenanceMileage: integer("next_maintenance_mileage"),
  technician: text("technician"),
});

export const insertMaintenanceRecordSchema = createInsertSchema(maintenanceRecords).omit({
  id: true,
});

export type InsertMaintenanceRecord = z.infer<typeof insertMaintenanceRecordSchema>;
export type MaintenanceRecord = typeof maintenanceRecords.$inferSelect;

// Dashboard Stats type (computed)
export interface DashboardStats {
  totalVehicles: number;
  activeVehicles: number;
  totalDrivers: number;
  availableDrivers: number;
  totalShipments: number;
  pendingShipments: number;
  inTransitShipments: number;
  deliveredShipments: number;
  totalRoutes: number;
  activeRoutes: number;
  monthlyRevenue: number;
  monthlyDeliveries: number;
  averageDeliveryTime: number;
  fuelCostsThisMonth: number;
  maintenanceCostsThisMonth: number;
}
