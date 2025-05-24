'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function LinkedInSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const email = searchParams.get('email');

    if (firstName && lastName && email) {
      localStorage.setItem(
        'linkedinUser',
        JSON.stringify({ firstName, lastName, email })
      );
      router.push('/onboarding');
    } else {
      alert('Données LinkedIn manquantes.');
    }
  }, [searchParams, router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Connexion LinkedIn réussie...</h2>
      <p>Redirection vers l’onboarding...</p>
    </div>
  );
}