import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string | number;
  time?: string;
  Icon: IconType | LucideIcon;
  variant?: "highest" | "lowest" | "average";
};

export function MiniStat({ label, value, time, Icon, variant }: Props) {
  let textColor;
  let symbol;

  switch (variant) {
    case "highest":
      symbol = `↑`;
      textColor = `text-red-400`;
      break;
    case "lowest":
      symbol = `↓`;
      textColor = `text-emerald-400`;
      break;
    case "average":
      symbol = `~`;
      textColor = `text-orange-400`;
      break;
    default:
      break;
  }

  return (
    <div className="flex items-center font-normal text-sm">
      <span className={`${textColor} text-xs mr-1`}>{symbol}</span>
      <div className={textColor}>
        <span className="hidden sm:inline">{label}: </span> <span>{value}</span>
      </div>
    </div>
  );
}
