import { z } from "zod";

export const supplierSchema = z.object({
  id: z.string().min(1, "Mã nhà cung cấp là bắt buộc"),
  name: z.string().min(1, "Tên công ty là bắt buộc"),
  code: z.string().min(1, "Mã viết tắt là bắt buộc"),
  contact_name: z.string().min(1, "Người liên hệ là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(1, "Số điện thoại là bắt buộc"),
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  tax_code: z.string().min(1, "Mã số thuế là bắt buộc"),
  note: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;
