import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface YearFilterProps {
  years: number[];
  selectedYear: number | null;
  onChange: (year: number | null) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({ years, selectedYear, onChange }) => {
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

  const handleSelect = (year: number | null) => {
    onChange(year);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
      >
        <span>{selectedYear ? selectedYear : 'All Years'}</span>
        <ChevronDown size={14} className="text-zinc-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto custom-scrollbar">
          <div className="p-1">
            <button
              onClick={() => handleSelect(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedYear === null
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              All Years
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleSelect(year)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedYear === year
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearFilter;
