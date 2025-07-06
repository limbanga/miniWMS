import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  supplierSchema,
  type SupplierFormValues,
} from "@/schemas/supplier";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Users } from "lucide-react";

const defaultValues: SupplierFormValues = {
  id: "",
  name: "",
  code: "",
  contact_name: "",
  email: "",
  phone: "",
  address: "",
  tax_code: "",
  note: "",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function AddSupplier() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierFormValues>({
    defaultValues,
    resolver: zodResolver(supplierSchema),
  });

  const onSubmit = async (data: SupplierFormValues) => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000)); // Giả lập API
    console.log("Saved supplier:", data);
    navigate("/suppliers", { state: { message: "Thêm nhà cung cấp thành công!" } });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <Users className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Thêm Nhà Cung Cấp</h1>
            <p className="text-muted-foreground">Nhập thông tin nhà cung cấp mới</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin nhà cung cấp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Tên công ty</Label>
                <Input {...register("name")} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="tax_code">Mã số thuế</Label>
                <Input {...register("tax_code")} />
                {errors.tax_code && <p className="text-sm text-red-500">{errors.tax_code.message}</p>}
              </div>

              <div>
                <Label htmlFor="code">Lĩnh vực</Label>
                <Input {...register("code")} />
                {errors.code && <p className="text-sm text-red-500">{errors.code.message}</p>}
              </div>
              <div>
                <Label htmlFor="address">Website</Label>
                <Input {...register("address")} />
                {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
              </div>

            </div>
            <div>
              <Label htmlFor="note">Ghi chú</Label>
              <Textarea rows={3} {...register("note")} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contact_name">Người liên hệ</Label>
                <Input {...register("contact_name")} />
                {errors.contact_name && <p className="text-sm text-red-500">{errors.contact_name.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input {...register("phone")} />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" {...register("email")} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Địa chỉ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contact_name">Tỉnh</Label>
                <Input {...register("contact_name")} />
                {errors.contact_name && <p className="text-sm text-red-500">{errors.contact_name.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Mã Bưu điện</Label>
                <Input {...register("phone")} />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Xã</Label>
                <Input {...register("phone")} />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Đường</Label>
                <Input {...register("phone")} />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang lưu..." : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Lưu nhà cung cấp
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
