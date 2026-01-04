import { Box, Stack, TableBody, TableRow, Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import axios from "axios";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DataContext } from "../../../DataProcessing/DataProcessing";

export default function Body({ appointments, page, rowsPerPage }) {
  const [profiles, setProfiles] = useState([]);
  const { auth } = useContext(DataContext);
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
  console.log(auth?.user?.role);

  return (
    <TableBody>
      {appointments
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data) => {
          // Find the doctor name using the doctorInfo ID
          const doctor = profiles.find(
            (doc) => doc._id === data?.doctorInfo?._id
          );
          const doctorName = doctor ? doctor.name : "Unknown Doctor";
          console.log("id", data?.doctorInfo?._id);

          return (
            <TableRow key={data._id}>
              <TableCell align="left" sx={{ p: "16px" }}>
                <Stack>
                  <Typography variant="body2">{data.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.email}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ p: "16px" }}>
                {data.phone}
              </TableCell>
              <TableCell align="left" sx={{ p: "16px" }}>
                {new Date(data.appointmentDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              {auth?.user?.role === 0 && (
                <TableCell align="left" sx={{ p: "16px" }}>
                  {doctorName}
                </TableCell>
              )}
              <TableCell align="left" sx={{ p: "16px" }}>
                {data.selectedLocation}
              </TableCell>
              <TableCell align="left">
                <Box
                  sx={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    width: "320px",
                    p: "16px",
                  }}
                >
                  {data.message}
                </Box>
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
}

Body.propTypes = {
  appointments: PropTypes.any,
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
