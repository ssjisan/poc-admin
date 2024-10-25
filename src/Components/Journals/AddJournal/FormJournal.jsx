import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import {
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Calender } from "../../../assets/IconSet";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FormJournal() {
    const [title, setTitle] = useState("");
    const [publishedDate, setPublishedDate] = useState(null);
    const [link, setLink] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Validate form fields
      if (!title.trim() || !publishedDate || !link.trim()) {
        toast.error("All fields are required");
        return;
      }
  
      try {
        const response = await axios.post("/add_journal", {
          title,
          publishedDate: publishedDate.toISOString(), // Convert date to string format
          link,
        });
  
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          navigate("/journals")
          toast.success("Journal created successfully");
        }
      } catch (error) {
        toast.error("Failed to create link");
        console.error("Error creating link:", error);
      }
    };
  
    const CalenderIcon = () => {
      return <Calender color="grey" size={24} />;
    };
  
    return (
      <Box sx={{ p: "24px" }} component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Stack spacing={3}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  value={publishedDate}
                  onChange={(newDate) => setPublishedDate(newDate)}
                  slots={{
                    openPickerIcon: CalenderIcon,
                  }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
              <TextField
                label="Link"
                variant="outlined"
                fullWidth
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  }
  