import type { WeatherData } from "@/types/weather";
import CurrentWeather from "./current-weather";
import WeatherDetails from "./weather-details";
import Forecasts from "./forecasts";
import WeatherAlerts from "./weather-alerts";

type WeatherDashboardProps = {
  data: WeatherData;
};

export default function WeatherDashboard({ data }: WeatherDashboardProps) {
  return (
    <div className="space-y-8">
      <CurrentWeather data={data} />
      <WeatherAlerts data={data} />
      <WeatherDetails data={data} />
      <Forecasts data={data} />
    </div>
  );
}
