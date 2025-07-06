import {
    useForm,
    Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormValues, } from "@/schemas/product";
import { useNavigate } from "react-router-dom";

import { Package, Save } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Electronics", "Office Supplies", "Furniture", "Security"];
const units = ["cái", "thùng", "kg", "lít"];

const defaultValues: ProductFormValues = {
    name: "",
    sku: "",
    category: "",
    description: "",
    quantity: 0,
    unit: "cái",
    minStock: 5,
    maxStock: 100,
    costPrice: 0,
    sellingPrice: 0,
    barcode: "",
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    expiryDate: "",
    notes: "",
};

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
        defaultValues,
        resolver: zodResolver(productSchema),
    });

    const onSubmit = async (data: ProductFormValues) => {
        setIsSubmitting(true);
        await new Promise((res) => setTimeout(res, 1000)); // Fake API
        console.log("Saved product:", data);
        navigate("/products", { state: { message: "Thêm thành công!" } });
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
                                <Label htmlFor="name">Tên sản phẩm</Label>
                                <Input {...register("name")} placeholder="VD: Laptop Dell" />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="sku">Mã SKU</Label>
                                <div className="flex gap-2">
                                    <Input {...register("sku")} />
                                    <Button type="button" onClick={generateSKU} variant="outline">Tự động</Button>
                                </div>
                                {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
                            </div>

                            <div>
                                <Label>Danh mục</Label>
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Chọn danh mục" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                            </div>

                            <div>
                                <Label>Đơn vị</Label>
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
                            <Label>Mô tả</Label>
                            <Textarea rows={3} {...register("description")} />
                        </div>


                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <Package className="w-5 h-5 mr-2 inline-block" />
                            Thông tin vật lý
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="weight">Khối lượng (kg)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    {...register("weight", { valueAsNumber: true })}
                                    placeholder="VD: 1.5"
                                />
                                {errors.weight && (
                                    <p className="text-red-500 text-sm">{errors.weight.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="dimensions.length">Chiều dài (cm)</Label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    {...register("dimensions.length", { valueAsNumber: true })}
                                    placeholder="VD: 30"
                                />
                                {errors.dimensions?.length && (
                                    <p className="text-red-500 text-sm">{errors.dimensions.length.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="dimensions.width">Chiều rộng (cm)</Label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    {...register("dimensions.width", { valueAsNumber: true })}
                                    placeholder="VD: 20"
                                />
                                {errors.dimensions?.width && (
                                    <p className="text-red-500 text-sm">{errors.dimensions.width.message}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="dimensions.height">Chiều cao (cm)</Label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    {...register("dimensions.height", { valueAsNumber: true })}
                                    placeholder="VD: 5"
                                />
                                {errors.dimensions?.height && (
                                    <p className="text-red-500 text-sm">{errors.dimensions.height.message}</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
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
