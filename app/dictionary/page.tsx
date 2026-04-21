'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function DictionaryPage() {
  const [words, setWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadWords() {
      const { data } = await supabase.from('vocabulary').select('*').order('arabic_word');
      setWords(data || []);
      setLoading(false);
    }
    loadWords();
  }, []);

  const filteredWords = words.filter(w => 
    w.arabic_word.includes(search) || 
    w.french_translation.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center text-white">Chargement...</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0f] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-amiri text-3xl text-white">📚 Dictionnaire</h1>
          <Link href="/">
            <button className="text-gray-400 hover:text-white">← Retour</button>
          </Link>
        </div>
        <input
          type="text"
          placeholder="Rechercher un mot..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-black/30 border border-white/10 text-white"
        />
        <div className="glass-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr className="border-b border-white/10">
                <th className="p-3 text-left text-gray-300">Arabe</th>
                <th className="p-3 text-left text-gray-300">Français</th>
              </tr>
            </thead>
            <tbody>
              {filteredWords.map((word) => (
                <tr key={word.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3 font-amiri text-xl text-white" dir="rtl">{word.arabic_word}</td>
                  <td className="p-3 text-gray-300">{word.french_translation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
