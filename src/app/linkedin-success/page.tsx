'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LinkedinSuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const email = searchParams.get('email');

    if (firstName && lastName && email) {
      localStorage.setItem(
        'linkedinUser',
        JSON.stringify({ firstName, lastName, email })
      );
      window.location.href = '/onboarding';
    }
  }, [searchParams]);

  return <p>Redirection en cours...</p>;
}