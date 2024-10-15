import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Video } from "../../../assets/IconSet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UploadVideoForm() {
  // State to store video data
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [embedUrl, setEmbedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  // Helper function to extract YouTube video ID from the URL
  const extractVideoId = (url) => {
    const videoIdRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:\S+\?v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  };

  // Handler for video URL input change
  const handleVideoUrlChange = (e) => {
    const newUrl = e.target.value;
    setVideoUrl(newUrl);

    if (newUrl) {
      setIsLoading(true); // Show loader while video is being processed

      // Extract the video ID and construct embed URL
      const videoId = extractVideoId(newUrl);
      if (videoId) {
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
        setIsLoading(false);
      } else {
        setEmbedUrl(""); // Clear embed URL if not valid
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setEmbedUrl("");
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoTitle || !videoUrl) {
      setError("Both video title and URL are required");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // Post request to upload the video data
      const { data } = await axios.post("/upload_video", {
        title: videoTitle,
        url: videoUrl,
      });
      navigate("/video_list")
      toast.success("Successfully uploaded")
      setUploading(false);
      setVideoTitle("");
      setVideoUrl("");
      setEmbedUrl("");
    } catch (error) {
      console.error("Error uploading video: ", error);
      setError("Failed to upload video. Please try again.");
      setUploading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ mb: "40px" }}>
        Upload a new video
      </Typography>
      <Stack direction="column" spacing={3}>
        <TextField
          label="Video Title"
          variant="outlined"
          fullWidth
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          label="YouTube Video Link"
          variant="outlined"
          fullWidth
          value={videoUrl}
          onChange={handleVideoUrlChange}
          placeholder="Paste a YouTube video link here"
        />

        {/* Video Preview Section */}
        <Stack
          sx={{
            mt: "40px",
            width: "100%",
            height: "320px",
            backgroundImage:
              "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23333' stroke-width='1' stroke-dasharray='12' stroke-dashoffset='15' stroke-linecap='round'/%3e%3c/svg%3e\")",
            borderRadius: "16px",
          }}
          justifyContent={"center"}
          alignItems={"center"}
          gap="16px"
        >
          {isLoading ? (
            <CircularProgress size={48} />
          ) : embedUrl ? (
            <Stack sx={{ borderRadius: "16px", overflow: "hidden", width: "100%", height: "100%" }}>
              <iframe
                width="100%"
                height="100%"
                src={embedUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video Preview"
              />
            </Stack>
          ) : (
            <Stack sx={{ height: "48px", width: "48px" }}>
              <Video size={"48px"} color="#637381" />
            </Stack>
          )}

          {!embedUrl && !isLoading && (
            <Typography variant="body1" color={"text.secondary"}>
              Paste a YouTube video link to preview it here.
            </Typography>
          )}
        </Stack>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3 }}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </Stack>
    </Box>
  );
}
