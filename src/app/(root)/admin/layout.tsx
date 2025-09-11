import EditQuizModal from "@/widgets/edit-quiz-modal/ui/QuizModal";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <EditQuizModal />
    </>
  );
};

export default RootLayout;
