import { useSearchParams } from 'next/navigation';

export default function LinkedInSuccessPage() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get('firstName') || '';
  const lastName = searchParams.get('lastName') || '';
  const email = searchParams.get('email') || '';

  if (!firstName || !lastName || !email) {
    if (typeof window !== 'undefined') {
      window.location.href = '/onboarding';
    }
    return null;
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenue {firstName} {lastName} 👋</h1>
      <p>Redirection LinkedIn réussie.</p>
    </div>
  );
}