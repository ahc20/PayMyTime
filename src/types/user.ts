export interface UserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  slug: string;
  calendlyLink: string;
  hourlyRate: number;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
}