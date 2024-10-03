import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MatrixIconEvent } from "../../../assets/Icons/MatrixIconEvent";

export default function EventCount() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    loadEvents();
  }, []);
  const loadEvents = async () => {
    try {
      const { data } = await axios.get("/events");
      setEvents(data);
    } catch (err) {
      toast.error("Check");
    }
  };
  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "40px 24px",
        display: "flex",
        gap: "24px",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <MatrixIconEvent />
      <Stack>
        <Typography variant="h4">0</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Events
        </Typography>
      </Stack>
    </Box>
  );
}
