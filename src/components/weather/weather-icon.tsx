import { getWeatherIcon } from "@/lib/weather-utils";
import { cn } from "@/lib/utils";

interface WeatherIconProps extends React.HTMLAttributes<SVGElement> {
  iconCode: string;
  isAnimated?: boolean;
}

export default function WeatherIcon({ iconCode, className, isAnimated = false, ...props }: WeatherIconProps) {
  const IconComponent = getWeatherIcon(iconCode);

  const animationClass = isAnimated && iconCode.startsWith("01") ? "animate-spin-slow" : "";

  return (
    <IconComponent
      className={cn("h-full w-full", animationClass, className)}
      {...props}
    />
  );
}

// Add custom animation to tailwind.config.ts if it's not there
// keyframes: { 'spin-slow': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } } },
// animation: { 'spin-slow': 'spin-slow 20s linear infinite' }
