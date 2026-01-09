"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive attendance chart"

const chartData = [
  { date: "2025-04-01", present: 8, workHours: 7.5 },
  { date: "2025-04-02", present: 8, workHours: 8 },
  { date: "2025-04-03", present: 8, workHours: 7.8 },
  { date: "2025-04-04", present: 8, workHours: 8 },
  { date: "2025-04-05", present: 8, workHours: 8.2 },
  { date: "2025-04-06", present: 0, workHours: 0 },
  { date: "2025-04-07", present: 0, workHours: 0 },
  { date: "2025-04-08", present: 8, workHours: 9 },
  { date: "2025-04-09", present: 8, workHours: 7.5 },
  { date: "2025-04-10", present: 8, workHours: 8 },
  { date: "2025-04-11", present: 8, workHours: 8 },
  { date: "2025-04-12", present: 8, workHours: 8.5 },
  { date: "2025-04-13", present: 0, workHours: 0 },
  { date: "2025-04-14", present: 0, workHours: 0 },
  { date: "2025-04-15", present: 8, workHours: 8 },
  { date: "2025-04-16", present: 8, workHours: 7.5 },
  { date: "2025-04-17", present: 8, workHours: 8 },
  { date: "2025-04-18", present: 8, workHours: 8.5 },
  { date: "2025-04-19", present: 8, workHours: 9 },
  { date: "2025-04-20", present: 0, workHours: 0 },
  { date: "2025-04-21", present: 0, workHours: 0 },
  { date: "2025-04-22", present: 8, workHours: 8 },
  { date: "2025-04-23", present: 8, workHours: 7.5 },
  { date: "2025-04-24", present: 8, workHours: 8 },
  { date: "2025-04-25", present: 8, workHours: 8 },
  { date: "2025-04-26", present: 8, workHours: 8.5 },
  { date: "2025-04-27", present: 0, workHours: 0 },
  { date: "2025-04-28", present: 0, workHours: 0 },
  { date: "2025-04-29", present: 8, workHours: 8 },
  { date: "2025-04-30", present: 8, workHours: 9 },
  { date: "2025-05-01", present: 8, workHours: 8 },
  { date: "2025-05-02", present: 8, workHours: 8 },
  { date: "2025-05-03", present: 8, workHours: 7.5 },
  { date: "2025-05-04", present: 0, workHours: 0 },
  { date: "2025-05-05", present: 0, workHours: 0 },
  { date: "2025-05-06", present: 8, workHours: 8 },
  { date: "2025-05-07", present: 8, workHours: 8.5 },
  { date: "2025-05-08", present: 8, workHours: 8 },
  { date: "2025-05-09", present: 8, workHours: 8 },
  { date: "2025-05-10", present: 8, workHours: 9 },
  { date: "2025-05-11", present: 0, workHours: 0 },
  { date: "2025-05-12", present: 0, workHours: 0 },
  { date: "2025-05-13", present: 8, workHours: 7.5 },
  { date: "2025-05-14", present: 8, workHours: 8 },
  { date: "2025-05-15", present: 8, workHours: 8 },
  { date: "2025-05-16", present: 8, workHours: 8.5 },
  { date: "2025-05-17", present: 8, workHours: 8 },
  { date: "2025-05-18", present: 0, workHours: 0 },
  { date: "2025-05-19", present: 0, workHours: 0 },
  { date: "2025-05-20", present: 8, workHours: 8 },
  { date: "2025-05-21", present: 8, workHours: 8 },
  { date: "2025-05-22", present: 8, workHours: 7.5 },
  { date: "2025-05-23", present: 8, workHours: 8 },
  { date: "2025-05-24", present: 8, workHours: 9 },
  { date: "2025-05-25", present: 0, workHours: 0 },
  { date: "2025-05-26", present: 0, workHours: 0 },
  { date: "2025-05-27", present: 8, workHours: 8 },
  { date: "2025-05-28", present: 8, workHours: 8.5 },
  { date: "2025-05-29", present: 8, workHours: 8 },
  { date: "2025-05-30", present: 8, workHours: 8 },
  { date: "2025-05-31", present: 8, workHours: 7.5 },
  { date: "2025-06-01", present: 0, workHours: 0 },
  { date: "2025-06-02", present: 0, workHours: 0 },
  { date: "2025-06-03", present: 8, workHours: 8 },
  { date: "2025-06-04", present: 8, workHours: 8 },
  { date: "2025-06-05", present: 8, workHours: 9 },
  { date: "2025-06-06", present: 8, workHours: 8 },
  { date: "2025-06-07", present: 8, workHours: 8.5 },
  { date: "2025-06-08", present: 0, workHours: 0 },
  { date: "2025-06-09", present: 0, workHours: 0 },
  { date: "2025-06-10", present: 8, workHours: 8 },
  { date: "2025-06-11", present: 8, workHours: 7.5 },
  { date: "2025-06-12", present: 8, workHours: 8 },
  { date: "2025-06-13", present: 8, workHours: 8 },
  { date: "2025-06-14", present: 8, workHours: 8.5 },
  { date: "2025-06-15", present: 0, workHours: 0 },
  { date: "2025-06-16", present: 0, workHours: 0 },
  { date: "2025-06-17", present: 8, workHours: 8 },
  { date: "2025-06-18", present: 8, workHours: 8 },
  { date: "2025-06-19", present: 8, workHours: 9 },
  { date: "2025-06-20", present: 8, workHours: 8 },
  { date: "2025-06-21", present: 8, workHours: 7.5 },
  { date: "2025-06-22", present: 0, workHours: 0 },
  { date: "2025-06-23", present: 0, workHours: 0 },
  { date: "2025-06-24", present: 8, workHours: 8 },
  { date: "2025-06-25", present: 8, workHours: 8.5 },
  { date: "2025-06-26", present: 8, workHours: 8 },
  { date: "2025-06-27", present: 8, workHours: 8 },
  { date: "2025-06-28", present: 8, workHours: 9 },
  { date: "2025-06-29", present: 0, workHours: 0 },
  { date: "2025-06-30", present: 0, workHours: 0 },
]

const chartConfig = {
  attendance: {
    label: "Attendance",
  },
  present: {
    label: "Present Days",
    color: "var(--primary)",
  },
  workHours: {
    label: "Work Hours",
    color: "var(--destructive)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2025-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Attendance & Work Hours</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Your attendance record for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPresent" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-present)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-present)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillWorkHours" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-workHours)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-workHours)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="workHours"
              type="natural"
              fill="url(#fillWorkHours)"
              stroke="var(--color-workHours)"
              stackId="a"
            />
            <Area
              dataKey="present"
              type="natural"
              fill="url(#fillPresent)"
              stroke="var(--color-present)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
