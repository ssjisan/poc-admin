import { Box, Typography } from '@mui/material'
import FormUpload from './FormUpload'

export default function AddAForm() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Upload a Form</Typography>
      </Box>
      <FormUpload />
    </Box>
  )
}
