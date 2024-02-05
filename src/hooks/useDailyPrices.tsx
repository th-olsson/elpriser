import { useArea } from "@/context/area-provider";
import { DayPrices } from "@/types";

export type Areas = {
  SE1: DayPrices;
  SE2: DayPrices;
  SE3: DayPrices;
  SE4: DayPrices;
};

export function useDailyPrices(areas: Areas) {
  const { area } = useArea();
  const { SE1, SE2, SE3, SE4 } = areas;

  if (area === "SE1") {
    return SE1;
  }
  if (area === "SE2") {
    return SE2;
  }
  if (area === "SE3") {
    return SE3;
  }
  if (area === "SE4") {
    return SE4;
  }
}
