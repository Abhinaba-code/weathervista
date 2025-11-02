import type { WeatherData } from "@/types/weather";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";

type WeatherAlertsProps = {
  data: WeatherData;
};

export default function WeatherAlerts({ data }: WeatherAlertsProps) {
  if (!data.alerts || data.alerts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4">
      {data.alerts.map((alert, index) => (
        <Alert key={index} variant="destructive" className="bg-destructive/80 glassmorphism border-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-headline">{alert.event}</AlertTitle>
          <AlertDescription>
            <p className="mb-2">{alert.description}</p>
            <p className="text-xs text-destructive-foreground/80">
                Source: {alert.sender_name} | Effective from {format(new Date(alert.start * 1000), 'PPp')} to {format(new Date(alert.end * 1000), 'PPp')}
            </p>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
