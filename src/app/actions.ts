"use server";

import type { WeatherData } from "@/types/weather";
import { processWeatherAlerts } from "@/ai/flows/process-weather-alerts";

export async function getWeatherData(
  city: string
): Promise<WeatherData | { error: string }> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return { error: "API key is not configured." };
  }

  try {
    // 1. Get coordinates for the city
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoResponse = await fetch(geoUrl, { next: { revalidate: 3600 } });
    if (!geoResponse.ok) {
        const errorData = await geoResponse.json();
        throw new Error(`Failed to fetch coordinates: ${errorData.message || geoResponse.statusText}`);
    }
    const geoData = await geoResponse.json();
    if (geoData.length === 0) {
      return { error: `City not found: ${city}` };
    }
    const { lat, lon, name, country } = geoData[0];

    // 2. Get weather data using coordinates
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}&units=metric`;
    const weatherResponse = await fetch(weatherUrl, { next: { revalidate: 600 } });
     if (!weatherResponse.ok) {
        const errorData = await weatherResponse.json();
        throw new Error(`Failed to fetch weather data: ${errorData.message || weatherResponse.statusText}`);
    }
    const weatherData = await weatherResponse.json();

    // 3. Process weather alerts with AI if they exist
    let processedAlerts = weatherData.alerts;
    if (weatherData.alerts && weatherData.alerts.length > 0) {
      try {
        const alertSummary = await processWeatherAlerts({
          location: name,
          alerts: weatherData.alerts.map((a: any) => a.event),
        });
        // Replace original alerts with a single, summarized alert
        processedAlerts = [{
          sender_name: 'WeatherVista AI',
          event: 'Weather Alert Summary',
          description: alertSummary.summary,
          start: weatherData.alerts[0].start,
          end: weatherData.alerts[0].end,
          tags: []
        }];
      } catch (aiError) {
        console.error("AI processing failed:", aiError);
        // Fallback to original alerts if AI fails
        processedAlerts = weatherData.alerts;
      }
    }


    const transformedData: WeatherData = {
      location: { city: name, country, lat, lon },
      current: {
        ...weatherData.current,
        weather: weatherData.current.weather[0],
      },
      hourly: weatherData.hourly.slice(0, 24).map((h: any) => ({ ...h, weather: h.weather[0] })),
      daily: weatherData.daily.slice(0, 5).map((d: any) => ({ ...d, weather: d.weather[0] })),
      alerts: processedAlerts,
    };

    return transformedData;
  } catch (error: any) {
    console.error("Error in getWeatherData:", error);
    return { error: error.message || "An unknown error occurred." };
  }
}
