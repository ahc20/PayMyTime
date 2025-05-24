'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LinkedInSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const firstName = searchParams.get('firstName');
    const lastName  = searchParams.get('lastName');
    const email     = searchParams.get('email');

    if (firstName && lastName && email) {
      localStorage.setItem('linkedinUser', JSON.stringify({ firstName, lastName, email }));
      router.push('/onboarding');
    } else {
      console.error('Paramètres LinkedIn manquants');
    }
    setIsLoading(false);
  }, [searchParams, router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      {isLoading ? <p>Connexion en cours...</p> : <p>Échec de la redirection</p>}
    </div>
  );
}