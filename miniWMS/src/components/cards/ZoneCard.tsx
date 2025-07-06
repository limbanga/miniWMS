import { Link } from "react-router-dom";
import { Activity, Eye, Thermometer } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getStatusText } from "@/lib/getStatusText";
import { getStatusColor } from "@/lib/getStatusColor";
import type { Zone } from "@/data/types";

interface ZoneCardProps {
    zone: Zone;
}

export function ZoneCard({ zone }: ZoneCardProps) {

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{zone.name}</CardTitle>
                    <Badge variant="outline" className={getStatusColor(zone.status)}>
                        {getStatusText(zone.status)}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{zone.type}</p>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Capacity */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Sức chứa</span>
                            <span>
                                {zone.currentStock.toLocaleString()}/
                                {zone.capacity.toLocaleString()}
                            </span>
                        </div>
                        <Progress
                            value={(zone.currentStock / zone.capacity) * 100}
                            className="h-2"
                        />
                    </div>

                    {/* Environmental */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                            <Thermometer className="w-4 h-4 text-red-500" />
                            <div>
                                <p className="font-medium">{zone.temperature}°C</p>
                                <p className="text-muted-foreground">Nhiệt độ</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-blue-500" />
                            <div>
                                <p className="font-medium">{zone.humidity}%</p>
                                <p className="text-muted-foreground">Độ ẩm</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 border-t text-xs text-muted-foreground">
                        Hoạt động cuối: {zone.lastActivity}
                    </div>

                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full"
                    >
                        {/* TODO: sửa lại id đúng */}
                        <Link to={`/app/warehouses/${'wh1'}/zones/${zone.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Xem chi tiết
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
