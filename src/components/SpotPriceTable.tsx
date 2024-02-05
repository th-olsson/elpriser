"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { displayPrice, displayTime } from "@/utils";
import type { DayPrices } from "@/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Card } from "./ui/card";
import { useState } from "react";
import { Button } from "./ui/button";

type Props = {
  data: DayPrices;
};

export function SpotPriceTable({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const prices = data.map(({ SEK_per_kWh }) => SEK_per_kWh);
  const totalHours = data.length;
  const totalPrice = prices.reduce((acc, v) => acc + v, 0);
  const averagePrice = totalPrice / totalHours;

  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const hourNow = data.find((v) => dayjs().isSame(v.time_start, "hour"));

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild className="flex justify-center w-full">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? "Visa tabell" : "Dölj tabell"}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <Card className="pb-2">
          <Table>
            <TableCaption className="caption-bottom">
              Elpriset idag, timme för timme
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Tidpunkt</TableHead>
                <TableHead className="text-right">öre/kWh</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-muted-foreground">
              {data.map(({ SEK_per_kWh, time_start, time_end }, i) => {
                const sek = SEK_per_kWh;

                const isLowest = sek === lowestPrice;
                const isHighest = sek === highestPrice;
                const isBelowAverage = sek < averagePrice;
                const isNow = dayjs().isSame(dayjs(time_start), "hour");

                return (
                  <TableRow
                    key={time_start}
                    className={`${
                      isNow ? "font-semibold text-foreground" : ""
                    }`}
                  >
                    <TableCell className="text-inherit">
                      {displayTime(time_start, time_end)}
                    </TableCell>
                    <TableCell
                      className={`text-right ${
                        isBelowAverage ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {isNow && <span aria-label="Nuvarande pris">→</span>}{" "}
                      {isLowest && <span aria-label="Lägst pris">↓</span>}{" "}
                      {isHighest && <span aria-label="Högst pris">↑</span>}{" "}
                      {displayPrice(sek)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
        <CollapsibleTrigger asChild className="flex justify-center w-full mt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {!isOpen ? "Visa tabell" : "Dölj tabell"}
          </Button>
        </CollapsibleTrigger>
      </CollapsibleContent>
    </Collapsible>
  );
}
