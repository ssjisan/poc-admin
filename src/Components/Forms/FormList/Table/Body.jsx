import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  TableBody,
  TableRow,
  Tooltip,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { Remove, More, Edit, Drag } from "../../../../assets/IconSet";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Body({
  forms,
  page,
  rowsPerPage,
  selectedForm,
  setFormToDelete,
  redirectEdit,
  handleCloseMenu,
  handleOpenMenu,
  open,
  setIsModalOpen,
  onDragEnd, // Add onDragEnd for drag handling
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="forms">
        {(provided) => (
          <TableBody ref={provided.innerRef} {...provided.droppableProps}>
            {forms
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data, index) => (
                <Draggable key={data._id} draggableId={data._id} index={index}>
                  {(provided) => (
                    <TableRow
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TableCell align="center" sx={{ width: "40px" }}>
                        <Tooltip title="Drag">
                          <IconButton sx={{ width: "40px", height: "40px" }}>
                            <Drag color="#919EAB" size={24} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ padding: "16px", width: "420px" }}
                      >
                        <Tooltip title={data.title}>
                          <Box
                            sx={{
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {data.title}
                          </Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left" sx={{ padding: "16px" }}>
                        <a href={data.link}>Click Here</a>
                      </TableCell>
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
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </TableBody>
        )}
      </Droppable>
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
          onClick={(e) => redirectEdit(e, selectedForm)}
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
          onClick={() => {
            setFormToDelete(selectedForm);
            setIsModalOpen(true);
            handleCloseMenu(); // Close popover
          }}
        >
          <Remove color="red" size={20} /> Delete
        </MenuItem>
      </Popover>
    </DragDropContext>
  );
}

Body.propTypes = {
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selectedForm: PropTypes.object,
  setFormToDelete: PropTypes.func.isRequired,
  redirectEdit: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
  handleOpenMenu: PropTypes.func.isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired, // Add prop validation for onDragEnd
};
