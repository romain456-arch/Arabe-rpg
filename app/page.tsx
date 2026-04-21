'use client';
import Link from 'next/link';
import { usePlayer } from '@/hooks/usePlayer';
import { motion } from 'framer-motion';

export default function HomePage() {
  const { stats, dailyWords, loading } = usePlayer();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent mx-auto"></div>
          <p className="font-amiri text-2xl text-amber-400">يُحَمِّلُ...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#070708] px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="glass-card mb-8 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-amiri text-4xl text-white" dir="rtl">
                مَرْحَبًا بِكَ
              </h1>
              <p className="mt-1 text-gray-400">Bonjour, aventurier du désert</p>
            </div>
            <div className="text-right">
              <p className="font-cinzel text-3xl font-bold text-amber-400">{stats.title}</p>
              <p className="text-sm text-gray-500">Niveau {stats.level}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">XP</span>
              <span className="text-amber-400">{stats.xp} XP</span>
            </div>
            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-gray-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stats.xp % 1000) / 10}%` }}
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪙</span>
              <span className="text-xl font-medium text-yellow-400">{stats.gold}</span>
              <span className="text-sm text-gray-500">Pièces d'or</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span className="text-xl font-medium text-emerald-400">{dailyWords.length}</span>
              <span className="text-sm text-gray-500">Mots à réviser</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link href="/play">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card group cursor-pointer rounded-3xl p-8 transition hover:border-amber-500/30"
            >
              <div className="mb-4 text-5xl">📖</div>
              <h2 className="mb-2 font-cinzel text-2xl font-bold text-white">
                Révision du Jour
              </h2>
              <p className="mb-4 text-gray-400">
                {dailyWords.length > 0
                  ? `${dailyWords.length} mots t'attendent`
                  : 'Reviens demain pour de nouveaux mots !'}
              </p>
              <div className="flex items-center gap-2 text-amber-400">
                <span>Commencer</span>
                <span>→</span>
              </div>
            </motion.div>
          </Link>

          <Link href="/dictionary">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card group cursor-pointer rounded-3xl p-8 transition hover:border-emerald-500/30"
            >
              <div className="mb-4 text-5xl">📚</div>
              <h2 className="mb-2 font-cinzel text-2xl font-bold text-white">
                Dictionnaire
              </h2>
              <p className="mb-4 text-gray-400">
                Consulte tous les mots que tu as rencontrés
              </p>
              <div className="flex items-center gap-2 text-emerald-400">
                <span>Explorer</span>
                <span>→</span>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </main>
  );
}
