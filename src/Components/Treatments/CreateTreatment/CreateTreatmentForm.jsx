import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateTreatmentForm() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form fields
    if (!title.trim() || !subTitle.trim()) {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await axios.post("/create_guidance", {
        title,
        subTitle,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        navigate("/guidance_list");
        toast.success("Treatment created successfully");
      }
    } catch (error) {
      toast.error("Failed to create treatment");
      console.error("Error creating tratment:", error);
    }
  };
  return (
    <Box sx={{ p: "24px 24px 0px 24px" }}>
      <Stack>
        <Typography variant="h4" sx={{ mb: "40px" }}>
          Create a Treatment
        </Typography>
        <Stack sx={{ width: "100%", maxWidth: "480px" }}>
          <TextField
            label="Treatment Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update album name state
            sx={{ mb: 3 }}
          />
          <TextField
            multiline
            rows={4}
            label="Treatment Details"
            variant="outlined"
            fullWidth
            value={subTitle}
            onChange={(e) => setSubtitle(e.target.value)} // Update album name state
            sx={{ mb: 3 }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
