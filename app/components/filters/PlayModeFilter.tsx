'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

interface PlayModeFilterProps {
  playModes: string[];
  selectedPlayModes: string[];
  onChange: (playModes: string[]) => void;
}

const PlayModeFilter: React.FC<PlayModeFilterProps> = ({ playModes, selectedPlayModes, onChange }) => {
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

  const togglePlayMode = (mode: string) => {
    if (selectedPlayModes.includes(mode)) {
      onChange(selectedPlayModes.filter(m => m !== mode));
    } else {
      onChange([...selectedPlayModes, mode]);
    }
  };

  const clearPlayModes = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm transition-colors ${
          selectedPlayModes.length > 0
            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500'
            : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
        }`}
      >
        <span>
          {selectedPlayModes.length === 0
            ? 'All Modes'
            : `${selectedPlayModes.length} selected`}
        </span>
        {selectedPlayModes.length > 0 ? (
           <div onClick={clearPlayModes} className="hover:bg-emerald-500/20 rounded-full p-0.5 cursor-pointer">
             <X size={14} />
           </div>
        ) : (
           <ChevronDown size={14} className="text-zinc-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto custom-scrollbar p-1">
          {playModes.map((mode) => {
            const isSelected = selectedPlayModes.includes(mode);
            return (
              <button
                key={mode}
                onClick={() => togglePlayMode(mode)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  isSelected
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <span>{mode}</span>
                {isSelected && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlayModeFilter;
