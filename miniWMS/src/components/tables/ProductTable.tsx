import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    QrCode,
    FolderOpen,
    Check,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";

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

// Product interface đã tối giản
interface Product {
    id: string;
    sku: string;
    name: string;
    category: string;
    unit: string;
    expirable?: boolean;
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
                    <TableHead>Đơn vị</TableHead>
                    <TableHead>Có HSD</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell className="font-mono">{product.sku}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.unit}</TableCell>
                        <TableCell>{product.expirable ?
                            <Check className="text-green-600 size-4 inline" /> :
                            <X className="text-red-600 size-4 inline" />}
                        </TableCell>
                        <TableCell className="text-right">
                            <ProductActions id={product.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
