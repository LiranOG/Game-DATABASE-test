import { useMemo, useState, useEffect } from 'react';
import { Game, FilterState, SortOption, SortDirection, RawGameData } from '@/app/types/game';
import { hydrateGame, fuzzySearch } from '@/app/utils/searchEngine';
import rawGamesData from '@/app/data/games.json';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  // Hydrate data on mount with simulated loading
  useEffect(() => {
    // Simulate a small delay to allow UI to show loading state and prevent blocking main thread immediately
    const timer = setTimeout(() => {
      const hydrated = (rawGamesData as RawGameData[]).map(hydrateGame);
      setGames(hydrated);
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    genre: [],
    year: null,
    playMode: [],
    sortBy: 'title',
    sortDirection: 'asc',
  });

  const filteredGames = useMemo(() => {
    let result = [...games];

    // 1. Search
    if (filters.searchQuery) {
      result = fuzzySearch(filters.searchQuery, result);
    }

    // 2. Genre
    if (filters.genre.length > 0) {
      result = result.filter(game => filters.genre.includes(game.genre));
    }

    // 3. Year
    if (filters.year) {
      result = result.filter(game => game.releaseYear === filters.year);
    }

    // 4. Play Mode
    if (filters.playMode.length > 0) {
      result = result.filter(game => filters.playMode.includes(game.playMode));
    }

    // 5. Sort
    result.sort((a, b) => {
      const key = (filters.sortBy === 'year' ? 'releaseYear' : filters.sortBy) as keyof Game;
      let valA = a[key];
      let valB = b[key];

      // Handle AppID sorting specifically
      if (key === 'appid') {
        const isNonSteamA = valA === 'NONSTEAM';
        const isNonSteamB = valB === 'NONSTEAM';
        
        if (isNonSteamA && isNonSteamB) return 0;
        if (isNonSteamA) return 1; // NONSTEAM goes to bottom
        if (isNonSteamB) return -1;
        
        // Convert to numbers for correct numeric sorting of IDs
        valA = parseInt(valA as string, 10);
        valB = parseInt(valB as string, 10);
      } else if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return filters.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return filters.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [games, filters]);

  // Extract unique genres and years for filter options
  const genres = useMemo(() => {
    const unique = new Set(games.map(g => g.genre));
    return Array.from(unique).sort();
  }, [games]);

  const years = useMemo(() => {
    const unique = new Set(games.map(g => g.releaseYear));
    return Array.from(unique).sort((a, b) => b - a);
  }, [games]);

  const playModes = useMemo(() => {
    const unique = new Set(games.map(g => g.playMode));
    return Array.from(unique).sort();
  }, [games]);

  return {
    games: filteredGames,
    loading,
    filters,
    setFilters,
    options: {
      genres,
      years,
      playModes
    }
  };
};
