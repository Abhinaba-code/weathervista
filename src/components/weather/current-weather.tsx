"use client";

import { useEffect, useState } from "react";
import type { WeatherData } from "@/types/weather";
import WeatherIcon from "./weather-icon";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

type CurrentWeatherProps = {
  data: WeatherData;
};

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const { location, current } = data;

  return (
    <Card className="w-full glassmorphism text-white">
      <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">
            {location.city}, {location.country}
          </h2>
          <p className="text-lg text-white/80">
            {format(currentTime, "eeee, MMMM d")}
          </p>
          <p className="text-lg text-white/80">
            {format(currentTime, "h:mm a")}
          </p>
          <div className="mt-4 text-7xl md:text-8xl font-headline font-bold flex items-start">
            {Math.round(current.temp)}
            <span className="text-4xl md:text-5xl font-medium mt-2">°C</span>
          </div>
          <p className="text-xl text-white/80 capitalize">
            {current.weather.description}
          </p>
        </div>
        <div className="relative w-40 h-40 md:w-52 md:h-52">
          <WeatherIcon iconCode={current.weather.icon} className="text-yellow-300" isAnimated />
        </div>
      </CardContent>
    </Card>
  );
}
