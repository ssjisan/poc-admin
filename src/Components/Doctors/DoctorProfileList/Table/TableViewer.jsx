import { Box, Table, TableContainer } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Body";

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
    </Box>
  );
}
