import React from "react";
import { LibraryMusic } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

function AppLogo() {
  return (
    <Stack component="span" direction="row" alignItems="center">
      <LibraryMusic sx={{ mr: 1 }} />
      <Typography variant="h6" color="inherit" noWrap sx={{ mr: 5 }}>
        BGM Controller
      </Typography>
    </Stack>
  );
}

export default AppLogo;
