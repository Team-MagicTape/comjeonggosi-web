"use client";

import Image from "next/image";
import { useOAuthButton } from "../model/useOAuthButton";
import { OAuthProvider } from "@/features/oauth/types/oauth";

interface Props {
  icon: string;
  provider: OAuthProvider;
  name: string;
  bgColor: string;
  textColor: string;
}

const OAuthButton = ({ icon, provider, name, bgColor, textColor }: Props) => {
  const handleOAuth = useOAuthButton(provider);

  return (
    <button onClick={handleOAuth} className="w-full max-w-120 overflow-hidden">
      <div
        className="w-full h-full flex items-center justify-center gap-3 text-sm xl:text-base py-1"
        style={{ background: bgColor, color: textColor }}
      >
        <Image
          src={`/assets/${icon}.svg`}
          alt={icon}
          width={28}
          height={28}
          className="rounded-full"
        />
        <p>{name}</p>
      </div>
    </button>
  );
};

export default OAuthButton;
