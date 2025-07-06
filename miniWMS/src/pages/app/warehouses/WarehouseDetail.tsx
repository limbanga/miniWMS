import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  MapPin,
  Package,
  PieChart,
  Settings,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Users,
  Warehouse,
  Zap,
  Target,
  Truck,
  ClipboardList,
  Thermometer,
  Shield,
  Eye,
  ArrowRight,
  RefreshCw,
  Bell,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

// Real-time warehouse data simulation
const useWarehouseData = () => {
  const [data, setData] = useState({
    overview: {
      totalCapacity: 50000,
      currentStock: 32150,
      availableSpace: 17850,
      utilizationRate: 64.3,
      totalProducts: 1247,
      activeOrders: 89,
      pendingShipments: 23,
      alerts: 5,
    },
    zones: [
      {
        id: "A",
        name: "Zone A",
        type: "Điện tử",
        capacity: 15000,
        current: 12300,
        temperature: 22,
        humidity: 45,
        status: "normal",
        lastActivity: "5 phút trước",
      },
      {
        id: "B",
        name: "Zone B",
        type: "Văn phòng phẩm",
        capacity: 12000,
        current: 8900,
        temperature: 24,
        humidity: 50,
        status: "normal",
        lastActivity: "12 phút trước",
      },
      {
        id: "C",
        name: "Zone C",
        type: "Thực phẩm",
        capacity: 10000,
        current: 6800,
        temperature: 4,
        humidity: 80,
        status: "cold",
        lastActivity: "2 phút trước",
      },
      {
        id: "D",
        name: "Zone D",
        type: "Hóa chất",
        capacity: 8000,
        current: 4150,
        temperature: 18,
        humidity: 35,
        status: "hazmat",
        lastActivity: "8 phút trước",
      },
    ],
    activities: [
      {
        id: 1,
        type: "inbound",
        title: "Nhập kho",
        description: "Nhận 500 sản phẩm từ Samsung",
        zone: "Zone A",
        time: "2 phút trước",
        status: "completed",
      },
      {
        id: 2,
        type: "outbound",
        title: "Xuất kho",
        description: "Giao 120 sản phẩm đơn hàng #12345",
        zone: "Zone B",
        time: "5 phút trước",
        status: "processing",
      },
      {
        id: 3,
        type: "picking",
        title: "Picking",
        description: "Đang lấy hàng cho 3 đơn hàng",
        zone: "Zone A",
        time: "8 phút trước",
        status: "processing",
      },
      {
        id: 4,
        type: "maintenance",
        title: "Bảo trì",
        description: "Kiểm tra hệ thống làm lạnh Zone C",
        zone: "Zone C",
        time: "15 phút trước",
        status: "scheduled",
      },
    ],
    performance: {
      today: {
        inbound: 12,
        outbound: 18,
        picking: 156,
        putaway: 142,
        accuracy: 99.2,
        efficiency: 87.5,
      },
      thisWeek: {
        orders: 234,
        shipments: 189,
        returns: 12,
        satisfaction: 96.8,
      },
    },
    alerts: [
      {
        id: 1,
        type: "critical",
        message: "Zone C nhiệt độ vượt ngưỡng (6°C)",
        time: "3 phút trước",
      },
      {
        id: 2,
        type: "warning",
        message: "Sắp hết vị trí trong Zone A (95% đầy)",
        time: "10 phút trước",
      },
      {
        id: 3,
        type: "info",
        message: "Đơn hàng #12347 sẵn sàng xuất kho",
        time: "15 phút trước",
      },
    ],
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        overview: {
          ...prev.overview,
          currentStock:
            prev.overview.currentStock + Math.floor(Math.random() * 20) - 10,
          activeOrders:
            prev.overview.activeOrders + Math.floor(Math.random() * 4) - 2,
        },
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return data;
};

export default function WarehouseDetail() {
  const data = useWarehouseData();
  const [selectedTab, setSelectedTab] = useState("overview");

  const getZoneStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800 border-green-200";
      case "cold":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "hazmat":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "inbound":
        return <Package className="w-4 h-4 text-green-600" />;
      case "outbound":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "picking":
        return <ClipboardList className="w-4 h-4 text-purple-600" />;
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

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-l-red-500 bg-red-50";
      case "warning":
        return "border-l-yellow-500 bg-yellow-50";
      case "info":
        return "border-l-blue-500 bg-blue-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center">
                <Warehouse className="w-8 h-8 mr-3 text-primary" />
                Quản lý Kho
              </h1>
              <p className="text-muted-foreground mt-2">
                Giám sát và quản lý hoạt động kho hàng theo thời gian thực
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Làm mới
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt
              </Button>
              <Button>
                <Bell className="w-4 h-4 mr-2" />
                Cảnh báo ({data.overview.alerts})
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tỷ lệ sử dụng
                  </p>
                  <p className="text-2xl font-bold">
                    {data.overview.utilizationRate}%
                  </p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.3% từ tuần trước
                  </p>
                </div>
                <div className="text-right">
                  <BarChart3 className="w-8 h-8 text-primary mb-2" />
                  <Progress
                    value={data.overview.utilizationRate}
                    className="h-2 w-16"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Đơn hàng hoạt động
                  </p>
                  <p className="text-2xl font-bold">
                    {data.overview.activeOrders}
                  </p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    23 chờ xử lý
                  </p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tổng sản phẩm
                  </p>
                  <p className="text-2xl font-bold">
                    {data.overview.totalProducts.toLocaleString()}
                  </p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <Package className="w-3 h-3 mr-1" />
                    {data.overview.currentStock.toLocaleString()} trong kho
                  </p>
                </div>
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Hiệu suất hôm nay
                  </p>
                  <p className="text-2xl font-bold">
                    {data.performance.today.efficiency}%
                  </p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <Target className="w-3 h-3 mr-1" />
                    Độ chính xác {data.performance.today.accuracy}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="zones">Khu vực</TabsTrigger>
            <TabsTrigger value="operations">Hoạt động</TabsTrigger>
            <TabsTrigger value="analytics">Phân tích</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Capacity Overview */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Sức chứa kho
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tổng sức chứa</span>
                      <span className="text-sm text-muted-foreground">
                        {data.overview.totalCapacity.toLocaleString()} sản phẩm
                      </span>
                    </div>
                    <Progress
                      value={data.overview.utilizationRate}
                      className="h-4"
                    />
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-lg font-bold text-green-600">
                          {data.overview.currentStock.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-600">Đã sử dụng</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-lg font-bold text-blue-600">
                          {data.overview.availableSpace.toLocaleString()}
                        </p>
                        <p className="text-sm text-blue-600">Còn trống</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-lg font-bold text-purple-600">
                          {data.overview.utilizationRate}%
                        </p>
                        <p className="text-sm text-purple-600">Tỷ lệ sử dụng</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Cảnh báo
                    </div>
                    <Badge variant="destructive">{data.alerts.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 border-l-4 rounded-r-lg ${getAlertColor(alert.type)}`}
                      >
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Hoạt động gần đây
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Xem tất cả
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={getActivityStatusColor(activity.status)}
                        >
                          {activity.zone}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zones" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.zones.map((zone) => (
                <Card key={zone.id} className="relative overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        {zone.name}
                      </div>
                      <Badge
                        variant="outline"
                        className={getZoneStatusColor(zone.status)}
                      >
                        {zone.type}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Capacity */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Sức chứa</span>
                          <span>
                            {zone.current.toLocaleString()}/
                            {zone.capacity.toLocaleString()}
                          </span>
                        </div>
                        <Progress
                          value={(zone.current / zone.capacity) * 100}
                          className="h-2"
                        />
                      </div>

                      {/* Environmental conditions */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="w-4 h-4 text-red-500" />
                          <div>
                            <p className="text-sm font-medium">
                              {zone.temperature}°C
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Nhiệt độ
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="text-sm font-medium">
                              {zone.humidity}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Độ ẩm
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Hoạt động cuối: {zone.lastActivity}
                          </p>
                          <Link to={`/locations/zone/${zone.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Chi tiết
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="operations" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Thao tác nhanh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link to="/inventory/receipt">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col items-center justify-center"
                      >
                        <Package className="w-6 h-6 mb-2" />
                        <span>Nhập kho</span>
                      </Button>
                    </Link>
                    <Link to="/inventory/outbound">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col items-center justify-center"
                      >
                        <Truck className="w-6 h-6 mb-2" />
                        <span>Xuất kho</span>
                      </Button>
                    </Link>
                    <Link to="/advanced">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col items-center justify-center"
                      >
                        <ClipboardList className="w-6 h-6 mb-2" />
                        <span>Picking</span>
                      </Button>
                    </Link>
                    <Link to="/locations">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col items-center justify-center"
                      >
                        <MapPin className="w-6 h-6 mb-2" />
                        <span>Vị trí</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Hiệu suất hôm nay</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Nhập kho</span>
                      <span className="font-bold">
                        {data.performance.today.inbound}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Xuất kho</span>
                      <span className="font-bold">
                        {data.performance.today.outbound}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Picking</span>
                      <span className="font-bold">
                        {data.performance.today.picking}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Putaway</span>
                      <span className="font-bold">
                        {data.performance.today.putaway}
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
                      <span className="text-sm">Đơn hàng</span>
                      <span className="font-bold">
                        {data.performance.thisWeek.orders}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Giao hàng</span>
                      <span className="font-bold">
                        {data.performance.thisWeek.shipments}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Trả hàng</span>
                      <span className="font-bold">
                        {data.performance.thisWeek.returns}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Hài lòng</span>
                      <span className="font-bold">
                        {data.performance.thisWeek.satisfaction}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Phân tích sức chứa</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 mx-auto mb-2" />
                      <p>Biểu đồ phân tích sức chứa</p>
                      <p className="text-sm">(Demo chart placeholder)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Xu hướng hoạt động</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Biểu đồ xu hướng hoạt động</p>
                      <p className="text-sm">(Demo chart placeholder)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hiệu suất theo zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.zones.map((zone) => (
                      <div key={zone.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {zone.name}
                          </span>
                          <span className="text-sm">
                            {((zone.current / zone.capacity) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress
                          value={(zone.current / zone.capacity) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Báo cáo nhanh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Báo cáo hàng ngày
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Báo cáo hiệu suất
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="w-4 h-4 mr-2" />
                      Báo cáo tồn kho
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Báo cáo xu hướng
                    </Button>
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
