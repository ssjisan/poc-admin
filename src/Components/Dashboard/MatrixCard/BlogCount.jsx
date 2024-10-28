import { Box, Stack, Typography } from "@mui/material";
import { MatrixIconBlog } from "../../../assets/Icons/MatrixIconBlog";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function BlogCount() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const { data } = await axios.get("/blogs");
      setBlogs(data);
    } catch (err) {
      toast.error("Problem loading blogs");
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
      <MatrixIconBlog />
      <Stack>
        <Typography variant="h4">{blogs.length}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Total Blogs
        </Typography>
      </Stack>
    </Box>
  );
}
