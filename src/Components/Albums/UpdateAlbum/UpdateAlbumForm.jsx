import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AlbumAdd } from "../../../assets/IconSet";
import PropTypes from "prop-types";

export default function UpdateAlbumForm({
  albumName,
  setAlbumName,
  handleImageUpload,
  handleSubmit,
  isSubmitting,
}) {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ mb: "40px" }}>
        Update Album
      </Typography>
      <Stack direction="column" spacing={3}>
        <TextField
          label="Album Name"
          variant="outlined"
          fullWidth
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)} // Update album name state
          sx={{ mb: 3 }}
        />
        <Button
          color="inherit"
          variant="soft"
          startIcon={<AlbumAdd size="24px" color={"#060415"} />}
          component="label"
          sx={{ mb: 3 }}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            name="images"
            hidden
            multiple
            onChange={handleImageUpload} // Call handleImageUpload here
          />
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          endIcon={isSubmitting && <CircularProgress size={24} />}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
}

UpdateAlbumForm.propTypes = {
  albumName: PropTypes.string.isRequired,
  setAlbumName: PropTypes.func.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};
