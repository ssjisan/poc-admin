import { Box, Grid, useMediaQuery } from "@mui/material";
import UploadExerciseVideoForm from "./UploadExerciseVideoForm";

export default function UploadNewExerciseVideo() {
  const forBelow1200 = useMediaQuery("(min-width:1200px)");

  return (
    <Box sx={{ pl: forBelow1200 ? "24px" :"0px" }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={8} lg={5}>
          <UploadExerciseVideoForm />
        </Grid>
      </Grid>
    </Box>
  );
}
