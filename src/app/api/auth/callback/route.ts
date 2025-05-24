import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET!;
const redirectUri = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) return new NextResponse('Code manquant', { status: 400 });

    const tokenRes = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    const accessToken = tokenRes.data.access_token;

    const [profile, email] = await Promise.all([
      axios.get('https://api.linkedin.com/v2/me', { headers: { Authorization: `Bearer ${accessToken}` } }),
      axios.get(
        'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ),
    ]);

    const userData = {
      firstName: profile.data.localizedFirstName,
      lastName: profile.data.localizedLastName,
      email: email.data.elements[0]['handle~'].emailAddress,
    };

    const url = new URL('/linkedin-success', req.url);
    url.searchParams.set('firstName', userData.firstName);
    url.searchParams.set('lastName', userData.lastName);
    url.searchParams.set('email', userData.email);

    return NextResponse.redirect(url);
  } catch (err) {
    console.error('Erreur LinkedIn callback:', err);
    return new NextResponse('Erreur LinkedIn callback', { status: 500 });
  }
}