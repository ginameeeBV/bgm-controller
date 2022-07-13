import { Pause } from "@mui/icons-material";
import { Button } from "@mui/material";

interface IProps {
  onClick?: () => unknown;
  disabled?: boolean;
}

function PauseButton({ onClick = () => undefined, disabled = false }: IProps) {
  return (
    <Button size="small" disabled={disabled} onClick={onClick}>
      <Pause />
    </Button>
  );
}

export default PauseButton;
