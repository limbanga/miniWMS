import { Link } from "react-router-dom";
import { Package, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeHeader() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">MiniWMS</h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Warehouse Management
              </p>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Tính năng
            </a>
            <a
              href="#benefits"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Lợi ích
            </a>
            <Link
              to="/contact"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Liên hệ
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/contact" className="hidden sm:block">
              <Button variant="outline">
                <Phone className="size-4 mr-2" />
                Liên hệ ngay
              </Button>
            </Link>
            <Link to="/app">
              <Button className="bg-primary hover:bg-primary/90">
                Ứng dụng
                <ArrowRight className="size-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
