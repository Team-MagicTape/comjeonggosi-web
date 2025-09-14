import { customFetch } from "@/shared/libs/custom-fetch";
import { Workbook } from "../types/workbook";

export const fetchWorkbooks = async () => {
  try {
    const { data } = await customFetch.get<Workbook[]>("/workbooks");
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
