import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function UpdateForms({ treatment, handleUpdate }) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    if (treatment) {
      setTitle(treatment.title || "");
      setDetails(treatment.subTitle || "");
    }
  }, [treatment]);

  const handleSubmit = () => {
    handleUpdate(title, details);
  };

  return (
    <Stack sx={{ width: "100%", maxWidth: "480px", mt: "80px", p: "16px" }}>
      <TextField
        label="Treatment Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 3 }}
      />
      <TextField
        multiline
        rows={4}
        label="Treatment Details"
        variant="outlined"
        fullWidth
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Update
      </Button>
    </Stack>
  );
}
