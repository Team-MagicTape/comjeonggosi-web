import { User } from "@/entities/user/types/user";
import { useEffect } from "react";
import { useUserStore } from "./useUserStore";

export const useUser = (user: User | null) => {
  console.log(user);
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(user);
  }, []);
}