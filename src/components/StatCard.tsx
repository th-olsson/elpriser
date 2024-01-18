import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string | number;
  time?: string;
  Icon: IconType | LucideIcon;
  variant?: "highest" | "lowest" | "average";
};

export function StatCard({ label, value, time, Icon, variant }: Props) {
  let card;
  let textColor;

  switch (variant) {
    case "highest":
      card = `col-span-1`;
      textColor = `text-red-400`;
      break;
    case "lowest":
      card = `col-span-1`;
      textColor = `text-emerald-400`;
      break;
    case "average":
      card = `col-span-2 sm:col-span-1`;
      textColor = `text-orange-400`;
      break;
    default:
      break;
  }

  return (
    <Card className={`${card}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-2 pb-0">
        <CardTitle className="text-sm font-medium text-foreground">
          {label}
        </CardTitle>
        <Icon className={`h-4 w-4 ${textColor}`} />
      </CardHeader>
      <CardContent className="px-4 pb-2 flex flex-col justify-end">
        <div className="text-sm text-muted-foreground">
          <span className={`text-xl font-semibold ${textColor}`}>{value}</span>{" "}
          <span>öre/kWh</span>
        </div>
        {time && <span className="text-sm text-muted-foreground">{time}</span>}
      </CardContent>
    </Card>
  );
}
