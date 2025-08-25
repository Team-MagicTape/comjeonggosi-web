import Header from "@/widgets/header/ui/Header";
import Tabbar from "@/widgets/tabbar/ui/Tabbar";
import { PropsWithChildren } from "react";
import Survey from "@/widgets/survey/ui/Survey";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen pt-24 xl:pt-36 bg-bg">
      <Survey/>
      <Header />
      <main className="xl:px-13 px-2 w-full max-w-360 mx-auto pb-24 xl:pb-8">{children}</main>
      <Tabbar />
    </div>
  );
};

export default MainLayout;
