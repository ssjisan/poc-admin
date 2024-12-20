import { Box, Toolbar, Typography, useMediaQuery } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import TreatmentList from "../../Components/Treatments/TreatmentsList/TreatmentList";

export default function AllTreatments() {
  const drawerWidth = 280;
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
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
          <Box sx={{ p: forBelow1200 ? "24px 0px" : "24px" }}>
            <Typography variant="h4" sx={{ mb: "40px" }}>
              Treatment Lists
            </Typography>
            <TreatmentList />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
