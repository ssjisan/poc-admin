import { Box, Table, TableContainer } from "@mui/material";
import Header from "./Table/Header";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Body from "./Table/Body";
import Pagination from "./Table/Pagination";

export default function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  useEffect(() => {
    loadJournals();
  }, []);

  const loadJournals = async () => {
    try {
      const { data } = await axios.get("/appointments");
      setAppointments(data);
    } catch (err) {
      toast.error("Here Links can't load");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        p: 2,
        mt: 3,
      }}
    >
      <TableContainer>
        <Table>
          <Header />
          <Body
            appointments={appointments}
            page={page}
            rowsPerPage={rowsPerPage}
          />
          <Pagination
            appointments={appointments}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}
