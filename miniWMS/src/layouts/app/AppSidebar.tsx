import {
    Package,
    BarChart3,
    QrCode,
    Users,
    FolderOpen,
    UserCog,
    FileText,
    LogOut,
    Warehouse,
    ArrowLeftFromLine,
    BotMessageSquare,
    PackagePlus,
    PackageMinus,
    Tag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { name: "Dashboard", href: "", icon: BarChart3 },
    { name: "Sản phẩm", href: "products", icon: Package },
    { name: "Danh mục", href: "categories", icon: FolderOpen },
    { name: "Thẻ", href: "tags", icon: Tag },
    { name: "Kho hàng", href: "warehouses", icon: Warehouse },
    { name: "Phiếu nhập", href: "receipts", icon: PackagePlus },
    { name: "Phiếu xuất", href: "shipments", icon: PackageMinus },
    { name: "Nhà cung cấp", href: "suppliers", icon: Users },
    { name: "Người dùng", href: "users", icon: UserCog },
    { name: "Nhật ký", href: "audit", icon: FileText },
    { name: "Whis AI", href: "ai-assistant", icon: BotMessageSquare },
    { name: "Truy vấn QR", href: "qr-code", icon: QrCode },
];

function AppSidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            {/* Mobile Sheet */}
            <div className="lg:hidden p-2">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm">Menu</Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <SidebarContent collapsed={false} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex flex-col min-h-screen border-r bg-muted/40 transition-all",
                    collapsed ? "w-16" : "w-64"
                )}
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <Link to="/" className="flex items-center space-x-2">

                        {!collapsed && (
                            <>
                                <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
                                    <Package className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold">MiniWMS</h1>
                                    <p className="text-xs text-muted-foreground -mt-1">WMS System</p>
                                </div>
                            </>
                        )}
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
                        <div className={cn("transition-transform", collapsed ? "" : "rotate-180")}>➤</div>
                    </Button>
                </div>
                <Separator />
                <ScrollArea className="flex">
                    <SidebarContent collapsed={collapsed} />
                </ScrollArea>
                <Separator />
                <div className="p-4 space-y-2 flex flex-col">
                    <Link to="/">
                        <Button variant="secondary" className="w-full justify-start">
                            <ArrowLeftFromLine className="size-4 mr-2" />
                            {!collapsed && <span>Về trang chủ</span>}
                        </Button>
                    </Link>
                    <Link to="/logout">
                        <Button variant="destructive" className="w-full justify-start">
                            <LogOut className="size-4 mr-2" />
                            {!collapsed && <span>Đăng xuất</span>}
                        </Button>
                    </Link>

                </div>
            </aside>
        </>
    );
}

function SidebarContent({ collapsed }: { collapsed: boolean }) {
    const location = useLocation();
    return (
        <nav className="px-2 py-4 space-y-1">
            {NAV_ITEMS.map(({ name, href, icon: Icon }) => {
                const isActive = location.pathname === href;
                const buttonClass = cn(
                    "w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
                    collapsed ? "justify-center" : "space-x-3"
                );

                const content = (
                    <Link key={href} to={`/app/${href}`} className={buttonClass}>
                        <Icon className="w-5 h-5" />
                        {!collapsed && <span>{name}</span>}
                    </Link>
                );

                return collapsed ? (
                    <Tooltip key={name}>
                        <TooltipTrigger asChild>{content}</TooltipTrigger>
                        <TooltipContent side="right">{name}</TooltipContent>
                    </Tooltip>
                ) : (
                    content
                );
            })}
        </nav>
    );
}

export default AppSidebar;