import { Box, Grid } from "@mui/material";
import EventCount from "./MatrixCard/EventCount";
import AlbumCount from "./MatrixCard/AlbumCount";
import NoticeNewsCount from "./MatrixCard/NoticeNewsCount";
import MemberCount from "./MatrixCard/MemberCount";

export default function MatrixCardDeck() {
  return (
    <Box sx={{ mt: "40px", mb: "40px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <EventCount />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <NoticeNewsCount />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <AlbumCount />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <MemberCount />
        </Grid>
      </Grid>
    </Box>
  );
}
