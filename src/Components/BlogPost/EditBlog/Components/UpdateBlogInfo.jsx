import { Stack, TextField, Autocomplete } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes
import { ArrowDown } from "../../../../assets/IconSet";

export default function UpdateBlogInfo({
  title,
  setTitle,
  categories,
  blogCategory,
  handleCategoryChange,
}) {
  // Find the selected category based on blogCategory
  const selectedCategory = categories.find(
    (category) => category._id === blogCategory
  );

  return (
    <Stack gap="24px">
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <Autocomplete
        fullWidth
        options={categories}
        getOptionLabel={(option) => option.title} // Adjust based on the actual data structure
        value={selectedCategory || null} // Ensure value is null if no category matches
        onChange={(event, newValue) => handleCategoryChange(newValue?._id)} // Send the _id of the selected category
        popupIcon={<ArrowDown color="#727373" size={24} />} // Assuming you have an ArrowDown icon
        renderInput={(params) => (
          <TextField {...params} label="Category" fullWidth />
        )}
      />
    </Stack>
  );
}

// Define PropTypes
UpdateBlogInfo.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Make sure to include _id
      title: PropTypes.string.isRequired, // Adjust this based on the structure of the category object
    })
  ).isRequired,
  blogCategory: PropTypes.string, // blogCategory should be a string representing the ObjectId
  handleCategoryChange: PropTypes.func.isRequired,
};
