import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AllJournalsList from "../../Components/Journals/JournalList/AllJournalsList";
export default function JournalList() {
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
        <AllJournalsList />
      </Box>
    </Box>
  );
}
