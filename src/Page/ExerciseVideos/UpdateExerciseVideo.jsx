import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import UpdateMarkedExerciseVideo from "../../Components/Exercise Video/UpdateExerciseVideo/UpdateMarkedExerciseVideo";

export default function UpdateExerciseVideo() {
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
          <UpdateMarkedExerciseVideo />
        </Box>
      </Box>
    </Box>
  );
}
