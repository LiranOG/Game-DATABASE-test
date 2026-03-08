'use client';

import React, { useState } from 'react';
import { useGames } from '@/app/hooks/useGames';
import Header from '@/app/components/layout/Header';
import Sidebar from '@/app/components/layout/Sidebar';
import GameList from '@/app/components/games/GameList';
import GameGrid from '@/app/components/games/GameGrid';
import GenreFilter from '@/app/components/filters/GenreFilter';
import YearFilter from '@/app/components/filters/YearFilter';
import PlayModeFilter from '@/app/components/filters/PlayModeFilter';
import SortMenu from '@/app/components/filters/SortMenu';
import ViewToggle from '@/app/components/ui/ViewToggle';
import GameDetailModal from '@/app/components/games/GameDetailModal';
import { Loader2 } from 'lucide-react';

import { SortOption, SortDirection, Game } from '@/app/types/game';

export default function Home() {
  const { games, loading, filters, setFilters, options } = useGames();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeLink, setActiveLink] = useState('My Library');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, searchQuery: value }));
  };

  const handleGenreChange = (genres: string[]) => {
    setFilters(prev => ({ ...prev, genre: genres }));
  };

  const handleYearChange = (year: number | null) => {
    setFilters(prev => ({ ...prev, year }));
  };

  const handlePlayModeChange = (modes: string[]) => {
    setFilters(prev => ({ ...prev, playMode: modes }));
  };

  const handleSortChange = (sortBy: SortOption, sortDirection: SortDirection) => {
    setFilters(prev => ({ ...prev, sortBy, sortDirection }));
  };

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleHeaderSort = (field: SortOption) => {
    if (filters.sortBy === field) {
      setFilters(prev => ({
        ...prev,
        sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        sortBy: field,
        sortDirection: 'asc'
      }));
    }
  };

  const handleLinkClick = (label: string) => {
    setActiveLink(label);
    // Logic for other links can be added here
    if (label === 'Favorites') {
      // Implement favorites filter logic if needed
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300 h-full">
        {/* Header */}
        <Header 
          searchQuery={filters.searchQuery} 
          onSearchChange={handleSearchChange}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Content Area */}
        <main className="flex-1 p-6 mt-16 overflow-hidden flex flex-col h-[calc(100vh-4rem)]">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 shrink-0">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                My Library 
                <span className="ml-2 text-sm font-normal text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                  {games.length}
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              <YearFilter
                years={options.years}
                selectedYear={filters.year}
                onChange={handleYearChange}
              />
              <GenreFilter 
                genres={options.genres} 
                selectedGenres={filters.genre} 
                onChange={handleGenreChange} 
              />
              <PlayModeFilter
                playModes={options.playModes}
                selectedPlayModes={filters.playMode}
                onChange={handlePlayModeChange}
              />
              <SortMenu 
                sortBy={filters.sortBy} 
                sortDirection={filters.sortDirection} 
                onChange={handleSortChange} 
              />
            </div>
          </div>

          {/* Grid Container */}
          <div className="flex-1 relative bg-zinc-950/50 rounded-2xl border border-zinc-800/50 overflow-hidden">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              </div>
            ) : games.length > 0 ? (
              viewMode === 'list' ? (
                <GameList 
                  games={games} 
                  sortBy={filters.sortBy}
                  sortDirection={filters.sortDirection}
                  onSortChange={handleHeaderSort}
                  onGameClick={handleGameClick}
                />
              ) : (
                <GameGrid games={games} onGameClick={handleGameClick} />
              )
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500">
                <p className="text-lg font-medium">No games found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <GameDetailModal 
        game={selectedGame} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
