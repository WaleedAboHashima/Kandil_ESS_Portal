"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { type: "annual", days: 8.5, fill: "#3b82f6" },
  { type: "sick", days: 4, fill: "#8b5cf6" },
  { type: "used", days: 11.5, fill: "#ef4444" },
]

const chartConfig = {
  days: {
    label: "Days",
  },
  annual: {
    label: "Annual Leave",
    color: "#3b82f6",
  },
  sick: {
    label: "Sick Leave",
    color: "#8b5cf6",
  },
  used: {
    label: "Used",
    color: "#ef4444",
  },
} satisfies ChartConfig

export function ChartPieLeaveBreakdown() {
  const totalDays = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.days, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Leave Balance Breakdown</CardTitle>
        <CardDescription>Available vs Used</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="days"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalDays.toFixed(1)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Days
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
