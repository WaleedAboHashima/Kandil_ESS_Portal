"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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
  { month: "January", used: 2, remaining: 10 },
  { month: "February", used: 1.5, remaining: 10.5 },
  { month: "March", used: 3, remaining: 9 },
  { month: "April", used: 2, remaining: 9 },
  { month: "May", used: 1, remaining: 9 },
  { month: "June", used: 2.5, remaining: 8.5 },
]

const chartConfig = {
  used: {
    label: "Used",
    color: "#ef4444",
  },
  remaining: {
    label: "Remaining",
    color: "#10b981",
  },
} satisfies ChartConfig

export function ChartBarLeaveTypes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Usage Trend</CardTitle>
        <CardDescription>Monthly leave balance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="used" fill="var(--color-used)" radius={4} />
            <Bar dataKey="remaining" fill="var(--color-remaining)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
