// schemas/user.ts
import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  role: z.enum(["admin", "manager", "staff"]),
});

export type UserFormValues = z.infer<typeof userSchema>;
