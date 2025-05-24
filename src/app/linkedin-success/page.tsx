// src/app/linkedin-success/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function LinkedInSuccessPage() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Bienvenue {firstName} {lastName} 👋</h1>
      <p>Tu es connecté à PayMyTime via LinkedIn.</p>
    </div>
  );
}