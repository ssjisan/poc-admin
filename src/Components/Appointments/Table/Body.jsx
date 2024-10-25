import { Box, TableBody, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";

export default function Body({ appointments, page, rowsPerPage }) {
  return (
    <TableBody>
      {appointments
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data) => (
          <TableRow key={data._id}>
            <TableCell align="left" sx={{ p: "16px" }}>
              {data.name}
            </TableCell>
            <TableCell align="left" sx={{ p: "16px" }}>
              {data.phone}
            </TableCell>
            <TableCell align="left" sx={{ p: "16px" }}>
              {data.email}
            </TableCell>
            <TableCell align="left" sx={{ p: "16px" }}>
              {new Date(data.preferredDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </TableCell>
            <TableCell align="left" sx={{ p: "16px" }}>
              {new Date(data.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </TableCell>
            <TableCell align="left">
              <Box
                sx={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "120px",
                  p: "16px",
                }}
              >
                {data.message}
              </Box>
            </TableCell>
          </TableRow>
        ))}
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
