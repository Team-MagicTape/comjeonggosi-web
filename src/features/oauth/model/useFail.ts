import { useEffect, useState } from "react";

export const useFail = () => {
  const [redirectPath, setRedirectPath] = useState("/");

  useEffect(() => {
    const redirectPath = localStorage.getItem("redirect");
    if(redirectPath) setRedirectPath(redirectPath);
    return () => {
      localStorage.removeItem("redirect");
    };
  }, []);

  return redirectPath;
};
