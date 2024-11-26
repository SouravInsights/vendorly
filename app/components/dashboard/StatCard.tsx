import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StatCard as StatCardProps } from "../../types";

export const StatCard = ({
  title,
  value,
  trend,
  icon: Icon,
}: StatCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
            <Badge
              className={cn(
                "mt-2",
                trend.startsWith("+")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              )}
            >
              {trend} this month
            </Badge>
          </div>
          <Icon className="text-pink-500" size={24} />
        </div>
      </CardContent>
    </Card>
  );
};
