import { Button } from "@/components/ui/button";

type RecentSearchesProps = {
  searches: string[];
  onSearch: (city: string) => void;
};

export default function RecentSearches({ searches, onSearch }: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-headline font-semibold text-white mb-2">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {searches.map((city) => (
          <Button
            key={city}
            variant="outline"
            size="sm"
            onClick={() => onSearch(city)}
            className="glassmorphism text-white border-white/30 hover:bg-white/20"
          >
            {city}
          </Button>
        ))}
      </div>
    </div>
  );
}
