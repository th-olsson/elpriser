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
import { DataContext, Zone } from "@/context/data-provider";
import { useContext } from "react";

export function ZoneSelector() {
  const { zone, setZone } = useContext(DataContext);

  return (
    <Select value={zone || "SE3"} onValueChange={(v: Zone) => setZone(v)}>
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
