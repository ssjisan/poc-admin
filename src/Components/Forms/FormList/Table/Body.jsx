import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  TableBody,
  TableRow,
  Tooltip,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { Update, Remove, More, Edit } from "../../../../assets/IconSet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import RemoveFormModal from "../../RemoveForm/RemoveFormModal";

export default function Body({
  forms,
  page,
  rowsPerPage,
  selectedForm,
  setSelectedForm,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [formToDelete, setFormToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenMenu = (event, events) => {
    setOpen(event.currentTarget);
    setSelectedForm(events);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const redirectEdit = (event, data) => {
    event.preventDefault();
    navigate(`/form/${data._id}`);
  };

  const removeJournal = async (id) => {
    try {
      const { data } = await axios.delete(`/form/${id}`);

      // Notify the user of the successful deletion
      toast.success(data.message || "form deleted successfully");

      // Reload the page to reflect the changes
      window.location.reload();
    } catch (err) {
      console.error("Error deleting form:", err);
      toast.error("Unable to delete form at the moment.");
    }
  };

  const handleRemove = () => {
    if (formToDelete) {
      removeJournal(formToDelete._id);
      setIsModalOpen(false);
      setFormToDelete(null);
    }
  };
  return (
    <TableBody>
      {forms
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data) => (
          <TableRow key={data._id}>
            <TableCell align="left" sx={{ padding: "16px", width: "420px" }}>
              <Tooltip title={data.title}>
                <Box
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {data.title}
                </Box>
              </Tooltip>
            </TableCell>
            <TableCell align="left" sx={{ padding: "16px" }}>
              <a href={data.link}>Click Here</a>
            </TableCell>
            <TableCell align="center">
              <Tooltip title="Actions">
                <IconButton
                  sx={{ width: "40px", height: "40px" }}
                  onClick={(event) => handleOpenMenu(event, data)}
                >
                  <More color="#919EAB" size={24} />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      <Popover
        open={open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 160, p: "8px", borderRadius: "8px",boxShadow: "-20px 20px 40px -4px rgba(145, 158, 171, 0.24)", },        }}
      >
        <MenuItem
          sx={{ display: "flex", gap: "8px", mb: "8px", borderRadius: "8px" }}
          onClick={(e) => redirectEdit(e, selectedForm)}
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
            setFormToDelete(selectedForm);
            setIsModalOpen(true);
            handleCloseMenu(); // Close popover
          }}
        >
          <Remove color="red" size={20} /> Delete
        </MenuItem>
      </Popover>
      <RemoveFormModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        formTitle={formToDelete ? formToDelete.title : ""}
        handleRemove={handleRemove}
      />
    </TableBody>
  );
}

Body.propTypes = {
  forms: PropTypes.any,
  page: PropTypes.any,
  rowsPerPage: PropTypes.any,
  handleRemove: PropTypes.any,
  isModalOpen: PropTypes.any,
  showModal: PropTypes.any,
  selectedForm: PropTypes.any,
  setSelectedForm: PropTypes.any,
  setFormToDelete: PropTypes.any,
  formTitle: PropTypes.any,
  handleClose: PropTypes.any,
  isOpen: PropTypes.any,
  setIsModalOpen: PropTypes.any,
};
