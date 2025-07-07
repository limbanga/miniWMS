import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import type { ReceiptItemAllocation } from "@/data/receiptItemAllocation";

// Cấu trúc dữ liệu đầu vào cho props
interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ReceiptItemAllocation) => void;
  receiptItemId: string;
  data: {
    id: string;
    name: string;
    zones: {
      id: string;
      name: string;
      shelves: {
        id: string;
        name: string;
        shelfLevels: { id: string; name: string }[];
      }[];
    }[];
  }[]; // List of warehouses
}

export default function AllocateDialog({
  open,
  onClose,
  onSubmit,
  receiptItemId,
  data,
}: Props) {
  const [warehouseId, setWarehouseId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [shelfId, setShelfId] = useState("");
  const [shelfLevelId, setShelfLevelId] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  const selectedWarehouse = data.find((w) => w.id === warehouseId);
  const selectedZone = selectedWarehouse?.zones.find((z) => z.id === zoneId);
  const selectedShelf = selectedZone?.shelves.find((s) => s.id === shelfId);

  const handleSubmit = () => {
    if (!shelfLevelId || quantity <= 0) return;

    onSubmit({
      id: crypto.randomUUID(),
      receiptItemId,
      shelfLevelId,
      quantity,
    });

    // Reset
    setWarehouseId("");
    setZoneId("");
    setShelfId("");
    setShelfLevelId("");
    setQuantity(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Phân bổ hàng vào kho</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Kho</Label>
            <Select
              value={warehouseId}
              onValueChange={(val) => {
                setWarehouseId(val);
                setZoneId("");
                setShelfId("");
                setShelfLevelId("");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn kho" />
              </SelectTrigger>
              <SelectContent>
                {data.map((w) => (
                  <SelectItem key={w.id} value={w.id}>
                    {w.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedWarehouse && (
            <div>
              <Label>Khu vực</Label>
              <Select
                value={zoneId}
                onValueChange={(val) => {
                  setZoneId(val);
                  setShelfId("");
                  setShelfLevelId("");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn khu vực" />
                </SelectTrigger>
                <SelectContent>
                  {selectedWarehouse.zones.map((z) => (
                    <SelectItem key={z.id} value={z.id}>
                      {z.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedZone && (
            <div>
              <Label>Kệ</Label>
              <Select
                value={shelfId}
                onValueChange={(val) => {
                  setShelfId(val);
                  setShelfLevelId("");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn kệ" />
                </SelectTrigger>
                <SelectContent>
                  {selectedZone.shelves.map((shelf) => (
                    <SelectItem key={shelf.id} value={shelf.id}>
                      {shelf.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedShelf && (
            <div>
              <Label>Tầng</Label>
              <Select
                value={shelfLevelId}
                onValueChange={(val) => setShelfLevelId(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn tầng" />
                </SelectTrigger>
                <SelectContent>
                  {selectedShelf.shelfLevels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label>Số lượng</Label>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Nhập số lượng"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>Phân bổ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
