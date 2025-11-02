"use server";

import type { WeatherData } from "@/types/weather";
import { processWeatherAlerts } from "@/ai/flows/process-weather-alerts";

export async function getWeatherData(
  city: string
): Promise<WeatherData | { error: string }> {
  const apiKey = process.env.WEATHERAPI_API_KEY;
  if (!apiKey) {
    return { error: "API key is not configured." };
  }

  try {
    const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=yes`;
    
    const weatherResponse = await fetch(weatherUrl, { next: { revalidate: 600 } });

    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.json();
      throw new Error(errorData.error.message || `Failed to fetch weather data: ${weatherResponse.statusText}`);
    }
    
    const data = await weatherResponse.json();

    let processedAlerts;
    if (data.alerts && data.alerts.alert.length > 0) {
      try {
        const alertSummary = await processWeatherAlerts({
          location: data.location.name,
          alerts: data.alerts.alert.map((a: any) => a.headline),
        });
        processedAlerts = [{
          sender_name: 'WeatherVista AI',
          event: 'Weather Alert Summary',
          description: alertSummary.summary,
          start: new Date(data.alerts.alert[0].effective).getTime() / 1000,
          end: new Date(data.alerts.alert[0].expires).getTime() / 1000,
          tags: []
        }];
      } catch (aiError) {
        console.error("AI processing failed:", aiError);
        processedAlerts = data.alerts.alert.map((a: any) => ({
            sender_name: "WeatherAPI",
            event: a.event,
            start: new Date(a.effective).getTime() / 1000,
            end: new Date(a.expires).getTime() / 1000,
            description: a.desc,
            tags: [],
        }));
      }
    }

    const transformedData: WeatherData = {
      location: {
        city: data.location.name,
        country: data.location.country,
        lat: data.location.lat,
        lon: data.location.lon,
      },
      current: {
        dt: data.current.last_updated_epoch,
        sunrise: data.forecast.forecastday[0].astro.sunrise,
        sunset: data.forecast.forecastday[0].astro.sunset,
        temp: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        pressure: data.current.pressure_mb,
        humidity: data.current.humidity,
        uvi: data.current.uv,
        visibility: data.current.vis_km,
        wind_speed: data.current.wind_kph / 3.6, // convert kph to m/s
        wind_deg: data.current.wind_degree,
        weather: {
          id: data.current.condition.code,
          main: data.current.condition.text,
          description: data.current.condition.text,
          icon: data.current.condition.icon,
        },
      },
      hourly: data.forecast.forecastday[0].hour.map((h: any) => ({
        dt: h.time_epoch,
        temp: h.temp_c,
        weather: {
          id: h.condition.code,
          main: h.condition.text,
          description: h.condition.text,
          icon: h.condition.icon,
        },
      })),
      daily: data.forecast.forecastday.map((d: any) => ({
        dt: d.date_epoch,
        sunrise: d.astro.sunrise,
        sunset: d.astro.sunset,
        temp: {
          day: d.day.avgtemp_c,
          min: d.day.mintemp_c,
          max: d.day.maxtemp_c,
          night: 0, // Not available directly
          eve: 0, // Not available directly
          morn: 0, // Not available directly
        },
        weather: {
          id: d.day.condition.code,
          main: d.day.condition.text,
          description: d.day.condition.text,
          icon: d.day.condition.icon,
        },
      })),
      alerts: processedAlerts,
    };

    return transformedData;
  } catch (error: any) {
    console.error("Error in getWeatherData:", error);
    return { error: error.message || "An unknown error occurred." };
  }
}
