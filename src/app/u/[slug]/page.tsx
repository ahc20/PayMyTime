import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { UserProfile } from '@/types/user';
import { notFound } from 'next/navigation';

export default async function PublicProfilePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const q = query(collection(db, 'users'), where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    notFound();
  }

  const doc = querySnapshot.docs[0];
  const user = { id: doc.id, ...doc.data() } as UserProfile;

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '50px auto', 
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>{user.firstName} {user.lastName}</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        Consultant disponible pour {user.hourlyRate}€/heure
      </p>

      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '30px',
        borderRadius: '10px',
        marginTop: '30px'
      }}>
        <h2>Réserver un créneau</h2>
        <p>Prêt à discuter de votre projet ?</p>

        <a 
          href={user.calendlyLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '15px 30px',
            backgroundColor: '#0a66c2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            marginTop: '15px'
          }}
        >
          Réserver un appel
        </a>
      </div>

      <div style={{ marginTop: '40px', fontSize: '14px', color: '#999' }}>
        <p>Contact: {user.email}</p>
        <p>Membre depuis {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString('fr-FR') : 'Récemment'}</p>
      </div>
    </div>
  );
}