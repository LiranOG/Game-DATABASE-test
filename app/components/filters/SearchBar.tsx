import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-zinc-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-zinc-700 rounded-lg leading-5 bg-zinc-900 text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 sm:text-sm transition-colors"
        placeholder="Search games..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
