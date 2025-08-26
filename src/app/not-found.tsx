import CustomLink from "@/shared/ui/CustomLink"
import { FileX } from "lucide-react"

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <FileX className="text-red-500" size={56} />
      <h1 className="text-3xl">404 NOT FOUND {":("}</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <CustomLink href="/" className="text-primary">메인으로 돌아가기</CustomLink>
    </div>
  )
}

export default NotFound