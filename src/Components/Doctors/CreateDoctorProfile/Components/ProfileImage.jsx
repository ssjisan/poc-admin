import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Camera } from "../../../../assets/IconSet";
import PropTypes from "prop-types";

export default function ProfileImage({ profilePhoto, handleImageUpload }) {
  return (
    <Box
      sx={{
        width: "120px",
        height: "120px",
        background: "#F6F7F8",
        borderRadius: "100%",
        border: "3px solid #fff",
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.12)",
        position: "relative",
      }}
    >
      {profilePhoto ? (
        <Avatar
          src={URL.createObjectURL(profilePhoto)}
          alt="Profile Image"
          sx={{ width: "100%", height: "100%" }}
        />
      ) : (
        <Typography
          variant="subtitle2"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#919EAB",
          }}
        >
          No Image
        </Typography>
      )}
      <IconButton
        component="label"
        sx={{
          width: "32px",
          height: "32px",
          background: "#fff",
          position: "absolute",
          bottom: 0,
          right: 0,
          borderRadius: "100%",
        }}
      >
        <Camera size={"22px"} color="#919EAB" />
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </IconButton>
    </Box>
  );
}

ProfileImage.propTypes = {
  profilePhoto: PropTypes.any.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
};
