import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import UpdateForms from "./UpdateForms";
import { Cross } from "../../../assets/IconSet";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateTreatmentsDrawer({
  toggleDrawer,
  open,
  treatment,
}) {
  const handleUpdate = async (title, details) => {
    try {
      // Check if all fields are filled
      if (!title.trim() || !details.trim()) {
        return toast.error("All fields are required");
      }

      // Make the PUT request to update treatment
      const response = await axios.put(`/treatment/${treatment._id}`, {
        title,
        subTitle: details,
      });

      if (response && response.status === 200) {
        // Display success message and close drawer
        toggleDrawer(false);
        window.location.reload();
        toast.success("Treatment updated successfully");
        // Manually reload the page if you prefer
      } else {
        // Handle unexpected statuses
        toast.error("Failed to update treatment due to server response");
      }
    } catch (error) {
      console.error("Failed to update treatment:", error);
      toast.error("Failed to update treatment");
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{
          width: 380,
        }}
        role="presentation"
      >
        <Stack
          sx={{
            p: "12px 16px",
            borderBottom: "1px solid #DDD",
            position: "fixed",
            background: "#fff",
            width: "380px",
          }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Update Treatment Details</Typography>
          <IconButton onClick={() => toggleDrawer(false)}>
            <Cross size={24} color="#111827" />
          </IconButton>
        </Stack>
        <UpdateForms treatment={treatment} handleUpdate={handleUpdate} />
      </Box>
    </Drawer>
  );
}
