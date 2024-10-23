import { Box, Container, Typography } from "@mui/material";
import BlogTopBar from "./BlogTopBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function PreviewBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null); // Initialize blog as null

  useEffect(() => {
    loadBlog();
  }, [slug]);
console.log(slug);

  const loadBlog = async () => {
    try {
      const { data } = await axios.get(`/blog/${slug}`);
      setBlog(data); // Store the blog data
    } catch (err) {
      toast.error("Error loading blog details");
    }
  };

  if (!blog) {
    // Add a loading indicator or a placeholder when blog data is not available yet
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <BlogTopBar />
      <Container sx={{mt:"64px", mb:"64px"}}>
        <Box sx={{ width: "100%", height: "480px", mb:"48px"}}>
          {/* Check if coverPhoto and coverPhoto[0] exist before rendering */}
          {blog.coverPhoto && blog.coverPhoto[0] ? (
            <img
              src={blog.coverPhoto[0].url}
              alt={blog.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography>No cover photo available</Typography>
          )}
        </Box>
        <Typography variant="h3" sx={{ mt: 2 }}>
          {blog.title}
        </Typography>
        <Typography
        sx={{ whiteSpace: "pre-wrap" }} // Ensure white space is preserved
        dangerouslySetInnerHTML={{ __html: blog.editorData }} // Render HTML content safely
      />
      </Container>
    </Box>
  );
}