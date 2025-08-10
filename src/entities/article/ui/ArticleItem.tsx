"use client";

import CustomLink from "@/shared/ui/CustomLink";
import { Article } from "../types/article";

interface Props {
  data?: Article;
}

const ArticleItem = ({ data }: Props) => {

  if(!data) return (
    <div className="w-full p-5 rounded-item bg-bg border border-border space-y-2">
      <div className="bg-gray-300 w-1/2 h-7 rounded" />
      <div className="bg-gray-300 w-2/3 h-6 rounded" />
    </div>
  )

  return (
    <CustomLink href={`/articles/${data.id}`} className="w-full p-5 rounded-item bg-bg border border-border space-y-2">
      <p className="xl:text-xl font-semibold text-nowrap text-ellipsis overflow-hidden">{data.title}</p>
      <p className="text-sm xl:text-base text-gray text-nowrap text-ellipsis overflow-hidden">{data.content.length > 32 ? data.content.slice(0, 30) + "..." : data.content}</p>
    </CustomLink>
  )
}

export default ArticleItem