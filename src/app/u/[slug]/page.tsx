import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { UserProfile } from '@/types/user';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

async function getUserBySlug(slug: string): Promise<UserProfile | null> {
  const q = query(collection(db, 'users'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as UserProfile;
}

export default async function PublicProfilePage({ params }: Props) {
  const user = await getUserBySlug(params.slug);
  if (!user) notFound();

  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Disponible pour {user.hourlyRate} € / h</p>
      <a href={user.calendlyLink} target="_blank">Réserver</a>
    </div>
  );
}