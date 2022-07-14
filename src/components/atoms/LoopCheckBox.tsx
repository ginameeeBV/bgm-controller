import { Loop, LoopOutlined } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { ChangeEventHandler } from "react";

interface IProps {
  onChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
}

function LoopCheckBox({ onChange, defaultChecked = false }: IProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e.target.checked);
  };
  return (
    <Checkbox
      icon={<LoopOutlined sx={{ color: "grey" }} />}
      checkedIcon={<Loop sx={{ color: "primary.main" }} />}
      onChange={handleChange}
      defaultChecked={defaultChecked}
    />
  );
}

export default LoopCheckBox;
