import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AllFormsList from "../../Components/Forms/FormList/AllFormsList";
export default function FormList() {
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
        <AllFormsList />
      </Box>
    </Box>
  );
}
