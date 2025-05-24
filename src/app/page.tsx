'use client';

export default function Home() {
  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!;
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code`
    + `&client_id=${clientId}`
    + `&redirect_uri=${encodeURIComponent(redirectUri)}`
    + `&scope=r_liteprofile%20r_emailaddress`;

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Bienvenue sur PayMyTime 👋</h1>
      <a href={authUrl}>
        <button style={{
          padding: '12px 20px',
          backgroundColor: '#0a66c2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Se connecter avec LinkedIn
        </button>
      </a>
    </div>
  );
}