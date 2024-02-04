// TODO: Make server component instead
// TODO: Make app static and increment it on demand on updateData
"use client";

import { ZoneSelector } from "@/components/ZoneSelector";
import { SpotPriceTable } from "@/components/SpotPriceTable";
import { MiniStat } from "@/components/MiniStat";
import { Card } from "@/components/ui/card";
import { displayPrice, displayTime } from "@/utils";
import dayjs from "dayjs";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { TbTilde } from "react-icons/tb";
import Chart from "@/components/Chart";

import { useContext } from "react";
import { DataContext } from "@/context/data-provider";

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

  return (
    <main className="container px-6 py-8 mx-auto max-w-2xl">
      {data.length < 1 ? (
        <div className="flex items-center py-6 justify-center">
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Hämtar data..
        </div>
      ) : (
        <section className="space-y-2">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4 sm:flex-row justify-between items-start">
              <h2 className="text-2xl font-extrabold text-left">
                Dagens elpriser
              </h2>
              <div className="w-full sm:w-fit">
                <ZoneSelector />
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Card className="p-4 space-y-2">
              <div className="flex justify-between items-end pb-4">
                <div>
                  Nu{" "}
                  <span className="text-2xl font-bold">
                    {displayPrice(currentHour!.SEK_per_kWh, true)}
                  </span>{" "}
                  <span className="font-bold">öre/kWh</span>
                </div>
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
          </div>
        </section>
      )}
    </main>
  );
}
