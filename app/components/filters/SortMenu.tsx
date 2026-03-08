import React from 'react';
import { SortOption, SortDirection } from '@/app/types/game';
import { ArrowDownAZ, ArrowUpAZ, ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';

interface SortMenuProps {
  sortBy: SortOption;
  sortDirection: SortDirection;
  onChange: (sortBy: SortOption, sortDirection: SortDirection) => void;
}

const SortMenu: React.FC<SortMenuProps> = ({ sortBy, sortDirection, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newSortDirection] = e.target.value.split(':') as [SortOption, SortDirection];
    onChange(newSortBy, newSortDirection);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
          value={`${sortBy}:${sortDirection}`}
          onChange={handleChange}
          className="appearance-none bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:border-emerald-500/50 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <option value="title:asc">Title (A-Z)</option>
          <option value="title:desc">Title (Z-A)</option>
          <option value="year:desc">Year (Newest)</option>
          <option value="year:asc">Year (Oldest)</option>
          <option value="rating:desc">Rating (High-Low)</option>
          <option value="rating:asc">Rating (Low-High)</option>
          <option value="genre:asc">Genre (A-Z)</option>
          <option value="appid:asc">App ID (Asc)</option>
          <option value="appid:desc">App ID (Desc)</option>
        </select>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
          {sortDirection === 'asc' ? <ArrowDownAZ size={14} /> : <ArrowUpAZ size={14} />}
        </div>
      </div>
    </div>
  );
};

export default SortMenu;
