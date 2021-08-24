import { useMemo } from "react";

export const usePagination = ({
  totalCount,
  perPage,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / perPage);
    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    }
  }, [totalCount, perPage, siblingCount, currentPage]);

  return paginationRange;
};
