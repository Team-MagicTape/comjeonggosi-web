import { PropsWithChildren, Suspense } from "react"

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense>{children}</Suspense>
  )
}

export default AuthLayout