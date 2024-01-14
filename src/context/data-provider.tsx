"use client";

import { DayPrices } from "@/example";
import { getData } from "@/utils";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createContext } from "react";

export type Zone = "SE1" | "SE2" | "SE3" | "SE4";

type Context = {
  zone: Zone | undefined;
  setZone: (zone: Zone) => void;
  data: DayPrices;
};

export const DataContext = createContext<Context>({
  zone: undefined,
  setZone: () => {},
  data: [],
});

export const DataProvider = ({ children }: PropsWithChildren<{}>) => {
  const [zone, setZone] = useState<Zone | undefined>(undefined);
  const [data, setData] = useState<DayPrices>([]);

  useEffect(() => {
    async function updateData() {
      const pricesData = await getData(zone || "SE3");
      setData(pricesData);
    }
    updateData();
  }, [zone]);

  return (
    <DataContext.Provider value={{ zone, setZone, data }}>
      {children}
    </DataContext.Provider>
  );
};

export const useZone = () => useContext<Context>(DataContext);
