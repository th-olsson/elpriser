"use client";

import dayjs from "dayjs";
import {
  DotProps,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "./ui/card";
import { CartesianGrid } from "recharts";
import type { DayPrices } from "@/types";

type Props = {
  data: DayPrices;
};

// TODO: Refactor & optimize
export default function Chart({ data }: Props) {
  const totalPrice = data.reduce(
    (acc, { SEK_per_kWh }) => acc + SEK_per_kWh,
    0
  );
  const averagePrice = Number(((totalPrice / data.length) * 100).toFixed(2));

  const chartData = data.map(({ time_start, SEK_per_kWh }) => {
    return {
      date: dayjs(time_start).format("HH"),
      price: Number((SEK_per_kWh * 100).toFixed(2)),
      average: averagePrice,
    };
  });
  const currentHour = data.find((v) => dayjs().isSame(v.time_start, "hour"));
  const currentPrice = Number((currentHour!.SEK_per_kWh * 100).toFixed(2));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData} margin={{ left: 8, right: 8 }}>
        <XAxis
          className="text-xs"
          dataKey="date"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          className="text-xs"
          width={20}
          dataKey="price"
          tickLine={false}
          axisLine={false}
          domain={["auto", "auto"]}
        />
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 13.9%)" />
        <Tooltip
          content={({ payload, label }) => {
            if (payload && payload.length) {
              const value = payload[0].value;
              let cardStyle;
              let numberStyle;
              if (Number(value) > averagePrice) {
                cardStyle = "border-red-950";
                numberStyle = "text-red-400";
              } else {
                cardStyle = "border-green-950";
                numberStyle = "text-green-400";
              }

              return (
                <Card
                  className={`p-2 bg-neutral-950 border opacity-90 ${cardStyle}`}
                >
                  <p className="label text-xs ">
                    {`kl. ${dayjs(new Date())
                      .hour(label)
                      .format("HH")}:00 - ${dayjs(new Date())
                      .hour(label)
                      .add(1, "h")
                      .format("HH")}`}
                    :00
                  </p>
                  <p className="text-xs mt-1">
                    <span className={`text-sm font-bold ${numberStyle}`}>
                      {value}{" "}
                    </span>
                    öre/kWh
                  </p>
                </Card>
              );
            }
          }}
        />
        <Line
          type="stepAfter"
          dataKey="price"
          stroke="hsl(0 0% 64.9%)"
          dot={({ cy, cx, value }: DotProps & { value: number }) => (
            <svg>
              <circle
                r={currentPrice === value ? 7 : 3}
                cy={cy}
                cx={cx}
                fill={value! > averagePrice ? "#f87171" : "#34d399"}
              />
            </svg>
          )}
          activeDot={({ cy, cx, value }: DotProps & { value?: number }) => (
            <svg>
              <circle
                r={currentPrice === value ? 7 : 5}
                stroke={value! > averagePrice ? "#f87171" : "#34d399"}
                stroke-width={2}
                cy={cy}
                cx={cx}
              />
            </svg>
          )}
        />
        <ReferenceLine
          y={averagePrice}
          className="fill-primary"
          type="monotone"
          strokeDasharray="5 5"
          stroke="#fb923c"
          opacity={0.5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
