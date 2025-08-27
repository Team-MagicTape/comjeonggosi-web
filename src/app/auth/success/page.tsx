"use client"

import { useSuccess } from "@/features/oauth/model/useSuccess";

const OAuthSuccess = () => {
  useSuccess();

  return (
    <div>OAuthSuccess</div>
  )
}

export default OAuthSuccess