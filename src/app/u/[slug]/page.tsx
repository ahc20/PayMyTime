import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import { UserProfile } from '@/types/user';

type Props = { params: { slug: string } };

async function getUserBySlug(slug: string): Promise<UserProfile | null> {
  const q = query(collection(db, 'users'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as UserProfile;
}

export default async function PublicProfilePage({ params }: Props) {
  const user = await getUserBySlug(params.slug);
  if (!user) notFound();
  return (
    <div style={{ maxWidth:'600px', margin:'50px auto', padding:'20px', textAlign:'center' }}>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Tarif : {user.hourlyRate}€/h</p>
      <a href={user.calendlyLink} target="_blank" style={{background:'#0a66c2', color:'white', padding:'10px 20px', borderRadius:'5px'}}>
        Réserver un appel
      </a>
      <p style={{marginTop:'20px'}}>Contact : {user.email}</p>
    </div>
  );
}