'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function DicoPage() {
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWords() {
      try {
        const { data, error } = await supabase.from('vocabulary').select('*').limit(10);
        if (error) setError(error.message);
        else setWords(data || []);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    }
    loadWords();
  }, []);

  if (loading) return <div className="p-8 text-white">Chargement...</div>;
  if (error) return <div className="p-8 text-red-400">Erreur: {error}</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0f] p-4">
      <h1 className="font-amiri text-3xl text-white mb-4">📚 Dictionnaire</h1>
      <Link href="/"><button className="text-gray-400 mb-4">← Retour</button></Link>
      <div className="grid gap-2">
        {words.map((word) => (
          <div key={word.id} className="glass-card p-3 flex justify-between">
            <span className="font-amiri text-xl" dir="rtl">{word.arabic_word}</span>
            <span className="text-gray-300">{word.french_translation}</span>
          </div>
        ))}
      </div>
      {words.length === 0 && <p className="text-gray-400">Aucun mot trouvé</p>}
    </main>
  );
}
