import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Haze,
  Wind,
  Thermometer,
  Droplets,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  CalendarDays,
  Clock,
  Navigation,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function getWeatherIcon(iconCode: string): LucideIcon {
  const iconMapping: { [key: string]: LucideIcon } = {
    "01d": Sun,
    "01n": Sun, // Assuming moon icon is not available, using sun for clear night
    "02d": Cloud,
    "02n": Cloud,
    "03d": Cloud,
    "03n": Cloud,
    "04d": Cloud,
    "04n": Cloud,
    "09d": CloudDrizzle,
    "09n": CloudDrizzle,
    "10d": CloudRain,
    "10n": CloudRain,
    "11d": CloudLightning,
    "11n": CloudLightning,
    "13d": CloudSnow,
    "13n": CloudSnow,
    "50d": Haze,
    "50n": Haze,
  };
  return iconMapping[iconCode] || Sun;
}

export function getWeatherBgClass(weatherMain: string): string {
  const bgMapping: { [key: string]: string } = {
    Thunderstorm: "bg-thunderstorm",
    Drizzle: "bg-drizzle",
    Rain: "bg-rainy",
    Snow: "bg-snowy",
    Clear: "bg-sunny",
    Clouds: "bg-cloudy",
  };
  // For atmospheric conditions like Mist, Smoke, Haze, etc.
  const atmosphereConditions = ["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash", "Squall", "Tornado"];
  if (atmosphereConditions.includes(weatherMain)) {
    return "bg-atmosphere";
  }

  return bgMapping[weatherMain] || "bg-default";
}

export const detailIcons = {
    feelsLike: Thermometer,
    humidity: Droplets,
    wind: Wind,
    pressure: Gauge,
    visibility: Eye,
    uv: Sun,
    sunrise: Sunrise,
    sunset: Sunset,
    date: CalendarDays,
    time: Clock,
    windDirection: Navigation,
};
