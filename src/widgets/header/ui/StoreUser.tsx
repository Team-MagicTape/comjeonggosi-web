"use client";

import { User } from "@/entities/user/types/user";
import { useUser } from "../model/useUser";

interface Props {
  user: User | null;
}

const StoreUser = ({ user }: Props) => {
  useUser(user);
  return <div></div>;
}

export default StoreUser