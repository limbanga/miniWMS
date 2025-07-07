import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/data/user";
import { getUserStatusBadge } from "@/lib/getUserStatusBadge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { vi } from "date-fns/locale";


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

interface Props {
    users: User[];
}

export default function UserTable({ users }: Props) {
    return (
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
                {users.map((user) => {
                    const status = getUserStatusBadge(user.status);
                    return (
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell className="font-mono text-sm">{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={status.className}>
                                    {status.icon} {status.label}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {format(new Date(user.lastLogin), "dd/MM/yyyy HH:mm", { locale: vi })}
                            </TableCell>

                            <TableCell className="text-right">
                                <UserActions id={user.id} />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
