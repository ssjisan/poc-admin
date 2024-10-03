import { Box, Container, Typography } from "@mui/material";
import AddUserForm from "./Components/AddUserForm";

export default function AddAnUser() {
  return (
    <Container>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Register New User</Typography>
      </Box>
      <AddUserForm />
    </Container>
  );
}
