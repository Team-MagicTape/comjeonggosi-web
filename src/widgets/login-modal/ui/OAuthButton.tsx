"use client";

import Image from "next/image";
import { useOAuthButton } from "../model/useOAuthButton";
import { OAuthProvider } from "@/features/oauth/types/oauth-provider";

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
    <button onClick={handleOAuth} className="w-full overflow-hidden max-w-120">
      <div
        className="flex items-center justify-center w-full h-full gap-3 py-1 text-sm xl:text-base"
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
