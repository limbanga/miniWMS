import type { ShelfLevel } from "@/data/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Wrench,
  XCircle,
  Pencil,
  Trash,
  PlusCircle,
} from "lucide-react";

interface Props {
  level: ShelfLevel;
  onEdit?: (level: ShelfLevel) => void;
  onDelete?: (level: ShelfLevel) => void;
  onAdd?: (shelfId: string) => void;
}

export default function ShelfLevelCard({
  level,
  onEdit,
  onDelete,
  onAdd,
}: Props) {
  const statusMap = {
    active: {
      label: "Hoạt động",
      color: "text-green-600 border-green-300",
      icon: <Activity className="w-4 h-4 mr-1" />,
    },
    inactive: {
      label: "Ngừng hoạt động",
      color: "text-red-600 border-red-300",
      icon: <XCircle className="w-4 h-4 mr-1" />,
    },
    maintenance: {
      label: "Bảo trì",
      color: "text-yellow-600 border-yellow-300",
      icon: <Wrench className="w-4 h-4 mr-1" />,
    },
  };

  const status = statusMap[level.status];
  const percent = (level.currentStock / level.capacity) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex justify-between items-center">
          <span>Tầng {level.levelNumber}</span>
          <Badge variant="outline" className={status.color}>
            {status.icon}
            {status.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-3">
        <div className="flex justify-between">
          <span>Sức chứa:</span>
          <span>
            {level.currentStock}/{level.capacity}
          </span>
        </div>
        <Progress value={percent} className="h-2" />

        <div className="flex justify-end gap-2 pt-2 border-t mt-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(level)}
            title="Chỉnh sửa tầng"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(level)}
            title="Xóa tầng"
          >
            <Trash className="w-4 h-4 text-red-500" />
          </Button>

        </div>
      </CardContent>
    </Card>
  );
}
