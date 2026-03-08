import { useState, useEffect } from 'react';
import { GameDetails } from '@/app/types/game';

const cache: Record<string, GameDetails> = {};

export const useGameDetails = (appid: string, title: string, isOpen: boolean) => {
  const [details, setDetails] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !appid) return;

    if (cache[appid]) {
      setDetails(cache[appid]);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/game-details?appid=${appid}&title=${encodeURIComponent(title)}`);
        if (!res.ok) throw new Error('Failed to fetch details');
        const data = await res.json();
        cache[appid] = data;
        setDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [appid, title, isOpen]);

  return { details, loading, error };
};
