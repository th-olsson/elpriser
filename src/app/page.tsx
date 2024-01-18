// TODO: Make server component instead
"use client";

import { ZoneSelector } from "@/components/ZoneSelector";
import { SpotPriceTable } from "@/components/SpotPriceTable";
import { StatCard } from "@/components/StatCard";
import { Card, CardTitle } from "@/components/ui/card";
import { displayPrice, displayTime } from "@/utils";
import dayjs from "dayjs";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { TbTilde } from "react-icons/tb";
import { useContext } from "react";
import { DataContext } from "@/context/data-provider";
import Chart from "@/components/Chart";
// import { data } from "@/example";

export default function Home() {
  const { data } = useContext(DataContext);

  const prices = data.map(({ SEK_per_kWh }) => SEK_per_kWh);
  const totalHours = data.length;
  const totalPrice = prices.reduce((acc, v) => acc + v, 0);
  const averagePrice = totalPrice / totalHours;
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const currentHour = data.find((v) => dayjs().isSame(v.time_start, "hour"));
  const lowestHour = data.find((v) => v.SEK_per_kWh === lowestPrice);
  const highestHour = data.find((v) => v.SEK_per_kWh === highestPrice);

  function getCurrentColor(price: number, averagePrice: number) {
    if (price < averagePrice) {
      return `text-emerald-400`;
    }
    return `text-red-400`;
  }

  return (
    <main className="container px-6 py-8 mx-auto max-w-2xl">
      <h1 className="text-3xl font-extrabold text-center">Dagens elpriser</h1>
      {data.length < 1 ? (
        <div className="flex items-center py-6 justify-center">
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Hämtar data..
        </div>
      ) : (
        <div className=" flex flex-col space-y-4 py-6">
          {currentHour && (
            <Card className="px-4 py-4 flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold">Just nu</CardTitle>
                <div className="text-2xl">
                  <span
                    className={`text-2xl font-bold ${getCurrentColor(
                      currentHour.SEK_per_kWh,
                      averagePrice
                    )}`}
                  >
                    {displayPrice(currentHour.SEK_per_kWh, true)}
                  </span>
                  <span className=" text-lg"> öre/kWh</span>
                </div>
              </div>
              <ZoneSelector />
            </Card>
          )}
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {lowestHour && (
              <StatCard
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
              <StatCard
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
            <StatCard
              label="Genomsnitt"
              value={`~ ${displayPrice(averagePrice, true)}`}
              Icon={TbTilde}
              variant="average"
            />
          </section>
          <Card className="p-4 space-y-2">
            <Chart data={data} />
            <SpotPriceTable data={data} />
          </Card>
        </div>
      )}
    </main>
  );
}
