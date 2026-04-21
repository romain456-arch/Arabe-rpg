'use client';
import Link from 'next/link';
import { usePlayer } from '@/hooks/usePlayer';

export default function HomePage() {
  const { stats, dailyWords, loading } = usePlayer();

  if (loading) return <div className="p-8 text-center text-white">Chargement...</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0f] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-6 mb-8">
          <h1 className="font-amiri text-4xl text-white mb-2">مرحباً بك</h1>
          <p className="text-gray-400">Bonjour, aventurier du désert</p>
          <div className="flex justify-between mt-4">
            <div><span className="text-2xl">🪙</span> {stats.gold} Pièces d'or</div>
            <div><span className="text-2xl">📚</span> {dailyWords.length} Mots à réviser</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/play">
            <div className="glass-card p-6 cursor-pointer hover:border-amber-500/30">
              <div className="text-4xl mb-2">📖</div>
              <h2 className="text-xl font-bold text-white mb-1">Révision du Jour</h2>
              <p className="text-gray-400 text-sm mb-3">
                {dailyWords.length > 0 ? `${dailyWords.length} mots t'attendent` : 'Reviens demain !'}
              </p>
              <span className="text-amber-400">Commencer →</span>
            </div>
          </Link>

          <Link href="/dico">
            <div className="glass-card p-6 cursor-pointer hover:border-emerald-500/30">
              <div className="text-4xl mb-2">📚</div>
              <h2 className="text-xl font-bold text-white mb-1">Dictionnaire</h2>
              <p className="text-gray-400 text-sm mb-3">Consulte tous les mots</p>
              <span className="text-emerald-400">Explorer →</span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
