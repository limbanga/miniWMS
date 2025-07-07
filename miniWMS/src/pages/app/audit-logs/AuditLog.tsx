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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    FileText,
    Search,
    Calendar,
    User,
    Download,
    Shield,
    AlertTriangle,
    CheckCircle,
    Clock,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

interface AuditLogEntry {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    resource: string;
    resourceId: string;
    details: string;
    ipAddress: string;
    userAgent: string;
    status: "success" | "failed" | "warning";
    module:
    | "products"
    | "inventory"
    | "users"
    | "suppliers"
    | "categories"
    | "locations";
}

const sampleAuditLogs: AuditLogEntry[] = [
    {
        id: "1",
        timestamp: "2024-01-15 14:30:25",
        user: "admin",
        action: "CREATE",
        resource: "Product",
        resourceId: "WH-001",
        details: 'Tạo sản phẩm mới "Laptop Dell XPS 13"',
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "success",
        module: "products",
    },
    {
        id: "2",
        timestamp: "2024-01-15 14:25:10",
        user: "staff001",
        action: "UPDATE",
        resource: "Inventory",
        resourceId: "IMP-2024-001",
        details: "Cập nhật phiếu nhập kho - thêm 50 sản phẩm",
        ipAddress: "192.168.1.101",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "success",
        module: "inventory",
    },
    {
        id: "3",
        timestamp: "2024-01-15 14:20:45",
        user: "staff002",
        action: "DELETE",
        resource: "Product",
        resourceId: "WH-999",
        details: 'Xóa sản phẩm "Sản phẩm test"',
        ipAddress: "192.168.1.102",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        status: "success",
        module: "products",
    },
    {
        id: "4",
        timestamp: "2024-01-15 14:15:30",
        user: "staff001",
        action: "LOGIN",
        resource: "User",
        resourceId: "staff001",
        details: "Đăng nhập thành công vào hệ thống",
        ipAddress: "192.168.1.101",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "success",
        module: "users",
    },
    {
        id: "5",
        timestamp: "2024-01-15 14:10:15",
        user: "unknown",
        action: "LOGIN",
        resource: "User",
        resourceId: "unknown",
        details: "Thử đăng nhập với tài khoản không tồn tại",
        ipAddress: "192.168.1.200",
        userAgent: "Mozilla/5.0 (Linux; Android 10)",
        status: "failed",
        module: "users",
    },
    {
        id: "6",
        timestamp: "2024-01-15 14:05:00",
        user: "admin",
        action: "CREATE",
        resource: "User",
        resourceId: "staff003",
        details: 'Tạo tài khoản mới cho "Phạm Thị D"',
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "success",
        module: "users",
    },
    {
        id: "7",
        timestamp: "2024-01-15 13:55:20",
        user: "staff001",
        action: "EXPORT",
        resource: "Inventory",
        resourceId: "OUT-2024-001",
        details: "Tạo phiếu xuất kho cho khách hàng ABC",
        ipAddress: "192.168.1.101",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        status: "success",
        module: "inventory",
    },
    {
        id: "8",
        timestamp: "2024-01-15 13:50:45",
        user: "staff002",
        action: "UPDATE",
        resource: "Supplier",
        resourceId: "SUP-001",
        details: 'Cập nhật thông tin nhà cung cấp "Công ty XYZ"',
        ipAddress: "192.168.1.102",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        status: "warning",
        module: "suppliers",
    },
];

const actionColors = {
    CREATE: "bg-green-100 text-green-800 border-green-200",
    UPDATE: "bg-blue-100 text-blue-800 border-blue-200",
    DELETE: "bg-red-100 text-red-800 border-red-200",
    LOGIN: "bg-purple-100 text-purple-800 border-purple-200",
    LOGOUT: "bg-gray-100 text-gray-800 border-gray-200",
    EXPORT: "bg-orange-100 text-orange-800 border-orange-200",
    IMPORT: "bg-cyan-100 text-cyan-800 border-cyan-200",
};

