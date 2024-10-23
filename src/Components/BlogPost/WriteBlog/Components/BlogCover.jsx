import { Box, IconButton, Stack, Typography } from "@mui/material";
import { Cross } from "../../../../assets/IconSet";
import PropTypes from "prop-types";

export default function BlogCover({ blogCover, handleBlogCover, removeImage }) {
  return (
    <Stack gap="16px">
      <Typography variant="body1" sx={{ fontWeight: 600 }}>
        Cover
      </Typography>
      <Box
        onClick={() =>
          document.getElementById("blog-cover-upload-input").click()
        } // Click on the hidden input when the box is clicked
        sx={{
          width: "100%",
          height: blogCover ? "480px" : "320px",
          background: "#F6F7F8",
          borderRadius: "8px",
          border: "3px solid #fff",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.12)",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {blogCover ? (
          <>
            <img
              src={URL.createObjectURL(blogCover)}
              alt="Blog Cover"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the image upload dialog when clicking on the remove button
                removeImage();
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "#000",
                borderRadius: "100%",
                width: "32px",
                height: "32px",
                boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                "&:hover": {
                  background: "#7A7A7A",
                },
              }}
            >
              <Cross size="24px" color="#fff" />
            </IconButton>
          </>
        ) : (
          <Stack sx={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: "#919EAB",
                fontWeight: 500,
              }}
            >
              Click here to upload a cover
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#919EAB",
                fontWeight: 500,
              }}
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif max size of 10 Mb
            </Typography>
          </Stack>
        )}

        <input
          type="file"
          hidden
          id="blog-cover-upload-input"
          accept="image/*"
          onChange={handleBlogCover} // Trigger the image upload
        />
      </Box>
    </Stack>
  );
}

BlogCover.propTypes = {
  blogCover: PropTypes.any.isRequired,
  handleBlogCover: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
};
