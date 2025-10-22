"use client";

import NavigationLink from "./NavigationLink";
import LoginButton from "@/widgets/login-button/ui/LoginButton";
import Image from "next/image";
import CustomLink from "@/shared/ui/CustomLink";
import { useSurveyStore } from "@/widgets/survey/model/useSurveyStore";
import { X } from "lucide-react";
import { User } from "@/entities/user/types/user";

interface Props {
  user: User | null;
}

const Header = ({ user }: Props) => {
  const { isVisible, setIsVisible } = useSurveyStore();

  return (
    <>
      {isVisible && (
        <div className="w-full h-8 bg-[#ff8f63] text-white flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 lg:px-6 flex items-center justify-between">
            <div className="flex-1 text-center">
              <span className="text-sm font-medium">
                더 나은 서비스를 위해 의견을 들려주세요!{" "}
                <a
                  href="https://naver.me/GypNVc3Y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline hover:opacity-80"
                >
                  설문조사 링크
                </a>
              </span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 p-1 hover:opacity-80 cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <header className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-14 xl:h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <CustomLink href="/" className="block h-8 xl:h-10 cursor-pointer hover:opacity-80 transition-opacity">
            <Image
              src="/assets/logo.svg"
              alt="comjeonggosi"
              width={200}
              height={60}
              className="h-full w-auto"
              priority
            />
          </CustomLink>
          <nav className="hidden xl:flex items-center gap-2">
            <NavigationLink href="/" name="홈" />
            <NavigationLink href="/articles" name="아티클" />
            <NavigationLink href="/quizzes" name="퀴즈" />
            <NavigationLink href="/workbooks" name="문제집" />
            <NavigationLink href="/questions" name="오늘의 질문" auth={!user} />
            <NavigationLink href="/mail" name="메일 신청" />
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <CustomLink href="/my" className="block w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:opacity-80 transition-opacity bg-gray-200">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-bold">
                  {user.nickname?.[0] || "U"}
                </div>
              )}
            </CustomLink>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;