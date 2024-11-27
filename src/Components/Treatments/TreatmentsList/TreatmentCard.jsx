import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function TreatmentCard({
  data,
  setMaxHeight,
  maxHeight,
  openDeleteModal,
  toggleDrawer,
}) {
  const cardRef = useRef();
  const forBelow600 = useMediaQuery("(min-width:600px)");
  const forBelow580 = useMediaQuery("(max-width:580px)");

  // Measure the card height after rendering
  useEffect(() => {
    if (cardRef.current) {
      const cardHeight = cardRef.current.clientHeight;
      setMaxHeight((prev) => Math.max(prev, cardHeight));
    }
  }, [setMaxHeight]);

  return (
    <Stack
      ref={cardRef}
      justifyContent="space-between"
      sx={{
        width: "100%",
        p: "24px",
        border: "1px solid rgba(145, 158, 171, 0.24)",
        borderRadius: "12px",
        // Set the card height to the maximum height value passed as a prop
        height: forBelow600 && maxHeight ? `${maxHeight}px` : "auto",
      }}
      gap="24px"
    >
      <Stack gap="16px">
        <Typography sx={{ fontWeight: 700 }}>{data.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {data.subTitle}
        </Typography>
      </Stack>
      <Stack
        gap="12px"
        direction={forBelow580 ? "column" : "row"}
        sx={{ width: "100%" }}
      >
        <Button variant="soft" sx={{ width: "100%" }} color="inherit" onClick={() => openDeleteModal(data)}>
          Delete
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => toggleDrawer(data)} // Pass specific profile
        >
          Edit
        </Button>
      </Stack>
    </Stack>
  );
}

TreatmentCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired, // Ensure the title is a required string
    subTitle: PropTypes.string, // Optional subtitle
  }).isRequired,
  setMaxHeight: PropTypes.func.isRequired, // Ensure it's a function
  maxHeight: PropTypes.number, // Max height is optional but should be a number
  toggleDrawer: PropTypes.func.isRequired, // Ensure it's a function
  openDeleteModal: PropTypes.func.isRequired, // Ensure it's a function
};
