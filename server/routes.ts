import type { Express } from "express";
import { type Server } from "http";
import { storage } from "./storage";
import {
  insertVehicleSchema,
  insertDriverSchema,
  insertShipmentSchema,
  insertRouteSchema,
  insertFuelRecordSchema,
  insertMaintenanceRecordSchema
} from "@shared/schema";

export async function registerRoutes(_httpServer: Server, app: Express): Promise<Server> {
  // 1. Dashboard Stats
  app.get("/api/dashboard/stats", async (_req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 2. Vehicles API
  app.get("/api/vehicles", async (_req, res) => {
    const vehicles = await storage.getVehicles();
    res.json(vehicles);
  });

  app.get("/api/vehicles/:id", async (req, res) => {
    const vehicle = await storage.getVehicle(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  });

  app.post("/api/vehicles", async (req, res) => {
    try {
      const parsed = insertVehicleSchema.parse(req.body);
      const created = await storage.createVehicle(parsed);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.patch("/api/vehicles/:id", async (req, res) => {
    try {
      const updated = await storage.updateVehicle(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Vehicle not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.delete("/api/vehicles/:id", async (req, res) => {
    const success = await storage.deleteVehicle(req.params.id);
    if (!success) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Deleted successfully" });
  });

  // 3. Drivers API
  app.get("/api/drivers", async (_req, res) => {
    const drivers = await storage.getDrivers();
    res.json(drivers);
  });

  app.get("/api/drivers/:id", async (req, res) => {
    const driver = await storage.getDriver(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.json(driver);
  });

  app.post("/api/drivers", async (req, res) => {
    try {
      const parsed = insertDriverSchema.parse(req.body);
      const created = await storage.createDriver(parsed);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.patch("/api/drivers/:id", async (req, res) => {
    try {
      const updated = await storage.updateDriver(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Driver not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.delete("/api/drivers/:id", async (req, res) => {
    const success = await storage.deleteDriver(req.params.id);
    if (!success) return res.status(404).json({ message: "Driver not found" });
    res.json({ message: "Deleted successfully" });
  });

  // 4. Shipments API
  app.get("/api/shipments", async (_req, res) => {
    const shipments = await storage.getShipments();
    res.json(shipments);
  });

  app.get("/api/shipments/:id", async (req, res) => {
    const shipment = await storage.getShipment(req.params.id);
    if (!shipment) return res.status(404).json({ message: "Shipment not found" });
    res.json(shipment);
  });

  app.post("/api/shipments", async (req, res) => {
    try {
      const parsed = insertShipmentSchema.parse(req.body);
      const created = await storage.createShipment(parsed);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.patch("/api/shipments/:id", async (req, res) => {
    try {
      const updated = await storage.updateShipment(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Shipment not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.delete("/api/shipments/:id", async (req, res) => {
    const success = await storage.deleteShipment(req.params.id);
    if (!success) return res.status(404).json({ message: "Shipment not found" });
    res.json({ message: "Deleted successfully" });
  });

  // 5. Routes API
  app.get("/api/routes", async (_req, res) => {
    const routes = await storage.getRoutes();
    res.json(routes);
  });

  app.get("/api/routes/:id", async (req, res) => {
    const route = await storage.getRoute(req.params.id);
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  });

  app.post("/api/routes", async (req, res) => {
    try {
      const parsed = insertRouteSchema.parse(req.body);
      const created = await storage.createRoute(parsed);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.patch("/api/routes/:id", async (req, res) => {
    try {
      const updated = await storage.updateRoute(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Route not found" });
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.delete("/api/routes/:id", async (req, res) => {
    const success = await storage.deleteRoute(req.params.id);
    if (!success) return res.status(404).json({ message: "Route not found" });
    res.json({ message: "Deleted successfully" });
  });

  // 6. Fuel Records API
  app.get("/api/fuel", async (_req, res) => {
    const records = await storage.getFuelRecords();
    res.json(records);
  });

  app.post("/api/fuel", async (req, res) => {
    try {
      const parsed = insertFuelRecordSchema.parse(req.body);
      const created = await storage.createFuelRecord(parsed);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // 7. Maintenance Records API
  app.get("/api/maintenance", async (_req, res) => {
    const records = await storage.getMaintenanceRecords();
    res.json(records);
  });

  app.post("/api/maintenance", async (req, res) => {
    try {
      const parsed = insertMaintenanceRecordSchema.parse(req.body);
      const created = await storage.createMaintenanceRecord(parsed);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // 8. IoT Sensor Data Ingestion (from Chapter 3 of the dissertation)
  app.post("/api/sensor-data", async (req, res) => {
    try {
      const {
        vehicle_id,
        temperature,
        humidity,
        latitude,
        longitude,
        speed
      } = req.body;

      await storage.saveSensorData({
        vehicle_id,
        temperature,
        humidity,
        latitude,
        longitude,
        speed
      });

      res.json({ message: "Data saved" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/sensor-data", async (_req, res) => {
    const data = await storage.getSensorData();
    res.json(data);
  });

  return _httpServer;
}
