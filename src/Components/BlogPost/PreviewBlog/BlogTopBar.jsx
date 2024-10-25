import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BlogTopBar() {
  const navigate= useNavigate()
  const handleBack = ()=>{
    navigate("/blog")
  }
  return (
    <Stack sx={{p:"24px 16px", borderBottom:"1px solid red"}} direction="row" justifyContent="space-between">
        <Typography variant="h6">Preview</Typography>
        <Stack gap="16px" direction="row">
            <Button variant="outlined" color="inherit" size="small" onClick={handleBack}>
                Close
            </Button>
            <Button variant="contained" size="small">
                Edit
            </Button>
        </Stack>
    </Stack>
  )
}
