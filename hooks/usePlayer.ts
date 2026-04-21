'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function usePlayer() {
  const [stats] = useState({ gold: 100, level: 1, xp: 0, title: 'طَالِب' });
  const [dailyWords, setDailyWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWords() {
      const { data } = await supabase.from('vocabulary').select('*').limit(5);
      setDailyWords(data || []);
      setLoading(false);
    }
    loadWords();
  }, []);

  const submitAnswer = async () => ({ is_correct: true, xp_gained: 25, gold_gained: 10 });

  return { stats, dailyWords, loading, submitAnswer };
}
