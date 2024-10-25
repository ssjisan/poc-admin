import FormsListTable from "./FormsListTable";
import { Box, Typography } from "@mui/material";

export default function AllFormsList() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Forms List</Typography>
      </Box>
      <FormsListTable />
    </Box>
  );
}
