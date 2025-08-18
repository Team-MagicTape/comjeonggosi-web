"use client"

import Button from "@/shared/ui/Button"
import { login } from "@/widgets/login-modal/libs/modal-controller"

const LoginButton = () => {
  return (
    <Button onClick={login.open}>로그인</Button>
  )
}

export default LoginButton