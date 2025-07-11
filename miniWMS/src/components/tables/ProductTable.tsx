import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2, QrCode, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

// Utils
const statusMap: Record<string, { label: string; className: string }> = {
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

// Actions Component
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

// Props Interface
interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  status: "active" | "low-stock" | "inactive";
  lastUpdated: string; // ISO string
}

interface Props {
  filteredProducts: Product[];
}

export default function ProductTable({ filteredProducts }: Props) {
  return (
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
                className={statusMap[product.status]?.className}
              >
                {statusMap[product.status]?.label}
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
  );
}
