import dayjs from "dayjs";
import { DayPrices } from "./example";
import { Zone } from "./context/data-provider";

export function displayPrice(sek: number, hideDecimals?: boolean) {
  // Convert sek to öre and round to 2 decimals
  return (100 * sek).toFixed(hideDecimals ? 0 : 2);
}

export function displayTime(start: string, end: string) {
  return `${dayjs(start).format("HH:mm")} - ${dayjs(end).format("HH:mm")}`;
}

export async function getData(zone: Zone): Promise<DayPrices> {
  const now = dayjs();
  const year = now.format("YYYY");
  const month = now.format("MM");
  const day = now.format("DD");

  const res = await fetch(
    `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${day}_${zone}.json`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
