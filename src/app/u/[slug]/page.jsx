// src/app/u/[slug]/page.jsx
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { notFound } from 'next/navigation';

export default async function Page(props) {
  const slug = props.params.slug;
  const q = query(collection(db, 'users'), where('slug', '==', slug));
  const snap = await getDocs(q);

  if (snap.empty) {
    notFound();
    return;
  }

  const userDoc = snap.docs[0];
  const user = userDoc.data();

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', textAlign: 'center' }}>
      <h1>{user.firstName} {user.lastName}</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        Tarif : {user.hourlyRate}€/h
      </p>
      <a
        href={user.calendlyLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '12px 24px',
          backgroundColor: '#0a66c2',
          color: 'white',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
      >
        Réserver un appel
      </a>
      <p style={{ marginTop: '20px', color: '#999' }}>
        Contact : {user.email}
      </p>
    </div>
  );
}