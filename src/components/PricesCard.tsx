"use client";

import { displayPrice, displayTime } from "@/utils";
import { Card } from "./ui/card";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { DayPrices } from "@/types";
import dayjs from "dayjs";
import { MiniStat } from "./MiniStat";
import { TbTilde } from "react-icons/tb";
import { Chart } from "./Chart";
import { SpotPriceTable } from "./SpotPriceTable";
import { useDailyPrices } from "@/hooks/useDailyPrices";

type Props = {
  areas: { SE1: DayPrices; SE2: DayPrices; SE3: DayPrices; SE4: DayPrices };
};

export function PricesCard({ areas }: Props) {
  const data = useDailyPrices(areas);
  if (!data) {
    return (
      <div className="flex items-center py-6 justify-center">
        <Loader2 className="animate-spin mr-2 h-4 w-4" />
        Hämtar data..
      </div>
    );
  }

  const prices = data.map(({ SEK_per_kWh }) => SEK_per_kWh);
  const totalHours = data.length;
  const totalPrice = prices.reduce((acc, v) => acc + v, 0);
  const averagePrice = totalPrice / totalHours;
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const currentHour = data.find((v) => dayjs().isSame(v.time_start, "hour"));
  const lowestHour = data.find((v) => v.SEK_per_kWh === lowestPrice);
  const highestHour = data.find((v) => v.SEK_per_kWh === highestPrice);

  return (
    <Card className="p-4 space-y-2">
      <div className="flex justify-between items-end pb-4">
        {currentHour && (
          <div>
            Nu{" "}
            <span className="text-2xl font-bold">
              {displayPrice(currentHour?.SEK_per_kWh, true)}
            </span>{" "}
            <span className="font-bold">öre/kWh</span>
          </div>
        )}
        <div className="flex justify-evenly gap-2">
          {lowestHour && (
            <MiniStat
              label="Lägst"
              value={displayPrice(lowestHour.SEK_per_kWh, true)}
              time={`${displayTime(
                lowestHour.time_start,
                lowestHour.time_end
              )}`}
              Icon={ArrowDown}
              variant="lowest"
            />
          )}

          {highestHour && (
            <MiniStat
              label="Högst"
              value={displayPrice(highestHour.SEK_per_kWh, true)}
              time={`${displayTime(
                highestHour.time_start,
                highestHour.time_end
              )}`}
              Icon={ArrowUp}
              variant="highest"
            />
          )}
          <MiniStat
            label="Genomsnitt"
            value={`${displayPrice(averagePrice, true)}`}
            Icon={TbTilde}
            variant="average"
          />
        </div>
      </div>
      <Chart data={data} />
      <SpotPriceTable data={data} />
    </Card>
  );
}
