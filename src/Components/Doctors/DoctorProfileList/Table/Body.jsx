import { Edit, More, Remove } from "../../../../assets/IconSet";
import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export default function Body({
  profiles,
  page,
  rowsPerPage,
  open,
  handleOpenMenu,
  handleCloseMenu,
  showConfirmationModal,
  redirectEdit,
  selectedProfile,
}) {
  return (
    <TableBody>
      {profiles
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data) => (
          <TableRow key={data._id}>
            <TableCell component="th" scope="row" padding="none">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={
                      data?.profilePhoto?.length && data.profilePhoto[0]?.url
                    }
                    alt={data.name}
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Typography variant="subtitle2" noWrap>
                  <Box
                    sx={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {data.name}
                  </Box>
                </Typography>
              </Stack>
            </TableCell>
            <TableCell align="left">{data.designation}</TableCell>
            <TableCell align="left">{data.phone}</TableCell>
            <TableCell align="left">{data.email}</TableCell>
            <TableCell align="center">
              <Tooltip title="Actions">
                <IconButton
                  sx={{ width: "40px", height: "40px" }}
                  onClick={(event) => handleOpenMenu(event, data)}
                >
                  <More color="#919EAB" size={24} />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      <Popover
        open={open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 160,
            p: "8px",
            borderRadius: "8px",
            boxShadow: "-20px 20px 40px -4px rgba(145, 158, 171, 0.24)",
          },
        }}
      >
        <MenuItem
          sx={{ display: "flex", gap: "8px", mb: "8px", borderRadius: "8px" }}
          onClick={(e) => redirectEdit(e, selectedProfile)}
        >
          <Edit color="#919EAB" size={20} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{
            color: "error.main",
            display: "flex",
            gap: "8px",
            borderRadius: "8px",
          }}
          onClick={showConfirmationModal}
        >
          <Remove color="red" size={20} /> Delete
        </MenuItem>
      </Popover>
    </TableBody>
  );
}

Body.propTypes = {
  profiles: PropTypes.any,
  page: PropTypes.any,
  rowsPerPage: PropTypes.any,
  handleOpenMenu: PropTypes.any,
  openMenu: PropTypes.any,
  open: PropTypes.any,
  handleCloseMenu: PropTypes.any,
  selectedMember: PropTypes.any,
  showConfirmationModal: PropTypes.any,
  selectedProfile: PropTypes.any,
  redirectEdit: PropTypes.any,
};
