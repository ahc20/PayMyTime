'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function OnboardingPage() {
  const [price, setPrice] = useState('');
  const [calendly, setCalendly] = useState('');
  const [slug, setSlug] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const linkedInClientId = '78vuwb2pp2zv7e'; // Remplace par le vrai ID
  const redirectUri = 'https://paymytime-mu1dkqm3e-ahcenes-projects-73c0778c.vercel.app/api/auth/callback';
  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=r_liteprofile%20r_emailaddress`;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!price || !calendly || !slug) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    try {
      await addDoc(collection(db, "users"), {
        price,
        calendly,
        slug,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Erreur d'enregistrement Firebase :", error);
      alert("Erreur lors de la création du profil.");
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <h2>✅ Merci !</h2>
        <p>Ton profil PayMyTime a été créé.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', textAlign: 'center' }}>
      <h1>Complète ton profil PayMyTime</h1>

      {/* 🔗 Bouton Login LinkedIn */}
      <a href={linkedInAuthUrl}>
        <button style={{
          backgroundColor: '#0a66c2',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '24px'
        }}>
          Se connecter avec LinkedIn
        </button>
      </a>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label>
          Ton tarif (€ pour 15 min)
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="ex: 25"
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
        </label>

        <label>
          Ton lien Calendly (avec paiement)
          <input
            type="url"
            value={calendly}
            onChange={(e) => setCalendly(e.target.value)}
            placeholder="https://calendly.com/..."
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
        </label>

        <label>
          Choisis ton identifiant public (slug)
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ex: ahcene"
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
        </label>

        <button type="submit" style={{
          backgroundColor: '#0a66c2',
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '16px'
        }}>
          Créer mon profil PayMyTime
        </button>
      </form>
    </div>
  );
}