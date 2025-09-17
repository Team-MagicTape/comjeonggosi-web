"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLoadingStore } from "./useLoadingStore";

export const useCustomRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = useLoadingStore();

  const push = (href: string) => {
    if (pathname !== href) {
      setIsLoading(true);
      router.push(href);
    }
  };

  const replace = (href: string) => {
    if (pathname !== href) {
      setIsLoading(true);
      router.replace(href);
    }
  };

  const back = () => {
    setIsLoading(true);
    router.back();
  };

  const refresh = () => {
    router.refresh();
  };

  return {
    push,
    replace,
    back,
		refresh
  };
};
