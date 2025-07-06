import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
    Users,
    Search,
    Plus,
    MoreHorizontal,
    Edit,
    Trash2,
    Phone,
    Mail,
    MapPin,
    Filter,
    Download,
    Eye,
    Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import SupplierTable from "@/components/tables/SupplierTable";
import { FilterBar } from "@/components/FilterBar";
import { StatsCard } from "@/components/cards/StatsCard";

interface Supplier {
    id: string;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    taxId?: string;
    category: string;
    status: "active" | "inactive" | "pending";
    totalOrders: number;
    totalAmount: number;
    lastOrder: string;
    createdAt: string;
    notes?: string;
}

const sampleSuppliers: Supplier[] = [
    {
        id: "1",
        name: "Công ty TNHH ABC Technology",
        contactPerson: "Nguyễn Văn A",
        email: "contact@abc-tech.com",
        phone: "0123-456-789",
        address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
        taxId: "0123456789",
        category: "Electronics",
        status: "active",
        totalOrders: 25,
        totalAmount: 2500000000,
        lastOrder: "2024-01-15",
        createdAt: "2023-06-15",
        notes: "Nhà cung cấp chính cho thiết bị điện tử",
    },
    {
        id: "2",
        name: "Công ty Cổ phần XYZ Office",
        contactPerson: "Trần Thị B",
        email: "sales@xyz-office.com",
        phone: "0987-654-321",
        address: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
        taxId: "0987654321",
        category: "Office Supplies",
        status: "active",
        totalOrders: 18,
        totalAmount: 850000000,
        lastOrder: "2024-01-12",
        createdAt: "2023-08-20",
        notes: "Văn phòng phẩm chất lượng cao",
    },
    {
        id: "3",
        name: "Doanh nghiệp DEF Furniture",
        contactPerson: "Lê Văn C",
        email: "info@def-furniture.vn",
        phone: "0369-258-147",
        address: "789 Đường Võ Văn Tần, Quận 7, TP.HCM",
        category: "Furniture",
        status: "pending",
        totalOrders: 5,
        totalAmount: 320000000,
        lastOrder: "2024-01-08",
        createdAt: "2023-12-01",
        notes: "Chuyên nội thất văn phòng",
    },
    {
        id: "4",
        name: "Security Solutions Ltd",
        contactPerson: "Phạm Văn D",
        email: "contact@security-sol.com",
        phone: "0456-789-123",
        address: "321 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM",
        taxId: "0456789123",
        category: "Security",
        status: "active",
        totalOrders: 12,
        totalAmount: 680000000,
        lastOrder: "2024-01-10",
        createdAt: "2023-09-10",
    },
    {
        id: "5",
        name: "Green Supply Co.",
        contactPerson: "Hoàng Thị E",
        email: "hello@green-supply.vn",
        phone: "0789-123-456",
        address: "654 Đường Pasteur, Quận 1, TP.HCM",
        category: "Others",
        status: "inactive",
        totalOrders: 8,
        totalAmount: 150000000,
        lastOrder: "2023-11-20",
        createdAt: "2023-05-15",
        notes: "Tạm ngưng hợp tác",
    },
];

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

export default function Suppliers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suppliers] = useState<Supplier[]>(sampleSuppliers);

    const filteredSuppliers = suppliers.filter(
        (supplier) =>
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const stats = {
        totalSuppliers: suppliers.length,
        activeSuppliers: suppliers.filter((s) => s.status === "active").length,
        pendingSuppliers: suppliers.filter((s) => s.status === "pending").length,
        totalOrders: suppliers.reduce((sum, s) => sum + s.totalOrders, 0),
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground flex items-center">
                                <Users className="w-8 h-8 mr-3 text-primary" />
                                Quản lý Nhà cung cấp
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Quản lý thông tin và hợp tác với các nhà cung cấp
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Link to="/suppliers/add">
                                <Button className="bg-primary hover:bg-primary/90">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Thêm nhà cung cấp
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        label="Tổng nhà cung cấp"
                        value={stats.totalSuppliers}
                        icon={<Users className="w-8 h-8 text-primary" />}
                    />
                    <StatsCard
                        label="Đang hoạt động"
                        value={stats.activeSuppliers}
                        icon={
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                            </div>
                        }
                        color="text-green-600"
                    />
                    <StatsCard
                        label="Chờ duyệt"
                        value={stats.pendingSuppliers}
                        icon={
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                            </div>
                        }
                        color="text-yellow-600"
                    />
                    <StatsCard
                        label="Tổng đơn hàng"
                        value={stats.totalOrders}
                        icon={<Package className="w-8 h-8 text-blue-600" />}
                    />
                </div>

                {/* Search and Filters */}
                <FilterBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                {/* Suppliers Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Danh sách nhà cung cấp ({filteredSuppliers.length} kết quả)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <SupplierTable suppliers={filteredSuppliers} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
