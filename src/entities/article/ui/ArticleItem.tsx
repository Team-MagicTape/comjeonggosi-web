"use client";

import CustomLink from "@/shared/ui/CustomLink";
import { Article } from "../types/article";
import { BookOpen, BrainCircuit } from "lucide-react";
import Spacer from "@/shared/ui/Spacer";

interface Props {
  data: Article;
}

const ArticleItem = ({ data }: Props) => {
  return (
    <CustomLink href={`/articles/${data.id}`} className="w-full p-5 rounded-item bg-bg border border-border space-y-2">
      <p className="text-xl font-semibold text-nowrap">{data.title}</p>
      <p className="text-gray">{data.content.length > 32 ? data.content.slice(0, 30) + "..." : data.content}</p>
      <div className="w-full flex items-center text-lightgray gap-1 text-sm">
        <BookOpen size={14} />
        <p>15분</p>
        <Spacer />
        <BrainCircuit size={14} />
        <p>중급</p>
      </div>
    </CustomLink>
  )
}

export default ArticleItem