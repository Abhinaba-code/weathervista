"use client";

import { useState, useEffect, useCallback } from "react";

const MAX_SEARCHES = 5;
const STORAGE_KEY = "weather-vista-recent-searches";

export function useRecentSearches(): [
  string[],
  (city: string) => void
] {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedSearches = localStorage.getItem(STORAGE_KEY);
      if (storedSearches) {
        setSearches(JSON.parse(storedSearches));
      }
    } catch (error) {
      console.error("Failed to read recent searches from localStorage", error);
    }
  }, []);

  const addSearch = useCallback((city: string) => {
    const normalizedCity = city.trim().toLowerCase();
    
    setSearches((prevSearches) => {
      const updatedSearches = [
        city,
        ...prevSearches.filter(s => s.toLowerCase() !== normalizedCity)
      ].slice(0, MAX_SEARCHES);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSearches));
      } catch (error) {
        console.error("Failed to save recent searches to localStorage", error);
      }
      
      return updatedSearches;
    });
  }, []);

  return [searches, addSearch];
}
