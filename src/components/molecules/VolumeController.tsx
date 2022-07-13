import { VolumeUp } from "@mui/icons-material";
import { Input, Slider, Stack } from "@mui/material";
import { useEffect } from "react";
import { ChangeEventHandler, useState } from "react";

interface IProps {
  defaultValue?: number;
  value?: number;
  onVolumeChange?: (value: number) => void;
  width?: number | string;
}

const MAX_VALUE = 100;
const MIN_VALUE = 0;

function VolumeController({
  defaultValue = MAX_VALUE,
  value,
  onVolumeChange,
  width = "100%",
}: IProps) {
  const [volume, setVolume] = useState<number>(defaultValue);
  useEffect(() => {
    if (typeof value !== "undefined") {
      setVolume(value);
    }
  }, [value]);
  const handleSlideChange = (_: Event, newValue: number | number[]) => {
    const newVolume = Array.isArray(newValue) ? newValue[0] : newValue;
    setVolume(newVolume);
    onVolumeChange?.(newVolume);
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newVolume = Number(e.currentTarget.value);
    setVolume(newVolume);
    onVolumeChange?.(newVolume);
  };
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ px: 2 }}
      alignItems="center"
      justifyContent="center"
      width={width}
    >
      <Stack direction="row" spacing={0.5} alignItems="center" component="span">
        <VolumeUp />
        <Input
          size="small"
          inputProps={{
            max: MAX_VALUE,
            min: MIN_VALUE,
          }}
          sx={{ width: 20, textAlign: "center", fontSize: 11 }}
          value={volume}
          onChange={handleInputChange}
        />
      </Stack>
      <Slider
        aria-label="Volume"
        value={volume}
        max={MAX_VALUE}
        min={MIN_VALUE}
        sx={{
          display: { xs: "none", md: "none", xl: "unset" },
        }}
        onChange={handleSlideChange}
      />
    </Stack>
  );
}

export default VolumeController;
