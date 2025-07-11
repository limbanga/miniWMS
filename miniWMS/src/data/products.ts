import type { BaseType } from "./baseType";
import { sampleTags, type Tag } from "./tags";



export interface Product extends BaseType {
    sku: string;
    name: string;
    category: string;
    unit: string;
    expirable?: boolean;
    tags?: Tag[]; // Optional tags for additional categorization
}


export const sampleProducts: Product[] = [
  {
    id: "1",
    sku: "WH-001",
    name: "Laptop Dell XPS 13",
    category: "Electronics",
    unit: "cái",
    expirable: false,
    tags: [sampleTags[1], sampleTags[2]], // Hàng dễ vỡ, Giá trị cao
  },
  {
    id: "2",
    sku: "WH-002",
    name: "Máy in Canon LBP2900",
    category: "Electronics",
    unit: "cái",
    expirable: false,
    tags: [sampleTags[2]], // Giá trị cao
  },
  {
    id: "3",
    sku: "WH-003",
    name: "Giấy A4 Double A",
    category: "Office Supplies",
    unit: "thùng",
    expirable: false,
  },
  {
    id: "4",
    sku: "WH-004",
    name: "Bàn làm việc gỗ",
    category: "Furniture",
    unit: "cái",
    expirable: false,
  },
  {
    id: "5",
    sku: "WH-005",
    name: "Khóa cửa thông minh",
    category: "Security",
    unit: "cái",
    expirable: false,
    tags: [sampleTags[2]], // Giá trị cao
  },
  {
    id: "6",
    sku: "WH-006",
    name: "Sữa tươi tiệt trùng Vinamilk 1L",
    category: "Thực phẩm",
    unit: "thùng",
    expirable: true,
    tags: [sampleTags[0]], // Bảo quản lạnh
  },
  {
    id: "7",
    sku: "WH-007",
    name: "Khẩu trang y tế 4 lớp",
    category: "Y tế",
    unit: "hộp",
    expirable: true,
    tags: [sampleTags[0]], // Bảo quản lạnh
  },
];
