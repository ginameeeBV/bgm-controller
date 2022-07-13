import React from "react";
import MainTemplate from "./components/templates/MainTemplate";
import VideoList from "./components/organisms/VideoList";
import GlobalController from "./components/organisms/GlobalController";
import { AppBar, Box, Divider, Toolbar } from "@mui/material";
import AppLogo from "./components/atoms/AppLogo";
import AddForm from "./components/organisms/AddForm";

function App() {
  return (
    <MainTemplate
      header={
        <AppBar position="relative">
          <Toolbar sx={{ py: 2 }}>
            <AppLogo />
            <Box sx={{ width: 500 }}>
              <AddForm />
            </Box>
          </Toolbar>
        </AppBar>
      }
      main={<VideoList />}
      footer={
        <Box>
          <Divider />
          <GlobalController />
        </Box>
      }
    />
  );
}

export default App;
