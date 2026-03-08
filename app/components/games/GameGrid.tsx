'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Game } from '@/app/types/game';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
  onGameClick: (game: Game) => void;
}

const CARD_HEIGHT = 400; // Approximate height including gap
const GAP = 24; // Gap between cards
const MIN_COLUMN_WIDTH = 300; // Min width for responsive grid

const GameGrid: React.FC<GameGridProps> = ({ games, onGameClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Resize Observer to get container dimensions
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerWidth(entry.contentRect.width);
        setContainerHeight(entry.contentRect.height);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll Handler
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Virtualization Logic
  const { visibleGames, totalHeight, offsetY } = useMemo(() => {
    if (containerWidth === 0) return { visibleGames: [], totalHeight: 0, offsetY: 0 };

    const columns = Math.max(1, Math.floor((containerWidth + GAP) / (MIN_COLUMN_WIDTH + GAP)));
    const rowHeight = CARD_HEIGHT + GAP;
    
    const totalRows = Math.ceil(games.length / columns);
    const totalHeight = totalRows * rowHeight;

    const startRow = Math.floor(scrollTop / rowHeight);
    const visibleRows = Math.ceil(containerHeight / rowHeight) + 2; // Buffer
    const endRow = Math.min(totalRows, startRow + visibleRows);

    const startIndex = startRow * columns;
    const endIndex = endRow * columns;

    const visibleGames = games.slice(startIndex, endIndex).map((game, index) => ({
      ...game,
      virtualIndex: startIndex + index,
    }));

    const offsetY = startRow * rowHeight;

    return { visibleGames, totalHeight, offsetY };
  }, [games, scrollTop, containerWidth, containerHeight]);

  return (
    <div 
      ref={containerRef} 
      onScroll={handleScroll}
      className="h-full w-full overflow-y-auto pr-2 custom-scrollbar"
      style={{ height: 'calc(100vh - 180px)' }} // Adjust based on header height
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div 
          style={{ 
            transform: `translateY(${offsetY}px)`, 
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${MIN_COLUMN_WIDTH}px, 1fr))`,
            gap: `${GAP}px`,
            paddingBottom: `${GAP}px`
          }}
        >
          {visibleGames.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onClick={() => onGameClick(game)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;
