import {
  Autocomplete,
  Divider,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { ArrowDown, PlusIcon, Remove } from "../../../../assets/IconSet";

export default function SerialInfo({ forBelow676, serialInfo, setSerialInfo }) {
  const days = [
    { id: 1, label: "Saturday", value: "Saturday" },
    { id: 2, label: "Sunday", value: "Sunday" },
    { id: 3, label: "Monday", value: "Monday" },
    { id: 4, label: "Tuesday", value: "Tuesday" },
    { id: 5, label: "Wednesday", value: "Wednesday" },
    { id: 6, label: "Thursday", value: "Thursday" },
    { id: 7, label: "Friday", value: "Friday" },
  ];

  // Handler for adding new serial info entry
  const handleAddSerialInfo = () => {
    setSerialInfo((prevInfo) => [
      ...prevInfo,
      {
        location: "",
        appointmentNumber: "",
        consultationDays: [],
        consultationTime: "",
      },
    ]);
  };

  // Handler for deleting a serial info entry
  const handleDeleteSerialInfo = (index) => {
    setSerialInfo((prevInfo) => prevInfo.filter((_, i) => i !== index));
  };

  return (
    <Stack gap="16px" sx={{ width: "100%" }}>
      <Divider textAlign="left" sx={{ color: "#637381" }}>
        <Typography color="text.secondary">Serial Information</Typography>
      </Divider>
      <Stack gap="16px">
        {serialInfo.map((info, index) => (
          <Stack key={index} gap="16px">
            <Stack direction={forBelow676 ? "column" : "row"} gap="16px">
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                value={info.location} // bind location value
                onChange={(e) => {
                  setSerialInfo((prevInfo) => {
                    const newInfo = [...prevInfo];
                    newInfo[index].location = e.target.value; // update location
                    return newInfo;
                  });
                }}
              />
              <TextField
                label="Appointment Number"
                variant="outlined"
                fullWidth
                value={info.appointmentNumber} // bind appointmentNumber value
                onChange={(e) => {
                  setSerialInfo((prevInfo) => {
                    const newInfo = [...prevInfo];
                    newInfo[index].appointmentNumber = e.target.value; // update appointmentNumber
                    return newInfo;
                  });
                }}
              />
            </Stack>
            <Stack direction={forBelow676 ? "column" : "row"} gap="16px">
              <Autocomplete
                multiple
                options={days}
                getOptionLabel={(option) => option.label}
                value={days.filter((day) =>
                  info.consultationDays.includes(day.id)
                )}
                filterSelectedOptions
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  setSerialInfo((prevInfo) => {
                    const newInfo = [...prevInfo];
                    newInfo[index].consultationDays = newValue.map(
                      (day) => day.id
                    );
                    return newInfo;
                  });
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
                value={info.consultationTime} // bind consultationTime value
                onChange={(e) => {
                  setSerialInfo((prevInfo) => {
                    const newInfo = [...prevInfo];
                    newInfo[index].consultationTime = e.target.value; // update consultationTime
                    return newInfo;
                  });
                }}
              />
            </Stack>

            {/* Show delete button only if there are more than 1 serialInfo */}
            {serialInfo.length > 1 && (
              <Stack flexDirection="row" justifyContent="flex-end">
                <Button
                  variant="text"
                  color="error"
                  sx={{ width: "80px" }}
                  onClick={() => handleDeleteSerialInfo(index)}
                  startIcon={<Remove color="#DC3545" size={16} />}
                >
                  Delete
                </Button>
              </Stack>
            )}
            <Divider sx={{ borderStyle: "dashed", mt: "4px", mb: "4px" }} />
          </Stack>
        ))}

        <Stack flexDirection="row" justifyContent="flex-start">
          <Button
            variant="soft"
            onClick={handleAddSerialInfo}
            startIcon={<PlusIcon size={20} color="#00AE60" />}
          >
            Add Serial Info
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

SerialInfo.propTypes = {
  forBelow676: PropTypes.bool.isRequired,
  serialInfo: PropTypes.array.isRequired,
  setSerialInfo: PropTypes.func.isRequired,
};
