"use client";

import { User } from "@/entities/user/types/user";
import { getStoredUser } from "@/shared/utils/user-storage";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  return { user, loading };
};
