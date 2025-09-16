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
    <CustomLink href={`/articles/${data.id}`} className="w-full p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all space-y-1 group">
      <p className="text-base xl:text-lg font-medium text-gray-900 text-nowrap text-ellipsis overflow-hidden">{data.title}</p>
      <p className="text-sm text-gray-600 text-nowrap text-ellipsis overflow-hidden">{data.content.length > 32 ? data.content.slice(0, 30) + "..." : data.content}</p>
    </CustomLink>
  )
}

export default ArticleItem