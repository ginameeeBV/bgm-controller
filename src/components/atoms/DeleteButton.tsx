import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

interface IProps {
  onClick?: () => unknown;
}

function DeleteButton({ onClick = () => undefined }: IProps) {
  return (
    <Button
      sx={{
        "&:hover": {
          color: "white",
          backgroundColor: "primary.main",
        },
        backgroundColor: "white",
      }}
      onClick={onClick}
    >
      <Delete />
    </Button>
  );
}

export default DeleteButton;
