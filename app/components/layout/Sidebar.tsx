import React from 'react';
import { Home, Library, Heart, Settings, Download, Users, History } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeLink: string;
  onLinkClick: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeLink, onLinkClick }) => {
  const links = [
    { icon: Home, label: 'Home' },
    { icon: Library, label: 'My Library' },
    { icon: Heart, label: 'Favorites' },
    { icon: History, label: 'Recent' },
    { icon: Download, label: 'Downloads' },
    { icon: Users, label: 'Friends' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-zinc-950 font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Library<span className="text-emerald-500">Dev</span>
          </span>
        </div>

        <div className="p-4 space-y-1">
          {links.map((link) => {
            const isActive = activeLink === link.label;
            return (
              <button
                key={link.label}
                onClick={() => {
                  onLinkClick(link.label);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <link.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-400' : ''}`} />
                <span className="font-medium">{link.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
          <div className="bg-zinc-900 rounded-lg p-3 border border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-zinc-400">Storage</span>
              <span className="text-xs font-bold text-emerald-400">78%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-1.5 rounded-full w-[78%]" />
            </div>
            <p className="text-[10px] text-zinc-500 mt-2">1.2TB / 1.5TB Used</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
