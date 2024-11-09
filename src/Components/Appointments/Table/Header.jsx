import { TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { useContext } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";

export default function Header() {
  const {auth} = useContext(DataContext)

  return (
    <TableHead sx={{ borderRadius: "1em 0 0 1em" }}>
      <TableRow>
        <TableCell align="left">Name & Email</TableCell>
        <TableCell align="left">Phone</TableCell>
        <TableCell align="left">Date</TableCell>
        {auth?.user?.role === 0 && (
          <TableCell align="left">Doctor Name</TableCell>
        )}
        <TableCell align="left">Location</TableCell>
        <TableCell align="left">Message</TableCell>
      </TableRow>
    </TableHead>
  );
}
