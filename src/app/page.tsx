import { AreaSelector } from "@/components/AreaSelector";
import { fetchDailyPrices } from "@/utils";
import { PricesCard } from "@/components/PricesCard";

export default async function Home() {
  const SE1 = await fetchDailyPrices("SE1");
  const SE2 = await fetchDailyPrices("SE2");
  const SE3 = await fetchDailyPrices("SE3");
  const SE4 = await fetchDailyPrices("SE4");
  const areas = { SE1, SE2, SE3, SE4 };

  return (
    <main className="container px-6 py-8 mx-auto max-w-2xl">
      <section className="space-y-2">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-start">
            <h2 className="text-2xl font-extrabold text-left">Elpriset idag</h2>
            <div className="w-full sm:w-fit">
              <AreaSelector />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <PricesCard areas={areas} />
        </div>
      </section>
    </main>
  );
}
