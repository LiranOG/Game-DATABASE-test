import React, { useState } from 'react';
import { Game, SortOption, SortDirection } from '@/app/types/game';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight, HardDrive, Star, Calendar, Gamepad2, Folder, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface GameListProps {
  games: Game[];
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (option: SortOption) => void;
  onGameClick: (game: Game) => void;
}

const GameCoverImage = ({ src, alt, className, sizes, fallbackIconSize = 24 }: { src?: string, alt: string, className?: string, sizes?: string, fallbackIconSize?: number }) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-700 ${className}`}>
        <Gamepad2 size={fallbackIconSize} />
      </div>
    );
  }

  return (
    <Image 
      src={src} 
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      unoptimized={true}
      onError={() => setError(true)}
    />
  );
};

const SortHeader = ({ label, field, sortBy, sortDirection, onSortChange, className = "" }: { label: string, field: SortOption, sortBy: SortOption, sortDirection: SortDirection, onSortChange: (option: SortOption) => void, className?: string }) => (
  <div 
    className={`hover:bg-zinc-800/50 cursor-pointer px-2 -mx-2 rounded flex items-center gap-1 select-none transition-colors ${className} ${sortBy === field ? 'text-zinc-200 font-semibold' : ''}`}
    onClick={() => onSortChange(field)}
  >
    {label}
    {sortBy === field && (
      sortDirection === 'asc' ? <ArrowUp size={14} className="text-emerald-500" /> : <ArrowDown size={14} className="text-emerald-500" />
    )}
  </div>
);

const GameList: React.FC<GameListProps> = ({ games, sortBy, sortDirection, onSortChange, onGameClick }) => {
  const [expandedGameId, setExpandedGameId] = useState<string | null>(null);

  const toggleGame = (id: string) => {
    setExpandedGameId(expandedGameId === id ? null : id);
  };

  const handlePlayClick = (e: React.MouseEvent, game: Game) => {
    e.stopPropagation();
    alert(`Launching ${game.title}...\n(This is a demo action)`);
  };

  return (
    <div className="w-full h-full overflow-auto custom-scrollbar bg-zinc-950 text-sm">
      <div className="min-w-[1000px]">
        {/* Table Header */}
        <div className="sticky top-0 z-10 grid grid-cols-[40px_2fr_1fr_1fr_1fr_100px] gap-4 px-4 py-3 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 text-zinc-400 font-medium shadow-sm">
          <div className="flex justify-center">#</div>
          <SortHeader label="Name" field="title" sortBy={sortBy} sortDirection={sortDirection} onSortChange={onSortChange} />
          <SortHeader label="App ID" field="appid" sortBy={sortBy} sortDirection={sortDirection} onSortChange={onSortChange} />
          <SortHeader label="Genre" field="genre" sortBy={sortBy} sortDirection={sortDirection} onSortChange={onSortChange} />
          <SortHeader label="Release Date" field="year" sortBy={sortBy} sortDirection={sortDirection} onSortChange={onSortChange} />
          <SortHeader label="Rating" field="rating" sortBy={sortBy} sortDirection={sortDirection} onSortChange={onSortChange} className="justify-end" />
        </div>

        {/* Table Body */}
        <div className="divide-y divide-zinc-800/50">
          {games.map((game, index) => (
            <React.Fragment key={game.id}>
              {/* Main Row */}
              <div 
                onClick={() => toggleGame(game.id)}
                className={`
                  grid grid-cols-[40px_2fr_1fr_1fr_1fr_100px] gap-4 px-4 py-2 
                  cursor-pointer transition-colors duration-150 items-center
                  ${expandedGameId === game.id ? 'bg-zinc-800/60' : 'hover:bg-zinc-800/30 odd:bg-zinc-900/20'}
                `}
              >
                <div className="flex justify-center text-zinc-500">
                  {expandedGameId === game.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative w-6 h-6 shrink-0 rounded overflow-hidden bg-zinc-800">
                     <GameCoverImage 
                       src={game.coverUrl} 
                       alt={game.title}
                       className="object-cover"
                       sizes="24px"
                       fallbackIconSize={14}
                     />
                  </div>
                  <span className="truncate font-medium text-zinc-200">{game.title}</span>
                </div>
                <div className="text-zinc-500 truncate font-mono text-xs">{game.appid}</div>
                <div className="text-zinc-400 truncate">{game.genre || '-'}</div>
                <div className="text-zinc-400 truncate">{game.releaseYear || '-'}</div>
                <div className="text-right text-zinc-400 font-mono">
                  {game.rating > 0 ? (
                    <span className={game.rating >= 80 ? 'text-emerald-400' : game.rating >= 60 ? 'text-yellow-400' : 'text-zinc-400'}>
                      {game.rating}
                    </span>
                  ) : '-'}
                </div>
              </div>

              {/* Expanded Details Panel */}
              <AnimatePresence>
                {expandedGameId === game.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden bg-zinc-900/50 border-b border-zinc-800/50"
                  >
                    <div className="p-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                      {/* Left Column: Cover & Quick Actions */}
                      <div className="flex flex-col gap-4">
                        <div className="aspect-[2/3] w-full bg-zinc-800 rounded-lg shadow-lg overflow-hidden relative group">
                          <GameCoverImage 
                            src={game.coverUrl} 
                            alt={game.title}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 240px"
                            fallbackIconSize={48}
                          />
                        </div>
                        
                        <button 
                          onClick={(e) => handlePlayClick(e, game)}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md font-medium transition-colors shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                        >
                          <HardDrive size={18} />
                          {game.isInstalled ? 'Play Now' : 'Install'}
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onGameClick(game);
                          }}
                          className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md font-medium transition-colors border border-zinc-700 flex items-center justify-center gap-2"
                        >
                          <Sparkles size={18} />
                          View Full Details
                        </button>
                      </div>

                      {/* Right Column: Details */}
                      <div className="flex flex-col gap-6">
                        <div>
                          <h2 className="text-3xl font-bold text-white mb-2">{game.title}</h2>
                          <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
                            <span className="flex items-center gap-1.5 bg-zinc-800/50 px-2.5 py-1 rounded-full border border-zinc-700/50">
                              <Calendar size={14} /> {game.releaseYear || 'Unknown Year'}
                            </span>
                            <span className="flex items-center gap-1.5 bg-zinc-800/50 px-2.5 py-1 rounded-full border border-zinc-700/50">
                              <Gamepad2 size={14} /> {game.genre || 'Unknown Genre'}
                            </span>
                            <span className="flex items-center gap-1.5 bg-zinc-800/50 px-2.5 py-1 rounded-full border border-zinc-700/50">
                              <Star size={14} className="text-yellow-500" /> {game.rating || 'N/A'}
                            </span>
                          </div>
                        </div>

                        {/* Description Section */}
                        <div className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-800/50">
                            <p className="text-zinc-300 leading-relaxed italic">
                              Detailed description coming soon...
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                          <div className="space-y-1">
                            <div className="text-zinc-500 uppercase text-xs tracking-wider font-semibold">App ID</div>
                            <div className="font-mono text-zinc-300 select-all">{game.appid}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-zinc-500 uppercase text-xs tracking-wider font-semibold">Folder Name</div>
                            <div className="font-mono text-zinc-300 select-all flex items-center gap-2">
                              <Folder size={14} />
                              {game.originalFoldername}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-zinc-500 uppercase text-xs tracking-wider font-semibold">Play Mode</div>
                            <div className="text-zinc-300">{game.playMode}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-zinc-500 uppercase text-xs tracking-wider font-semibold">Status</div>
                            <div className="text-zinc-300 flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${game.isInstalled ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
                              {game.isInstalled ? 'Installed' : 'Not Installed'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameList;
