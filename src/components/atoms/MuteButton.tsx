import { MicOff } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

interface IProps {
  onClick?: () => unknown;
}

function MicOffButton({ onClick = () => undefined }: IProps) {
  return (
    <Button size="small" onClick={onClick}>
      <MicOff />
    </Button>
  );
}

export default MicOffButton;
