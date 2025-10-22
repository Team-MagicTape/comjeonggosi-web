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

  // 프로필 이미지가 없으면 기본 아바타 표시
  if (!user.profileImageUrl) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className="rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl"
      >
        {user.nickname?.[0]?.toUpperCase() || 'U'}
      </div>
    );
  }

  return (
    <img 
      src={user.profileImageUrl} 
      alt="avatar" 
      style={{ width: size, height: size }} 
      className="rounded-full object-cover"
    />
  )
}

export default UserAvatar