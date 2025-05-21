import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { notFound } from 'next/navigation';

// Définition du type User strict
interface User {
  slug: string;
  price: number;
  calendly: string;
}

// Génération statique des slugs connus (facultatif si fallback en dynamique)
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, 'users'));
  const users = snapshot.docs.map((doc) => doc.data() as User);

  return users.map((user) => ({ slug: user.slug }));
}

// Page principale
export default async function ProfilPage({ params }: { params: { slug: string } }) {
  const snapshot = await getDocs(collection(db, 'users'));
  const users = snapshot.docs.map((doc) => doc.data() as User);
  const user = users.find((u) => u.slug === params.slug);

  if (!user) {
    notFound();
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Profil PayMyTime : {user.slug}</h1>
      <p style={{ fontSize: '20px' }}>💸 {user.price} € / 15 min</p>
      <a href={user.calendly} target="_blank" rel="noopener noreferrer">
        <button
          style={{
            backgroundColor: '#0a66c2',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '5px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Réserver un appel
        </button>
      </a>
    </div>
  );
}