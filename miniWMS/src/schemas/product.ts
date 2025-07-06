import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  sku: z.string().min(1, "Mã SKU là bắt buộc"),
  category: z.string().min(1, "Danh mục là bắt buộc"),
  description: z.string().optional(),
  quantity: z.number().min(0, "Số lượng không được âm"),
  unit: z.string(),
  minStock: z.number().min(0, "Tồn kho tối thiểu không được âm"),
  maxStock: z.number().min(0, "Tồn kho tối đa không được âm"),
  costPrice: z.number(),
  sellingPrice: z.number(),
  barcode: z.string(),
  weight: z.number(),
  dimensions: z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  expiryDate: z.string().optional(),
  notes: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.maxStock < data.minStock) {
    ctx.addIssue({
      path: ["maxStock"],
      code: z.ZodIssueCode.custom,
      message: "Tồn kho tối đa phải lớn hơn hoặc bằng tối thiểu",
    });
  }
});

export type ProductFormValues = z.infer<typeof productSchema>;