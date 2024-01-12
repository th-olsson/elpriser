import { ZoneSelector } from "@/components/ZoneSelector";
import { SpotPriceTable } from "@/components/SpotPriceTable";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { data } from "@/example";
import { displayPrice, displayTime } from "@/utils";
import dayjs from "dayjs";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TbTilde } from "react-icons/tb";

export default function Home() {
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
    <main className="container px-4 py-8 mx-auto max-w-4xl">
      <h1 className="text-4xl font-bold">Dagens elpriser</h1>
      <div className=" flex flex-col space-y-6 py-6">
        {currentHour && (
          <Card className="p-4 col-span-4 flex  justify-between">
            <p>
              Just nu:
              <span
                className={`text-2xl font-bold ${getCurrentColor(
                  currentHour.SEK_per_kWh,
                  averagePrice
                )}`}
              >
                {" "}
                {displayPrice(currentHour.SEK_per_kWh, true)}{" "}
              </span>
              öre/kWh
            </p>
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
        <section>
          <Card className="pb-2">
            <SpotPriceTable data={data} />
          </Card>
        </section>
      </div>
    </main>
  );
}
