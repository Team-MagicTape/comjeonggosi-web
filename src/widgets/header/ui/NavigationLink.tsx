"use client";

import CustomLink from "@/shared/ui/CustomLink";
import { useNavigationLink } from "../model/useNavigationLink";

interface Props {
  href: string;
  name: string;
}

const NavigationLink = ({ href, name }: Props) => {
  const isActive = useNavigationLink(href);

  return (
    <CustomLink
      className={`px-4 py-1 rounded-full ${
        isActive ? "text-white bg-primary" : "text-black bg-white"
      }`}
      href={href}>
      {name}
    </CustomLink>
  );
};

export default NavigationLink;
