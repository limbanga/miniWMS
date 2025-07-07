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
    Edit,
    Package,
    Eye,
    Trash2,
    Phone,
    Mail,
    MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Supplier } from "@/data/types";

interface Props {
    suppliers: Supplier[];
    onEdit?: (s: Supplier) => void;
    onDelete?: (id: string) => void;
}

const getStatusColor = (status: Supplier["status"]) => {
    switch (status) {
        case "active":
            return "bg-green-100 text-green-800 border-green-200";
        case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
        case "inactive":
            return "bg-red-100 text-red-800 border-red-200";
        default:
            return "bg-gray-100 text-gray-800 border-gray-200";
    }
};

const getStatusText = (status: Supplier["status"]) => {
    switch (status) {
        case "active":
            return "Hoạt động";
        case "pending":
            return "Chờ duyệt";
        case "inactive":
            return "Không hoạt động";
        default:
            return status;
    }
};

export default function SupplierTable({ suppliers, onDelete }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nhà cung cấp</TableHead>
                    <TableHead>Liên hệ</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Đơn hàng</TableHead>
                    <TableHead>Giá trị</TableHead>
                    <TableHead>Đơn cuối</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {suppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                        <TableCell>
                            <div>
                                <p className="font-medium">{supplier.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {supplier.contactPerson}
                                </p>
                                {supplier.notes && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {supplier.notes}
                                    </p>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center">
                                    <Phone className="w-3 h-3 mr-1 text-muted-foreground" />
                                    {supplier.phone}
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-3 h-3 mr-1 text-muted-foreground" />
                                    {supplier.email}
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {supplier.address.split(",")[0]}...
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{supplier.category}</Badge>
                        </TableCell>
                        <TableCell className="text-center">{supplier.totalOrders}</TableCell>
                        <TableCell>{(supplier.totalAmount / 1_000_000).toFixed(0)}M VND</TableCell>
                        <TableCell>{supplier.lastOrder}</TableCell>
                        <TableCell>
                            <Badge
                                variant="outline"
                                className={getStatusColor(supplier.status)}
                            >
                                {getStatusText(supplier.status)}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Xem chi tiết
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to={`/suppliers/edit/${supplier.id}`}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Chỉnh sửa
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Package className="mr-2 h-4 w-4" />
                                        Lịch sử đơn hàng
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => onDelete?.(supplier.id)}
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
