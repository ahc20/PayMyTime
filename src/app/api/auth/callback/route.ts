// src/app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const clientId = process.env.LINKEDIN_CLIENT_ID!;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET!;
const redirectUri = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return new NextResponse("Code manquant dans l'URL LinkedIn", { status: 400 });
  }

  try {
    // 1. Échanger le code contre un access token
    const tokenRes = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // 2. Récupérer le profil utilisateur
    const profileRes = await axios.get('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // 3. Récupérer l'email
    const emailRes = await axios.get(
      'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const userData = {
      id: profileRes.data.id,
      firstName: profileRes.data.localizedFirstName,
      lastName: profileRes.data.localizedLastName,
      email: emailRes.data.elements[0]['handle~'].emailAddress,
    };

    // 4. Vérifier si l'utilisateur existe déjà dans Firebase
    const userDocRef = doc(db, 'users', userData.id);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Utilisateur existant - rediriger vers sa page
      const existingUser = userDoc.data();
      if (existingUser.slug) {
        return NextResponse.redirect(new URL(`/u/${existingUser.slug}`, req.url));
      }
    }

    // 5. Nouveau utilisateur - sauvegarder dans Firebase
    await setDoc(userDocRef, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 6. Rediriger vers onboarding avec l'ID utilisateur
    const onboardingUrl = new URL('/onboarding', req.url);
    onboardingUrl.searchParams.set('userId', userData.id);
    
    return NextResponse.redirect(onboardingUrl);

  } catch (error) {
    console.error("Erreur LinkedIn callback:", error);
    return new NextResponse("Erreur LinkedIn callback", { status: 500 });
  }
}