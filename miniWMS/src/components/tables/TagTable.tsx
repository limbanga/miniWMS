import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Tag } from "@/data/tags";

const TagActions = ({ id }: { id: string }) => (
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
        Xem chi tiết
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to={`/tags/edit/${id}`}>
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
  filteredTags: Tag[];
}

export default function TagTable({ filteredTags }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên thẻ</TableHead>
          <TableHead>Mô tả</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell className="font-medium">{tag.name}</TableCell>
            <TableCell>{tag.description || "—"}</TableCell>
            <TableCell className="text-right">
              <TagActions id={tag.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
