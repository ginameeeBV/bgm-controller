import { Stack } from "@mui/material";
import React from "react";
import PauseButton from "../atoms/PauseButton";
import PlayButton from "../atoms/PlayButton";
import StopButton from "../atoms/StopButton";

interface IProps {
  onPlay?: () => unknown;
  onPause?: () => unknown;
  onStop?: () => unknown;
  playing: boolean;
}
function ControlButtons({
  onPlay = () => undefined,
  onPause = () => undefined,
  onStop = () => undefined,
  playing,
}: IProps) {
  return (
    <Stack direction="row" justifyContent="space-around">
      <PlayButton onClick={onPlay} disabled={playing} />
      <PauseButton onClick={onPause} disabled={!playing} />
      <StopButton onClick={onStop} />
    </Stack>
  );
}

export default ControlButtons;
