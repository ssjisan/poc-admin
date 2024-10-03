import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MatrixIconMember } from "../../../assets/Icons/MatrixIconMember";

export default function MemberCount() {
   const [members,setMembers]=useState([])
  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const { data } = await axios.get("/members");
      setMembers(data);
    } catch (err) {
      toast.error("Something Wrong");
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
      <MatrixIconMember />
      <Stack>
        <Typography variant="h4">{members.length}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Member
        </Typography>
      </Stack>
    </Box>
  );
}
