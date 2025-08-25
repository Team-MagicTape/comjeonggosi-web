import { useRouter } from "next/navigation"

export const useMailApply = () => {
    const router = useRouter()
    const goToMail = () =>{
      router.push("mail")
    }
  return {
    goToMail
  }
}


