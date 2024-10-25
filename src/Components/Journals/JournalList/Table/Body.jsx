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
import { Remove, More, Edit } from "../../../../assets/IconSet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import RemoveJournalModal from "../../RemoveJournal/RemoveJournalModal";

export default function Body({
  journals,
  page,
  rowsPerPage,
  selectedJournal,
  setSelectedJournal
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [journalToDelete, setJournalToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenMenu = (event, events) => {
    setOpen(event.currentTarget);
    setSelectedJournal(events);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const redirectEdit = (event, data) => {
    event.preventDefault();    
    navigate(`/journal/${data._id}`);
  };

  const removeJournal = async (id) => {
    try {
      // Make a DELETE request to the backend to delete the journal by its ID
      const { data } = await axios.delete(`/journal/${id}`);
      
      // Notify the user of the successful deletion
      window.location.reload();
      toast.success(data.message || "Journal deleted successfully");
      
      // Reload the page to reflect the changes
    } catch (err) {
      console.error("Error deleting link:", err);
      toast.error("Unable to delete link at the moment.");
    }
  };
  

  const handleRemove = () => {
    if (journalToDelete) {
      // Call the removeJournal function with the ID of the journal to delete
      removeJournal(journalToDelete._id);
      
      // Close the modal and reset the journalToDelete state
      setIsModalOpen(false);
      setJournalToDelete(null);
    }
  };
  return (
    <TableBody>
      {journals
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data) => (
          <TableRow key={data._id}>
            <TableCell align="left">
              <Tooltip title={data.title}>
                <Box
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    width: "320px",
                  }}
                >
                  {data.title}
                </Box>
              </Tooltip>
            </TableCell>
            <TableCell align="left">
              {new Date(data.publishedDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell align="left">
              <a href={data.link}>Preview</a>
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
          onClick={(e) => redirectEdit(e, selectedJournal)}
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
            setJournalToDelete(selectedJournal);
            setIsModalOpen(true);
            handleCloseMenu(); // Close popover
          }}
        >
          <Remove color="red" size={20} /> Delete
        </MenuItem>
      </Popover>
      <RemoveJournalModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        journalTitle={journalToDelete ? journalToDelete.title : ""}
        handleRemove={handleRemove}
      />
    </TableBody>
  );
}

Body.propTypes = {
  journals: PropTypes.any,
  page: PropTypes.any,
  rowsPerPage: PropTypes.any,
  handleRemove: PropTypes.any,
  isModalOpen: PropTypes.any,
  showModal: PropTypes.any,
  setSelectedJournal: PropTypes.any,
  selectedJournal: PropTypes.any,
  setJournalToDelete: PropTypes.any,
  journalTitle: PropTypes.any,
  handleClose: PropTypes.any,
  isOpen: PropTypes.any,
  setIsModalOpen: PropTypes.any,
};
