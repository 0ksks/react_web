import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import Header from "@/components/app-header";
import AuthPhoneForm from "./AuthPhoneForm";
import { Box } from "@mui/material";

interface IProps {
  children?: ReactNode;
}

const Login: FC<IProps> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full viewport height
      }}
    >
      {/* Fixed header at the top */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: 64, // Set a specific height for the header (adjust as needed)
          backgroundColor: "primary.main",
        }}
      >
        <Header />
      </Box>

      {/* Centered FormCard in the remaining space */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AuthPhoneForm />
      </Box>
    </Box>
  );
};

export default memo(Login);
