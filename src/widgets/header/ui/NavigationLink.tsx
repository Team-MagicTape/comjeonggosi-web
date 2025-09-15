"use client";

import CustomLink from "@/shared/ui/CustomLink";
import { useNavigationLink } from "../model/useNavigationLink";
import { parseIcons } from "../utils/parse-icons";
import { login } from "@/widgets/login-modal/libs/modal-controller";

interface Props {
  href: string;
  name: string;
  isNotLogined?: boolean;
}

const NavigationLink = ({ href, name, isNotLogined }: Props) => {
  const isActive = useNavigationLink(href);

  // 글자 수에 따른 텍스트 크기 계산
  const getTextSizeClass = (text: string) => {
    const length = text.length;
    if (length <= 2) return "text-xs"; // 3글자 이하
    return "text-[clamp(0.65rem,1.25vw,1rem)]"
  };

  if (href === "/questions" && isNotLogined) {
    return (
      <div
        className={`p-2 xl:px-4 xl:py-1 rounded xl:rounded-full ${getTextSizeClass(
          name
        )} xl:text-base flex-1 xl:flex-none flex flex-col items-center cursor-pointer ${
          isActive ? "text-white bg-primary" : "text-black bg-white"
        }`}
        onClick={login.open}
      >
        <div className="xl:hidden mb-1">{parseIcons(name)}</div>
        {name}
      </div>
    );
  }

  return (
    <CustomLink
      className={`p-2 xl:px-4 xl:py-1 rounded xl:rounded-full ${getTextSizeClass(
        name
      )} xl:text-base flex-1 xl:flex-none flex flex-col items-center ${
        isActive ? "text-white bg-primary" : "text-black bg-white"
      }`}
      href={href}
    >
      <div className="xl:hidden mb-1">{parseIcons(name)}</div>
      {name}
    </CustomLink>
  );
};

export default NavigationLink;
