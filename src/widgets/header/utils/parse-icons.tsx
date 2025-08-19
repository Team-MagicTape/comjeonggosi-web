import { BookCopy, BrainCircuit, Calendar1, Home, MailPlusIcon } from "lucide-react"

export const parseIcons = (name: string) => {
  const iconSetting = {
    size: 20
  }

  switch(name) {
    case "홈": return <Home {...iconSetting} />;
    case "위키": return <BookCopy {...iconSetting} />;
    case "퀴즈": return <BrainCircuit {...iconSetting} />;
    case "오늘의 질문": return <Calendar1 {...iconSetting} />;
    case "메일 신청": return <MailPlusIcon {...iconSetting} />; 
  }
}