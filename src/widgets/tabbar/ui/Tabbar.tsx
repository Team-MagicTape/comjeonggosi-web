import { fetchUser } from "@/entities/user/api/fetch-user";
import NavigationLink from "@/widgets/header/ui/NavigationLink";

const Tabbar = async () => {
  const user = await fetchUser();

  return (
    <div className="fixed left-0 bottom-0 w-full bg-white border-t border-gray-100 xl:hidden">
      <div className="h-16 flex items-center justify-around px-1">
        <NavigationLink href="/" name="홈" />
        <NavigationLink href="/articles" name="아티클" />
        <NavigationLink href="/quizzes" name="퀴즈" />
        <NavigationLink href="/workbook" name="문제집" />
        <NavigationLink href="/questions" name="오늘의 질문" auth={!user} />
        <NavigationLink href="/mail" name="메일 신청" />
      </div>
    </div>
  );
};

export default Tabbar;
