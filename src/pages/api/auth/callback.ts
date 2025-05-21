import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  const client_id = '78vuwb2pp2zv7e';
  const client_secret = 'WPL_AP1.bu6MrupofK2oXrTG.BTD08w==';
  const redirectUri = 'https://paymytime-jl4xsfxdi-ahcenes-projects-73c0778c.vercel.app/api/auth/callback';

  try {
    // 1. Obtenir l'access token
    const tokenRes = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri,
        client_id,
        client_secret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const access_token = tokenRes.data.access_token;

    // 2. Appeler l'API LinkedIn pour récupérer le profil
    const profileRes = await axios.get(
      'https://api.linkedin.com/v2/me',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const emailRes = await axios.get(
      'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const profile = profileRes.data;
    const email = emailRes.data.elements[0]['handle~'].emailAddress;

    // 3. Afficher les infos récupérées (test)
    res.status(200).json({
      id: profile.id,
      firstName: profile.localizedFirstName,
      lastName: profile.localizedLastName,
      email,
    });

  } catch (error) {
    console.error('Erreur callback LinkedIn:', error);
    res.status(500).send('Erreur LinkedIn callback');
  }
}