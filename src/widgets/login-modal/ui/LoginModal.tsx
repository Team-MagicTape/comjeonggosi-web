"use client";

import { useEffect, useState } from "react";
import OAuthButton from "./OAuthButton";
import { createPortal } from "react-dom";
import { login, registerLoginModal } from "../libs/modal-controller";

const LoginModal = () => {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    registerLoginModal(
      () => setVisible(true),
      () => {
        setIsClosing(true);
        setTimeout(() => {
          setIsClosing(false);
          setVisible(false);
        }, 300);
      }
    );
  }, []);

  if (!visible && !isClosing) return null;

  return createPortal(
    <div className="w-screen h-screen flex items-center justify-center backdrop-blur-xs fixed top-0 left-0 z-[100000]">
      <div className={`w-full max-w-140 p-5 rounded-3xl bg-white flex flex-col gap-1 items-center border border-gray-200 ${isClosing ? "modal-animation-out" : "modal-animation-in"} shadow-xl`}>
        <p className="text-2xl font-bold my-6">
          로그인하고 더 많은 기능을 사용해 보세요!
        </p>
        <OAuthButton href="/" bgColor="white" icon="google" name="구글로 로그인" textColor="black" />
        <OAuthButton href="/" bgColor="#171515" icon="github" name="깃허브로 로그인" textColor="white" />
        <OAuthButton href="/" bgColor="#03C75A" icon="naver" name="네이버로 로그인" textColor="white" />
        <OAuthButton href="/" bgColor="#FEE500" icon="kakao" name="카카오로 로그인" textColor="#191919" />
        <button className="border-b border-gray-500 text-gray-500 mt-4 cursor-pointer" onClick={() => login.close()}>
          나중에 할래요
        </button>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
