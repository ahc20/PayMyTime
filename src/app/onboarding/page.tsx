'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function OnboardingPage() {
  const [price, setPrice]     = useState('');
  const [calendly, setCalendly] = useState('');
  const [slug, setSlug]       = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'users'), { price: Number(price), calendly, slug });
    setSubmitted(true);
  };

  if (submitted) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}><h2>✅ Merci !</h2></div>;
  }

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input type="number" placeholder="Tarif (€)" value={price} onChange={e=>setPrice(e.target.value)} required />
        <input type="url" placeholder="Lien Calendly" value={calendly} onChange={e=>setCalendly(e.target.value)} required />
        <input type="text" placeholder="Slug public" value={slug} onChange={e=>setSlug(e.target.value)} required />
        <button type="submit" style={{ backgroundColor:'#0a66c2', color:'white', padding:'12px', border:'none', borderRadius:'5px' }}>
          Créer mon profil
        </button>
      </form>
    </div>
  );
}