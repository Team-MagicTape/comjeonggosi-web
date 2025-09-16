import Header from "@/widgets/header/ui/Header";
import Tabbar from "@/widgets/tabbar/ui/Tabbar";
import { PropsWithChildren } from "react";
import Survey from "@/widgets/survey/ui/Survey";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen bg-bg">
      <div className="sticky top-0 w-full z-10">
        <Survey />
        <Header />
      </div>
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-20 xl:pb-8">
        {children}
      </main>
      <Tabbar />
    </div>
  );
};

export default MainLayout;