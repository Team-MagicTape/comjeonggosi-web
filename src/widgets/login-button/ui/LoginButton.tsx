"use client"

import { login } from "@/widgets/login-modal/libs/modal-controller"

const LoginButton = () => {
  return (
    <button onClick={login.open} className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-300 cursor-pointer">로그인</button>
  )
}

export default LoginButton