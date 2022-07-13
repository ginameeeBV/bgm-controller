import { useEffect, useRef, useState } from "react";
import { Card, CardActions, CardMedia, Divider, Stack } from "@mui/material";
import ReactPlayer from "react-player/youtube";
import VolumeController from "../molecules/VolumeController";
import ControlButtons from "../molecules/ControlButtons";
import useVolume from "../../hooks/useVolume";
import { useAtom } from "jotai";
import {
  currPlayedUrlAtom,
  isOnMicAtom,
  minVolumeForSpeakAtom,
} from "../../stores/videos";

interface IProps {
  url: string;
  defaultVolume?: number;
  isLoop?: boolean;
}

function VideoCard({ url, defaultVolume = 100, isLoop = true }: IProps) {
  const [playing, setPlaying] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);
  const [currPlayedUrl, setCurrPlayedUrl] = useAtom(currPlayedUrlAtom);
  const [isOnMic] = useAtom(isOnMicAtom);
  const [minVolumeForSpeak] = useAtom(minVolumeForSpeakAtom);
  const { volume, setVolume, startFadeIn, startFadeOut, stopFadeInOut } =
    useVolume(defaultVolume);

  const handlePlay = () => {
    setPlaying(true);
    setCurrPlayedUrl(url);
    startFadeIn();
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleStop = () => {
    setPlaying(false);
    playerRef.current?.seekTo(0);
  };

  const handleChangeVolume = (newVolume: number) => {
    setVolume(newVolume);
    stopFadeInOut();
  };

  const handleFadeOut = () => {
    startFadeOut();
  };

  useEffect(() => {
    if (volume <= 0) {
      setPlaying(false);
    }
  }, [volume]);

  useEffect(() => {
    if (url !== currPlayedUrl) {
      startFadeOut();
    } else {
      setPlaying(true);
      startFadeIn();
    }
  }, [currPlayedUrl, url, startFadeOut, startFadeIn]);

  useEffect(() => {
    if (isOnMic) {
      startFadeOut(minVolumeForSpeak);
    } else {
      if (playing) {
        startFadeIn();
      }
    }
  }, [isOnMic, startFadeOut, startFadeIn, minVolumeForSpeak, playing]);

  return (
    <Card
      sx={{
        width: "100%",
        height: "330px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          url={url}
          playing={playing}
          volume={volume / 100}
          loop={isLoop}
        />
      </CardMedia>
      <CardActions>
        <Stack width="100%" spacing={1}>
          <ControlButtons
            onPlay={handlePlay}
            onPause={handlePause}
            onStop={handleStop}
          />
          <Divider />
          <VolumeController
            value={volume}
            onVolumeChange={handleChangeVolume}
            onFadeOut={handleFadeOut}
          />
        </Stack>
      </CardActions>
    </Card>
  );
}

export default VideoCard;
