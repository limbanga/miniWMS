import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  QrCode,
  Filter,
  Download,
  Eye,
  FolderOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatsCard } from "@/components/cards/StatsCard";

// ------------------------- Sample Data -------------------------

interface Product {
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

const sampleProducts: Product[] = [
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

// ------------------------- Utils -------------------------

const statusMap = {
  active: {
    label: "Hoạt động",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  "low-stock": {
    label: "Sắp hết",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  inactive: {
    label: "Hết hàng",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

// ------------------------- Components -------------------------

const ProductActions = ({ id }: { id: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
      <DropdownMenuItem>
        <Eye className="mr-2 h-4 w-4" />
        Xem chi tiết
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to={`/products/edit/${id}`}>
          <Edit className="mr-2 h-4 w-4" />
          Chỉnh sửa
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <QrCode className="mr-2 h-4 w-4" />
        Tạo QR Code
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/categories">
          <FolderOpen className="mr-2 h-4 w-4" />
          Quản lý danh mục
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red-600">
        <Trash2 className="mr-2 h-4 w-4" />
        Xóa
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// ------------------------- Main -------------------------

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState<Product[]>(sampleProducts);

  const filteredProducts = products.filter((product) =>
    [product.name, product.sku, product.category]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Package className="w-8 h-8 mr-3 text-primary" />
            Danh mục Sản phẩm
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý và theo dõi tất cả sản phẩm trong kho
          </p>
        </div>
        <Link to="/app/products/add">
          <Button className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          label="Tổng sản phẩm"
          value={products.length}
          icon={<Package className="w-8 h-8 text-primary" />}
        />
        <StatsCard
          label="Đang hoạt động"
          value={products.filter((p) => p.status === "active").length}
          color="text-green-600"
          icon={
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded-full" />
            </div>
          }
        />
        <StatsCard
          label="Sắp hết hàng"
          value={products.filter((p) => p.status === "low-stock").length}
          color="text-yellow-600"
          icon={
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-yellow-600 rounded-full" />
            </div>
          }
        />
        <StatsCard
          label="Tổng số lượng"
          value={products.reduce((sum, p) => sum + p.quantity, 0)}
          icon={
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
            </div>
          }
        />
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo tên, SKU hoặc danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Danh sách sản phẩm ({filteredProducts.length} kết quả)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Danh mục</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Cập nhật</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono">{product.sku}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      {product.quantity} {product.unit}
                    </TableCell>
                    <TableCell className="font-mono">{product.location}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusMap[product.status].className}
                      >
                        {statusMap[product.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{product.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <ProductActions id={product.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
