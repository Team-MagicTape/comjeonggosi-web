import { usePathname, useSearchParams } from "next/navigation";

export const useOAuthButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRedirect = () => {
    const pathToStore = `${pathname}${
      searchParams.toString().length > 0 ? "?" + searchParams.toString() : ""
    }`;
    console.log(pathToStore);
    localStorage.setItem("redirect", pathToStore);
  };

  return handleRedirect;
};
