import { Box } from "@mui/material";

export default function DirectNavigation() {
  return (
    <Box
      sx={{
        borderRadius: "16px",
        height: "100%", // Full height to match SupportCard
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src="/graphics.png"
        alt="event"
        width="100%"
        height="100%"
        style={{
          objectFit: "cover",
        }}
      />
    </Box>
  );
}
