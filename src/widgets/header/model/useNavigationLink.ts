import { usePathname } from "next/navigation";

export const useNavigationLink = (href: string) => {
  const pathname = usePathname();
  
  if (href === "/") {
    return pathname === "/";
  }
  
  return pathname.startsWith(href);
};