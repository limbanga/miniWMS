import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";

import { Tag, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PageBreadcrumb } from "@/components/breadcrumbs/page-breadcrumb";

const tagSchema = z.object({
  name: z.string().min(1, "Tên thẻ không được để trống"),
  description: z.string().optional(),
});

type TagFormValues = z.infer<typeof tagSchema>;

export default function AddTag() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: TagFormValues) => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000)); // fake API
    console.log("Tag đã lưu:", data);
    navigate("/app/tags", { state: { message: "Thêm thẻ thành công!" } });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <PageBreadcrumb
            items={[
              { label: "Trang chủ", href: "/app" },
              { label: "Tag", href: "/app/tags" },
              { label: "Tạo thẻ", isCurrent: true },
            ]}
          />
        </div>
        <h1 className="text-3xl font-bold text-foreground flex items-center">
          <Tag className="w-8 h-8 mr-3 text-primary" />
          Thêm Thẻ Mới
        </h1>
        <p className="text-muted-foreground mt-2">
          Nhập thông tin để tạo một thẻ mới trong hệ thống
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <Tag className="w-5 h-5 mr-2 inline-block" />
              Thông tin thẻ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="name" className="mb-2">Tên thẻ</Label>
              <Input id="name" {...register("name")} placeholder="VD: Hàng dễ vỡ" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="description" className="mb-2">Mô tả</Label>
              <Textarea id="description" rows={3} {...register("description")} placeholder="Ghi chú mô tả về thẻ này..." />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang lưu..." : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Lưu thẻ
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
