import { Container, Grid } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { videosAtom } from "../../stores";
import VideoCard from "../molecules/VideoCard";
import EmptyList from "../molecules/EmptyList";

function VideoList() {
  const [videos] = useAtom(videosAtom);
  const isEmpty = videos.length === 0;

  return (
    <Container sx={{ py: 3, height: "100%" }} maxWidth={false}>
      {isEmpty ? (
        <EmptyList />
      ) : (
        <Grid container spacing={4}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={3}>
              <VideoCard {...video} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default VideoList;
