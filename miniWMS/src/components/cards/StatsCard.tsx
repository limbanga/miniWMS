import { Card, CardContent } from "../ui/card";

export const StatsCard = ({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
}) => (
  <Card>
    <CardContent className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
      {icon}
    </CardContent>
  </Card>
);