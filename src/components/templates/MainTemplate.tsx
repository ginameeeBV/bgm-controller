import { Box, Stack } from "@mui/material";
import React from "react";

interface IProps {
  header?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;
}

const styles = {
  header: {
    position: "fixed",
    width: "100vw",
    height: "80px",
  },
  get main() {
    return {
      paddingTop: this.header.height,
      height: `calc(100vh - ${this.header.height})`,
    };
  },
};

function MainTemplate({ header, main, footer }: IProps) {
  return (
    <>
      {header && (
        <Box component="header" sx={styles.header}>
          {header}
        </Box>
      )}
      {main && (
        <Box component="main" sx={styles.main}>
          <Stack>{main}</Stack>
        </Box>
      )}
      {footer && <Box component="footer">{footer}</Box>}
    </>
  );
}

export default MainTemplate;
