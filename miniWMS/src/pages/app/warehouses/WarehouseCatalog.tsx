import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Warehouse,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
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

interface Warehouse {
  id: string;
  name: string;
  code: string;
  location: string;
  status: "active" | "inactive";
  totalItems: number;
  lastUpdated: string;
}

const sampleWarehouses: Warehouse[] = [
  {
    id: "wh1",
    name: "Kho Tổng Hà Nội",
    code: "WH-HN",
    location: "Hà Nội",
    status: "active",
    totalItems: 1245,
    lastUpdated: "2024-06-01",
  },
  {
    id: "wh2",
    name: "Kho Miền Trung",
    code: "WH-MT",
    location: "Đà Nẵng",
    status: "inactive",
    totalItems: 0,
    lastUpdated: "2024-04-20",
  },
  {
    id: "wh3",
    name: "Kho Sài Gòn",
    code: "WH-SG",
    location: "TP. Hồ Chí Minh",
    status: "active",
    totalItems: 875,
    lastUpdated: "2024-06-10",
  },
];

// ------------------------- Utils -------------------------

const warehouseStatusMap = {
  active: {
    label: "Đang hoạt động",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  inactive: {
    label: "Ngừng hoạt động",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

// ------------------------- Components -------------------------

const WarehouseActions = ({ id }: { id: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
      <DropdownMenuItem>
        <Link to={`/app/warehouses/${id}`} className="flex items-center">
          <Eye className="mr-2 h-4 w-4" />
          Xem chi tiết
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to={`/warehouses/edit/${id}`}>
          <Edit className="mr-2 h-4 w-4" />
          Chỉnh sửa
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

export default function WarehouseCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [warehouses] = useState<Warehouse[]>(sampleWarehouses);

  const filtered = warehouses.filter((w) =>
    [w.name, w.code, w.location].join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Warehouse className="w-8 h-8 mr-3 text-primary" />
            Danh sách Kho hàng
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý các kho hàng của hệ thống
          </p>
        </div>
        <Link to="/app/warehouses/add">
          <Button className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Thêm kho hàng
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          label="Tổng số kho"
          value={warehouses.length}
          icon={<Warehouse className="w-8 h-8 text-primary" />}
        />
        <StatsCard
          label="Đang hoạt động"
          value={warehouses.filter((w) => w.status === "active").length}
          color="text-green-600"
          icon={<div className="w-3 h-3 bg-green-600 rounded-full" />}
        />
        <StatsCard
          label="Tổng số hàng hóa"
          value={warehouses.reduce((sum, w) => sum + w.totalItems, 0)}
          icon={<div className="w-3 h-3 bg-blue-600 rounded-full" />}
        />
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo tên, mã kho hoặc vị trí..."
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
            Danh sách kho ({filtered.length} kết quả)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã kho</TableHead>
                  <TableHead>Tên kho</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Số lượng hàng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Cập nhật</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((warehouse) => (
                  <TableRow key={warehouse.id}>
                    <TableCell className="font-mono">{warehouse.code}</TableCell>
                    <TableCell>{warehouse.name}</TableCell>
                    <TableCell>{warehouse.location}</TableCell>
                    <TableCell>{warehouse.totalItems}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={warehouseStatusMap[warehouse.status].className}
                      >
                        {warehouseStatusMap[warehouse.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{warehouse.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <WarehouseActions id={warehouse.id} />
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
