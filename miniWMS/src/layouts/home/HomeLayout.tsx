import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight, Phone } from "lucide-react";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

export default function HomeLayout() {
    return (
        <div className="min-h-screen bg-background">
            {/* Landing Page Header */}
            <HomeHeader />

            {/* Main Content */}
            <main>
                <Outlet />
            </main>

            {/* Footer */}
            <HomeFooter />
        </div>
    );
}
