'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestPage() {
  const [result, setResult] = useState('Chargement...');

  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.from('vocabulary').select('count');
      if (error) setResult(`Erreur: ${error.message}`);
      else setResult(`Succès! ${data[0].count} mots trouvés`);
    }
    test();
  }, []);

  return <div className="p-8 text-white">{result}</div>;
}
