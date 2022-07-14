import { Stop } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

interface IProps {
  onClick?: () => unknown;
  disabled?: boolean;
}

function StopButton({ onClick = () => undefined, disabled = false }: IProps) {
  return (
    <Button size="small" onClick={onClick} disabled={disabled}>
      <Stop />
    </Button>
  );
}

export default StopButton;
