import { Box, Grid } from "@mui/material";
import UploadVideoForm from "./UploadVideoForm";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // Import react-hot-toast for notifications
import { useNavigate } from "react-router-dom";

export default function UploadNewVideo() {
  return (
    <Box sx={{ p: "24px 24px 0px 24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={5}>
          <UploadVideoForm />
        </Grid>
      </Grid>
    </Box>
  );
}
