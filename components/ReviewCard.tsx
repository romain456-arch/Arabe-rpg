'use client';
import { useState } from 'react';

interface ReviewCardProps {
  word: { id: string; arabic_word: string; french_translation: string };
  onSubmit: () => void;
}

export function ReviewCard({ word, onSubmit }: ReviewCardProps) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const checkAnswer = () => {
    if (answer.toLowerCase().trim() === word.french_translation.toLowerCase().trim()) {
      setFeedback('✅ Bravo !');
      onSubmit();
    } else {
      setFeedback(`❌ La réponse était : ${word.french_translation}`);
    }
    setAnswer('');
  };

  return (
    <div className="glass-card rounded-3xl p-8">
      <div className="text-center mb-8">
        <h2 className="font-amiri text-7xl font-bold text-white" dir="rtl">
          {word.arabic_word}
        </h2>
      </div>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Ta réponse..."
        className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white mb-4"
        autoFocus
      />
      <button
        onClick={checkAnswer}
        className="w-full p-3 rounded-lg bg-amber-500 text-white font-medium"
      >
        Valider
      </button>
      {feedback && (
        <div className={`mt-4 p-3 rounded-lg text-center ${feedback.includes('✅') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
}
