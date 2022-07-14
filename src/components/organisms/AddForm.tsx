import { Add, YouTube } from "@mui/icons-material";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { useAtom } from "jotai";
import { FormEventHandler, ChangeEventHandler } from "react";
import { useState } from "react";
import { urlsAtom } from "../../stores/videos";

const YOUTUBE_URL_BASE = "https://www.youtube.com/watch?v=";

function AddForm() {
  const [urls, setUrls] = useAtom(urlsAtom);
  const [url, setUrl] = useState<string>("");

  const handleAddVideo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const isUrl = /^https?:\/\//.test(url);
    let videoSrc = url;
    if (!isUrl) {
      const isYoutubeId = window.confirm(
        `Do you mean '${YOUTUBE_URL_BASE}${url}'?`
      );
      if (isYoutubeId) {
        videoSrc = `${YOUTUBE_URL_BASE}${url}`;
      }
    }
    if (!urls.includes(url)) {
      setUrls([...urls, videoSrc]);
    }
    setUrl("");
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUrl(e.currentTarget.value);
  };

  const handlePlayVideo = () => {
    window.open(url, "_blank");
  };

  return (
    <Paper
      component="form"
      elevation={3}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
      }}
      onSubmit={handleAddVideo}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Add Youtube Video URL"
        inputProps={{ "aria-label": "add Youtube video" }}
        value={url}
        onChange={handleInputChange}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handlePlayVideo}
        disabled={!url}
        title={"open in youtube"}
      >
        <YouTube />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="add"
        type="submit"
        disabled={!url}
      >
        <Add />
      </IconButton>
    </Paper>
  );
}

export default AddForm;
