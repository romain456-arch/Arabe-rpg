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
  const [feedback, setFeedback] = useState<any>(null);
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
          message: result.is_correct ? '✨ Bravo ! ✨' : '❌ Pas tout à fait...',
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
          <h2 className="font-amiri text-7xl font-bold text-white" dir="rtl">
            {word.arabic_word}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Ta réponse..."
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-4 text-lg text-white"
            autoFocus
            disabled={!!feedback}
          />
          <button
            type="submit"
            disabled={!userAnswer.trim() || !!feedback}
            className="mt-4 w-full rounded-xl bg-amber-500 py-4 font-medium text-white"
          >
            Valider
          </button>
        </form>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 p-4 rounded-xl text-center ${
                feedback.isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}
            >
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
