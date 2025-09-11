"use client";

import CustomLink from "@/shared/ui/CustomLink";
import { Article } from "../types/article";
import ArticleItemSkeleton from "./ArticleItemSkeleton";

interface Props {
  data?: Article;
  isLoading : boolean;
}

const ArticleItem = ({ data, isLoading }: Props) => {
  if(isLoading){
    return(
      <ArticleItemSkeleton/>
    )
  }

  if(!data) return (
    <ArticleItemSkeleton/>
  )

  return (
    <CustomLink href={`/articles/${data.id}`} className="w-full p-5 rounded-item bg-bg border border-border space-y-2">
      <p className="xl:text-xl font-semibold text-nowrap text-ellipsis overflow-hidden">{data.title}</p>
      <p className="text-sm xl:text-base text-gray text-nowrap text-ellipsis overflow-hidden">{data.content.length > 32 ? data.content.slice(0, 30) + "..." : data.content}</p>
    </CustomLink>
  )
}

export default ArticleItem