import { Box, Table, TableContainer } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Body";
import RemoveProfile from "../../RemoveDoctorProfile/RemoveProfile";

export default function TableViewer() {
  const [profiles, setProfiles] = useState([]);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);
  const navigate = useNavigate();

  // Paginations Controller Start //

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Popover Menu Controller Start //

  const handleOpenMenu = (event, data) => {
    setOpen(event.currentTarget);
    setSelectedProfile(data);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  // Profile Loader

  useEffect(() => {
    loadProfiles();
  }, []);
  const loadProfiles = async () => {
    try {
      const { data } = await axios.get("/doctors");
      setProfiles(data);
    } catch (err) {
      toast.error("Problem loading doctors profile");
    }
  };

  // Profile Remove Controller Start //

  const handleCloseRemoveAlbum = () => {
    setConfirmationModalOpen(false);
  };
  const showConfirmationModal = () => {
    setProfileToDelete(selectedProfile);
    setConfirmationModalOpen(true);
    handleCloseMenu();
  };

  const removeVideo = async (id) => {

    try {
      // Show loading toast
      const loadingToastId = toast.loading("Deleting profile...");

      // Perform DELETE request with slug
      await axios.delete(`/doctor/${id}`);

      // Remove the deleted video from the state
      setProfiles(profiles.filter((video) => video._id !== id));

      // Dismiss loading toast and show success toast
      toast.success("Profile deleted successfully!", { id: loadingToastId });
    } catch (error) {
      // Dismiss loading toast and show error toast
      toast.error("Failed to delete profile.");
    }
  };

  const handleConfirmRemove = () => {
    if (profileToDelete) {
      removeVideo(profileToDelete._id);
      setConfirmationModalOpen(false);
      setProfileToDelete(null);
    }
  };


  const redirectEdit = (e, selectedProfile) => {
    navigate(`/doctor/${selectedProfile._id}`);
  };

  return (
    <Box
      sx={{
        p: 2,
        mt: 3,
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
      }}
    >
      <TableContainer>
        <Table>
          <Header />
          <Body
            profiles={profiles}
            page={page}
            open={open}
            rowsPerPage={rowsPerPage}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            showConfirmationModal={showConfirmationModal}
            redirectEdit={redirectEdit}
            selectedProfile={selectedProfile}
          />
          <Pagination
            profiles={profiles}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
      <RemoveProfile
        confirmationModalOpen={confirmationModalOpen}
        doctorName={profileToDelete ? profileToDelete.name : ""}
        setConfirmationModalOpen={setConfirmationModalOpen}
        handleCloseRemoveAlbum={handleCloseRemoveAlbum}
        handleConfirmRemove={handleConfirmRemove}
      />
    </Box>
  );
}
