import { Badge } from "@/components/ui/badge";
import type { Tag } from "@/data/tags";

interface TagBadgeProps {
  tag: Tag;
  className?: string;
}

export default function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <Badge
      key={tag.id}
      variant="outline"
      className={`mr-1 mb-1 ${className || ""}`}
      style={{
        color: tag.color,
        borderColor: tag.color,
      }}
    >
      {tag.name}
    </Badge>
  );
}
