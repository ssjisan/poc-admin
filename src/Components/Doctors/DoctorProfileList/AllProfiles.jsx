import { Box, Typography } from "@mui/material";
import TableViewer from "./Table/TableViewer";

export default function AllProfiles() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">All Doctors Profile</Typography>
        <TableViewer />
      </Box>
    </Box>
  );
}
