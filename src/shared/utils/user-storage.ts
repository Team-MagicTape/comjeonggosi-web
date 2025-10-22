import { User } from "@/entities/user/types/user";

const USER_STORAGE_KEY = "user";

// User를 localStorage에 저장
export function saveUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
}

// localStorage에서 User 가져오기
export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  
  const stored = localStorage.getItem(USER_STORAGE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

// localStorage에서 User 제거
export function removeStoredUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}
