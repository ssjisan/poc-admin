import { Box, Typography } from '@mui/material'
import FormJournal from './LinkForm'

export default function AddNewLink() {
  return (
    <Box>
      <Box sx={{ p: "24px 24px 0px 24px" }}>
        <Typography variant="h4">Create a Link</Typography>
      </Box>
      <FormJournal />
    </Box>
  )
}
