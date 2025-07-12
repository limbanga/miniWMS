import {
    useForm,
    Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormValues, productFormDefaultValues } from "@/schemas/product";
import { useNavigate } from "react-router-dom";

import { Package, Save } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sampleTags } from "@/data/tags";
import { Checkbox } from "@/components/ui/checkbox";
import { sampleCategories } from "@/data/categories";
import { units } from "@/data/units";
import { PageBreadcrumb } from "@/components/breadcrumbs/page-breadcrumb";



export default function AddProduct() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<ProductFormValues>({
        defaultValues: productFormDefaultValues,
        resolver: zodResolver(productSchema),
    });

    const onSubmit = async (data: ProductFormValues) => {
        setIsSubmitting(true);
        await new Promise((res) => setTimeout(res, 1000)); // Fake API
        console.log("Saved product:", data);
        navigate("/app/products", { state: { message: "Thêm thành công!" } });
        setIsSubmitting(false);
    };

    const generateSKU = () => {
        const prefix = control._formValues.category?.slice(0, 2).toUpperCase() || "WH";
        setValue("sku", `${prefix}-${Date.now().toString().slice(-6)}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div>
                            <div className="mb-4">
                                <PageBreadcrumb
                                    items={[
                                        { label: "Trang chủ", href: "/app" },
                                        { label: "Sản phẩm", href: "/app/products" },
                                        { label: "Tạo sản phẩm", isCurrent: true },
                                    ]}
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground flex items-center">
                                <Package className="w-8 h-8 mr-3 text-primary" />
                                Thêm Sản Phẩm Mới
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Nhập thông tin chi tiết để thêm sản phẩm vào kho
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Package className="w-5 h-5 mr-2 inline-block" />
                            Thêm sản phẩm
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="mb-2" htmlFor="name">Tên sản phẩm</Label>
                                <Input {...register("name")} placeholder="VD: Laptop Dell" />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                            <div>
                                <Label className="mb-2" htmlFor="sku">Mã SKU</Label>
                                <div className="flex gap-2">
                                    <Input {...register("sku")} />
                                    <Button type="button" onClick={generateSKU} variant="outline">Tự động</Button>
                                </div>
                                {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
                            </div>

                            <div>
                                <Label className="mb-2">Danh mục</Label>
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Chọn danh mục" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {sampleCategories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                            </div>

                            <div>
                                <Label className="mb-2">Đơn vị</Label>
                                <Controller
                                    control={control}
                                    name="unit"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value} >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {units.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="mb-2">Mô tả</Label>
                            <Textarea rows={3} {...register("description")} />
                        </div>


                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Package className="w-5 h-5 mr-2 inline-block" />
                            Các tùy chọn khác
                        </CardTitle>

                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="expirable"
                                    {...register("expirable")}
                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <Label htmlFor="expirable">Có Hạn Sử Dụng</Label>
                            </div>

                            <div>
                                <Label className="mb-2">Thẻ (Tags)</Label>
                                <Controller
                                    control={control}
                                    name="tags"
                                    render={({ field }) => (
                                        <div className="space-y-2">
                                            {sampleTags.map((tag) => {
                                                const isChecked = field.value?.some((t) => t.id === tag.id);

                                                const handleChange = (checked: boolean) => {
                                                    if (checked) {
                                                        field.onChange([...(field.value || []), tag]);
                                                    } else {
                                                        field.onChange(field.value?.filter((t) => t.id !== tag.id));
                                                    }
                                                };

                                                return (
                                                    <div key={tag.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`tag-${tag.id}`}
                                                            checked={isChecked}
                                                            onCheckedChange={handleChange}
                                                        />
                                                        <Label htmlFor={`tag-${tag.id}`} className="cursor-pointer">
                                                            {tag.name}
                                                        </Label>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                />
                                {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
                            </div>

                        </CardContent>

                    </CardHeader>

                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Đang lưu..." : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Lưu sản phẩm
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>

    );
}
