import { useCallback } from "react";

export function useSortHandler(order, orderBy, setOrder, setOrderBy) {
  const handleRequestSort = useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy, setOrder, setOrderBy]
  );

  const createSortHandler = useCallback(
    (property) => (event) => {
      handleRequestSort(event, property);
    },
    [handleRequestSort]
  );

  return { handleRequestSort, createSortHandler };
}
