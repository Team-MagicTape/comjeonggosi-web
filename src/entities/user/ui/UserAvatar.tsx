"use client"

import { User } from "@/entities/user/types/user"
import LoginButton from "@/widgets/login-button/ui/LoginButton";

interface Props {
  user: User | null;
  size: number;
}

const UserAvatar = ({ user, size }: Props) => {

  if(!user) return (
    <LoginButton />
  )

  return (
    <img src={user.profileImageUrl} alt="avatar" style={{ width: size, height: size }} className="rounded-full object-cover" />
  )
}

export default UserAvatar