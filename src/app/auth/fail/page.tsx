"use client"

import { useFail } from "@/features/oauth/model/useFail";
import CustomLink from "@/shared/ui/CustomLink";

const OAuthFail = () => {
  const redirectPath = useFail();

  return (
    <div>
      <CustomLink href={redirectPath || "/"} className="">돌아가기</CustomLink>
    </div>
  )
}

export default OAuthFail