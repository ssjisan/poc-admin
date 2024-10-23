import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";

export default function BlogCardDeck() {
  const [blogs, setBlogs] = useState([]);
  const [openAnchorEl, setOpenAnchorEl] = useState({}); // Use an object to track open popovers
  const navigate = useNavigate();

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

  const handleOpenMenu = (event, blogId) => {
    setOpenAnchorEl((prev) => ({ ...prev, [blogId]: event.currentTarget }));
  };

  const handleCloseMenu = (blogId) => {
    setOpenAnchorEl((prev) => ({ ...prev, [blogId]: null }));
  };

  const handlePreview = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <Grid container spacing={3}>
      {blogs.map((data) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={data._id}>
          <BlogCard
            data={data}
            handleOpenMenu={handleOpenMenu}
            openAnchorEl={openAnchorEl[data._id]} // Pass individual open state
            handleCloseMenu={() => handleCloseMenu(data._id)} // Close only the clicked popover
            handlePreview={handlePreview}
          />
        </Grid>
      ))}
    </Grid>
  );
}
