export interface Tag {
  id: string;
  name: string;         // Tên tag hiển thị, ví dụ: "Bảo quản lạnh"
  color?: string;       // Màu để hiển thị UI badge (tuỳ chọn)
  description?: string; // Mô tả ngắn về tag (tuỳ chọn)
}

export const sampleTags: Tag[] = [
  {
    id: "cold-storage",
    name: "Bảo quản lạnh",
    color: "blue",
  },
  {
    id: "fragile",
    name: "Hàng dễ vỡ",
    color: "red",
  },
  {
    id: "high-value",
    name: "Giá trị cao",
    color: "green"
  },
  {
    id: "flammable",
    name: "Dễ cháy nổ",
    color: "orange",
  },
  {
    id: "humidity-sensitive",
    name: "Kỵ ẩm",
    color: "teal",
  },
  {
    id: "oversize",
    name: "Kích thước lớn",
    color: "purple",
  },
  {
    id: "toxic",
    name: "Độc hại",
    color: "rose",
  },
  {
    id: "fast-moving",
    name: "Hàng luân chuyển nhanh",
    color: "green",
  },
  {
    id: "slow-moving",
    name: "Hàng luân chuyển chậm",
    color: "gray",
  },
  {
    id: "requires-inspection",
    name: "Cần kiểm tra",
    color: "amber",
  },
];
