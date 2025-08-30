import { Category } from "@/entities/category/types/category";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Mail } from "../types/mail";
import { Tab } from "@/widgets/tabs/types/tab";
import { fetchMails } from "../api/fetch-mails";

export const useGetMails = (categories: Category[], mails: Mail[]) => {
  const categoryList = categories.map((item) => ({
    name: item.name,
    value: `${item.id}`,
  }));
  const [category, setCategory] = useState<Tab>(categoryList[0]);

  const { data, isLoading } = useQuery({
    queryKey: ["mails", category?.value || ""],
    queryFn: async () => await fetchMails(category?.value),
    initialData: mails,
  });

  return { data, isLoading, category, categoryList, setCategory };
};
