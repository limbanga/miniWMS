import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { warehouseSchema, type WarehouseFormValues } from "@/schemas/warehouse";
import { useNavigate } from "react-router-dom";

import {
  Warehouse,
  Save,
  MapPin,
  Ruler,
  Layout,
} from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const defaultValues: WarehouseFormValues = {
  name: "",
  code: "",
  location: "",
  status: "active",
  notes: "",
  area: "",
  type: "cold",
};

export default function AddWarehouse() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<WarehouseFormValues>({
    defaultValues,
    resolver: zodResolver(warehouseSchema),
  });

  const onSubmit = async (data: WarehouseFormValues) => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000)); // fake API
    console.log("Saved warehouse:", data);
    navigate("/warehouses", {
      state: { message: "Thêm kho thành công!" },
    });
    setIsSubmitting(false);
  };

  const generateCode = () => {
    const prefix = control._formValues.name?.slice(0, 2).toUpperCase() || "WH";
    setValue("code", `${prefix}-${Date.now().toString().slice(-6)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Warehouse className="w-8 h-8 mr-3 text-primary" />
          Thêm Kho Mới
        </h1>
        <p className="text-muted-foreground mt-2">
          Nhập thông tin kho hàng cần thêm vào hệ thống
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">Thông tin kho</TabsTrigger>
            <TabsTrigger value="address">Địa chỉ kho</TabsTrigger>
            <TabsTrigger value="technical">Thông số kỹ thuật</TabsTrigger>
            <TabsTrigger value="areas">Khu vực</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Warehouse className="w-5 h-5 mr-2 inline-block" />
                  Thông tin kho
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Tên kho</Label>
                    <Input {...register("name")} placeholder="VD: Kho miền Bắc" />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="code">Mã kho</Label>
                    <div className="flex gap-2">
                      <Input {...register("code")} />
                      <Button type="button" onClick={generateCode} variant="outline">
                        Tự động
                      </Button>
                    </div>
                    {errors.code && (
                      <p className="text-red-500 text-sm">{errors.code.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>Trạng thái</Label>
                    <Controller
                      control={control}
                      name="status"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Đang hoạt động</SelectItem>
                            <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <Label>Ghi chú</Label>
                  <Textarea rows={3} {...register("notes")} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address">
            <Card>
              <CardHeader>
                <CardTitle>
                  <MapPin className="w-5 h-5 mr-2 inline-block" />
                  Địa chỉ kho
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="location">Địa chỉ</Label>
                  <Input {...register("location")} placeholder="VD: 123 Nguyễn Văn Cừ, Q5, TP.HCM" />
                  {errors.location && (
                    <p className="text-red-500 text-sm">{errors.location.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Ruler className="w-5 h-5 mr-2 inline-block" />
                  Thông số kỹ thuật
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="area">Tổng diện tích (m²)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      {...register("area", { valueAsNumber: true })}
                      placeholder="VD: 1500"
                    />
                    {errors.area && (
                      <p className="text-red-500 text-sm">{errors.area.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>Loại kho</Label>
                    <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn loại kho" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cold">Kho lạnh</SelectItem>
                            <SelectItem value="dry">Kho khô</SelectItem>
                            <SelectItem value="chemical">Kho hóa chất</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.type && (
                      <p className="text-red-500 text-sm">{errors.type.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="areas">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Layout className="w-5 h-5 mr-2 inline-block" />
                  Khu vực trong kho
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Bạn có thể thêm các khu vực sau này.</p>
                {/* Gợi ý: Nút "Thêm khu vực", danh sách khu vực,... */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang lưu..." : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Lưu kho
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
