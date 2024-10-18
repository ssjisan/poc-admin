import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import CreateDoctorProfile from "../../Components/Doctors/CreateDoctorProfile/CreateDoctorProfile";

export default function AddDoctorProfile() {
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
          <CreateDoctorProfile />
        </Box>
      </Box>
    </Box>
  );
}
