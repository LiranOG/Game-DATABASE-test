import React from 'react';
import { ChevronDown } from 'lucide-react';

interface YearFilterProps {
  years: number[];
  selectedYear: number | null;
  onChange: (year: number | null) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({ years, selectedYear, onChange }) => {
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition-colors">
        <span>{selectedYear ? selectedYear : 'All Years'}</span>
        <ChevronDown size={14} className="text-zinc-500" />
      </button>

      <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 max-h-60 overflow-y-auto custom-scrollbar">
        <div className="p-1">
          <button
            onClick={() => onChange(null)}
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
              onClick={() => onChange(year)}
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
    </div>
  );
};

export default YearFilter;
