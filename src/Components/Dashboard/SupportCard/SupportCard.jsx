import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import { useContext } from "react";

export default function SupportCard() {
  const forBelow676 = useMediaQuery("(max-width:676px)");
  const { auth } = useContext(DataContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: forBelow676 && "column",
        background:
          "linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)",
        borderRadius: "16px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        <Stack>
          <Typography variant="h4" sx={{ width: "100%" }}>
            Welcome back <br /> {auth?.user?.name}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Get tailored solutions that meet your needs – request your desired
            service today!
          </Typography>
        </Stack>
        <a href="https://insighttechbd.com/contact_us" target="_blank">
          <Button variant="contained">Start a project</Button>
        </a>
      </Box>
      <Box sx={{ p: "24px", width: forBelow676 ? "100%" : "280px" }}>
        <img
          src="https://res.cloudinary.com/dmyttqosa/image/upload/v1730748105/user_panel/nlcscfsjtvxbbcpl8pkj.png"
          alt="support"
          width="100%"
        />
      </Box>
    </Box>
  );
}
