import { Pause, PlayArrow, Stop } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React from "react";

interface IProps {
  onPlay?: () => unknown;
  onPause?: () => unknown;
  onStop?: () => unknown;
}
function ControlButtons({
  onPlay = () => undefined,
  onPause = () => undefined,
  onStop = () => undefined,
}: IProps) {
  return (
    <Stack direction="row" justifyContent="space-around" minWidth="100%">
      <Button size="small" onClick={onPlay}>
        <PlayArrow />
      </Button>
      <Button size="small" onClick={onPause}>
        <Pause />
      </Button>
      <Button size="small" onClick={onStop}>
        <Stop />
      </Button>
    </Stack>
  );
}

export default ControlButtons;
