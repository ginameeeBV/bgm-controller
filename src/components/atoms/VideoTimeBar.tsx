import { Slider } from "@mui/material";

interface IProps {
  value: number;
  onMouseDown?: React.MouseEventHandler;
  onChange?: (value: number) => unknown;
  onMouseUp?: React.MouseEventHandler;
}
function VideoTimeBar({
  value,
  onMouseDown = () => undefined,
  onMouseUp = () => undefined,
  onChange = () => undefined,
}: IProps) {
  return (
    <Slider
      defaultValue={0}
      aria-label="Duration slider"
      value={value}
      min={0}
      max={100}
      onMouseDown={onMouseDown}
      onChange={(_e, value) => onChange(value as number)}
      onMouseUp={onMouseUp}
    />
  );
}

export default VideoTimeBar;
