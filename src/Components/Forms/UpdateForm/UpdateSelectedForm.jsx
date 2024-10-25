import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import toast from "react-hot-toast";

export default function UpdateSelectedForm() {
  const { formId } = useParams(); // Get the journal ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    link: "",
  });
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get(`/form/${formId}`);
        setFormData({
          title: response.data.title,
          link: response.data.link,
        });
      } catch (err) {
        toast.error("Failed to fetch journal data");
      }
    };

    fetchJournal();
  }, [formId]);

  const [isUpdating, setIsUpdating] = useState(false); // State to manage button disabled status

  const handleUpdate = async (event) => {
    event.preventDefault();
    setIsUpdating(true); // Disable the button

    try {
      const updatedData = {
        title: formData.title,
        link: formData.link,
      };
      await axios.put(`/form/${formId}`, updatedData);
      toast.success("Form updated successfully");
      navigate("/forms"); // Redirect to the journals route
    } catch (err) {
      toast.error("Failed to update form");
    } finally {
      setIsUpdating(false); // Re-enable the button
    }
  };

  return (
    <Box sx={{ p: "24px" }} component="form" onSubmit={handleUpdate}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <TextField
              label="Link"
              variant="outlined"
              fullWidth
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isUpdating}
              endIcon={
                isUpdating ? <img src="/spinner.gif" width="24px" /> : null
              }
            >
              {isUpdating ? "Updating" : "Update"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
