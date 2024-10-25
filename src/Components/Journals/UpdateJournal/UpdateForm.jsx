import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Calender } from "../../../assets/IconSet";
import dayjs from "dayjs";

export default function UpdateJournal() {
  const { journalId } = useParams(); // Get the journal ID from the URL
  const navigate = useNavigate();

  const [journalData, setJournalData] = useState({
    title: "",
    publishedDate: dayjs(),
    link: "",
  });
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get(`/journal/${journalId}`);
        setJournalData({
          title: response.data.title,
          publishedDate: dayjs(response.data.publishedDate),
          link: response.data.link,
        });
      } catch (err) {
        toast.error("Failed to fetch journal data");
      } 
    };

    fetchJournal();
  }, [journalId]);

  const [isUpdating, setIsUpdating] = useState(false); // State to manage button disabled status

const handleUpdate = async (event) => {
  event.preventDefault();
  setIsUpdating(true); // Disable the button

  try {
    const updatedData = {
      ...journalData,
      publishedDate: journalData.publishedDate.toISOString(), // Convert date to ISO string
    };
    await axios.put(`/journal/${journalId}`, updatedData);
    navigate("/journals"); // Redirect to the journals route
    toast.success("Journal updated successfully");
  } catch (err) {
    toast.error("Failed to update link");
  } finally {
    setIsUpdating(false); // Re-enable the button
  }
};

  const CalenderIcon = () => {
    return <Calender color="grey" size={24} />;
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
              value={journalData.title}
              onChange={(e) =>
                setJournalData({ ...journalData, title: e.target.value })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={journalData.publishedDate}
                onChange={(newDate) =>
                  setJournalData({ ...journalData, publishedDate: newDate })
                }
                slots={{
                  openPickerIcon: CalenderIcon,
                }}
                slotProps={{ textField: { fullWidth: true } }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </LocalizationProvider>
            <TextField
              label="Link"
              variant="outlined"
              fullWidth
              value={journalData.link}
              onChange={(e) =>
                setJournalData({ ...journalData, link: e.target.value })
              }
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isUpdating}
              endIcon={isUpdating ? <img src="/spinner.gif" width="24px" /> : null}
            >
              {isUpdating ? "Updating" : "Update"}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
