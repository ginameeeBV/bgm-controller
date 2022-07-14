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
  prevPlayedUrlAtom,
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
  const [, setPrevPlayedUrl] = useAtom(prevPlayedUrlAtom);
  const [isOnMic] = useAtom(isOnMicAtom);
  const [minVolumeForSpeak] = useAtom(minVolumeForSpeakAtom);

  const { volume, setVolume, startFadeIn, startFadeOut, stopFadeInOut } =
    useVolume(defaultVolume);

  const handlePlay = () => {
    if (playing && currPlayedUrl === url) {
      return;
    }
    setPlaying(true);
    if (currPlayedUrl) {
      setPrevPlayedUrl(currPlayedUrl);
    }
    setCurrPlayedUrl(url);
    startFadeIn();
  };

  const handlePause = () => {
    if (!playing) {
      return;
    }

    startFadeOut();
    if (currPlayedUrl && currPlayedUrl === url) {
      setPrevPlayedUrl(currPlayedUrl);
      setCurrPlayedUrl("");
    }
  };

  const handleStop = () => {
    setPlaying(false);
    playerRef.current?.seekTo(0);
  };

  const handleChangeVolume = (newVolume: number) => {
    setVolume(newVolume);
    stopFadeInOut();
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
    if (currPlayedUrl !== url) {
      return;
    }

    if (isOnMic) {
      startFadeOut(volume, minVolumeForSpeak);
    } else {
      startFadeIn();
    }
  }, [
    isOnMic,
    startFadeOut,
    startFadeIn,
    minVolumeForSpeak,
    currPlayedUrl,
    url,
    volume,
  ]);

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
          onPause={handlePause}
          onPlay={handlePlay}
        />
      </CardMedia>
      <CardActions>
        <Stack width="100%" spacing={1}>
          <ControlButtons
            playing={playing}
            onPlay={handlePlay}
            onPause={handlePause}
            onStop={handleStop}
          />
          <Divider />
          <VolumeController
            value={Math.floor(volume)}
            onVolumeChange={handleChangeVolume}
          />
        </Stack>
      </CardActions>
    </Card>
  );
}

export default VideoCard;
