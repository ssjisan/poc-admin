import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AllProfiles from "../../Components/Doctors/DoctorProfileList/AllProfiles";

export default function DoctorsProfile() {
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
          <AllProfiles />
        </Box>
      </Box>
    </Box>
  );
}
