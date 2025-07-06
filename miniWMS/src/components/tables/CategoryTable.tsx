import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Package, Tag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Category } from "@/data/types";

export function CategoryTable({
  categories,
  onEdit,
  onToggleStatus,
  onDelete,
}: {
  categories: Category[];
  onEdit: (c: Category) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Danh mục</TableHead>
          <TableHead>Mô tả</TableHead>
          <TableHead>Sản phẩm</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Cập nhật</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }} />
                <div>
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {cat.id}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="max-w-xs truncate">{cat.description}</TableCell>
            <TableCell><Badge variant="outline">{cat.productCount} sản phẩm</Badge></TableCell>
            <TableCell>
              <Badge variant="outline" className={cat.status === "active" ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                {cat.status === "active" ? "Hoạt động" : "Không hoạt động"}
              </Badge>
            </TableCell>
            <TableCell>{cat.updatedAt}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEdit(cat)}><Edit className="mr-2" />Chỉnh sửa</DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to={`/products?category=${cat.id}`}><Package className="mr-2" />Xem sản phẩm</Link></DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleStatus(cat.id)}><Tag className="mr-2" />{cat.status === "active" ? "Vô hiệu hóa" : "Kích hoạt"}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={() => onDelete(cat.id)}><Trash2 className="mr-2" />Xóa</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
