'use client';

import React from 'react';
import { Game } from '@/app/types/game';
import { useGameDetails } from '@/app/hooks/useGameDetails';
import { X, Loader2, Clock, Trophy, Users, Tag } from 'lucide-react';
import Image from 'next/image';

interface GameDetailModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

const GameDetailModal: React.FC<GameDetailModalProps> = ({ game, isOpen, onClose }) => {
  const { details, loading, error } = useGameDetails(game?.appid || '', game?.title || '', isOpen);

  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
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
              <p>Loading game details from Gemini...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-10">
              <p>Failed to load details. Please try again later.</p>
            </div>
          ) : details ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="md:col-span-2 space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                  <p className="text-zinc-300 leading-relaxed">{details.description}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    How Long To Beat
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 text-center">
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Main Story</div>
                      <div className="text-xl font-bold text-white">{details.hltb.main}</div>
                    </div>
                    <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 text-center">
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Main + Extra</div>
                      <div className="text-xl font-bold text-emerald-400">{details.hltb.mainExtra}</div>
                    </div>
                    <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-800 text-center">
                      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Completionist</div>
                      <div className="text-xl font-bold text-purple-400">{details.hltb.completionist}</div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-emerald-500" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {details.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-lg text-sm border border-zinc-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div className="bg-zinc-950/50 p-5 rounded-xl border border-zinc-800 space-y-4">
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Steam Rating</div>
                    <div className="text-lg font-medium text-blue-400">{details.steamRating}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Metacritic</div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-green-600 flex items-center justify-center font-bold text-white">
                        {details.metacriticScore}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">Developers</h4>
                    <div className="flex flex-wrap gap-2">
                      {details.developers.map(dev => (
                        <span key={dev} className="text-white">{dev}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-2">Publishers</h4>
                    <div className="flex flex-wrap gap-2">
                      {details.publishers.map(pub => (
                        <span key={pub} className="text-white">{pub}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GameDetailModal;
