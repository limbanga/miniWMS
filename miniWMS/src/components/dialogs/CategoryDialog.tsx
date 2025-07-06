import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function CategoryDialog({
  open,
  initialData,
  colors,
  onSave,
  onClose,
}: {
  open: boolean;
  initialData: { name: string; description: string; color: string; };
  colors: string[];
  onSave: (data: { name: string; description: string; color: string }) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(initialData);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData.name ? "Chỉnh sửa Danh mục" : "Thêm Danh mục"}</DialogTitle>
          <DialogDescription>Mô tả mục tiêu và chi tiết.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div><Label>Tên danh mục *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label>Mô tả</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} /></div>
          <div><Label>Màu sắc</Label><div className="flex flex-wrap gap-2">{colors.map(c => (
            <button key={c} style={{ backgroundColor: c }} className={`w-8 h-8 rounded-full border-2 ${form.color===c ? "border-foreground scale-110" : "border-border"}`} onClick={() => setForm({ ...form, color: c })} />
          ))}</div></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Hủy</Button>
          <Button onClick={() => onSave(form)}>Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
