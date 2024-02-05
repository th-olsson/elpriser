"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Area, AreaContext } from "@/context/area-provider";
import { useContext } from "react";

export function AreaSelector() {
  const { area, setArea } = useContext(AreaContext);

  return (
    <Select value={area || "SE3"} onValueChange={(v: Area) => setArea(v)}>
      <SelectTrigger>
        <SelectValue placeholder="Välj elområde" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>De fyra elområdena</SelectLabel>
          <SelectItem value="SE1">Luleå (SE1)</SelectItem>
          <SelectItem value="SE2">Sundsvall (SE2)</SelectItem>
          <SelectItem value="SE3">Stockholm (SE3)</SelectItem>
          <SelectItem value="SE4">Malmö (SE4)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
