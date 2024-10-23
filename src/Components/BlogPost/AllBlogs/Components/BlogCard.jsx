import {
  Avatar,
  Box,
  Chip,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, EyeBold, More, Remove } from "../../../../assets/IconSet";
import RemoveBlog from "../../RemoveBlog/RemoveBlog";

export default function BlogCard({
  data,
  handleOpenMenu,
  handleCloseMenu,
  openAnchorEl,
  handlePreview,
  onDeleteBlog, // Callback to handle blog deletion after confirmation
}) {
  const [treatments, setTreatments] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [openRemoveModal, setOpenRemoveModal] = useState(false); // State for delete confirmation modal

  useEffect(() => {
    loadTreatments();
  }, []);

  const loadTreatments = async () => {
    try {
      const { data: treatmentData } = await axios.get("/treatments_list");
      setTreatments(treatmentData);

      const matchedTreatment = treatmentData.find(
        (treatment) => treatment._id === data.category
      );
      setCategoryTitle(
        matchedTreatment ? matchedTreatment.title : "Unknown Category"
      );
    } catch (err) {
      toast.error("Can't load treatment lists");
    }
  };

  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Function to open the delete confirmation modal
  const handleOpenDeleteModal = () => {
    setOpenRemoveModal(true);
  };

  // Function to close the delete confirmation modal
  const handleCloseDeleteModal = () => {
    setOpenRemoveModal(false);
  };

  return (
    <Stack
      justifyContent="flex-start"
      sx={{
        width: "100%",
        p: "24px",
        border: "1px solid rgba(145, 158, 171, 0.24)",
        borderRadius: "12px",
      }}
      gap="24px"
    >
      <Stack justifyContent="space-between" alignItems="center" direction="row">
        <Chip
          label={categoryTitle}
          sx={{
            width: "fit-content",
            background: "rgba(0, 174, 96, 0.08)",
            color: "#00AE60",
            fontWeight: 700,
          }}
        />
        <IconButton onClick={(event) => handleOpenMenu(event, data._id)}>
          <More color="rgba(145, 158, 171,1)" size={24} />
        </IconButton>
      </Stack>
      <Box sx={{ height: "120px" }}>
        <Typography sx={{ fontWeight: 700 }}>{data.title}</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {formattedDate}
      </Typography>
      <Stack direction="row" gap="8px" alignItems="center">
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Typography variant="body1">Sadman Sakib Jisan</Typography>
      </Stack>
      <Popover
        open={Boolean(openAnchorEl)}
        anchorEl={openAnchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 200,
            p: "8px",
            borderRadius: "16px",
            boxShadow: "-10px 10px 20px -2px rgba(145, 158, 171, 0.16)",
          },
        }}
      >
        <MenuItem
          sx={{ display: "flex", gap: "8px", mb: "8px", borderRadius: "8px" }}
          onClick={() => handlePreview(data.slug)}
        >
          <EyeBold color="#919EAB" size={20} />
          Preview
        </MenuItem>
        <MenuItem
          sx={{ display: "flex", gap: "8px", mb: "8px", borderRadius: "8px" }}
        >
          <Edit color="#919EAB" size={20} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{
            color: "error.main",
            display: "flex",
            gap: "8px",
            borderRadius: "8px",
          }}
          onClick={handleOpenDeleteModal} // Open the modal when Delete is clicked
        >
          <Remove color="red" size={20} /> Delete
        </MenuItem>
      </Popover>

      {/* Render the RemoveBlog modal */}
      <RemoveBlog
        open={openRemoveModal}
        handleClose={handleCloseDeleteModal}
        blogId={data._id}
        blogTitle={data.title}
        onDelete={onDeleteBlog} // Callback when blog is deleted
      />
    </Stack>
  );
}
