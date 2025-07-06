import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    MapPin,
    CalendarDays,
    CheckCircle,
    XCircle,
    Plus,
    LandPlot,
    Layers,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCard } from "@/components/cards/StatsCard";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";

const mockZones = [
    {
        id: 1,
        name: "Khu A1",
        code: "Z-A1",
        type: "Lưu trữ lạnh",
        location: "Tầng 1 - Khu phía Bắc",
        status: "active",
        description: "Khu vực lưu trữ các sản phẩm đông lạnh",
        createdAt: "2024-05-01",
        updatedAt: "2024-07-01",
    },
];

export default function ZoneDetail() {
    const { warehouseId, zoneId } = useParams(); // URL: /zones/:id
    const [zone, setZone] = useState<any>(null);

    useEffect(() => {
        const found = mockZones.find((z) => z.id === Number(zoneId));
        if (found) {
            setZone(found);
        }
    }, [zoneId]);

    if (!zone) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-40 w-full" />
            </div>
        );
    }

    return (
        <div className="p-6 mx-auto space-y-6">
            <PageBreadcrumb
                items={[
                    { label: "Trang chủ", href: "/app" },
                    { label: "Kho hàng", href: "/app/warehouses" },
                    { label: "Chi tiết kho", href: `/app/warehouses/${warehouseId}` },
                    { label: "Chi tiết khu vực", isCurrent: true },
                ]}
            />
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold flex items-center">
                        <LandPlot className="w-8 h-8 mr-3 text-primary" />
                        Wh01 - {zone.name}
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Quản lý các kệ trong khu vực này để tối ưu hóa không gian lưu trữ và vận hành kho hàng.
                    </p>
                </div>
                <Link to="/app/zones/add">
                    <Button className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm khu vực
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    label="Tổng các kệ"
                    value={3}
                    icon={<Layers className="w-8 h-8 text-primary" />}
                />
                <StatsCard
                    label="Đang hoạt động"
                    value={1}
                    color="text-green-600"
                    icon={
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-green-600 rounded-full" />
                        </div>
                    }
                />
                <StatsCard
                    label="Bảo trì"
                    value={1}
                    color="text-red-600"
                    icon={
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-yellow-600 rounded-full" />
                        </div>
                    }
                />
                <StatsCard
                    label="Ngừng hoạt động"
                    value={1}
                    color="text-red-600"
                    icon={
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-600 rounded-full" />
                        </div>
                    }
                />
            </div>


            <Card>
                <CardHeader>
                    <CardTitle>Thông tin khu vực</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground">Mã khu vực</p>
                            <p className="font-medium">{zone.code}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Loại khu vực</p>
                            <p className="font-medium">{zone.type}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Vị trí</p>
                            <p className="font-medium">{zone.location}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Trạng thái</p>
                            <Badge variant="outline" className={zone.status === "active" ? "text-green-600 border-green-300" : "text-red-600 border-red-300"}>
                                {zone.status === "active" ? (
                                    <span className="flex items-center gap-1">
                                        <CheckCircle className="w-4 h-4" /> Hoạt động
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <XCircle className="w-4 h-4" /> Ngừng hoạt động
                                    </span>
                                )}
                            </Badge>
                        </div>
                        <div className="md:col-span-2">
                            <p className="text-sm text-muted-foreground">Mô tả</p>
                            <p>{zone.description || "Không có mô tả"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Ngày tạo</p>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                                {zone.createdAt}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Cập nhật lần cuối</p>
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                                {zone.updatedAt}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
