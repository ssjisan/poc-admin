import { Box, Typography } from "@mui/material";
import LinksListTable from "./LinksListTable";

export default function AllLinksList() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">All Links</Typography>
      </Box>
      <LinksListTable />
    </Box>
  );
}
