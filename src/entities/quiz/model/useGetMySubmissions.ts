import { useState } from "react";
import { SUBMISSION_CATEGORY } from "../../../widgets/section/constants/submission-category";
import { MySubmission } from "@/entities/quiz/types/my-submission";
import { useQuery } from "@tanstack/react-query";
import { fetchSubmissions } from "../api/fetch-submissions";

export const useGetMySubmissions = (initialData: MySubmission[]) => {
  const [category, setCategory] = useState(SUBMISSION_CATEGORY[0]);
  const { data, isLoading } = useQuery({
    queryKey: ["mySubmissions", category.value],
    queryFn: async () => await fetchSubmissions(category.value)
  });

  return {
    category,
    setCategory,
    data,
    isLoading
  }
}