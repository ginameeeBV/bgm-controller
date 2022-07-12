import { Box, Stack, TextField } from "@mui/material";
import { useAtom } from "jotai";
import React, { ChangeEvent } from "react";
import {
  currPlayedUrlAtom,
  fadeRatioAtom,
  isOnMicAtom,
  minVolumeForSpeakAtom,
  prevPlayedUrlAtom,
  volumeAtom,
} from "../../stores/videos";
import MicButton from "../atoms/MicButton";
import MicOffButton from "../atoms/MuteButton";
import PauseButton from "../atoms/PauseButton";
import PlayButton from "../atoms/PlayButton";
import VolumeController from "../molecules/VolumeController";

function GlobalController() {
  const [fadeRatio, setFadeRatio] = useAtom(fadeRatioAtom);
  const [, setVolume] = useAtom(volumeAtom);
  const [currPlayedUrl, setCurrPlayedUrl] = useAtom(currPlayedUrlAtom);
  const [prevPlayedUrl, setPrevPlayedUrl] = useAtom(prevPlayedUrlAtom);
  const [isOnMic, setIsOnMic] = useAtom(isOnMicAtom);
  const [minVolumeForSpeak, setMinVolumeForSpeak] = useAtom(
    minVolumeForSpeakAtom
  );

  const handleSpeak = () => {
    setIsOnMic(!isOnMic);
  };

  const handlePlay = () => {
    setCurrPlayedUrl(prevPlayedUrl);
  };

  const handlePause = () => {
    setPrevPlayedUrl(currPlayedUrl);
    setCurrPlayedUrl("");
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

  const handleChangeMinVolumeForSpeak = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    setMinVolumeForSpeak(Number(value));
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyItems="center"
        alignItems="center"
        sx={{ height: "auto", py: 2 }}
      >
        {isOnMic ? (
          <MicOffButton onClick={handleSpeak} />
        ) : (
          <MicButton onClick={handleSpeak} />
        )}
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
            inputProps={{
              min: 0,
              max: 100,
            }}
          />
          <TextField
            label="Music Volume For Speaking"
            sx={{ width: 180 }}
            type="number"
            value={minVolumeForSpeak}
            onChange={handleChangeMinVolumeForSpeak}
            inputProps={{
              min: 0,
              max: 100,
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}

export default GlobalController;
