import { useEffect, useRef, useState } from "react";
import { Card, CardActions, CardMedia, Divider, Stack } from "@mui/material";
import ReactPlayer from "react-player/youtube";
import VolumeController from "../molecules/VolumeController";
import ControlButtons from "../molecules/ControlButtons";

interface IProps {
  url: string;
  defaultVolume?: number;
  isLoop?: boolean;
}

function VideoCard({ url, defaultVolume = 100, isLoop = true }: IProps) {
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState(defaultVolume);
  const playerRef = useRef<any>();
  const volumeFadeOffTimerRef = useRef<number>();

  const handlePlay = () => {
    setPlaying(true);
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
    if (volumeFadeOffTimerRef.current) {
      clearInterval(volumeFadeOffTimerRef.current);
      volumeFadeOffTimerRef.current = undefined;
    }
  };

  const handleFadeOut = () => {
    volumeFadeOffTimerRef.current = window.setInterval(() => {
      setVolume((prevVolume) => prevVolume - 4);
    }, 80);
  };

  useEffect(() => {
    if (volume <= 0 && volumeFadeOffTimerRef.current) {
      clearInterval(volumeFadeOffTimerRef.current);
      setVolume(0);
      volumeFadeOffTimerRef.current = undefined;
    }
  }, [volume]);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia>
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
