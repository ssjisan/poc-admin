import { Box, Stack, Typography } from "@mui/material";
import { MatrixIconAppointment } from "../../../assets/Icons/MatrixIconAppointment";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AppointmentCount() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadProfiles();
  }, []);
  const loadProfiles = async () => {
    try {
      const { data } = await axios.get("/appointments");
      setAppointments(data);
    } catch (err) {
      toast.error("Problem loading Appointments");
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
      <MatrixIconAppointment />
      <Stack>
        <Typography variant="h4">{appointments.length}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Appointment
        </Typography>
      </Stack>
    </Box>
  );
}
