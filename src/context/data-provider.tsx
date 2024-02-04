"use client";

import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import SE1 from "@/data/SE1.json";
import SE2 from "@/data/SE2.json";
import SE3 from "@/data/SE3.json";
import SE4 from "@/data/SE4.json";
import type { DayPrices } from "@/types";

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
  // TODO: Use cookies/localstorage for preferred zone
  const [zone, setZone] = useState<Zone | undefined>("SE3");
  const [data, setData] = useState<DayPrices>(SE3);

  useEffect(() => {
    switch (zone) {
      case "SE1":
        setData(SE1);
        break;
      case "SE2":
        setData(SE2);
        break;
      case "SE3":
        setData(SE3);
        break;
      case "SE4":
        setData(SE4);
        break;
      default:
        break;
    }
  }, [zone]);

  return (
    <DataContext.Provider value={{ zone, setZone, data }}>
      {children}
    </DataContext.Provider>
  );
};

export const useZone = () => useContext<Context>(DataContext);
