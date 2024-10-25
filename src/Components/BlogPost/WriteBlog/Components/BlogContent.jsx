import { Box, Stack, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";

export default function BlogContent({ blogContent, handleQuillChange }) {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"], // Adding image option
      [{ align: [] }],
    ],
  };
  return (
    <Stack gap="16px">
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Content
      </Typography>
      <Box>
        <ReactQuill
          modules={modules}
          className="custom-quill ql-container ql-snow ql-editor"
          value={blogContent}
          onChange={handleQuillChange}
          placeholder="Write information here..."
        />
      </Box>
    </Stack>
  );
}

// Define PropTypes
BlogContent.propTypes = {
  blogContent: PropTypes.string.isRequired,
  setBlogContent: PropTypes.func.isRequired,
  handleQuillChange: PropTypes.func.isRequired,
};

// Default Props (optional)
BlogContent.defaultProps = {
  blogContent: "",
};
