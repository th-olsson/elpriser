"use client";

import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createContext } from "react";

export type Area = "SE1" | "SE2" | "SE3" | "SE4";

type Context = {
  area: Area;
  setArea: (area: Area) => void;
};

export const AreaContext = createContext<Context>({
  area: "SE3",
  setArea: () => {},
});

export const AreaProvider = ({ children }: PropsWithChildren<{}>) => {
  // TODO: Use cookies/localstorage for preferred area
  const [area, setArea] = useState<Area>("SE3");

  return (
    <AreaContext.Provider value={{ area, setArea }}>
      {children}
    </AreaContext.Provider>
  );
};

export const useArea = () => useContext<Context>(AreaContext);
