import { Box, Stack, TextField } from "@mui/material";
import { useAtom } from "jotai";
import React, { ChangeEvent, useEffect } from "react";
import { fadeRatioAtom, playingAtom, volumeAtom } from "../../stores/videos";
import MicButton from "../atoms/MicButton";
import PauseButton from "../atoms/PauseButton";
import PlayButton from "../atoms/PlayButton";
import VolumeController from "../molecules/VolumeController";

function GlobalController() {
  const [fadeRatio, setFadeRatio] = useAtom(fadeRatioAtom);
  const [, setVolume] = useAtom(volumeAtom);
  const [, setPlaying] = useAtom(playingAtom);

  const handleSpeak = () => {
    // TODO: fadeout hook 호출하기 (ratio: 적당히, min: fadeRatio)
  };

  const handlePlay = () => {
    // TODO: fadeout hook 호출하기 (ratio: 적당히, min: 0)
    setPlaying(true);
  };

  const handlePause = () => {
    // TODO: fadeout hook 호출하기 (ratio: 적당히, min: 0)
    setPlaying(false);
  };

  const handleChangeVolume = (value: number) => {
    setVolume(value);
  };

  const handleChangeFadeRatio = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFadeRatio(Number(value));
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyItems="center"
        alignItems="center"
        sx={{ height: "auto", py: 2 }}
      >
        <MicButton onClick={handleSpeak} />
        <PlayButton onClick={handlePlay} />
        <PauseButton onClick={handlePause} />
        <Stack direction="row" sx={{ width: "auto" }} spacing={2}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: { xs: 100, md: 100, xl: 250 },
            }}
          >
            <VolumeController onVolumeChange={handleChangeVolume} />
          </Stack>
          <TextField
            label="Fade Out Ratio"
            defaultValue={15}
            sx={{ width: 110 }}
            type="number"
            value={fadeRatio}
            onChange={handleChangeFadeRatio}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default GlobalController;
