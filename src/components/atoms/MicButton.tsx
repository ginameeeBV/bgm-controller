import { Mic } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

interface IProps {
  onClick?: () => unknown;
}

function MicButton({ onClick = () => undefined }: IProps) {
  return (
    <Button size="small" onClick={onClick}>
      <Mic />
    </Button>
  );
}

export default MicButton;
