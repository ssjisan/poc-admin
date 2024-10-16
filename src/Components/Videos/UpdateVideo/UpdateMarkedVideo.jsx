import { Box, Grid } from "@mui/material";
import UpdateVideoForm from "./UpdateVideoForm";

export default function UpdateMarkedVideo() {
  return (
    <Box sx={{ p: "24px 24px 0px 24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={5}>
          <UpdateVideoForm />
        </Grid>
      </Grid>
    </Box>
  );
}
