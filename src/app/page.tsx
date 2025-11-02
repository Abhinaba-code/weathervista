"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { WeatherData } from "@/types/weather";
import { getWeatherData } from "@/app/actions";
import { getWeatherBgClass } from "@/lib/weather-utils";

import WeatherDashboard from "@/components/weather/weather-dashboard";
import LoadingSkeleton from "@/components/weather/loading-skeleton";
import RecentSearches from "@/components/weather/recent-searches";
import { useRecentSearches } from "@/hooks/use-recent-searches";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("London");
  const [bgClass, setBgClass] = useState("bg-default");
  const [searches, addSearch] = useRecentSearches();
  const { toast } = useToast();

  const fetchWeather = async (searchCity: string) => {
    if (!searchCity) return;
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await getWeatherData(searchCity);
      if (data.error) {
        throw new Error(data.error);
      }
      setWeatherData(data as WeatherData);
      addSearch(data.location.city);
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Error fetching weather data",
        description: err.message,
      });
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("London"); // Initial fetch for a default city
  }, []);

  useEffect(() => {
    if (weatherData) {
      setBgClass(getWeatherBgClass(weatherData.current.weather.main));
    } else {
      setBgClass("bg-default");
    }
  }, [weatherData]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeather(city);
  };
  
  const handleRecentSearch = (recentCity: string) => {
    setCity(recentCity);
    fetchWeather(recentCity);
  }

  return (
    <div
      className={`flex flex-col items-center p-4 md:p-8 min-h-full transition-all duration-500 ${bgClass}`}
    >
      <div className="w-full max-w-5xl z-10">
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="flex-grow glassmorphism text-foreground placeholder:text-muted-foreground text-lg"
          />
          <Button type="submit" size="lg" disabled={loading}>
            <Search className="h-5 w-5" />
          </Button>
        </form>

        {loading && <LoadingSkeleton />}
        {weatherData && !loading && <WeatherDashboard data={weatherData} />}
        
        <RecentSearches searches={searches} onSearch={handleRecentSearch} />
      </div>
    </div>
  );
}
