import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatsCard } from "@/components/cards/StatsCard";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
}

const sampleUsers: UserRecord[] = [
  {
    id: "1",
    name: "Nguyen Van A",
    email: "a@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-07-01",
  },
  {
    id: "2",
    name: "Tran Thi B",
    email: "b@example.com",
    role: "User",
    status: "inactive",
    lastLogin: "2024-06-15",
  },
  {
    id: "3",
    name: "Le Van C",
    email: "c@example.com",
    role: "Moderator",
    status: "pending",
    lastLogin: "2024-07-03",
  },
];

const statusMap = {
  active: {
    label: "Đang hoạt động",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  inactive: {
    label: "Không hoạt động",
    className: "bg-red-100 text-red-800 border-red-200",
  },
  pending: {
    label: "Chờ kích hoạt",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
};

const UserActions = ({ id }: { id: string }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
      <DropdownMenuItem>
        <Eye className="mr-2 h-4 w-4" />
        Xem hồ sơ
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to={`/users/edit/${id}`}>
          <Edit className="mr-2 h-4 w-4" />
          Chỉnh sửa
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red-600">
        <Trash2 className="mr-2 h-4 w-4" />
        Xóa
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default function UserCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState<UserRecord[]>(sampleUsers);

  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <User className="w-8 h-8 mr-3 text-primary" />
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
          icon={<User className="w-8 h-8 text-primary" />}
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
          value={users.filter((u) => u.status === "pending").length}
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Đăng nhập gần nhất</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="font-mono text-sm">{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusMap[user.status].className}
                      >
                        {statusMap[user.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <UserActions id={user.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
