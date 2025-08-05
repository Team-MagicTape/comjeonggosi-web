import Header from "@/widgets/header/ui/Header";
import { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-screen pt-22 xl:pt-32 bg-bg">
      <Header />
      <main className="xl:px-13 px-2 w-full max-w-360 mx-auto pb-8">{children}</main>
    </div>
  );
};

export default MainLayout;
