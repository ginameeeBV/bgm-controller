import React, { useEffect, useState } from "react";
import { Card, CardActions, CardMedia, Divider, Stack } from "@mui/material";
import ReactPlayer from "react-player/youtube";
import VolumeController from "../molecules/VolumeController";
import ControlButtons from "../molecules/ControlButtons";

interface IProps {
  url: string;
}

function VideoCard(props: IProps) {
  const [playing, setPlaying] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleStop = () => {
    setUrl("");
    setPlaying(false);
    setTimeout(() => setUrl(props.url));
  };

  const handleChangeVolumne = () => {};

  useEffect(() => {
    setUrl(props.url);
  }, [props.url]);

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
        <ReactPlayer width="100%" height="100%" url={url} playing={playing} />
      </CardMedia>
      <CardActions>
        <Stack width="100%" spacing={1}>
          <ControlButtons
            onPlay={handlePlay}
            onPause={handlePause}
            onStop={handleStop}
          />
          <Divider />
          <VolumeController onChange={handleChangeVolumne} />
        </Stack>
      </CardActions>
    </Card>
  );
}

export default VideoCard;
