import { Stack, TextField, Autocomplete } from "@mui/material";
import { ArrowDown } from "../../../../assets/IconSet";

export default function BlogInfo({
  blogTitle,
  setBlogTitle,
  categories,
  selectedCategory,
  handleCategoryChange,
}) {
  return (
    <Stack gap="24px">
      <TextField
        label="Title"
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        fullWidth
      />
      <Autocomplete
        fullWidth
        options={categories}
        getOptionLabel={(option) => option.title} // Adjust based on the actual data structure
        value={selectedCategory}
        onChange={handleCategoryChange}
        popupIcon={<ArrowDown color="#727373" size={24} />} // Assuming you have an ArrowDown icon
        renderInput={(params) => (
          <TextField {...params} label="Category" fullWidth />
        )}
      />
    </Stack>
  );
}
