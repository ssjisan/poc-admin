import { Box, Stack, Typography } from "@mui/material";
import { MatrixIconDoctor } from "../../../assets/Icons/MatrixIconDoctor";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function DoctorCount() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
      loadProfiles();
    }, []);
    const loadProfiles = async () => {
      try {
        const { data } = await axios.get("/doctors");
        setProfiles(data);
      } catch (err) {
        toast.error("Problem loading doctors profile");
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
      <MatrixIconDoctor />
      <Stack>
        <Typography variant="h4">{profiles.length}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Doctors
        </Typography>
      </Stack>
    </Box>
  );
}
