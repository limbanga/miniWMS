import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { userSchema, type UserFormValues } from "@/schemas/user";

const defaultValues: UserFormValues = {
  fullName: "",
  username: "",
  password: "",
  email: "",
  phone: "",
  department: "",
  position: "",
  role: "staff",
  status: "active",
  notes: "",
};

export default function AddUser() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues,
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormValues) => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000)); // fake API
    console.log("New user created:", data);
    navigate("/users", { state: { message: "Tạo tài khoản thành công!" } });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <UserPlus className="w-8 h-8 mr-3 text-primary" />
          Thêm người dùng mới
        </h1>
        <p className="text-muted-foreground mt-2">
          Admin tạo tài khoản cho người dùng mới trong hệ thống
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin người dùng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input {...register("fullName")} placeholder="Nguyễn Văn A" />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input {...register("username")} placeholder="nguyenvana" />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" {...register("email")} placeholder="email@example.com" />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input {...register("phone")} placeholder="0901234567" />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="department">Phòng ban</Label>
                <Input {...register("department")} placeholder="Kinh doanh / Kho / IT..." />
                {errors.department && (
                  <p className="text-red-500 text-sm">{errors.department.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="position">Chức vụ</Label>
                <Input {...register("position")} placeholder="Nhân viên / Trưởng phòng..." />
                {errors.position && (
                  <p className="text-red-500 text-sm">{errors.position.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="role">Vai trò</Label>
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Quản trị viên</SelectItem>
                        <SelectItem value="manager">Quản lý</SelectItem>
                        <SelectItem value="staff">Nhân viên</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="inactive">Tạm khóa</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="password">Mật khẩu</Label>
                <Input type="password" {...register("password")} />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Ghi chú</Label>
              <Textarea rows={3} {...register("notes")} placeholder="Ghi chú thêm (nếu có)" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Đang lưu..." : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Tạo tài khoản
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
