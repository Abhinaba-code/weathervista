import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, List, Thermometer, AlertCircle, Clock } from "lucide-react";

const helpItems = [
    {
        icon: Search,
        title: "Search for a City",
        description: "Use the search bar at the top of the page to find weather information for any city. Just type the city name and press Enter or click the search button.",
    },
    {
        icon: Thermometer,
        title: "View Current Weather",
        description: "The main dashboard shows the current temperature, what it feels like, and a description of the weather. You'll also find details like humidity, wind speed, and UV index.",
    },
    {
        icon: Clock,
        title: "Check Forecasts",
        description: "Use the tabs to switch between a 24-hour hourly forecast and a 5-day daily forecast to plan your week.",
    },
    {
        icon: AlertCircle,
        title: "Weather Alerts",
        description: "If there are any active weather alerts for the selected location, they will appear below the current weather details, summarized for your convenience.",
    },
    {
        icon: List,
        title: "Recent Searches",
        description: "Your most recent searches are saved at the bottom of the page. Click on any of them to quickly get updated weather information.",
    },
];

export default function HelpPage() {
    return (
        <div className="bg-default min-h-full flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full glassmorphism">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl">Help Center</CardTitle>
                    <CardDescription>How to use WeatherVista</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-6">
                        {helpItems.map((item) => (
                            <li key={item.title} className="flex gap-4 items-start">
                                <div className="p-2 bg-primary/20 text-primary rounded-full">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
