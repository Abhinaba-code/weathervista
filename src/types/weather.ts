export interface WeatherData {
  location: {
    city: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    uvi: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string; // Filename like 113.png
    };
  };
  hourly: {
    dt: number;
    temp: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string; // Filename like 113.png
    };
  }[];
  daily: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string; // Filename like 113.png
    };
  }[];
  alerts?: {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
  }[];
}
