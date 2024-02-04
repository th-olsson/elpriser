import dayjs from "dayjs";
import { Zone } from "./context/data-provider";

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

export async function getPriceData(area: Zone): Promise<JSON> {
  const now = dayjs();
  const year = now.format("YYYY");
  const month = now.format("MM");
  const day = now.format("DD");

  const res = await fetch(
    `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${day}_${area}.json`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
}
