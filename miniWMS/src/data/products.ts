import type { BaseType } from "./baseType";



export interface Product extends BaseType {
    sku: string;
    name: string;
    category: string;
    unit: string;
    expirable?: boolean;
}

export const sampleProducts: Product[] = [
    {
        id: "1",
        sku: "WH-001",
        name: "Laptop Dell XPS 13",
        category: "Electronics",
        unit: "cái",
        expirable: false,
    },
    {
        id: "2",
        sku: "WH-002",
        name: "Máy in Canon LBP2900",
        category: "Electronics",
        unit: "cái",
        expirable: false,
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
    },
    {
        id: "6",
        sku: "WH-006",
        name: "Sữa tươi tiệt trùng Vinamilk 1L",
        category: "Thực phẩm",
        unit: "thùng",
        expirable: true,
    },
    {
        id: "7",
        sku: "WH-007",
        name: "Khẩu trang y tế 4 lớp",
        category: "Y tế",
        unit: "hộp",
        expirable: true,
    },
];