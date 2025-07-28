"use client";

import CustomLink from "@/shared/ui/CustomLink";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  icon: string;
  href: string;
  name: string;
  bgColor: string;
  textColor: string;
}

const OAuthButton = ({ icon, href, name, bgColor, textColor }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRedirect = () => {
    const pathToStore = `${pathname}${searchParams.toString().length > 0 ? "?" + searchParams.toString() : ""}`;
    console.log(pathToStore);
    localStorage.setItem("redirect", pathToStore);
  }

  return (
    <CustomLink href={href} className="w-full max-w-120 h-12 border border-gray-200 rounded-xl overflow-hidden" onClick={handleRedirect}>
      <div
        className="w-full h-full flex items-center justify-center gap-3"
        style={{ background: bgColor, color: textColor }}
      >
        <Image src={`/assets/${icon}.svg`} alt={icon} width={28} height={28} className="rounded-full" />
        <p>{name}</p>
      </div>
    </CustomLink>
  );
};

export default OAuthButton;
