import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

export const Action = ({ handleClose }: any) => (
  <React.Fragment>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
);
