import type { WeatherData } from "@/types/weather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { detailIcons } from "@/lib/weather-utils";
import { format } from 'date-fns';

type WeatherDetailsProps = {
  data: WeatherData;
};

const DetailCard = ({
  title,
  value,
  unit,
  icon: Icon,
  children,
}: {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ElementType;
  children?: React.ReactNode;
}) => (
  <Card className="glassmorphism text-white">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-white/80">{title}</CardTitle>
      <Icon className="h-4 w-4 text-white/80" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {value}
        {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
      </div>
      {children}
    </CardContent>
  </Card>
);

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  const { current } = data;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
      <DetailCard title="Feels Like" value={Math.round(current.feels_like)} unit="°C" icon={detailIcons.feelsLike} />
      <DetailCard title="Humidity" value={current.humidity} unit="%" icon={detailIcons.humidity} />
      <DetailCard title="Wind Speed" value={current.wind_speed.toFixed(1)} unit="m/s" icon={detailIcons.wind}>
        <div className="flex items-center text-xs text-white/80">
            <detailIcons.windDirection style={{ transform: `rotate(${current.wind_deg}deg)`}} className="h-4 w-4 mr-1" />
            Wind direction
        </div>
      </DetailCard>
      <DetailCard title="Pressure" value={current.pressure} unit="hPa" icon={detailIcons.pressure} />
      <DetailCard title="Visibility" value={(current.visibility / 1000).toFixed(1)} unit="km" icon={detailIcons.visibility} />
      <DetailCard title="UV Index" value={current.uvi} icon={detailIcons.uv} />
      <DetailCard title="Sunrise" value={format(new Date(current.sunrise * 1000), 'h:mm a')} icon={detailIcons.sunrise} />
      <DetailCard title="Sunset" value={format(new Date(current.sunset * 1000), 'h:mm a')} icon={detailIcons.sunset} />
    </div>
  );
}
