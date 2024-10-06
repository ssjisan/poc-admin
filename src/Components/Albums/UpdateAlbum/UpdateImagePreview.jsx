import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Cross, Drag } from "../../../assets/IconSet";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function UpdateImagePreview({ images, removeImage, isLoading, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-images">
        {(provided) => (
          <Stack
            ref={provided.innerRef}
            {...provided.droppableProps}
            spacing={2}
          >
            {images.map((data, index) => (
              <Draggable key={data._id || data.name} draggableId={data._id || data.name} index={index}>
                {(provided) => (
                  <Stack
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      border: "1px solid #DBDCDC",
                      borderRadius: "12px",
                      p: "8px 4px",
                      backgroundColor: "white",
                    }}
                  >
                    <Stack direction="row" alignItems="center" gap="12px">
                      <IconButton>
                        <Drag size={24} color="#000" />
                      </IconButton>
                      <Stack>
                        <img
                          src={data.src}
                          alt={data.name}
                          style={{
                            width: "80px",
                            height: "48px",
                            borderRadius: "4px",
                            objectFit: "cover",
                          }}
                        />
                      </Stack>
                      <Typography variant="body1">{data.name}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap="12px">
                      <Typography variant="body1">{data.size} MB</Typography>
                      {isLoading ? (
                        <Box sx={{ height: "24px", width: "36px" }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <IconButton
                          onClick={() =>
                            removeImage(data._id || data.name, data.fromDatabase)
                          }
                        >
                          <Cross size={24} color="#F15555" />
                        </IconButton>
                      )}
                    </Stack>
                  </Stack>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}

UpdateImagePreview.propTypes = {
  images: PropTypes.array.isRequired,
  removeImage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};
