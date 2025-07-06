// schemas/user.ts
import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .min(10, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại không hợp lệ"),
  department: z.string().min(1, "Phòng ban không được để trống"),
  position: z.string().min(1, "Chức vụ không được để trống"),
  role: z.enum(["admin", "manager", "staff"]),
  status: z.enum(["active", "inactive"]),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .optional(), // Cho phép không nhập khi chỉnh sửa
  notes: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;
