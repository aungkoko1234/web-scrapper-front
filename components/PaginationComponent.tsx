import { Pagination, Stack } from "@mui/material";
import React from "react";
interface PaginationProps {
  count: number;
  current?: number;
  size: "large" | "small" | "medium";
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
}
const PaginationComponent: React.FC<PaginationProps> = ({
  count,
  current = 1,
  size,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
  };
  return (
    <Stack
      display="flex"
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ my: { xs: 2, md: 5 }, width: "100%" }}
    >
      <Pagination
        count={count}
        defaultPage={current}
        boundaryCount={1}
        siblingCount={0}
        showFirstButton
        showLastButton
        size={size}
        onChange={handleChange}
      />
    </Stack>
  );
};
export default PaginationComponent;
