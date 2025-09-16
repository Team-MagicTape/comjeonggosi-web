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
    <CustomLink 
      href={`/articles/${data.id}`} 
      className="block p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
    >
      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
        {data.title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2">
        {data.content}
      </p>
    </CustomLink>
  )
}

export default ArticleItem