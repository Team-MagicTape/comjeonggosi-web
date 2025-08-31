import NavigationLink from "@/widgets/header/ui/NavigationLink";

const Tabbar = () => {
  return (
    <div className="fixed left-0 bottom-0 w-full h-16 bg-white border-t border-border xl:hidden flex items-center justify-evenly px-1">
      <NavigationLink href="/" name="홈" />
      <NavigationLink href="/articles" name="위키" />
      <NavigationLink href="/quizzes" name="퀴즈" />
      <NavigationLink href="/questions" name="오늘의 질문" />
      <NavigationLink href="/mail" name="메일 신청" />
    </div>
  );
};

export default Tabbar;
