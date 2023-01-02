import { Search } from "@mui/icons-material";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";

interface SearchBoxProps {
  isMobile?: boolean;
  onPressEnter: (keyword: string) => void;
}
export const SearchBox = ({
  isMobile = false,
  onPressEnter,
}: SearchBoxProps) => {
  const [keyword, setKeyword] = useState("");
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    console.log("keyword", event.code);
    if (keyword.length > 0 && event.code === "Enter") {
      void onPressEnter(keyword);
    }
  }
  return (
    <FormControl sx={{ width: "100%", my: 2 }} variant="outlined" size="medium">
      <OutlinedInput
        id="search-input"
        fullWidth
        startAdornment={
          !isMobile && (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }
        endAdornment={
          isMobile && (
            <InputAdornment position="end">
              <Search onClick={() => onPressEnter(keyword)} color="primary" />
            </InputAdornment>
          )
        }
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          "aria-label": "search",
        }}
        style={{
          backgroundColor: "white",
        }}
      />
    </FormControl>
  );
};
