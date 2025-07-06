// src/types.ts

export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "manager" | "staff";
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  supplier: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "discontinued";
  createdAt: string;
  updatedAt: string;
  sku: string; 
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  productCount: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}


export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxId?: string;
  category: string;
  status: "active" | "inactive" | "pending";
  totalOrders: number;
  totalAmount: number;
  lastOrder: string;
  createdAt: string;
  notes?: string;
}



export interface Warehouse {
  id: string;
  name: string;
  location: string;
  manager: string;
  contact: string;
  totalZones: number;
  totalShelves: number;
  totalProducts: number;
  status: "active" | "inactive" | "under_maintenance";
  createdAt: string;
  updatedAt: string;
}


export interface Zone {
  id: string;
  name: string;
  type: string;
  warehouseId: string;
  status: "active" | "inactive" | "maintenance";
  capacity: number;
  currentStock: number;
  temperature: number;
  humidity: number;
  lastActivity: string;
}

export interface Shelf {
  id: string;
  zoneId: string;
  name: string;
  status: "active" | "inactive" | "maintenance";
}

export interface ShelfLevel {
  id: string;
  shelfId: string;
  levelNumber: number;
  capacity: number;
  currentStock: number;
  status: "active" | "inactive" | "maintenance";
  productName?: string; // Optional, if the level is assigned to a specific product
}