
export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  status: "active" | "inactive" | "low-stock";
  lastUpdated: string;
}

export const sampleProducts: Product[] = [
  {
    id: "1",
    sku: "WH-001",
    name: "Laptop Dell XPS 13",
    category: "Electronics",
    quantity: 45,
    unit: "cái",
    location: "A1-01-02",
    status: "active",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    sku: "WH-002",
    name: "Máy in Canon LBP2900",
    category: "Electronics",
    quantity: 12,
    unit: "cái",
    location: "A2-03-01",
    status: "active",
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    sku: "WH-003",
    name: "Giấy A4 Double A",
    category: "Office Supplies",
    quantity: 5,
    unit: "thùng",
    location: "B1-02-03",
    status: "low-stock",
    lastUpdated: "2024-01-13",
  },
  {
    id: "4",
    sku: "WH-004",
    name: "Bàn làm việc gỗ",
    category: "Furniture",
    quantity: 28,
    unit: "cái",
    location: "C1-01-01",
    status: "active",
    lastUpdated: "2024-01-12",
  },
  {
    id: "5",
    sku: "WH-005",
    name: "Khóa cửa thông minh",
    category: "Security",
    quantity: 0,
    unit: "cái",
    location: "A3-02-01",
    status: "inactive",
    lastUpdated: "2024-01-11",
  },
];