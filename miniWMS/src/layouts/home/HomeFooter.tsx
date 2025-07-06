import { Link } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const productLinks = [
  { to: "/products", label: "Quản lý sản phẩm" },
  { to: "/categories", label: "Danh mục sản phẩm" },
  { to: "/locations", label: "Vị trí kho" },
  { to: "/inventory", label: "Nhập/Xuất kho" },
  { to: "/suppliers", label: "Nhà cung cấp" },
  { to: "/dashboard", label: "Dashboard" },
];

const supportLinks = [
  { to: "/contact", label: "Liên hệ" },
  { href: "#", label: "Tài liệu" },
  { href: "#", label: "FAQ" },
  { href: "#", label: "Hỗ trợ" },
];

const legalLinks = [
  { href: "#", label: "Chính sách bảo mật" },
  { href: "#", label: "Điều khoản dịch vụ" },
];

export default function HomeFooter() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Intro */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary">MiniWMS</h2>
                <p className="text-xs text-muted-foreground">
                  Warehouse Management System
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Giải pháp quản lý kho thông minh, tối ưu hóa quy trình và nâng
              cao hiệu suất cho doanh nghiệp logistics.
            </p>
            <Link to="/products">
              <Button>
                Khám phá ngay
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Sản phẩm */}
          <div>
            <h3 className="font-semibold mb-4">Sản phẩm</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className="font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className="hover:text-foreground">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="hover:text-foreground">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 MiniWMS. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
