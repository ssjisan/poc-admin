import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TreatmentCard from "./TreatmentCard";
import UpdateTreatmentsDrawer from "../UpdateTreatments/UpdateTreatmentsDrawer";
import RemoveTreatmentModal from "../RemoveTreatment/RemoveTreatmentModal";

export default function TreatmentList() {
  const [treatments, setTreatments] = useState([]);
  const [maxHeight, setMaxHeight] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // For delete modal

  const toggleDrawer = async (isOpen, treatmentId = null) => {
    if (isOpen && treatmentId) {
      try {
        const { data } = await axios.get(`/treatment/${treatmentId}`);
        setSelectedTreatment(data);
      } catch (err) {
        toast.error("Error loading treatment details");
        return;
      }
    } else {
      setSelectedTreatment(null);
    }
    setDrawerOpen(isOpen);
  };

  useEffect(() => {
    loadTreatments();
  }, []);

  const loadTreatments = async () => {
    try {
      const { data } = await axios.get("/guidance_list");
      setTreatments(data);
    } catch (err) {
      toast.error("Can't load treatment lists");
    }
  };

  const handleDelete = async () => {
    if (!selectedTreatment) return;

    try {
      await axios.delete(`/treatment/${selectedTreatment._id}`);
      toast.success("Deleted successfully");
      setTreatments((prev) =>
        prev.filter((treatment) => treatment._id !== selectedTreatment._id)
      );
      setDeleteModalOpen(false);
      setSelectedTreatment(null);
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const openDeleteModal = (treatment) => {
    setSelectedTreatment(treatment);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <Grid container spacing={3}>
        {treatments.map((data) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data._id}>
            <TreatmentCard
              data={data}
              setMaxHeight={setMaxHeight}
              maxHeight={maxHeight}
              toggleDrawer={() => toggleDrawer(true, data._id)}
              openDeleteModal={() => openDeleteModal(data)} // Pass delete action
            />
          </Grid>
        ))}
      </Grid>

      {/* Update Treatments Drawer */}
      <UpdateTreatmentsDrawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        treatment={selectedTreatment}
      />

      {/* Remove Treatment Modal */}
      <RemoveTreatmentModal
        isOpen={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        treatmentTitle={selectedTreatment?.title || ""}
        handleRemove={handleDelete}
      />
    </>
  );
}
