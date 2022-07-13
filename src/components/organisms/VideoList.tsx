import { Container, Grid, Box } from "@mui/material";
import { useAtom } from "jotai";
import { urlsAtom } from "../../stores/videos";
import VideoCard from "./VideoCard";
import EmptyList from "../molecules/EmptyList";
import DeleteButton from "../atoms/DeleteButton";

function VideoList() {
  const [urls, setUrls] = useAtom(urlsAtom);
  const isEmpty = urls.length === 0;

  const handleRemoveVideoItem = (targetUrl: string) => {
    setUrls(urls.filter((url) => url !== targetUrl));
  };

  return (
    <Container sx={{ py: 3, height: "100%" }} maxWidth={false}>
      {isEmpty ? (
        <EmptyList />
      ) : (
        <Grid container spacing={4}>
          {urls.map((url) => (
            <Grid item xs={12} sm={6} md={3} key={url}>
              <Box sx={{ position: "relative" }}>
                <Box sx={{ position: "absolute", top: "16px", right: "16px" }}>
                  <DeleteButton onClick={() => handleRemoveVideoItem(url)} />
                </Box>
                <VideoCard url={url} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default VideoList;
