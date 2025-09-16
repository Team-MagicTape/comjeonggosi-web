"use client";

import { login } from "@/widgets/login-modal/libs/modal-controller";

const LoginButton = () => {
  return (
    <button 
      onClick={login.open} 
      className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
    >
      로그인
    </button>
  );
};

export default LoginButton;