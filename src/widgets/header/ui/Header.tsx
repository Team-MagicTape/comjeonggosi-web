import { fetchUser } from "@/entities/user/api/fetch-user";
import NavigationLink from "./NavigationLink";
import LoginButton from "@/widgets/login-button/ui/LoginButton";
import Image from "next/image";
import CustomLink from "@/shared/ui/CustomLink";

const Header = async () => {
  const user = await fetchUser();

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center">
          <div className="flex items-center flex-1">
            <CustomLink href="/" className="flex-shrink-0 mr-12">
              <Image
                src="/assets/logo.svg"
                alt="comjeonggosi"
                width={256}
                height={80}
                className="h-9 w-auto"
              />
            </CustomLink>
            
            <nav className="hidden xl:flex items-center gap-2">
              <NavigationLink href="/" name="홈" />
              <NavigationLink href="/articles" name="아티클" />
              <NavigationLink href="/quizzes" name="퀴즈" />
              <NavigationLink href="/workbook" name="문제집" />
              <NavigationLink href="/questions" name="오늘의 질문" auth={!user} />
              <NavigationLink href="/mail" name="메일 신청" />
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
              {!!user ? (
                <>
                  <div className="hidden xl:block">
                    <NavigationLink href="/my-page" name="마이페이지" />
                  </div>
                <CustomLink href="/my-page" className="xl:hidden">
                  <Image
                    src={user.profileImageUrl}
                    alt="Profile Image"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                </CustomLink>
                </>
              ) : (
                <LoginButton />
              )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
