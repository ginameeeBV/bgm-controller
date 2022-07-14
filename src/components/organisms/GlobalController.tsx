import { Container, Stack, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { ChangeEvent } from "react";
import {
  currPlayedUrlAtom,
  fadeInOutTimeAtom,
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
  const [fadeInOutTime, setFadeInOutTime] = useAtom(fadeInOutTimeAtom);
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
    setPrevPlayedUrl(currPlayedUrl);
    if (isOnMic) {
      setIsOnMic(false);
    }
  };

  const handlePause = () => {
    if (currPlayedUrl) {
      setPrevPlayedUrl(currPlayedUrl);
    }
    setCurrPlayedUrl("");
  };
  const handleChangeVolume = (value: number) => {
    setVolume(value);
    if (isOnMic) {
      setIsOnMic(false);
    }
  };

  const handleChangeFadeRatio = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const min = 0;
    const value = Number(e.target.value);

    if (!isNaN(value) && value >= min) {
      setFadeInOutTime(Number(value));
    }
  };

  const handleChangeMinVolumeForSpeak = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const min = 0;
    const max = 100;
    const value = Number(e.target.value);

    if (!isNaN(value) && value >= min && value <= max) {
      setMinVolumeForSpeak(Number(value));
    }
  };

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "auto", py: 2 }}
        width="100%"
      >
        {isOnMic ? (
          <MicButton onClick={handleSpeak} />
        ) : (
          <MicOffButton onClick={handleSpeak} />
        )}
        <PlayButton onClick={handlePlay} disabled={!prevPlayedUrl} />
        <PauseButton onClick={handlePause} disabled={!currPlayedUrl} />
        <Stack direction="row" sx={{ width: "auto" }} spacing={2}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: { xs: 100, md: 250, xl: 250 },
            }}
          >
            <VolumeController
              onVolumeChange={handleChangeVolume}
              defaultValue={100}
            />
          </Stack>
          <TextField
            label="Fade In/Out Time(ms)"
            defaultValue={15}
            sx={{ width: 180 }}
            value={fadeInOutTime}
            onChange={handleChangeFadeRatio}
            inputProps={{
              min: 0,
            }}
          />
          <TextField
            label="Music Volume For Speaking"
            sx={{ width: 180 }}
            value={minVolumeForSpeak}
            onChange={handleChangeMinVolumeForSpeak}
            inputProps={{
              min: 0,
              max: 100,
            }}
          />
        </Stack>
      </Stack>
    </Container>
  );
}

export default GlobalController;
