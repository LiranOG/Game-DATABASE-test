'use client';

import React from 'react';
import { Game } from '@/app/types/game';
import { useGameDetails } from '@/app/hooks/useGameDetails';
import { X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface GameDetailModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

const GameDetailModal: React.FC<GameDetailModalProps> = ({ game, isOpen, onClose }) => {
  const { details, loading, error } = useGameDetails(game?.appid || '', game?.title || '', isOpen);

  return (
    <AnimatePresence>
      {isOpen && game && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
          >
            
            {/* Header Image */}
            <div className="relative h-64 w-full shrink-0">
              <Image
                src={game.coverUrl}
                alt={game.title}
                fill
                className="object-cover opacity-60"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
              
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors backdrop-blur-md border border-white/10"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{game.title}</h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                    {game.genre}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {game.releaseYear}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {game.playMode}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4 text-zinc-500">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                  <p>Loading...</p>
                </div>
              ) : error ? (
                <div className="text-center text-red-400 py-10">
                  <p>Failed to load details. Please try again later.</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 gap-4 text-zinc-500">
                  <p className="italic">Detailed information coming soon...</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GameDetailModal;
