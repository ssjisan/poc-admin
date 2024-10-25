import { Box, Grid } from "@mui/material";
import AlbumCount from "./MatrixCard/AlbumCount";
import VideoCount from "./MatrixCard/VideoCount";
import MemberCount from "./MatrixCard/BlogCount";
import AppointmentCount from "./MatrixCard/AppointmentCount";

export default function MatrixCardDeck() {
  return (
    <Box sx={{ mt: "40px", mb: "40px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AppointmentCount />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AlbumCount />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <VideoCount />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <MemberCount />
        </Grid>
      </Grid>
    </Box>
  );
}
