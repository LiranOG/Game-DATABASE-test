import { Game, RawGameData } from '@/app/types/game';

export const cleanTitle = (foldername: string): string => {
  // Remove version numbers (e.g., v1.2.3, v123456)
  let title = foldername.replace(/v\d+(\.\d+)*(\.\d+)?/g, '');
  
  // Remove tags like -ARMGDDN, + OFME, + SKIDROW, etc.
  title = title.replace(/-ARMGDDN/g, '');
  title = title.replace(/\+ OFME/g, '');
  title = title.replace(/\+ SKIDROW/g, '');
  title = title.replace(/\+ Alcatraz/g, '');
  title = title.replace(/\+ Nebula/g, '');
  title = title.replace(/\(best for VR\)/g, '');
  title = title.replace(/\(Beta\)/g, '');
  
  // Remove trailing/leading spaces and hyphens
  title = title.replace(/\s+-\s*$/, '');
  title = title.trim();
  
  // Fix double spaces
  title = title.replace(/\s+/g, ' ');
  
  return title;
};

const GENRES = [
  'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 
  'Puzzle', 'Racing', 'Sports', 'Horror', 'Shooter', 
  'Platformer', 'Fighting', 'Survival', 'Indie'
];

const PLAY_MODES = ['Single-player', 'Multi-player', 'Co-op'] as const;

export const hydrateGame = (raw: RawGameData): Game => {
  const title = cleanTitle(raw.foldername);
  
  // Deterministic pseudo-random based on appid to keep data consistent across re-renders
  const seed = parseInt(raw.appid) || title.length;
  
  const genreIndex = seed % GENRES.length;
  const year = 2000 + (seed % 25); // 2000 - 2024
  const playModeIndex = seed % PLAY_MODES.length;
  const rating = 60 + (seed % 41); // 60 - 100
  
  // Use Steam CDN if available, otherwise placeholder
  let coverUrl = `https://placehold.co/400x600/1a1a1a/ffffff?text=${encodeURIComponent(title)}`;
  
  if (raw.appid && raw.appid !== 'NONSTEAM') {
    // Steam library header image (600x900 is not standard, using library_600x900 or header)
    // library_600x900.jpg is the vertical cover art format, but not guaranteed for all games.
    // header.jpg is much more reliable but horizontal.
    // For now, let's stick to header.jpg which is almost always available, even if aspect ratio is different.
    // Or we can try to use the steamdb/steam store approach.
    coverUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${raw.appid}/header.jpg`;
  }

  return {
    id: raw.appid === 'NONSTEAM' ? `ns-${raw["Number of game"]}` : raw.appid,
    title,
    originalFoldername: raw.foldername,
    appid: raw.appid,
    coverUrl,
    genre: GENRES[genreIndex],
    releaseYear: year,
    playMode: PLAY_MODES[playModeIndex],
    rating,
    isInstalled: seed % 3 === 0, // Randomly installed
  };
};

export const fuzzySearch = (query: string, games: Game[]): Game[] => {
  if (!query) return games;
  
  const lowerQuery = query.toLowerCase();
  
  return games.filter(game => {
    const lowerTitle = game.title.toLowerCase();
    
    // Exact match or substring
    if (lowerTitle.includes(lowerQuery)) return true;
    
    // Simple fuzzy: check if all characters of query exist in title in order
    // This is a very basic fuzzy search. For better results, we'd use Levenshtein distance.
    // Given the constraints, a robust "includes" is often better than a weak fuzzy.
    // Let's stick to strict includes for performance on 1000 items, 
    // but maybe allow for some typo tolerance if we had a library.
    // For now, we'll just do substring matching as it's standard for "filtering".
    
    return false;
  });
};
