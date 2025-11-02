import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Github } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-default min-h-full flex items-center justify-center p-4">
      <Card className="max-w-md w-full glassmorphism">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">About WeatherVista</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://github.com/shadcn.png" alt="Abhinaba Roy Pradhan" />
            <AvatarFallback>ARP</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold font-headline">Abhinaba Roy Pradhan</h2>
            <p className="text-muted-foreground">Creator & Developer</p>
          </div>
          <p className="text-center text-foreground/80">
            WeatherVista is a passion project designed to provide a beautiful and functional weather-checking experience.
          </p>
          <div className="flex flex-col gap-2 w-full items-center">
            <a href="mailto:abhinabapradhan@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
              <span>abhinabapradhan@gmail.com</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
