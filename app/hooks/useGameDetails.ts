import { useState, useEffect } from 'react';
import { GameDetails } from '@/app/types/game';

export const useGameDetails = (appid: string, title: string, isOpen: boolean) => {
  // Disabled Gemini API usage as per user request
  const [details, setDetails] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // No-op effect
  useEffect(() => {
    // Intentionally empty to disable fetching
  }, [appid, title, isOpen]);

  return { details, loading, error };
};
