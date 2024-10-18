import { TableCell, TableHead, TableRow } from "@mui/material";

export default function Header() {
  return (
    <TableHead sx={{ borderRadius: "1em 0 0 1em" }}>
      <TableRow>
        <TableCell align="left">Name</TableCell>
        <TableCell align="left">Designation</TableCell>
        <TableCell align="left">Mobile</TableCell>
        <TableCell align="left">Email</TableCell>
        <TableCell align="center" sx={{ width: "88px" }}></TableCell>
      </TableRow>
    </TableHead>
  );
}
