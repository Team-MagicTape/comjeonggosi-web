export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  provider: string;
  providerId: string;
  email: string;
  nickname: string;
  profileImageUrl?: string | null;
  role: UserRole;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}