import { fetchUser } from "@/entities/user/api/fetch-user";
import NavigationLink from "@/widgets/header/ui/NavigationLink";

const Tabbar = async () => {
  const user = await fetchUser();

  return (
    <div className="fixed left-0 bottom-0 w-full h-16 bg-white border-t border-border xl:hidden flex items-center justify-evenly px-1">
      <NavigationLink href="/" name="홈" />
      <NavigationLink href="/articles" name="아티클" />
      <NavigationLink href="/quizzes" name="퀴즈" />
      <NavigationLink href="/workbook" name="문제집" />
      <NavigationLink href="/questions" name="오늘의 질문" isNotLogined={!user} />
      <NavigationLink href="/mail" name="메일 신청" />
    </div>
  );
};

export default Tabbar;
