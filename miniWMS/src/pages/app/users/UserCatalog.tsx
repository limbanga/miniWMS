import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User as UserIcon,
  Search,
  Plus,

  Filter,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { StatsCard } from "@/components/cards/StatsCard";
import { sampleUsers, type User } from "@/data/user";
import UserTable from "@/components/tables/UserTable";


export default function UserCatalog() {
  const [searchTerm, setSearchTerm] = useState("");

  const [users] = useState<User[]>(sampleUsers);

  const filteredUsers = users.filter((user) =>
    [user.username, user.email, user.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <UserIcon className="w-8 h-8 mr-3 text-primary" />
            Danh sách người dùng
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý người dùng hệ thống và vai trò của họ
          </p>
        </div>
        <Link to="/app/users/add">
          <Button className="mt-4 sm:mt-0 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Thêm người dùng
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          label="Tổng người dùng"
          value={users.length}
          icon={<UserIcon className="w-8 h-8 text-primary" />}
        />
        <StatsCard
          label="Đang hoạt động"
          value={users.filter((u) => u.status === "active").length}
          color="text-green-600"
          icon={<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-green-600 rounded-full" />
          </div>}
        />
        <StatsCard
          label="Chờ kích hoạt"
          value={users.filter((u) => u.status === "suspended").length}
          color="text-yellow-600"
          icon={<div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-yellow-600 rounded-full" />
          </div>}
        />
      </div>

      <Card className="mb-6">
        <CardContent className="p-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo tên, email, vai trò..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Xuất
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng ({filteredUsers.length} kết quả)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <UserTable users={filteredUsers} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
