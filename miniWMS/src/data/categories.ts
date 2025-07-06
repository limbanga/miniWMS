// src/data/categories.ts

import type { Category } from "./types";

export const predefinedColors = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#F97316", // Orange
  "#EC4899", // Pink
  "#6B7280", // Gray
];

export const sampleCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Thiết bị điện tử và công nghệ",
    color: "#3B82F6",
    productCount: 45,
    status: "active",
    createdAt: "2023-06-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Office Supplies",
    description: "Văn phòng phẩm và thiết bị văn phòng",
    color: "#10B981",
    productCount: 128,
    status: "active",
    createdAt: "2023-06-20",
    updatedAt: "2024-01-12",
  },
  {
    id: "3",
    name: "Furniture",
    description: "Nội thất văn phòng và gia đình",
    color: "#F59E0B",
    productCount: 67,
    status: "active",
    createdAt: "2023-07-01",
    updatedAt: "2024-01-10",
  },
  {
    id: "4",
    name: "Security",
    description: "Thiết bị an ninh và bảo mật",
    color: "#EF4444",
    productCount: 23,
    status: "active",
    createdAt: "2023-07-15",
    updatedAt: "2024-01-08",
  },
  {
    id: "5",
    name: "Books",
    description: "Sách và tài liệu",
    color: "#8B5CF6",
    productCount: 89,
    status: "inactive",
    createdAt: "2023-08-01",
    updatedAt: "2023-12-15",
  },
];
