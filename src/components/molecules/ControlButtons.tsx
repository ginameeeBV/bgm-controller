import { Stack } from "@mui/material";
import LoopCheckBox from "../atoms/LoopCheckBox";
import PauseButton from "../atoms/PauseButton";
import PlayButton from "../atoms/PlayButton";
import StopButton from "../atoms/StopButton";

interface IProps {
  onPlay?: () => unknown;
  onPause?: () => unknown;
  onStop?: () => unknown;
  onLoopChange?: (checked: boolean) => void;
  playing: boolean;
  defaultIsLoop?: boolean;
}
function ControlButtons({
  onPlay = () => undefined,
  onPause = () => undefined,
  onStop = () => undefined,
  onLoopChange,
  playing,
  defaultIsLoop = false,
}: IProps) {
  return (
    <Stack direction="row" justifyContent="space-around">
      <PlayButton onClick={onPlay} disabled={playing} />
      <PauseButton onClick={onPause} disabled={!playing} />
      <StopButton onClick={onStop} />
      <LoopCheckBox defaultChecked={defaultIsLoop} onChange={onLoopChange} />
    </Stack>
  );
}

export default ControlButtons;
