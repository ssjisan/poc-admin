import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { More } from "../../../assets/IconSet";

// Helper function to format date
const formatDate = (timestamp) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(timestamp).toLocaleString("en-GB", options);
};
const getYouTubeEmbedUrl = (url) => {
  const videoIdRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:\S+\?v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(videoIdRegex);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const getVideoId = (url) => {
  const videoIdRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:\S+\?v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(videoIdRegex);
  return match ? match[1] : null; // Return video ID or null
};
// Assuming videos is passed as a prop
export default function CardView({ videos }) {
  return (
    <Box sx={{ mt: "48px", ml: "24px" }}>
      <Grid container spacing={2}>
        {videos.map((data) => {
          const embedUrl = getYouTubeEmbedUrl(data.url); // Convert to embeddable URL
          const videoId = getVideoId(data.url); // Get video ID
          const thumb = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
          return (
            <Grid item xs={12} sm={6} md={6} lg={3} key={data._id}>
              <Box sx={{ width: "100%" }}>
                <Stack
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={thumb}
                    width="100%"
                    height="220px"
                    alt={data.title}
                    style={{ objectFit: "cover" }}
                  />
                  {/* <iframe
                     width="100%"
                    height="220px"
                    src={embedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube Video Preview"
                  /> */}
                </Stack>
                {/* Display the formatted date above the title */}
                <Stack
                  sx={{ mt: "24px" }}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Stack gap="4px">
                    <Typography variant="body2" color="text.secondary">
                      Posted at: {formatDate(data.createdAt)}
                    </Typography>

                    <Typography variant="body1" color={"text.primary"}>
                      {data.title}
                    </Typography>
                  </Stack>
                  <IconButton sx={{ width: "32px", height: "32px" }}>
                    <More size={20} color="#637381" />
                  </IconButton>
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
