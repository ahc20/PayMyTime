/// <reference types="next" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_LINKEDIN_CLIENT_ID: string;
    NEXT_PUBLIC_LINKEDIN_REDIRECT_URI: string;
    LINKEDIN_CLIENT_ID: string;
    LINKEDIN_CLIENT_SECRET: string;
  }
}