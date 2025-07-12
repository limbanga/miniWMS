import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  sku: z.string().min(1, "Mã SKU là bắt buộc"),
  category: z.string().min(1, "Danh mục là bắt buộc"),
  description: z.string().optional(),
  unit: z.string(),
  expirable: z.boolean().optional(),
  tags: z.array(z.object({
    id: z.string(),
  })).optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>;