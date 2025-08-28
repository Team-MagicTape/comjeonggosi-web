"use client";
import { ReactNode, useState } from "react";

interface Props {
  children: { child: ReactNode; title: string }[];
}

const MyPageContentCards = ({ children }: Props) => {
  const [activeId, setActiveId] = useState(0);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col">
        <div className="flex pl-4">
          {children.map((value, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveId(index);
              }}
              className={`rounded-t-2xl border border-b-0 px-4 py-2 text-xl font-semibold border-border cursor-pointer ${
                index === activeId ? "bg-primary text-white" : "hover:bg-gray-100 bg-white"
              }`}
            >
              {value.title}
            </button>
          ))}
        </div>
        <div className="w-full">
          {children
            .filter((_, index) => activeId === index)
            .map((v) => v.child)}
        </div>
      </div>
    </div>
  );
};

export default MyPageContentCards;
