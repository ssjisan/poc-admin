import { Box, Typography } from '@mui/material'
import UpdateSelectedForm from './UpdateSelectedForm'

export default function UpdateAForm() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Update Form</Typography>
      </Box>
      <UpdateSelectedForm />
    </Box>
  )
}
