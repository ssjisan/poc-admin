import {
  Box,
  Typography,
} from "@mui/material";
import TableViewer from "./Table/TableViewer";

export default function AllExerciseVideos() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">All Exercise Videos</Typography>
      </Box>
      <TableViewer />
    </Box>
  );
}
