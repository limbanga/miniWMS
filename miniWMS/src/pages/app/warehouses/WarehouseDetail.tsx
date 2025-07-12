import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Edit,
  MapPin,
  Building,
  Thermometer,
  Shield,
  Package,
  Users,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  Activity,
  TrendingUp,
  BarChart3,
  Settings,
  Download,
  Share2,
  Printer,
  ExternalLink,
} from "lucide-react";
import { PageBreadcrumb } from "@/components/breadcrumbs/page-breadcrumb";
import { ZoneCard } from "@/components/cards/ZoneCard";
import { getStatusColor } from "@/lib/getStatusColor";
import { getStatusText } from "@/lib/getStatusText";
import type { Zone } from "@/data/types";

interface WarehouseData {
  id: string;
  name: string;
  code: string;
  type: string;
  status: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  country: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  totalArea: number;
  storageArea: number;
  capacity: number;
  currentStock: number;
  height: number;
  loadingDocks: number;
  hasClimateControl: boolean;
  hasSecurity: boolean;
  hasFireSuppression: boolean;
  operatingHours: {
    start: string;
    end: string;
    weekends: boolean;
  };
  manager: string;
  managerPhone: string;
  managerEmail: string;
  emergencyContact: string;
  description: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivityData {
  id: string;
  type: "inbound" | "outbound" | "transfer" | "maintenance";
  description: string;
  zone: string;
  quantity: number;
  timestamp: string;
  status: "completed" | "processing" | "scheduled";
}

interface PerformanceData {
  today: {
    inbound: number;
    outbound: number;
    transfers: number;
    efficiency: number;
  };
  thisWeek: {
    totalOrders: number;
    completedOrders: number;
    accuracy: number;
    utilization: number;
  };
  thisMonth: {
    throughput: number;
    avgProcessingTime: number;
    customerSatisfaction: number;
    costPerUnit: number;
  };
}

// Sample data
const getSampleWarehouse = (id: string): WarehouseData => ({
  id,
  name: "Kho Hà Nội 1",
  code: "HN01",
  type: "distribution",
  status: "active",
  address: "123 Đường Giải Phóng",
  city: "Hà N��i",
  district: "Hoàng Mai",
  ward: "Hoàng Văn Thụ",
  country: "Vietnam",
  postalCode: "100000",
  latitude: "21.0285",
  longitude: "105.8542",
  totalArea: 15000,
  storageArea: 12000,
  capacity: 100000,
  currentStock: 75500,
  height: 12,
  loadingDocks: 8,
  hasClimateControl: true,
  hasSecurity: true,
  hasFireSuppression: true,
  operatingHours: {
    start: "08:00",
    end: "18:00",
    weekends: false,
  },
  manager: "Nguyễn Văn A",
  managerPhone: "0123456789",
  managerEmail: "manager@example.com",
  emergencyContact: "0987654321",
  description: "Kho phân phối chính tại Hà Nội",
  notes: "Kho được trang bị đầy đủ hệ thống an ninh và chữa cháy",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-15",
});

const getSampleZones = (): Zone[] => [
  {
    id: "1",
    name: "Zone A",
    type: "Điện tử",
    warehouseId: "1",
    capacity: 25000,
    currentStock: 18500,
    temperature: 22,
    humidity: 45,
    status: "active",
    lastActivity: "5 phút trước",
  },
  {
    id: "2",
    name: "Zone B",
    warehouseId: "2",
    type: "Văn phòng phẩm",
    capacity: 30000,
    currentStock: 22000,
    temperature: 24,
    humidity: 50,
    status: "active",
    lastActivity: "12 phút trước",
  },
  {
    id: "3",
    name: "Zone C",
    type: "Thực phẩm",
    warehouseId: "1",
    capacity: 15000,
    currentStock: 8500,
    temperature: 4,
    humidity: 80,
    status: "maintenance",
    lastActivity: "2 phút trước",
  },
  {
    id: "4",
    name: "Zone D",
    type: "Hóa chất",
    capacity: 30000,
    currentStock: 26500,
    temperature: 18,
    warehouseId: "2",
    humidity: 35,
    status: "active",
    lastActivity: "8 phút trước",
  },
];

const getSampleActivities = (): ActivityData[] => [
  {
    id: "1",
    type: "inbound",
    description: "Nhập 500 sản phẩm từ Samsung",
    zone: "Zone A",
    quantity: 500,
    timestamp: "2024-01-15 14:30",
    status: "completed",
  },
  {
    id: "2",
    type: "outbound",
    description: "Xuất 120 sản phẩm đơn hàng #12345",
    zone: "Zone B",
    quantity: 120,
    timestamp: "2024-01-15 14:15",
    status: "processing",
  },
  {
    id: "3",
    type: "transfer",
    description: "Chuyển hàng giữa Zone A và Zone B",
    zone: "Zone A → Zone B",
    quantity: 75,
    timestamp: "2024-01-15 13:45",
    status: "completed",
  },
  {
    id: "4",
    type: "maintenance",
    description: "Kiểm tra hệ thống làm lạnh",
    zone: "Zone C",
    quantity: 0,
    timestamp: "2024-01-15 13:00",
    status: "scheduled",
  },
];

const getSamplePerformance = (): PerformanceData => ({
  today: {
    inbound: 12,
    outbound: 18,
    transfers: 5,
    efficiency: 87.5,
  },
  thisWeek: {
    totalOrders: 156,
    completedOrders: 149,
    accuracy: 99.2,
    utilization: 75.5,
  },
  thisMonth: {
    throughput: 2450,
    avgProcessingTime: 24.5,
    customerSatisfaction: 96.8,
    costPerUnit: 2.35,
  },
});

export default function WarehouseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState<WarehouseData | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [performance, setPerformance] = useState<PerformanceData | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");

