'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function OnboardingPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState('');
  const [calendly, setCalendly] = useState('');
  const [slug, setSlug] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [fromLinkedIn, setFromLinkedIn] = useState(false);

  useEffect(() => {
    const linkedInData = localStorage.getItem('linkedinUser');
    if (linkedInData) {
      const user = JSON.parse(linkedInData);
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setFromLinkedIn(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !price || !calendly || !slug) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        firstName,
        lastName,
        email,
        price,
        calendly,
        slug,
        createdAt: new Date(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Erreur Firebase :", error);
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
    <div style={{ maxWidth: '500px', margin: '80px auto', textAlign: 'center' }}>
      <h1>Crée ton profil PayMyTime</h1>
      {fromLinkedIn && (
        <p style={{ color: '#0a66c2', fontWeight: 'bold' }}>
          ✅ Infos importées depuis LinkedIn
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '30px' }}>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          disabled={fromLinkedIn}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          disabled={fromLinkedIn}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={fromLinkedIn}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Tarif (€ pour 15 min)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="url"
          placeholder="Lien Calendly (avec paiement)"
          value={calendly}
          onChange={(e) => setCalendly(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Identifiant public (slug)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Créer mon profil
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  backgroundColor: '#0a66c2',
  color: 'white',
  border: 'none',
  padding: '12px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '16px',
};