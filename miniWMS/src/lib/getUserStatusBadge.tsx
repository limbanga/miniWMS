
import type { UserStatus } from "@/data/user";
import { CheckCircle, XCircle, Ban } from "lucide-react";


interface StatusBadgeInfo {
  label: string;
  className: string;
  icon?: React.ReactNode;
}

export function getUserStatusBadge(status: UserStatus): StatusBadgeInfo {
  switch (status) {
    case "active":
      return {
        label: "Hoạt động",
        className: "text-green-600 border-green-300",
        icon: <CheckCircle className="w-4 h-4 mr-1" />,
      };
    case "inactive":
      return {
        label: "Ngừng hoạt động",
        className: "text-red-600 border-red-300",
        icon: <XCircle className="w-4 h-4 mr-1" />,
      };
    case "suspended":
      return {
        label: "Tạm khóa",
        className: "text-yellow-600 border-yellow-300",
        icon: <Ban className="w-4 h-4 mr-1" />,
      };
    default:
      return {
        label: "Không xác định",
        className: "text-gray-600 border-gray-300",
      };
  }
}
