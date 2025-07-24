"use client";

import { login } from "@/widgets/login-modal/libs/modal-controller";

const Main = () => {
  return (
    <div className="bg-gray-100">
      <p onClick={login.open}>오픈!</p>
    </div>
  )
}

export default Main