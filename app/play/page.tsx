'use client';
import { useState } from 'react';
import Link from 'next/link';

const WORDS = [
  { arabic: 'كِتَابٌ', french: 'un livre' },
  { arabic: 'قَلَمٌ', french: 'un stylo' },
  { arabic: 'مَدْرَسَةٌ', french: 'une école' },
  { arabic: 'بَيْتٌ', french: 'une maison' },
  { arabic: 'مَاءٌ', french: 'eau' },
  { arabic: 'شَمْسٌ', french: 'soleil' },
  { arabic: 'قَمَرٌ', french: 'lune' },
  { arabic: 'كَلْبٌ', french: 'chien' },
  { arabic: 'قِطٌّ', french: 'chat' },
  { arabic: 'رَجُلٌ', french: 'homme' },
];

export default function PlayPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const currentWord = WORDS[currentIndex];

  const checkAnswer = () => {
    if (!currentWord) return;
    const isCorrect = answer.toLowerCase().trim() === currentWord.french.toLowerCase().trim();
    
    if (isCorrect) {
      setFeedback('✅ Bravo !');
      setScore({ correct: score.correct + 1, total: score.total + 1 });
      setTimeout(() => {
        if (currentIndex < WORDS.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setAnswer('');
          setFeedback('');
        } else {
          setFeedback('🎉 Session terminée ! Félicitations !');
        }
      }, 1000);
    } else {
      setFeedback(`❌ La réponse était : ${currentWord.french}`);
      setScore({ ...score, total: score.total + 1 });
    }
  };

  return (
    <main className="min-h-screen p-4 flex items-center justify-center bg-[#0a0a0f]">
      <div className="glass-card p-8 max-w-md w-full">
        <div className="mb-4 flex justify-between text-sm text-gray-400">
          <span>{currentIndex + 1} / {WORDS.length}</span>
          <span>✅ {score.correct}/{score.total}</span>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-2">Traduis ce mot :</p>
          <h2 className="font-amiri text-6xl mb-4" dir="rtl">{currentWord?.arabic}</h2>
        </div>

        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Ta réponse en français..."
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

        <Link href="/">
          <button className="mt-6 text-gray-500 hover:text-gray-300">← Retour</button>
        </Link>
      </div>
    </main>
  );
}
