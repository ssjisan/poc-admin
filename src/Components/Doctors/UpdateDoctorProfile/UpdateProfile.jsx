import { Box, Grid, Stack, useMediaQuery } from "@mui/material";
import UpdateProfileInfo from "./Components/UpdateProfileInfo";
export default function UpdateProfile() {
  const forBelow800 = useMediaQuery("(max-width:800px)");
  return (
    <Box sx={{ p: "24px 24px 0px 24px"}}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <Stack
            spacing={5}
            direction={forBelow800 ? "column-reverse" : "row"}
          >
            <UpdateProfileInfo/>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
