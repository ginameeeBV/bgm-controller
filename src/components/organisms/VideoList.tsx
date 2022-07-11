import { Container, Grid } from "@mui/material";
import { useAtom } from "jotai";
import React from "react";
import { urlsAtom } from "../../stores/videos";
import VideoCard from "./VideoCard";
import EmptyList from "../molecules/EmptyList";
import { v4 as uuidv4 } from "uuid";

function VideoList() {
  const [urls] = useAtom(urlsAtom);
  const isEmpty = urls.length === 0;

  return (
    <Container sx={{ py: 3, height: "100%" }} maxWidth={false}>
      {isEmpty ? (
        <EmptyList />
      ) : (
        <Grid container spacing={4}>
          {urls.map((url) => (
            <Grid item xs={12} sm={6} md={3} key={uuidv4()}>
              <VideoCard url={url} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default VideoList;
