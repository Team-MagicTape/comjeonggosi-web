import { useState, useMemo } from "react";
import { Workbook } from "../types/workbook";

export const useWorkbookSearch = (workbooks: Workbook[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkbooks = useMemo(() => {
    if (!searchQuery.trim()) {
      return workbooks;
    }

    const query = searchQuery.toLowerCase();
    return workbooks.filter((workbook) => {
      return (
        workbook.name.toLowerCase().includes(query) ||
        workbook.description.toLowerCase().includes(query)
      );
    });
  }, [workbooks, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredWorkbooks,
  };
};
