import { IconButton, Stack, Typography } from "@mui/material";
import { Cross, Drag } from "../../../assets/IconSet";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function UpdateImagePreview({ images, removeImage }) {
  return (
    <Droppable droppableId="imageList">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {images.map((data, index) => (
            <Draggable
              key={data._id || `new_${index}`} // Unique key for both old and new images
              draggableId={data._id || `new_${index}`} // Unique ID for draggable
              index={index}
            >
              {(provided) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    border: "1px solid #DBDCDC",
                    borderRadius: "12px",
                    p: "8px 4px",
                    mt: 2,
                    backgroundColor: "white",
                  }}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
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
                  <IconButton onClick={() => removeImage(index)}>
                    <Cross size={24} color="#F15555" />
                  </IconButton>
                </Stack>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

UpdateImagePreview.propTypes = {
  images: PropTypes.array.isRequired,
  removeImage: PropTypes.func.isRequired,
};
