import CustomLink from "@/shared/ui/CustomLink"
import { FileQuestion } from "lucide-react"

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
          <FileQuestion className="w-8 h-8 text-gray-400" />
        </div>
        
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          페이지를 찾을 수 없습니다
        </h1>
        
        <p className="text-sm text-gray-600 mb-6">
          요청하신 페이지가 존재하지 않거나 이동되었습니다
        </p>
        
        <CustomLink 
          href="/" 
          className="inline-block px-6 py-2.5 text-sm font-medium text-primary hover:underline"
        >
          홈으로 돌아가기
        </CustomLink>
      </div>
    </div>
  )
}

export default NotFound