import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AddNewLink from "../../Components/Links/AddLink/AddNewLink";
export default function AddLink() {
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
        <AddNewLink />
      </Box>
    </Box>
  );
}
