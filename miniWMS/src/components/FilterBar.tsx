import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download } from "lucide-react";

export function FilterBar({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string;
  onSearchChange: (v: string) => void;
}) {
  return (
    <div className="mb-6">
      <div className="card p-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Tìm kiếm theo tên hoặc mô tả..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="mr-2" /> Lọc</Button>
          <Button variant="outline"><Download className="mr-2" /> Xuất</Button>
        </div>
      </div>
    </div>
  );
}
