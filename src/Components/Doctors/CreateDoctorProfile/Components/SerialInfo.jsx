import {
  Autocomplete,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { ArrowDown } from "../../../../assets/IconSet";

export default function SerialInfo({
  forBelow676,
  location,
  setLocation,
  appointmentNumber,
  setAppointmentNumber,
  consultationDays,
  setConsultationDays,
  consultationTime,
  setConsultationTime,
}) {
  const days = [
    { id: 1, label: "Saturday", value: "Saturday" },
    { id: 2, label: "Sunday", value: "Sunday" },
    { id: 3, label: "Monday", value: "Monday" },
    { id: 4, label: "Tuesday", value: "Tuesday" },
    { id: 5, label: "Wednesday", value: "Wednesday" },
    { id: 6, label: "Thursday", value: "Thursday" },
    { id: 7, label: "Friday", value: "Friday" },
  ];
  
  return (
    <Stack gap="16px" sx={{ width: "100%" }}>
      <Divider textAlign="left" sx={{ color: "#637381" }}>
        <Typography color="text.secondary">Serial Information</Typography>
      </Divider>
      <Stack direction={forBelow676 ? "column" : "row"} gap="16px">
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          name={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="Appointment Number"
          variant="outlined"
          fullWidth
          value={appointmentNumber}
          name={appointmentNumber}
          onChange={(e) => setAppointmentNumber(e.target.value)}
        />
      </Stack>
      <Stack direction={forBelow676 ? "column" : "row"} gap="16px">
        <Autocomplete
          multiple
          options={days}
          getOptionLabel={(option) => option.label}
          value={days.filter((day) => consultationDays.includes(day.id))}
          filterSelectedOptions
          isOptionEqualToValue={(option, value) => option.id === value.id} // Compare by ID
          // Store IDs in consultationDays state
          onChange={(event, newValue) => {
            setConsultationDays(newValue.map((day) => day.id)); // Store selected IDs in state
          }}
          popupIcon={<ArrowDown color="#727373" size={24} />}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Consultation Days"
            />
          )}
        />
        <TextField
          label="Time"
          variant="outlined"
          fullWidth
          value={consultationTime}
          name={consultationTime}
          onChange={(e) => setConsultationTime(e.target.value)}
        />
      </Stack>
    </Stack>
  );
}

SerialInfo.propTypes = {
  forBelow676: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  appointmentNumber: PropTypes.string.isRequired,
  setAppointmentNumber: PropTypes.func.isRequired,
  consultationDays: PropTypes.arrayOf(PropTypes.string).isRequired,
  setConsultationDays: PropTypes.func.isRequired,
  consultationTime: PropTypes.string.isRequired,
  setConsultationTime: PropTypes.func.isRequired,
};
