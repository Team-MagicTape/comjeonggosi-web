"use client";
import { ReactNode, useState } from "react";

interface Props {
  items: { child: ReactNode; title: string }[];
}

const MyPageContentCards = ({ items }: Props) => {
  const [activeId, setActiveId] = useState(0);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col">
        <div className="flex pl-4">
          {items.map((value, index) => (
            <button
              key={value.title}
              onClick={() => {
                setActiveId(index);
              }}
              className={`rounded-t-2xl border border-b-0 px-4 py-2 text-xl font-semibold border-border cursor-pointer ${
                index === activeId
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 bg-white"
              }`}
            >
              {value.title}
            </button>
          ))}
        </div>
        <div className="w-full">{items[activeId].child}</div>
      </div>
    </div>
  );
};

export default MyPageContentCards;
