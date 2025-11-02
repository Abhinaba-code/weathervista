import Link from "next/link";
import { MountainSnow } from "lucide-react";

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-8 bg-background/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <MountainSnow className="text-primary h-8 w-8" />
          <h1 className="text-2xl font-headline font-bold text-foreground">
            WeatherVista
          </h1>
        </Link>
        <nav className="flex gap-4 md:gap-6 items-center text-lg">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/help" className="text-sm font-medium hover:text-primary transition-colors">
            Help
          </Link>
        </nav>
      </div>
    </header>
  );
}
