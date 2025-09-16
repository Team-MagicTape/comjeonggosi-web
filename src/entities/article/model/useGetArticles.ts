import { useQuery } from "@tanstack/react-query";
import { Article } from "../types/article";
import { fetchArticles } from "../api/fetch-articles";

export const useGetArticles = (categoryId: string, initialData: Article[]) => {
  const { data, isLoading } = useQuery({
    queryKey: ["articles", categoryId],
    initialData,
    queryFn: () => fetchArticles(categoryId),
  });

  return {
    data: [{
      id: 1,
      title: "test",
      content: "test",
      category: {
        id: 1,
        name: "test",
      },
    },{
      id: 1,
      title: "test",
      content: "test",
      category: {
        id: 1,
        name: "test",
      },
    },{
      id: 1,
      title: "test",
      content: "test",
      category: {
        id: 1,
        name: "test",
      },
    },{
      id: 1,
      title: "test",
      content: "test",
      category: {
        id: 1,
        name: "test",
      },
    },{
      id: 1,
      title: "test",
      content: "test",
      category: {
        id: 1,
        name: "test",
      },
    },{
      id: 1,
      title: "test",
      content: "test",
      category: {
        id: 1,
        name: "test",
      },
    },{
      id: 1,
      title: "test",
      content: "test",
      category: {
        id: 1,
        name: "test",
      },
    },{
      id: 1,
      title: "test",
      content: "test",
      category: {
        id: 1,
        name: "test",
      },
    }],
    isLoading,
  };
};