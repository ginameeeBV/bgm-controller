import { PlayArrow } from "@mui/icons-material";
import { Button } from "@mui/material";

interface IProps {
  onClick?: () => unknown;
  disabled?: boolean;
}

function PlayButton({ onClick = () => undefined, disabled = false }: IProps) {
  return (
    <Button size="small" disabled={disabled} onClick={onClick}>
      <PlayArrow />
    </Button>
  );
}

export default PlayButton;
