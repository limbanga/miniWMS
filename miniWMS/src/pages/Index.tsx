// src/pages/Index.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Package,
    MapPin,
    RefreshCw,
    QrCode,
    BarChart3,
    Shield,
    Zap,
    Users,
    ArrowRight,
    CheckCircle,
    Truck,
    Database,
    Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import FloatingChatButton from "@/components/buttons/FloatingChatButton";

const features = [
    {
        icon: Package,
        title: "Quản lý Sản phẩm",
        description:
            "Tạo, chỉnh sửa và theo dõi danh mục sản phẩm với mã SKU, mô tả chi tiết và thông tin kỹ thuật.",
        href: "/products",
    },
    {
        icon: MapPin,
        title: "Vị trí Lưu trữ",
        description:
            "Quản lý cấu trúc kho theo zone, shelf, level với bản đồ trực quan và tối ưu hóa không gian.",
        href: "/locations",
    },
    {
        icon: RefreshCw,
        title: "Nhập/Xuất Kho",
        description:
            "Tạo phiếu nhập/xuất, theo dõi luồng hàng hóa và cập nhật tồn kho theo thời gian thực.",
        href: "/inventory",
    },
    {
        icon: QrCode,
        title: "QR & Mã vạch",
        description:
            "Tạo và quét mã QR/barcode cho sản phẩm, tăng tốc độ xử lý và giảm sai sót.",
        href: "/qr-demo",
    },
    {
        icon: BarChart3,
        title: "Thống kê Dashboard",
        description:
            "Báo cáo tồn kho, biểu đồ xu hướng và phân tích hiệu suất hoạt động kho.",
        href: "/dashboard",
    },
    {
        icon: Smartphone,
        title: "Mobile Friendly",
        description:
            "Giao diện tối ưu cho thiết bị di động, hỗ trợ nhân viên kho làm việc mọi lúc mọi nơi.",
        href: "/mobile",
    },
];

const benefits = [
    {
        icon: Zap,
        title: "Tăng Hiệu suất",
        description: "Giảm 70% thời gian xử lý nhập/xuất kho",
    },
    {
        icon: Shield,
        title: "Chính xác cao",
        description: "Giảm 95% sai sót trong quản lý tồn kho",
    },
    {
        icon: Users,
        title: "Dễ sử dụng",
        description: "Giao diện trực quan, đào tạo nhanh chóng",
    },
    {
        icon: Database,
        title: "Dữ liệu thời gian thực",
        description: "Cập nhật tức thì, theo dõi liên tục",
    },
];

const stats = [
    { label: "Sản phẩm được quản lý", value: "10,000+" },
    { label: "Giao dịch mỗi ngày", value: "1,500+" },
    { label: "Độ chính xác", value: "99.8%" },
    { label: "Thời gian tiết kiệm", value: "70%" },
];

export default function Index() {
    
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                            <Truck className="w-4 h-4 mr-2" />
                            Hệ thống quản lý kho hiện đại
                        </Badge>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                            <span className="text-primary">Mini</span>
                            <span className="text-foreground">WMS</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                            Giải pháp quản lý kho thông minh dành cho doanh nghiệp logistics.
                            Tối ưu hóa quy trình, nâng cao hiệu suất và giảm thiểu sai sót
                            trong quản lý hàng tồn kho.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/products">
                                <Button size="lg" className="text-lg px-8 py-3">
                                    <Package className="w-5 h-5 mr-2" />
                                    Khám phá Demo
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8 py-3"
                                >
                                    Liên hệ tư vấn
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-card">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Tính năng chính</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Hệ thống quản lý kho toàn diện với các module tích hợp, giúp tối
                            ưu hóa mọi khía cạnh trong vận hành kho bãi.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                            >
                                <CardHeader>
                                    <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">
                                        {feature.description}
                                    </p>
                                    <Link to={feature.href}>
                                        <Button
                                            variant="ghost"
                                            className="p-0 h-auto text-primary hover:text-primary/80"
                                        >
                                            Xem chi tiết
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20 bg-muted/30">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Lợi ích mang lại</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Nâng cao hiệu quả vận hành, giảm chi phí và tối ưu hóa quy trình
                            quản lý kho của doanh nghiệp.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <benefit.icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-muted-foreground">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-12">
                    <h2 className="text-4xl font-bold mb-6">
                        Sẵn sàng tối ưu hóa kho hàng của bạn?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Liên hệ ngay để được tư vấn và demo hệ thống MiniWMS phù hợp với nhu
                        cầu của doanh nghiệp.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="text-lg px-8 py-3"
                            >
                                Đăng ký Demo miễn phí
                            </Button>
                        </Link>
                        <Link to="/products">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="text-lg px-8 py-3"
                            >
                                Xem tính năng
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center mt-8 text-sm opacity-75">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Không cần tài khoản • Demo ngay lập tức • Hỗ trợ 24/7
                    </div>
                </div>
            </section>
            <FloatingChatButton />
        </>
    );
}
