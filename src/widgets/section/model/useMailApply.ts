import { useCustomRouter } from "@/shared/model/useCustomRouter"

export const useMailApply = () => {
    const router = useCustomRouter ()
    const goToMail = () =>{
      router.push("mail")
    }
  return {
    goToMail
  }
}


