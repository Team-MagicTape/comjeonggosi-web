"use client";

import Button from "@/shared/ui/Button";
import { useLogout } from "../model/useLogout";

const LogoutButton = () => {
  const logout = useLogout();

  return (
    <Button onClick={logout}>로그아웃</Button>
  )
}

export default LogoutButton