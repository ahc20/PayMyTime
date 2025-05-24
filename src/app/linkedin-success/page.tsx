// src/app/linkedin-success/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LinkedInSuccessPage() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);

  useEffect(() => {
    const firstName = searchParams.get('firstName') || '';
    const lastName = searchParams.get('lastName') || '';
    setUser({ firstName, lastName });
  }, [searchParams]);

  if (!user) return <p>Chargement...</p>;

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Bienvenue {user.firstName} {user.lastName} 👋</h1>
      <p>Tu es connecté à PayMyTime via LinkedIn.</p>
    </div>
  );
}