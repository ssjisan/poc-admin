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
import PropTypes from "prop-types";
import { Edit, EyeBold, More, Remove } from "../../../assets/IconSet";

export default function BlogCard({
  data,
  handleOpenMenu,
  handleCloseMenu,
  openAnchorEl,
  handlePreview,
  formattedDate,
  categoryTitle,
  showConfirmationModal,
  redirectEdit,
}) {
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
        <IconButton onClick={(event) => handleOpenMenu(event, data)}>
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
        <Avatar alt={data.authorName} src={data.authorImage} />
        <Typography variant="body1">{data.authorName}</Typography>
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
          onClick={() => handlePreview(data.slug)} // Ensure this is set correctly
        >
          <EyeBold color="#919EAB" size={20} />
          Preview
        </MenuItem>
        <MenuItem
          sx={{ display: "flex", gap: "8px", mb: "8px", borderRadius: "8px" }}
          onClick={() => {
            handleCloseMenu();
            redirectEdit(data.slug); // Call redirectEdit with the blog's slug
          }}
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
          onClick={() => {
            handleCloseMenu();
            showConfirmationModal(); // Call showConfirmationModal
          }}
        >
          <Remove color="red" size={20} /> Delete
        </MenuItem>
      </Popover>
    </Stack>
  );
}

BlogCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorImage: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  openAnchorEl: PropTypes.object,
  handlePreview: PropTypes.func.isRequired,
  categoryTitle: PropTypes.string.isRequired,
  formattedDate: PropTypes.string.isRequired,
  showConfirmationModal: PropTypes.func.isRequired,
  redirectEdit: PropTypes.func.isRequired,
};
