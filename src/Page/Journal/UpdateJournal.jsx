import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import UpdateAJournal from "../../Components/Journals/UpdateJournal/UpdateAJournal";
export default function UpdateJournal() {
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
        <UpdateAJournal />
      </Box>
    </Box>
  );
}
