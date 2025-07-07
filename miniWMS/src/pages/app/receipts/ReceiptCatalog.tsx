import { useState } from "react";
import { Plus, Search, Filter, Download, Package } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { StatsCard } from "@/components/cards/StatsCard";
import { sampleReceipts, type Receipt } from "@/data/receipts";
import GoodsReceiptTable from "@/components/tables/ReceiptTable";

export default function ReceiptCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [receipts] = useState<Receipt[]>(sampleReceipts);

  const filteredReceipts = receipts.filter((receipt) =>
    [receipt.code, receipt.supplierName, receipt.status]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Package className="w-8 h-8 mr-3 text-primary" />
            Phiếu nhập kho
          </h1>
          <p className="text-muted-foreground mt-2">Quản lý danh sách phiếu nhập kho</p>
        </div>
        <Link to="/warehouse/receipts/add">
          <Button className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Tạo phiếu mới
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard label="Tổng phiếu" value={receipts.length} icon={<Package className="w-8 h-8 text-primary" />} />
        <StatsCard
          label="Đã hoàn tất"
          value={receipts.filter((r) => r.status === "completed").length}
          color="text-green-600"
          icon={<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-green-600 rounded-full" />
          </div>}
        />
        <StatsCard
          label="Đang xử lý"
          value={receipts.filter((r) => r.status === "processing").length}
          color="text-yellow-600"
          icon={<div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-yellow-600 rounded-full" />
          </div>}
        />
      </div>

      <Card className="mb-6">
        <CardContent className="p-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo mã, nhà cung cấp, trạng thái..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách phiếu ({filteredReceipts.length} kết quả)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <GoodsReceiptTable receipts={filteredReceipts} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
