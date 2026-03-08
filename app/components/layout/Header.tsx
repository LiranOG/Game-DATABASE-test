import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import SearchBar from '@/app/components/filters/SearchBar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 z-50 lg:pl-64 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-zinc-950 font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-bold text-white hidden sm:block tracking-tight">
            Library<span className="text-emerald-500">Dev</span>
          </span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => alert('Notifications coming soon!')}
          className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950"></span>
        </button>
        <button 
          onClick={() => alert('User profile coming soon!')}
          className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors border border-zinc-700"
        >
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
