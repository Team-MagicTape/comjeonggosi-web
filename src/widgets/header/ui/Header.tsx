import { fetchUser } from "@/entities/user/api/fetch-user";
import Spacer from "@/shared/ui/Spacer";
import NavigationLink from "./NavigationLink";
import LoginButton from "@/widgets/login-button/ui/LoginButton";
import Image from "next/image";
import CustomLink from "@/shared/ui/CustomLink";

const Header = async () => {
  const user = await fetchUser();

  return (
    <header className="w-full fixed top-7 xl:top-10 z-10 flex justify-center xl:px-13">
      <div className="w-full max-w-334 h-14 xl:h-20 bg-white border-b xl:border border-border xl:rounded-2xl px-2 xl:px-8 flex items-center gap-2">
        <CustomLink href="/" className="w-42 h-14 xl:w-64 xl:h-20">
          <Image
            src="/assets/logo.svg"
            alt="comjeonggosi"
            width={256}
            height={80}
            className="w-42 h-14 xl:w-64 xl:h-20"
          />
        </CustomLink>
        <Spacer />
        <div className="hidden items-center gap-2 xl:flex">
          <NavigationLink href="/" name="홈" />
          <NavigationLink href="/articles" name="아티클" />
          <NavigationLink href="/quizzes" name="퀴즈" />
          <NavigationLink href="/workbook" name="문제집" />
          <NavigationLink href="/questions" name="오늘의 질문" />
          <NavigationLink href="/mail" name="메일 신청" />
        </div>
        {!!user ? (
          <>
            <div className="hidden xl:inline">
              <NavigationLink href="/my-page" name="마이페이지" />
            </div>
            <CustomLink className="" href="/my-page">
              <img
                src={user.profileImageUrl}
                alt="Profile Image"
                width={40}
                height={40}
                className="rounded-full xl:hidden"
              />
            </CustomLink>
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;
