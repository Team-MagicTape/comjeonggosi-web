"use client";

import Header from "@/widgets/header/ui/Header";
import Tabbar from "@/widgets/tabbar/ui/Tabbar";
import { useSurveyStore } from "@/widgets/survey/model/useSurveyStore";
import { User } from "@/entities/user/types/user";

interface Props {
  children: React.ReactNode;
  user: User | null;
}

export default function MainLayoutContent({ children, user }: Props) {
  const isVisible = useSurveyStore((state) => state.isVisible);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header user={user} />
      </div>
      <main className={`max-w-7xl mx-auto px-4 lg:px-6 pb-20 xl:pb-8 min-h-screen ${
        isVisible ? "pt-[88px] xl:pt-[96px]" : "pt-[56px] xl:pt-[64px]"
      }`}>
        {children}
      </main>
      <Tabbar user={user} />
    </>
  );
}
