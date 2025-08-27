import CustomLink from "@/shared/ui/CustomLink"
import { ToolCase } from "lucide-react"

const NotFound = () => {
  return (
    <div className="w-full h-body flex flex-col items-center justify-center gap-2">
      <ToolCase className="text-blue-500" size={56} />
      <h1 className="text-3xl">Preparing Now {":)"}</h1>
      <p>콘텐츠를 준비하는 중입니다!</p>
      <CustomLink href="/" className="text-primary">메인으로 돌아가기</CustomLink>
    </div>
  )
}

export default NotFound