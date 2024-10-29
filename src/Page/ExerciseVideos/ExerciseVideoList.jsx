import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AllExerciseVideos from "../../Components/Exercise Video/ExerciseVideoList/AllExerciseVideos";

export default function ExerciseVideoList() {
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
          <AllExerciseVideos />
        </Box>
      </Box>
    </Box>
  );
}
