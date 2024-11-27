import { Box, Typography } from '@mui/material'
import FormJournal from './UpdateForm'

export default function UpdateSelectedLink() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Update Link</Typography>
      </Box>
      <FormJournal />
    </Box>
  )
}
