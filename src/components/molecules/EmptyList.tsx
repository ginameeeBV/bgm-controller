import React from "react";
import { Stack, Typography } from "@mui/material";

function EmptyList() {
  return (
    <Stack sx={{ height: "100%" }} justifyContent="center" alignItems="center">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        List is Empty
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Add videos for background music <br />
        and controll them easily.
      </Typography>
    </Stack>
  );
}

export default EmptyList;
