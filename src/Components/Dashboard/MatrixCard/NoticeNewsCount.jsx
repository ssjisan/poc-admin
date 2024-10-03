import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MatrixIconNewsNotice } from "../../../assets/Icons/MatrixIconNewsNotice";

export default function NoticeNewsCount() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const { data } = await axios.get("/notices");
      setNotices(data);
    } catch (err) {
      toast.error("Problem Loading");
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
      <MatrixIconNewsNotice />
      <Stack>
        <Typography variant="h4">{notices.length}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Notice
        </Typography>
      </Stack>
    </Box>
  );
}
