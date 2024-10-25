import { TablePagination } from "@mui/material";
import PropTypes from "prop-types";

export default function Pagination({
  appointments,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  return (
    <TablePagination
      rowsPerPageOptions={[20]}
      count={appointments.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        borderBottom: "none",
        borderTop: "1px solid rgba(145, 158, 171, 0.24)",
      }}
    />
  );
}
Pagination.propTypes = {
  appointments: PropTypes.any,
  rowsPerPage: PropTypes.any,
  page: PropTypes.func,
  handleChangePage: PropTypes.any,
  handleChangeRowsPerPage: PropTypes.any,
};
