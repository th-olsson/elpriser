import dayjs from "dayjs";
import { Area } from "./context/area-provider";
import { DayPrices } from "./types";

export function displayPrice(sek: number, hideDecimals?: boolean) {
  // Convert sek to öre and round to 2 decimals
  const öre = sek * 100;
  if (öre < 0) {
    return 0;
  }
  return öre.toFixed(hideDecimals ? 0 : 2);
}

export function displayTime(start: string, end: string) {
  return `${dayjs(start).format("HH:mm")} - ${dayjs(end).format("HH:mm")}`;
}

export async function fetchDailyPrices(area: Area): Promise<DayPrices> {
  const now = dayjs();
  const year = now.format("YYYY");
  const month = now.format("MM");
  const day = now.format("DD");

  const res = await fetch(
    `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${day}_${area}.json`,
    {
      cache: "force-cache",
      next: { tags: ["daily-prices"] },
    }
  );

  const data = await res.json();
  return data;
}
