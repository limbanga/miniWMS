import {
  useForm,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const receiptSchema = z.object({
  supplier: z.string().min(1, "Chọn nhà cung cấp"),
  receiptCode: z.string().min(1, "Mã phiếu bắt buộc"),
  warehouse: z.string().min(1, "Chọn kho nhập"),
  createdDate: z.string().min(1, "Ngày nhập bắt buộc"),
  note: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Chọn sản phẩm"),
        quantity: z.number().min(1, "Số lượng > 0"),
        unitPrice: z.number().min(0, "Giá không âm"),
      })
    )
    .min(1, "Thêm ít nhất 1 sản phẩm"),
});

type ReceiptFormValues = z.infer<typeof receiptSchema>;

const defaultValues: ReceiptFormValues = {
  supplier: "",
  receiptCode: "",
  warehouse: "",
  createdDate: new Date().toISOString().split("T")[0],
  note: "",
  items: [{ productId: "", quantity: 1, unitPrice: 0 }],
};

const suppliers = ["Nhà cung cấp A", "Nhà cung cấp B"];
const warehouses = ["Kho chính", "Kho phụ"];
const productOptions = [
  { id: "p1", name: "Laptop Dell" },
  { id: "p2", name: "Bàn phím cơ" },
  { id: "p3", name: "Camera giám sát" },
];

export default function AddReceipt() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReceiptFormValues>({
    resolver: zodResolver(receiptSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: ReceiptFormValues) => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));
    console.log("Saved receipt:", data);
    navigate("/receipts", { state: { message: "Thêm phiếu thành công!" } });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tạo phiếu nhập kho</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin chung</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nhà cung cấp</Label>
              <Controller
                control={control}
                name="supplier"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhà cung cấp" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.supplier && <p className="text-sm text-red-500">{errors.supplier.message}</p>}
            </div>
            <div>
              <Label>Mã phiếu</Label>
              <Input {...register("receiptCode")} />
              {errors.receiptCode && <p className="text-sm text-red-500">{errors.receiptCode.message}</p>}
            </div>
            <div>
              <Label>Kho nhập</Label>
              <Controller
                control={control}
                name="warehouse"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kho" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((w) => (
                        <SelectItem key={w} value={w}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.warehouse && <p className="text-sm text-red-500">{errors.warehouse.message}</p>}
            </div>
            <div>
              <Label>Ngày nhập</Label>
              <Input type="date" {...register("createdDate")} />
              {errors.createdDate && <p className="text-sm text-red-500">{errors.createdDate.message}</p>}
            </div>
            <div className="md:col-span-2">
              <Label>Ghi chú</Label>
              <Input {...register("note")} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách sản phẩm nhập</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((item, index) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <Label>Sản phẩm</Label>
                  <Controller
                    control={control}
                    name={`items.${index}.productId`}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn sản phẩm" />
                        </SelectTrigger>
                        <SelectContent>
                          {productOptions.map((p) => (
                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.items?.[index]?.productId && (
                    <p className="text-sm text-red-500">{errors.items[index].productId?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Số lượng</Label>
                  <Input
                    type="number"
                    {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                  />
                  {errors.items?.[index]?.quantity && (
                    <p className="text-sm text-red-500">{errors.items[index].quantity?.message}</p>
                  )}
                </div>
                <div>
                  <Label>Giá nhập (VND)</Label>
                  <Input
                    type="number"
                    {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                  />
                  {errors.items?.[index]?.unitPrice && (
                    <p className="text-sm text-red-500">{errors.items[index].unitPrice?.message}</p>
                  )}
                </div>
                <div>
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ productId: "", quantity: 1, unitPrice: 0 })}
            >
              + Thêm sản phẩm
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang lưu..." : "Lưu phiếu nhập"}
          </Button>
        </div>
      </form>
    </div>
  );
}