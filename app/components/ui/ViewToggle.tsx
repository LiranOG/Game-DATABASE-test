'use client';

import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center bg-zinc-900 rounded-lg p-1 border border-zinc-800">
      <button
        onClick={() => setViewMode('list')}
        className={`p-1.5 rounded-md transition-colors ${
          viewMode === 'list' 
            ? 'bg-zinc-800 text-white shadow-sm' 
            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
        }`}
        title="List View"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => setViewMode('grid')}
        className={`p-1.5 rounded-md transition-colors ${
          viewMode === 'grid' 
            ? 'bg-zinc-800 text-white shadow-sm' 
            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
        }`}
        title="Grid View"
      >
        <LayoutGrid size={16} />
      </button>
    </div>
  );
};

export default ViewToggle;
