import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";
import RemoveBlog from "../RemoveBlog/RemoveBlog";

export default function BlogCardDeck() {
  const [blogs, setBlogs] = useState([]);
  const [openAnchorEl, setOpenAnchorEl] = useState({});
  const [treatments, setTreatments] = useState([]);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadBlogs();
    loadTreatments();
  }, []);

  const loadBlogs = async () => {
    try {
      const { data } = await axios.get("/blogs");
      setBlogs(data);
    } catch (err) {
      toast.error("Problem loading blogs");
    }
  };

  const loadTreatments = async () => {
    try {
      const { data: treatmentData } = await axios.get("/treatments_list");
      setTreatments(treatmentData);
    } catch (err) {
      toast.error("Can't load treatment lists");
    }
  };

  const handleOpenMenu = (event, data) => {
    const blogId = data._id;
    setOpenAnchorEl((prev) => ({ ...prev, [blogId]: event.currentTarget }));
  };

  const handleCloseMenu = (blogId) => {
    setOpenAnchorEl((prev) => ({ ...prev, [blogId]: null }));
  };

  const handlePreview = (slug) => {
    navigate(`/blog/${slug}`);
  };

  const handleCloseRemoveBlog = () => {
    setConfirmationModalOpen(false);
  };

  const showConfirmationModal = (blog) => {
    setBlogToDelete(blog);
    setConfirmationModalOpen(true);
  };

  const removeBlog = async (id) => {
    try {
      const loadingToastId = toast.loading("Deleting blog...");
      await axios.delete(`/blog/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully!", { id: loadingToastId });
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };

  const handleConfirmRemove = () => {
    if (blogToDelete) {
      removeBlog(blogToDelete._id);
      setConfirmationModalOpen(false);
      setBlogToDelete(null);
    }
  };

  const redirectEdit = (slug) => {
    navigate(`/edit-blog/${slug}`);
  };

  return (
    <Grid container spacing={3}>
      {blogs.map((data) => {
        const matchedTreatment = treatments.find(
          (treatment) => treatment._id === data.category
        );
        const categoryTitle = matchedTreatment
          ? matchedTreatment.title
          : "Unknown Category";

        const formattedDate = new Date(data.createdAt).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

        return (
          <Grid item xs={12} sm={6} md={4} lg={4} key={data._id}>
            <BlogCard
              data={data}
              handleOpenMenu={handleOpenMenu}
              openAnchorEl={openAnchorEl[data._id]}
              handleCloseMenu={() => handleCloseMenu(data._id)}
              handlePreview={handlePreview}
              formattedDate={formattedDate}
              categoryTitle={categoryTitle}
              showConfirmationModal={() => showConfirmationModal(data)}
              redirectEdit={redirectEdit}
            />
          </Grid>
        );
      })}
      <RemoveBlog
        handleCloseRemoveBlog={handleCloseRemoveBlog}
        confirmationModalOpen={confirmationModalOpen}
        blogTitle={blogToDelete ? blogToDelete.title : ""}
        handleConfirmRemove={handleConfirmRemove}
      />
    </Grid>
  );
}