  useEffect(() => {
    if (id) {
      setWarehouse(getSampleWarehouse(id));
      setZones(getSampleZones());
      setActivities(getSampleActivities());
      setPerformance(getSamplePerformance());
    }
  }, [id]);



  const getActivityIcon = (type: string) => {
    switch (type) {
      case "inbound":
        return <Package className="w-4 h-4 text-green-600" />;
      case "outbound":
        return <Package className="w-4 h-4 text-blue-600" />;
      case "transfer":
        return <Activity className="w-4 h-4 text-purple-600" />;
      case "maintenance":
        return <Settings className="w-4 h-4 text-orange-600" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!warehouse) {
    return (
      <>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Đang tải thông tin kho...</p>
          </div>
        </div>
      </>
    );
  }

  const utilizationRate = (warehouse.currentStock / warehouse.capacity) * 100;

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <PageBreadcrumb
              items={[
                { label: "Trang chủ", href: "/app" },
                { label: "Kho hàng", href: "/app/warehouses" },
                { label: "Chi tiết kho", isCurrent: true },
              ]}
            />
          </div>
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between my-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <Building className="w-8 h-8 mr-3 text-primary" />
                {warehouse.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <Badge
                  variant="outline"
                  className={getStatusColor(warehouse.status)}
                >
                  {getStatusText(warehouse.status)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Mã kho: {warehouse.code}
                </span>
                <span className="text-sm text-muted-foreground">
                  Cập nhật: {warehouse.updatedAt}
                </span>
                <span className="text-sm text-muted-foreground">
                  Tạo: {warehouse.createdAt}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Chia sẻ
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                In
              </Button>
              <Button onClick={() => navigate(`/warehouse/edit/${id}`)}>
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tỷ lệ sử dụng
                  </p>
                  <p className="text-2xl font-bold">
                    {utilizationRate.toFixed(1)}%
                  </p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.3% từ tuần trước
                  </p>
                </div>
                <div className="text-right">
                  <BarChart3 className="w-8 h-8 text-primary mb-2" />
                  <Progress value={utilizationRate} className="h-2 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Sức chứa
                  </p>
                  <p className="text-2xl font-bold">
                    {warehouse.capacity.toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Package className="w-3 h-3 mr-1" />
                    {warehouse.currentStock.toLocaleString()} đang lưu trữ
                  </p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Diện tích
                  </p>
                  <p className="text-2xl font-bold">
                    {warehouse.totalArea.toLocaleString()}m²
                  </p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <Building className="w-3 h-3 mr-1" />
                    {warehouse.storageArea.toLocaleString()}m² lưu trữ
                  </p>
                </div>
                <Building className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Khu vực
                  </p>
                  <p className="text-2xl font-bold">{zones.length}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {zones.filter((z) => z.status === "active").length} hoạt
                    động
                  </p>
                </div>
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="zones">Khu vực</TabsTrigger>
            <TabsTrigger value="activities">Hoạt động</TabsTrigger>
            <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
            <TabsTrigger value="details">Chi tiết</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Warehouse Info */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Thông tin kho</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Loại kho
                        </Label>
                        <p className="font-medium">Kho phân phối</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Số bến bốc xếp
                        </Label>
                        <p className="font-medium">{warehouse.loadingDocks}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Chiều cao
                        </Label>
                        <p className="font-medium">{warehouse.height}m</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Giờ hoạt động
                        </Label>
                        <p className="font-medium">
                          {warehouse.operatingHours.start} -{" "}
                          {warehouse.operatingHours.end}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Địa chỉ
                      </Label>
                      <p className="font-medium">
                        {warehouse.address}, {warehouse.ward},{" "}
                        {warehouse.district}, {warehouse.city}
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Mô tả
                      </Label>
                      <p className="text-sm">{warehouse.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {warehouse.hasClimateControl && (
                        <Badge variant="outline" className="text-blue-600">
                          <Thermometer className="w-3 h-3 mr-1" />
                          Kiểm soát khí hậu
                        </Badge>
                      )}
                      {warehouse.hasSecurity && (
                        <Badge variant="outline" className="text-green-600">
                          <Shield className="w-3 h-3 mr-1" />
                          An ninh
                        </Badge>
                      )}
                      {warehouse.hasFireSuppression && (
                        <Badge variant="outline" className="text-red-600">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Chữa cháy
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin liên hệ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Quản lý kho
                      </Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{warehouse.manager}</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Điện thoại
                      </Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">
                          {warehouse.managerPhone}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Email
                      </Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">
                          {warehouse.managerEmail}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Khẩn cấp
                      </Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="font-medium">
                          {warehouse.emergencyContact}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Xem trên bản đồ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="zones" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {zones.map((zone) => (
                <Fragment key={zone.id}>

                  <ZoneCard
                    zone={zone}
                  />
                </Fragment>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <p className="font-medium">{activity.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{activity.zone}</span>
                            {activity.quantity > 0 && (
                              <>
                                <span>•</span>
                                <span>{activity.quantity} sản phẩm</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={getActivityStatusColor(activity.status)}
                        >
                          {activity.status === "completed"
                            ? "Hoàn thành"
                            : activity.status === "processing"
                              ? "Đang xử lý"
                              : "Đã lên lịch"}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            {performance && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Hôm nay
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Nhập kho
                        </span>
                        <span className="font-bold">
                          {performance.today.inbound}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Xuất kho
                        </span>
                        <span className="font-bold">
                          {performance.today.outbound}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Chuyển kho
                        </span>
                        <span className="font-bold">
                          {performance.today.transfers}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Hiệu suất
                        </span>
                        <span className="font-bold text-green-600">
                          {performance.today.efficiency}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tuần này</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Tổng đơn hàng
                        </span>
                        <span className="font-bold">
                          {performance.thisWeek.totalOrders}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Hoàn thành
                        </span>
                        <span className="font-bold">
                          {performance.thisWeek.completedOrders}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Độ chính xác
                        </span>
                        <span className="font-bold text-green-600">
                          {performance.thisWeek.accuracy}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Tỷ lệ sử dụng
                        </span>
                        <span className="font-bold">
                          {performance.thisWeek.utilization}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tháng này</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Throughput
                        </span>
                        <span className="font-bold">
                          {performance.thisMonth.throughput.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Thời gian xử lý
                        </span>
                        <span className="font-bold">
                          {performance.thisMonth.avgProcessingTime}h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Hài lòng KH
                        </span>
                        <span className="font-bold text-green-600">
                          {performance.thisMonth.customerSatisfaction}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Chi phí/đơn vị
                        </span>
                        <span className="font-bold">
                          ${performance.thisMonth.costPerUnit}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thông số kỹ thuật</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Tổng diện tích
                      </span>
                      <span className="font-medium">
                        {warehouse.totalArea.toLocaleString()} m²
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Diện tích lưu trữ
                      </span>
                      <span className="font-medium">
                        {warehouse.storageArea.toLocaleString()} m²
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sức chứa</span>
                      <span className="font-medium">
                        {warehouse.capacity.toLocaleString()} sản phẩm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chiều cao</span>
                      <span className="font-medium">{warehouse.height} m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bến bốc xếp</span>
                      <span className="font-medium">
                        {warehouse.loadingDocks}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vị trí & Tọa độ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Địa chỉ đầy đủ
                      </Label>
                      <p className="font-medium">
                        {warehouse.address}, {warehouse.ward},{" "}
                        {warehouse.district}, {warehouse.city},{" "}
                        {warehouse.country}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Mã bưu chính
                      </Label>
                      <p className="font-medium">{warehouse.postalCode}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Vĩ độ
                        </Label>
                        <p className="font-medium">{warehouse.latitude}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Kinh độ
                        </Label>
                        <p className="font-medium">{warehouse.longitude}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function Label({ className, children, ...props }: any) {
  return (
    <label className={`text-sm font-medium ${className || ""}`} {...props}>
      {children}
    </label>
  );
}
