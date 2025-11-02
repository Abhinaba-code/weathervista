"use client";

import type { WeatherData } from "@/types/weather";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import WeatherIcon from "./weather-icon";
import { format } from "date-fns";

type ForecastsProps = {
  data: WeatherData;
};

export default function Forecasts({ data }: ForecastsProps) {
  const { hourly, daily } = data;

  const chartData = hourly.map(h => ({
      time: format(new Date(h.dt * 1000), 'ha'),
      temp: Math.round(h.temp),
  }));

  return (
    <Tabs defaultValue="hourly" className="w-full mt-8">
      <TabsList className="grid w-full grid-cols-2 glassmorphism mb-4">
        <TabsTrigger value="hourly">24-Hour Forecast</TabsTrigger>
        <TabsTrigger value="daily">5-Day Forecast</TabsTrigger>
      </TabsList>
      <TabsContent value="hourly">
        <Card className="glassmorphism text-white">
          <CardContent className="p-4">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                  <XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.7)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255, 255, 255, 0.7)" fontSize={12} tickLine={false} axisLine={false} unit="°" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      border: "none",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="temp" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex overflow-x-auto gap-4 pt-4">
              {hourly.map((hour) => (
                <div key={hour.dt} className="flex flex-col items-center flex-shrink-0 w-20 text-center">
                  <p className="text-sm">{format(new Date(hour.dt * 1000), 'ha')}</p>
                  <div className="w-10 h-10 my-1">
                    <WeatherIcon iconCode={hour.weather.icon} />
                  </div>
                  <p className="font-bold text-lg">{Math.round(hour.temp)}°</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="daily">
        <div className="space-y-2">
            {daily.map((day) => (
                <Card key={day.dt} className="glassmorphism text-white">
                    <CardContent className="p-3 flex items-center justify-between">
                        <p className="w-1/4 font-medium">{format(new Date(day.dt * 1000), 'eee, d')}</p>
                        <div className="w-1/4 flex items-center gap-2">
                            <div className="w-8 h-8">
                                <WeatherIcon iconCode={day.weather.icon} />
                            </div>
                            <span className="text-sm hidden md:inline">{day.weather.main}</span>
                        </div>
                        <div className="w-1/4 text-center">
                            <span className="font-bold">{Math.round(day.temp.max)}°</span>
                            <span className="text-white/70"> / {Math.round(day.temp.min)}°</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
