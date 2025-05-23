'use client';

export default function Home() {
  const linkedInClientId = "78vuwb2pp2zv7e"; // Ton vrai client ID
  const redirectUri = "https://paymytime.vercel.app/api/auth/callback";

  const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=r_liteprofile%20r_emailaddress`;

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Bienvenue sur PayMyTime 👋</h1>
      <p>Crée ton profil et monétise ton temps</p>

      <a href={linkedInAuthUrl}>
        <button style={{
          padding: '12px 20px',
          fontSize: '16px',
          backgroundColor: '#0a66c2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginTop: '20px',
          cursor: 'pointer'
        }}>
          Se connecter avec LinkedIn
        </button>
      </a>
    </div>
  );
}