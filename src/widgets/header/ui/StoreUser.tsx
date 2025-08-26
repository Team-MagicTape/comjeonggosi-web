"use client";

import { User } from "@/entities/user/types/user";
import { useUser } from "../model/useUser";
import NavigationLink from "./NavigationLink";

interface Props {
  user: User | null;
}

const StoreUser = ({ user }: Props) => {
  const storedUser = useUser(user);
  return <NavigationLink href="/my-page" name={`${storedUser?.nickname}`} />;
}

export default StoreUser