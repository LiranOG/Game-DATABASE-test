export interface RawGameData {
  "Number of game": string;
  appid: string;
  foldername: string;
}

export interface Game {
  id: string;
  title: string;
  originalFoldername: string;
  appid: string;
  coverUrl: string;
  genre: string;
  releaseYear: number;
  playMode: 'Single-player' | 'Multi-player' | 'Co-op';
  rating: number; // 0-100
  isInstalled: boolean;
}

export interface GameDetails {
  description: string;
  steamRating: string;
  metacriticScore: string;
  hltb: {
    main: string;
    mainExtra: string;
    completionist: string;
  };
  developers: string[];
  publishers: string[];
  tags: string[];
}

export type SortOption = 'title' | 'year' | 'rating' | 'genre' | 'appid';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  searchQuery: string;
  genre: string[];
  year: number | null;
  playMode: string[];
  sortBy: SortOption;
  sortDirection: SortDirection;
}
