"use client";
//import { useState } from "react";
import { Box } from "@mui/material";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box component="main">
      {children}
    </Box>
  );
}
