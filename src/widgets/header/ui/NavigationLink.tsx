"use client";

import CustomLink from "@/shared/ui/CustomLink";
import { useNavigationLink } from "../model/useNavigationLink";
import { parseIcons } from "../utils/parse-icons";

interface Props {
  href: string;
  name: string;
}

const NavigationLink = ({ href, name }: Props) => {
  const isActive = useNavigationLink(href);

  return (
    <CustomLink
      className={`p-2 xl:px-4 xl:py-1 rounded xl:rounded-full text-xs xl:text-base flex-1 xl:flex-none flex flex-col items-center ${
        isActive ? "text-white bg-primary" : "text-black bg-white"
      }`}
      href={href}
    >
      <div className="xl:hidden mb-1">
        {parseIcons(name)}
      </div>
      {name}
    </CustomLink>
  );
};

export default NavigationLink;
