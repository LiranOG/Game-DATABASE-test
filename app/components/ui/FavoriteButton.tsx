'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface FavoriteButtonProps {
  gameId: string;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ gameId, className = '' }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFavorite(favorites.includes(gameId));
  }, [gameId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (favorites.includes(gameId)) {
      newFavorites = favorites.filter((id: string) => id !== gameId);
    } else {
      newFavorites = [...favorites, gameId];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full transition-all duration-200 ${
        isFavorite 
          ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30' 
          : 'bg-black/40 text-zinc-400 hover:bg-black/60 hover:text-white'
      } ${className}`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star 
        className={`w-5 h-5 ${isFavorite ? 'fill-yellow-500' : ''}`} 
      />
    </button>
  );
};

export default FavoriteButton;