const statusColors = {
    success: "bg-green-100 text-green-800 border-green-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

const moduleColors = {
    products: "bg-blue-100 text-blue-800 border-blue-200",
    inventory: "bg-green-100 text-green-800 border-green-200",
    users: "bg-purple-100 text-purple-800 border-purple-200",
    suppliers: "bg-orange-100 text-orange-800 border-orange-200",
    categories: "bg-pink-100 text-pink-800 border-pink-200",
    locations: "bg-cyan-100 text-cyan-800 border-cyan-200",
};

const getStatusIcon = (status: "success" | "failed" | "warning") => {
    switch (status) {
        case "success":
            return CheckCircle;
        case "failed":
            return AlertTriangle;
        case "warning":
            return Clock;
        default:
            return CheckCircle;
    }
};

export default function AuditLog() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedModule, setSelectedModule] = useState("all");
    const [selectedAction, setSelectedAction] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [logs] = useState<AuditLogEntry[]>(sampleAuditLogs);

    const filteredLogs = logs.filter((log) => {
        const matchesSearch =
            log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.resourceId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesModule =
            selectedModule === "all" || log.module === selectedModule;
        const matchesAction =
            selectedAction === "all" || log.action === selectedAction;
        const matchesStatus =
            selectedStatus === "all" || log.status === selectedStatus;

        return matchesSearch && matchesModule && matchesAction && matchesStatus;
    });

    const stats = {
        totalLogs: logs.length,
        successLogs: logs.filter((l) => l.status === "success").length,
        failedLogs: logs.filter((l) => l.status === "failed").length,
        warningLogs: logs.filter((l) => l.status === "warning").length,
    };

    const { user } = useAuthStore()
    const isAdmin = user?.role === "admin";

    if (!isAdmin) {
        return (
            <>
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
                    <div className="text-center py-20">
                        <Shield className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
                        <h1 className="text-2xl font-bold mb-4">Không có quyền truy cập</h1>
                        <p className="text-muted-foreground mb-6">
                            Bạn không có quyền truy cập vào nhật ký hệ thống.
                        </p>
                        <Button onClick={() => window.history.back()}>Quay lại</Button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground flex items-center">
                                <FileText className="w-8 h-8 mr-3 text-primary" />
                                Nhật ký Hệ thống
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Theo dõi tất cả hoạt động và thay đổi trong hệ thống
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <Button variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Xuất báo cáo
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Tổng log
                                    </p>
                                    <p className="text-2xl font-bold">{stats.totalLogs}</p>
                                </div>
                                <FileText className="w-8 h-8 text-primary" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Thành công
                                    </p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {stats.successLogs}
                                    </p>
                                </div>
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Thất bại
                                    </p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {stats.failedLogs}
                                    </p>
                                </div>
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Cảnh báo
                                    </p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {stats.warningLogs}
                                    </p>
                                </div>
                                <Clock className="w-8 h-8 text-yellow-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="lg:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder="Tìm kiếm theo người dùng, mô tả, tài nguyên..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={selectedModule} onValueChange={setSelectedModule}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Module" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả module</SelectItem>
                                    <SelectItem value="products">Sản phẩm</SelectItem>
                                    <SelectItem value="inventory">Nhập/Xuất</SelectItem>
                                    <SelectItem value="users">Người dùng</SelectItem>
                                    <SelectItem value="suppliers">Nhà cung cấp</SelectItem>
                                    <SelectItem value="categories">Danh mục</SelectItem>
                                    <SelectItem value="locations">Vị trí kho</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedAction} onValueChange={setSelectedAction}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Hành động" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả hành động</SelectItem>
                                    <SelectItem value="CREATE">Tạo mới</SelectItem>
                                    <SelectItem value="UPDATE">Cập nhật</SelectItem>
                                    <SelectItem value="DELETE">Xóa</SelectItem>
                                    <SelectItem value="LOGIN">Đăng nhập</SelectItem>
                                    <SelectItem value="LOGOUT">Đăng xuất</SelectItem>
                                    <SelectItem value="EXPORT">Xuất</SelectItem>
                                    <SelectItem value="IMPORT">Nhập</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Trạng thái" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                    <SelectItem value="success">Thành công</SelectItem>
                                    <SelectItem value="failed">Thất bại</SelectItem>
                                    <SelectItem value="warning">Cảnh báo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Audit Log Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Nhật ký hoạt động ({filteredLogs.length} kết quả)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Thời gian</TableHead>
                                        <TableHead>Người dùng</TableHead>
                                        <TableHead>Hành động</TableHead>
                                        <TableHead>Module</TableHead>
                                        <TableHead>Tài nguyên</TableHead>
                                        <TableHead>Mô tả</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                        <TableHead>IP</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredLogs.map((log) => {
                                        const StatusIcon = getStatusIcon(log.status);
                                        return (
                                            <TableRow key={log.id}>
                                                <TableCell>
                                                    <div className="flex items-center text-sm">
                                                        <Calendar className="w-3 h-3 mr-1 text-muted-foreground" />
                                                        {log.timestamp}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <User className="w-3 h-3 mr-1 text-muted-foreground" />
                                                        {log.user}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            actionColors[
                                                            log.action as keyof typeof actionColors
                                                            ]
                                                        }
                                                    >
                                                        {log.action}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={moduleColors[log.module]}
                                                    >
                                                        {log.module}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <p className="font-medium">{log.resource}</p>
                                                        <p className="text-xs text-muted-foreground font-mono">
                                                            {log.resourceId}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="max-w-xs">
                                                    <p className="truncate" title={log.details}>
                                                        {log.details}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={statusColors[log.status]}
                                                    >
                                                        <StatusIcon className="w-3 h-3 mr-1" />
                                                        {log.status === "success"
                                                            ? "Thành công"
                                                            : log.status === "failed"
                                                                ? "Thất bại"
                                                                : "Cảnh báo"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <p className="font-mono">{log.ipAddress}</p>
                                                        <p
                                                            className="text-xs text-muted-foreground truncate max-w-32"
                                                            title={log.userAgent}
                                                        >
                                                            {log.userAgent.split(" ")[0]}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
