import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import toast from "react-hot-toast";
import BlogCard from "./BlogCard";
import RemoveBlog from "../RemoveBlog/RemoveBlog";
import { useNavigate } from "react-router-dom";

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
      const { data: treatmentData } = await axios.get("/guidance_list");
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

  // Dragging and reorder
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedBlogs = Array.from(blogs);
    const [movedBlog] = reorderedBlogs.splice(result.source.index, 1);
    reorderedBlogs.splice(result.destination.index, 0, movedBlog);
    setBlogs(reorderedBlogs);

    // Send reordered Blogs IDs to the backend
    const reorderedIds = reorderedBlogs.map((blog) => blog._id);
    console.log("Sending reordered blogs to the server:", reorderedIds);

    try {
      await axios.post("/update-blogs-order", { reorderedBlogs });
      toast.success("Blogs order updated successfully!");
    } catch (error) {
      console.error("Error updating blogs order:", error);
      toast.error("Failed to update blogs order.");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="blog-list">
        {(provided) => (
          <Grid
            container
            spacing={3}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {blogs.map((data, index) => {
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
                <Draggable key={data._id} draggableId={data._id} index={index}>
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
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
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
      <RemoveBlog
        handleCloseRemoveBlog={handleCloseRemoveBlog}
        confirmationModalOpen={confirmationModalOpen}
        blogTitle={blogToDelete ? blogToDelete.title : ""}
        handleConfirmRemove={handleConfirmRemove}
      />
    </DragDropContext>
  );
}
