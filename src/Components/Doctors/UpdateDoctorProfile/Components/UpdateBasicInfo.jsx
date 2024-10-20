import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";

export default function UpdateBasicInfo({
  forBelow676,
  name,
  setName,
  designation,
  setDesignation,
  email,
  setEmail,
  phone,
  setPhone,
  whatsApp,
  setWhatsApp,
  detailsInfo,
  setDetailsInfo,
}) {
  const handleQuillChange = (content) => {
    setDetailsInfo(content);
  };

  return (
    <Stack direction="column" gap="16px" sx={{ width: "100%" }}>
      <Divider textAlign="left" sx={{ color: "#637381" }}>
        <Typography color="text.secondary">Basic Information</Typography>
      </Divider>
      <Stack direction={forBelow676 ? "column" : "row"} gap="16px">
        <TextField
          label="Name"
          fullWidth
          value={name}
          name={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Designation"
          variant="outlined"
          fullWidth
          value={designation}
          name={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
      </Stack>
      <Stack direction={forBelow676 ? "column" : "row"} gap="16px">
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          name={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          value={phone}
          name={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Whatsapp"
          variant="outlined"
          fullWidth
          value={whatsApp}
          name={whatsApp}
          onChange={(e) => setWhatsApp(e.target.value)}
        />
      </Stack>
      <Box>
        <ReactQuill
          className="custom-quill ql-container ql-snow"
          value={detailsInfo}
          onChange={handleQuillChange}
          placeholder="Write information here..."
        />
      </Box>
    </Stack>
  );
}

UpdateBasicInfo.propTypes = {
  forBelow676: PropTypes.bool.isRequired, 
  name: PropTypes.string.isRequired, 
  setName: PropTypes.func.isRequired, 
  designation: PropTypes.string.isRequired, 
  setDesignation: PropTypes.func.isRequired, 
  email: PropTypes.string.isRequired, 
  setEmail: PropTypes.func.isRequired, 
  phone: PropTypes.string.isRequired,
  setPhone: PropTypes.func.isRequired, 
  whatsApp: PropTypes.string.isRequired, 
  setWhatsApp: PropTypes.func.isRequired, 
  detailsInfo: PropTypes.string.isRequired, 
  setDetailsInfo: PropTypes.func.isRequired, 
};
