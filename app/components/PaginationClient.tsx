"use client";

import { Pagination, Box, PaginationProps } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationPropsCustom {
  total: number;
}

export default function PaginationClient({ total }: PaginationPropsCustom) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange: PaginationProps["onChange"] = (_, newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Pagination
        count={Math.ceil(total / 10)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  );
}
