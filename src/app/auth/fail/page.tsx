"use client"

import { useFail } from "@/features/oauth/model/useFail";
import CustomLink from "@/shared/ui/CustomLink";
import { Suspense } from "react";

const OAuthFail = () => {
  const redirectPath = useFail();

  return (
    <div>
      <Suspense>
        
      </Suspense>
      <CustomLink href={redirectPath || "/"} className="">돌아가기</CustomLink>
    </div>
  )
}

export default OAuthFail