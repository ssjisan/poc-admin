import { Button, Stack, useMediaQuery } from "@mui/material";
import BlogCover from "./Components/BlogCover";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BlogInfo from "./Components/BlogInfo";
import axios from "axios";
import BlogContent from "./Components/BlogContent";

export default function WriteBlogPost() {
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
  const [blogCover, setBlogCover] = useState("");
  const [categories, setCategories] = useState([]); // Store category options
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [blogTitle, setBlogTitle] = useState(""); // Blog title
  const [blogContent, setBlogContent] = useState(""); // Blog content

  // Upload Cover Image Handler
  const handleBlogCover = (event) => {
    const file = event.target.files[0];
    const MAX_SIZE_MB = 10;

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB

      if (fileSizeMB > MAX_SIZE_MB) {
        toast.error("System can’t accept images larger than 10MB");
        return; // Stop further execution if the file is too large
      }
      setBlogCover(file); // Proceed if the file size is acceptable
    }
  };

  const removeImage = () => {
    setBlogCover(null);
  };

  // Fetch categories from the API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/treatments_list"); // Fetch categories
        setCategories(response.data); // Assuming the response returns an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleQuillChange = (content) => {
    setBlogContent(content);
  };

  // Submit Handler
  const handleSubmit = async () => {
    if (!blogTitle || !selectedCategory || !blogContent) {
      toast.error("Please fill all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("categoryId", selectedCategory._id); // Assuming category has an _id
    formData.append("editorData", blogContent);

    if (blogCover) {
      formData.append("coverPhoto", blogCover); // Add the image file to the form data
    }

    // Log the FormData before sending (for debugging purposes)
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post("/write-blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Blog created successfully!");
        // Reset form after success
        setBlogTitle("");
        setSelectedCategory(null);
        setBlogContent("");
        setBlogCover(null);
      } else {
        toast.error("Failed to create blog post.");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Server Error:", error.response.data);
        toast.error(`Server error: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response from server:", error.request);
        toast.error("No response from server.");
      } else {
        // Something else caused the error
        console.error("Error submitting blog post:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <Stack gap="40px">
        <BlogInfo
          blogTitle={blogTitle}
          setBlogTitle={setBlogTitle}
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <BlogContent
          blogContent={blogContent}
          setBlogContent={setBlogContent}
          handleQuillChange={handleQuillChange}
        />
        <BlogCover
          blogCover={blogCover}
          handleBlogCover={handleBlogCover}
          removeImage={removeImage}
        />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap="16px"
        sx={{
          position: "fixed",
          bottom: "0px",
          left: forBelow1200 ? "0" : "280px",
          right: "0",
          zIndex: 1000,
          p: "12px 40px",
          background: "#FFF",
          borderTop: "1px solid rgba(145, 142, 175, 0.4)",
        }}
      >
        <Button variant="outlined" color="inherit" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Stack>
    </>
  );
}
