"use client";

import CustomLink from "@/shared/ui/CustomLink";
import { useNavigationLink } from "../model/useNavigationLink";
import { parseIcons } from "../utils/parse-icons";
import { login } from "@/widgets/login-modal/libs/modal-controller";

interface Props {
  href: string;
  name: string;
  auth?: boolean;
}

const NavigationLink = ({ href, name, auth }: Props) => {
  const isActive = useNavigationLink(href);

  if (auth) {
    return (
      <>
        <div
          onClick={login.open}
          className={`hidden xl:inline-flex xl:items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
            isActive ? "text-primary bg-primary/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          {name}
        </div>
        <div
          onClick={login.open}
          className={`flex-1 py-2 flex flex-col items-center gap-0.5 xl:hidden transition-colors duration-200 ${
            isActive ? "text-primary" : "text-gray-600"
          }`}
        >
          <div className="text-2xl">{parseIcons(name)}</div>
          <span className="text-[10px] mt-0.5">{name}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <CustomLink
        href={href}
        className={`hidden xl:inline-flex xl:items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive ? "text-primary bg-primary/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        {name}
      </CustomLink>
      <CustomLink
        href={href}
        className={`flex-1 py-2 flex flex-col items-center gap-0.5 xl:hidden transition-colors duration-200 ${
          isActive ? "text-primary" : "text-gray-600"
        }`}
      >
        <div className="text-2xl">{parseIcons(name)}</div>
        <span className="text-[10px] mt-0.5">{name}</span>
      </CustomLink>
    </>
  );
};

export default NavigationLink;
