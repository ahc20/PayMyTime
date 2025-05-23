# PayMyTime

**Monétise ton temps via LinkedIn + Calendly** ✨

> Permets à tout utilisateur de créer une page publique (type `/u/ahcene`) avec un tarif en € pour 15 min et un lien Calendly payant. L'utilisateur s'authentifie via LinkedIn, ses données sont sauvegardées dans Firebase, puis affichées publiquement.

---

## ✨ Fonctionnalités principales

* Authentification OAuth2 via LinkedIn
* Sauvegarde des données utilisateurs (nom, email, ID) dans Firebase
* Formulaire onboarding :

  * tarif en € / 15 min
  * lien Calendly avec paiement
  * identifiant unique (slug)
* Page dynamique `/u/[slug]`
* Stack : **Next.js App Router + TypeScript + Firebase + Vercel**

---

## 🧱 Arborescence

```
/paymytime
├── .env.local
├── src
│   ├── app
│   │   ├── onboarding/page.tsx         # Formulaire user (prix + lien calendly + slug)
│   │   ├── u/[slug]/page.tsx           # Page publique dynamique
│   ├── pages/api/auth/callback/route.ts  # LinkedIn callback handler
│   ├── lib/firebase.ts                 # Connexion à Firestore
│   └── types/user.ts                   # Typage des données user
```

---

## 🚀 Installation locale

### 1. Clone le repo

```bash
git clone https://github.com/tonpseudo/paymytime.git
cd paymytime
```

### 2. Installe les dépendances

```bash
npm install
```

### 3. Crée le fichier `.env.local`

```ini
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=78vuwb2pp2zv7e
LINKEDIN_CLIENT_SECRET=xxxxx
NEXT_PUBLIC_LINKEDIN_REDIRECT_URI=https://paymytime.vercel.app/api/auth/callback

NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 4. Lance le serveur de dev

```bash
npm run dev
```

---

## 🚨 En cas d'erreur

### Erreur: `process is not defined`

> Tu as essayé d'afficher une variable d'environnement dans le navigateur sans `NEXT_PUBLIC_`

✉️ Solution : Toutes les variables accessibles au navigateur doivent commencer par `NEXT_PUBLIC_`

---

## 🚫 Problème résolu

> Le bug principal était que les données LinkedIn se perdaient après le callback.

✅ Correction : maintenant elles sont sauvegardées dans Firebase **et réutilisées sur la page onboarding** !

---

## 🚧 TODO / Améliorations

* [ ] Ajouter authentification Firebase via LinkedIn (actuellement juste OAuth LinkedIn)
* [ ] Permettre de modifier ses infos via un dashboard privé
* [ ] Ajout d'un tag UTM pour suivre les clics

---

## 📁 Déploiement

### 1. Push sur GitHub

```bash
git remote add origin https://github.com/tonpseudo/paymytime.git
git push -u origin main
```

### 2. Connecte Vercel à ton GitHub

* Vercel importe les variables `.env.local`
* Vérifie bien que `paymytime.vercel.app` est utilisé comme `redirect_uri` LinkedIn

---

## 🌟 Auteur

* Ahcène Bensalama
* Projet 2025 - Auth + Firestore + Next.js

---

## ✨ Exemple d'URL publique :

```
https://paymytime.vercel.app/u/ahcene
```
