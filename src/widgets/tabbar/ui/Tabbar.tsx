"use client";

import NavigationLink from "@/widgets/header/ui/NavigationLink";
import { User } from "@/entities/user/types/user";

interface Props {
  user: User | null;
}

const Tabbar = ({ user }: Props) => {

  return (
    <nav className="fixed bottom-0 w-full h-16 bg-white border-t border-gray-100 xl:hidden">
      <div className="flex items-center justify-around h-full px-1">
        <NavigationLink href="/" name="홈" />
        <NavigationLink href="/articles" name="아티클" />
        <NavigationLink href="/quizzes" name="퀴즈" />
        <NavigationLink href="/workbook" name="문제집" />
        <NavigationLink href="/questions" name="오늘의 질문" auth={!user} />
        <NavigationLink href="/mail" name="메일 신청" />
      </div>
    </nav>
  );
};

export default Tabbar;