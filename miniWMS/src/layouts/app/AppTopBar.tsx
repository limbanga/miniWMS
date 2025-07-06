import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";

export default function AppTopBar() {
    return (
        <header className="flex justify-end h-16 border-b border-border items-center px-6 w-full">
            {/* Search */}
            <div className="flex-1 max-w-xs">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                    <Bell className="size-4" />
                </Button>
                <Button variant="ghost" size="sm">
                    <User className="size-4" />
                </Button>
            </div>
        </header>
    );
}
