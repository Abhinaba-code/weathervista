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
  Moon,
  CloudFog,
  CloudSun,
  Cloudy,
  Tornado,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// WeatherAPI.com condition codes to Lucide icons
const iconMapping: { [key: number]: LucideIcon } = {
    1000: Sun, // Sunny
    1003: CloudSun, // Partly cloudy
    1006: Cloud, // Cloudy
    1009: Cloudy, // Overcast
    1030: Haze, // Mist
    1063: CloudDrizzle, // Patchy rain possible
    1066: CloudSnow, // Patchy snow possible
    1069: CloudDrizzle, // Patchy sleet possible
    1072: CloudDrizzle, // Patchy freezing drizzle possible
    1087: CloudLightning, // Thundery outbreaks possible
    1114: CloudSnow, // Blowing snow
    1117: CloudSnow, // Blizzard
    1135: CloudFog, // Fog
    1147: CloudFog, // Freezing fog
    1150: CloudDrizzle, // Patchy light drizzle
    1153: CloudDrizzle, // Light drizzle
    1168: CloudDrizzle, // Freezing drizzle
    1171: CloudDrizzle, // Heavy freezing drizzle
    1180: CloudRain, // Patchy light rain
    1183: CloudRain, // Light rain
    1186: CloudRain, // Moderate rain at times
    1189: CloudRain, // Moderate rain
    1192: CloudRain, // Heavy rain at times
    1195: CloudRain, // Heavy rain
    1198: CloudRain, // Light freezing rain
    1201: CloudRain, // Moderate or heavy freezing rain
    1204: CloudSnow, // Light sleet
    1207: CloudSnow, // Moderate or heavy sleet
    1210: CloudSnow, // Patchy light snow
    1213: CloudSnow, // Light snow
    1216: CloudSnow, // Patchy moderate snow
    1219: CloudSnow, // Moderate snow
    1222: CloudSnow, // Patchy heavy snow
    1225: CloudSnow, // Heavy snow
    1237: CloudSnow, // Ice pellets
    1240: CloudRain, // Light rain shower
    1243: CloudRain, // Moderate or heavy rain shower
    1246: CloudRain, // Torrential rain shower
    1249: CloudSnow, // Light sleet showers
    1252: CloudSnow, // Moderate or heavy sleet showers
    1255: CloudSnow, // Light snow showers
    1258: CloudSnow, // Moderate or heavy snow showers
    1261: CloudSnow, // Light showers of ice pellets
    1264: CloudSnow, // Moderate or heavy showers of ice pellets
    1273: CloudLightning, // Patchy light rain with thunder
    1276: CloudLightning, // Moderate or heavy rain with thunder
    1279: CloudLightning, // Patchy light snow with thunder
    1282: CloudLightning, // Moderate or heavy snow with thunder
};

export function getWeatherIcon(iconFilename: string): LucideIcon {
  const code = iconFilename.replace('.png', '');
  // WeatherAPI provides day/night icons. We extract the code.
  // e.g. day/113.png or night/113.png. We just need 113.
  const conditionCode = parseInt(code.split('/').pop() || '1000');
  
  if(iconFilename.includes('night')){
      if (conditionCode === 1000) return Moon;
      if (conditionCode === 1003) return Cloud;
  }
  
  return iconMapping[conditionCode] || Sun;
}

export function getWeatherBgClass(weatherMain: string): string {
 const lowerWeather = weatherMain.toLowerCase();
  
  if (lowerWeather.includes("thunder")) return "bg-thunderstorm";
  if (lowerWeather.includes("rain") || lowerWeather.includes("drizzle")) return "bg-rainy";
  if (lowerWeather.includes("snow") || lowerWeather.includes("sleet") || lowerWeather.includes("blizzard")) return "bg-snowy";
  if (lowerWeather.includes("clear") || lowerWeather.includes("sunny")) return "bg-sunny";
  if (lowerWeather.includes("cloudy") || lowerWeather.includes("overcast")) return "bg-cloudy";
  if (lowerWeather.includes("mist") || lowerWeather.includes("fog") || lowerWeather.includes("haze")) return "bg-atmosphere";
  if (lowerWeather.includes("tornado")) return "bg-thunderstorm";

  return "bg-default";
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
