import { PropsWithChildren } from "react";

const EditLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full h-screen bg-bg">
      <main className="h-full">{children}</main>
    </div>
  );
};

export default EditLayout;
