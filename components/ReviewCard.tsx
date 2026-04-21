'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '@/hooks/usePlayer';

interface ReviewWord {
  id: string;
  arabic_word: string;
  transliteration: string;
  french_translation: string;
  root: string | null;
  progress?: {
    repetitions: number;
    status: string;
  };
}

interface ReviewCardProps {
  word: ReviewWord;
  onSubmit: (isCorrect: boolean, xpGained: number, goldGained: number) => void;
}

export function ReviewCard({ word, onSubmit }: ReviewCardProps) {
  const { submitAnswer } = usePlayer();
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isCorrect: boolean;
    message: string;
    correctAnswer: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputType, setInputType] = useState<'translation' | 'transliteration'>('translation');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word || !userAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const result = await submitAnswer(
        word.id,
        userAnswer,
        inputType === 'translation' ? 'translation_ar_to_fr' : 'transliteration'
      );

      if (result) {
        setFeedback({
          show: true,
          isCorrect: result.is_correct,
          message: result.is_correct
            ? '✨ أَحْسَنْتَ ! Bravo ! ✨'
            : '❌ Pas tout à fait...',
          correctAnswer: result.correct_answer
        });

        onSubmit(result.is_correct, result.xp_gained, result.gold_gained);
        
        setTimeout(() => {
          setFeedback(null);
          setUserAnswer('');
          setIsSubmitting(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <div className="glass-card rounded-3xl p-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm text-gray-400">
            {inputType === 'translation' ? 'Comment traduire ce mot ?' : 'Comment écrire ce mot en phonétique ?'}
          </p>
          <h2 className="font-amiri text-7xl font-bold leading-loose text-white" dir="rtl">
            {word.arabic_word}
          </h2>
          
          {word.progress && (
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-10 rounded-full transition-all ${
                    i < word.progress.repetitions
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mb-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setInputType('translation')}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              inputType === 'translation'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            🇫🇷 Traduction
          </button>
          <button
            type="button"
            onClick={() => setInputType('transliteration')}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              inputType === 'transliteration'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            🔤 Phonétique
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={
              inputType === 'translation'
                ? 'Écris la traduction en français...'
                : 'Exemple : kitaabun'
            }
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-lg text-white placeholder-gray-500 backdrop-blur-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            autoFocus
            disabled={!!feedback}
          />

          <button
            type="submit"
            disabled={!userAnswer.trim() || !!feedback}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 py-4 font-medium text-white transition-all hover:from-amber-500 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Vérification...' : 'Valider'}
          </button>
        </form>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-6 rounded-2xl p-5 ${
                feedback.isCorrect
                  ? 'bg-emerald-500/10 border border-emerald-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              <p className={`text-center text-xl font-medium ${
                feedback.isCorrect ? 'text-emerald-300' : 'text-red-300'
              }`}>
                {feedback.message}
              </p>
              {!feedback.isCorrect && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-400">La bonne réponse était :</p>
                  <p className="text-lg text-white">{feedback.correctAnswer}</p>
                  {word.root && (
                    <p className="mt-2 text-sm text-amber-400/70">
                      Racine : {word.root}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
