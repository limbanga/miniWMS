import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,

} from "lucide-react";
import type { Receipt } from "@/data/receipts";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Link } from "react-router-dom";

interface Props {
  receipts: Receipt[];
  onDelete?: (id: string) => void;
}

const getStatusStyle = (status: Receipt["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "processing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusLabel = (status: Receipt["status"]) => {
  switch (status) {
    case "completed":
      return "Hoàn tất";
    case "processing":
      return "Đang xử lý";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

export default function ReceiptTable({ receipts, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã phiếu</TableHead>
          <TableHead>Nhà cung cấp</TableHead>
          <TableHead>Số mặt hàng</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {receipts.map((r) => (
          <TableRow key={r.id}>
            <TableCell>{r.code}</TableCell>
            <TableCell>{r.supplierName}</TableCell>
            <TableCell>{r.totalItems}</TableCell>
            <TableCell>
              {format(new Date(r.createdAt), "dd/MM/yyyy HH:mm", {
                locale: vi,
              })}
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={getStatusStyle(r.status)}>
                {getStatusLabel(r.status)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to={`/warehouse/receipts/${r.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Xem chi tiết
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/warehouse/receipts/edit/${r.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete?.(r.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
