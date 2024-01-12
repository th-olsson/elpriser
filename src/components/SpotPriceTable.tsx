"use client";

import type { Hour } from "@/example";
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

type Props = {
  data: Hour;
};

export function SpotPriceTable({ data }: Props) {
  const prices = data.map(({ SEK_per_kWh }) => SEK_per_kWh);
  const totalHours = data.length;
  const totalPrice = prices.reduce((acc, v) => acc + v, 0);
  const averagePrice = totalPrice / totalHours;

  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const hourNow = data.find((v) => dayjs().isSame(v.time_start, "hour"));

  return (
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
              key={i}
              className={`${isNow ? "font-semibold text-foreground" : ""}`}
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
  );
}
