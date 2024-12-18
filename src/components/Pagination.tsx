"use client";
import React from "react";
import {
  Pagination as MUIPagination,
  PaginationItem,
  styled,
  Typography,
} from "@mui/material";

const StyledPagination = styled(MUIPagination)(() => ({
  "& .MuiPaginationItem-root": {
    color: "white",
    backgroundColor: "#092C39",
    borderRadius: "4px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    "&.Mui-selected": {
      backgroundColor: "#2BD17E",
      color: "white",
      "&:hover": {
        backgroundColor: "#1DD15D",
      },
    },
  },
  "& .MuiPaginationItem-previousNext": {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <StyledPagination
      count={totalPages}
      page={currentPage}
      onChange={onPageChange}
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          slots={{
            previous: () => <Typography component="span">Prev</Typography>,
            next: () => <Typography component="span">Next</Typography>,
          }}
          {...item}
        />
      )}
    />
  );
}
