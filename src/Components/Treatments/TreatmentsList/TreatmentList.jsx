import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TreatmentCard from "./TreatmentCard";
import UpdateTreatmentsDrawer from "../UpdateTreatments/UpdateTreatmentsDrawer";

export default function TreatmentList() {
  const [treatments, setTreatments] = useState([]);
  const [maxHeight, setMaxHeight] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

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
      const { data } = await axios.get("/treatments_list");
      setTreatments(data);
    } catch (err) {
      toast.error("Can't load treatment lists");
    }
  };
  return (
    <Grid container spacing={3}>
      {treatments.map((data) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data._id}>
            <TreatmentCard
              data={data}
              setMaxHeight={setMaxHeight}
              maxHeight={maxHeight}
              toggleDrawer={() => toggleDrawer(true, data._id)}
            />
          </Grid>
        );
      })}
      <UpdateTreatmentsDrawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        treatment={selectedTreatment}
      />
    </Grid>
  );
}
