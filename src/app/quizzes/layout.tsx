import { PropsWithChildren } from "react"

const QuizzesLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-screen bg-bg mx-auto">{children}</div>
  )
}

export default QuizzesLayout