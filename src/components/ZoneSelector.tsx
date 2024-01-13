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
import { useState } from "react";

type Zones = "SE1" | "SE2" | "SE3" | "SE4";

export function ZoneSelector() {
  const [value, setValue] = useState<Zones>("SE3");

  return (
    <Select value={value} onValueChange={(v: Zones) => setValue(v)}>
      <SelectTrigger className="w-[160px]">
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
