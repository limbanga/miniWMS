// src/types.ts

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
