import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import UploadNewExerciseVideo from "../../Components/Exercise Video/UploadExerciseVideo/UploadNewExerciseVideo";

export default function UploadExerciseVideo() {
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
          <UploadNewExerciseVideo />
        </Box>
      </Box>
    </Box>
  );
}
