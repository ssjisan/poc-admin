import { Box, Toolbar } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import CreateTreatmentForm from "../../Components/Treatments/CreateTreatment/CreateTreatmentForm";

export default function CreateTreatment() {
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
          <CreateTreatmentForm/>
        </Box>
      </Box>
    </Box>
  );
}
