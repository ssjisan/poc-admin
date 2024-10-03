import { Box, Grid, Toolbar } from "@mui/material";
import Sidebar from "../Layout/Sidebar";
import MatrixCardDeck from "../Components/Dashboard/MatrixCardDeck";
import SupportCard from "../Components/Dashboard/SupportCard/SupportCard";
import DirectNavigation from "../Components/Dashboard/DirectNavigation/DirectNavigation";
import NoticeUpdate from "../Components/Dashboard/Notice Update/NoticeUpdate";
import UpcomingEvents from "../Components/Dashboard/Upcoming Events/UpcomingEvents";
export default function Dashboard() {
  const drawerWidth = 280;

  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Box>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} sm={12} md={7}>
              <SupportCard />
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <DirectNavigation />
            </Grid>
          </Grid>
          <MatrixCardDeck />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <NoticeUpdate />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <UpcomingEvents />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
