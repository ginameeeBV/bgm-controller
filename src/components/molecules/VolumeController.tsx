import { VolumeUp } from "@mui/icons-material";
import { Button, Input, Slider, Stack } from "@mui/material";
import React from "react";

interface IProps {
  value?: number;
  onFadeIn?: () => unknown;
  onFadeOut?: () => unknown;
  onChange?: (value: number) => unknown;
}

const MAX_VALUE = 100;
const MIN_VALUE = 0;

function VolumeController({
  value = 100,
  onFadeIn = () => undefined,
  onFadeOut = () => undefined,
  onChange = (value: number) => undefined,
}: IProps) {
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ px: 2 }}
      alignItems="center"
      justifyContent="center"
      minWidth="100%"
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
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </Stack>
      <Slider
        aria-label="Volume"
        value={value}
        max={MAX_VALUE}
        min={MIN_VALUE}
        sx={{
          display: { xs: "none", md: "none", xl: "unset" },
        }}
      />
      <Stack direction="row" component="span" spacing={0.5}>
        <Button
          size="small"
          variant="contained"
          sx={{ fontSize: 8 }}
          onClick={onFadeIn}
        >
          Fade In
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{ fontSize: 8 }}
          onClick={onFadeOut}
        >
          Fade Out
        </Button>
      </Stack>
    </Stack>
  );
}

export default VolumeController;
