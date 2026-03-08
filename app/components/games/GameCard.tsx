import React, { useState } from 'react';
import { Game } from '@/app/types/game';
import { Star, Calendar, Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import FavoriteButton from '@/app/components/ui/FavoriteButton';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 h-[380px] flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-[240px] w-full overflow-hidden bg-zinc-950">
        {!imageError && game.coverUrl ? (
          <Image 
            src={game.coverUrl} 
            alt={game.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={true}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-700">
            <Gamepad2 size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-white">{game.rating}</span>
        </div>

        {/* Favorite Button */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FavoriteButton gameId={game.id} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-bold text-white line-clamp-1 mb-1 group-hover:text-emerald-400 transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center gap-2 text-zinc-400 text-xs mb-3">
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700">
              {game.genre}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-zinc-500 text-xs mt-auto pt-3 border-t border-zinc-800">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{game.releaseYear}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>{game.playMode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(GameCard);
