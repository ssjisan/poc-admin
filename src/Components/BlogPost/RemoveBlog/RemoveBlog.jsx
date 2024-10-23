import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Warning } from "../../../assets/IconSet";
import axios from "axios";
import toast from "react-hot-toast";

export default function RemoveBlog({ open, handleClose, blogId, blogTitle, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/blog/${blogId}`);
      toast.success("Blog post deleted successfully");
      onDelete(blogId); // Trigger the parent to refresh or remove the blog
      handleClose(); // Close the modal
    } catch (err) {
      toast.error("Failed to delete blog post");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "8px",
          width: "480px",
          maxWidth: "90%",
        }}
      >
        <Box
          sx={{
            p: "16px",
            borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Delete Blog Post
          </Typography>
        </Box>
        <Stack
          gap="16px"
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            p: "24px 16px",
          }}
        >
          <Warning size="48px" color="#dc3545" />
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Are you sure you want to delete{" "}
            <strong>&quot;{blogTitle}&quot;</strong>?
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          gap="16px"
          justifyContent={"flex-end"}
          sx={{ p: "16px", borderTop: "1px solid rgba(145, 158, 171, 0.24)" }}
        >
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Yes, Delete
          </Button>
        </Stack>
      </div>
    </Modal>
  );
}

RemoveBlog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  blogId: PropTypes.string.isRequired,
  blogTitle: PropTypes.string.isRequired, // Add the blog title prop type
  onDelete: PropTypes.func.isRequired,
};
