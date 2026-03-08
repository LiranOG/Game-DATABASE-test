import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

interface GenreFilterProps {
  genres: string[];
  selectedGenres: string[];
  onChange: (genres: string[]) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ genres, selectedGenres, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      onChange(selectedGenres.filter(g => g !== genre));
    } else {
      onChange([...selectedGenres, genre]);
    }
  };

  const clearGenres = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-colors ${
          selectedGenres.length > 0
            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500'
            : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
        }`}
      >
        <span>
          {selectedGenres.length === 0
            ? 'All Genres'
            : `${selectedGenres.length} selected`}
        </span>
        {selectedGenres.length > 0 ? (
           <div onClick={clearGenres} className="hover:bg-emerald-500/20 rounded-full p-0.5">
             <X size={14} />
           </div>
        ) : (
           <ChevronDown size={14} className="text-zinc-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto custom-scrollbar p-1">
          {genres.map((genre) => {
            const isSelected = selectedGenres.includes(genre);
            return (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  isSelected
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>{genre}</span>
                {isSelected && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GenreFilter;
