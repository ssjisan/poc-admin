import { Box, Table, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Pagination from "./Table/Pagination";
import Body from "./Table/Body";
import Header from "./Table/Header";
import RemoveFormModal from "../RemoveForm/RemoveFormModal";
import { useNavigate } from "react-router-dom";

export default function FormsListTable() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    loadJournals();
  }, []);

  const loadJournals = async () => {
    try {
      const { data } = await axios.get("/forms");
      setForms(data);
    } catch (err) {
      toast.error("Forms can't load");
    }
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const removeForm = async (id) => {
    try {
      const { data } = await axios.delete(`/form/${id}`);

      // Notify the user of the successful deletion
      toast.success(data.message || "form deleted successfully");

      setForms((prevForms) => prevForms.filter((form) => form._id !== id));
    } catch (err) {
      console.error("Error deleting form:", err);
      toast.error("Unable to delete form at the moment.");
    }
  };

  const handleRemove = () => {
    if (formToDelete) {
      removeForm(formToDelete._id);
      setIsModalOpen(false);
      setFormToDelete(null);
    }
  };

  // Dragging and reorder
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedForms = Array.from(forms);
    const [movedForms] = reorderedForms.splice(result.source.index, 1);
    reorderedForms.splice(result.destination.index, 0, movedForms);
    setForms(reorderedForms);

    // Send reordered links IDs to the backend
    const reorderedIds = reorderedForms.map((form) => form._id);
    console.log("Sending reordered links to the server:", reorderedIds);

    try {
      await axios.post("/update-forms-order", { reorderedForms });
      toast.success("Forms order updated successfully!");
    } catch (error) {
      console.error("Error updating forms order:", error);
      toast.error("Failed to update forms order.");
    }
  };
  return (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        p: 2,
        mt: 3,
        width: "640px",
        maxWidth: "100%",
      }}
    >
      <TableContainer>
        <Table>
          <Header />
          <Body
            onDragEnd={onDragEnd}
            forms={forms}
            page={page}
            rowsPerPage={rowsPerPage}
            isModalOpen={isModalOpen}
            showModal={showModal}
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
            redirectEdit={redirectEdit}
            handleCloseMenu={handleCloseMenu}
            handleOpenMenu={handleOpenMenu}
            open={open}
            setIsModalOpen={setIsModalOpen}
            setFormToDelete={setFormToDelete}
          />
        </Table>
        <Pagination
          forms={forms}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      <RemoveFormModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        formTitle={formToDelete ? formToDelete.title : ""}
        handleRemove={handleRemove}
      />
    </Box>
  );
}