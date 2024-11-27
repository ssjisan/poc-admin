import { Button, Stack, useMediaQuery } from "@mui/material";
import UpdateBlogCover from "./Components/UpdateBlogCover";
import UpdateBlogContent from "./Components/UpdateBlogContent";
import UpdateBlogInfo from "./Components/UpdateBlogInfo";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditBlogPost() {
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState("");
  const [categories, setCategories] = useState([]);
  const [blogCategory, setBlogCategory] = useState("");
  const [image, setImage] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadBlog();
  }, []);

  const loadBlog = async () => {
    try {
      const { data } = await axios.get(`/blog/${params.slug}`);
      setTitle(data.title);
      setEditorData(data.editorData);
      setBlogCategory(data.category);
      if (data.coverPhoto && data.coverPhoto.length > 0) {
        setCoverPhoto(data.coverPhoto[0].url); // Load image URL from DB
      }
    } catch (err) {
      toast.error("Failed to load blog data");
    }
  };

  const handleCoverUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Set new image file
      setCoverPhoto(URL.createObjectURL(e.target.files[0])); // Preview the new image
    }
  };

  const removeImage = () => {
    setCoverPhoto(null);
  };

  const handleQuillChange = (content) => {
    setEditorData(content);
  };

  // Fetch categories from the API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/guidance_list"); // Fetch categories
        setCategories(response.data); // Assuming the response returns an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (newCategoryId) => {
    setBlogCategory(newCategoryId); // Update the blogCategory state
  };

  const handleUpdate = async () => {
    setLoading(true); // Set loading state to true
    const formData = new FormData();
    formData.append("title", title);
    formData.append("categoryId", blogCategory);
    formData.append("editorData", editorData);

    if (image) {
      formData.append("coverPhoto", image); // Attach the new cover photo if it exists
    }

    // Include a flag to remove cover photo if needed
    if (!coverPhoto) {
      formData.append("removeCoverImage", true); // Indicate that the cover photo should be removed
    }

    const toastId = toast.loading("Updating..."); // Show loading toast
    try {
      const response = await axios.put(`/blog/${params.slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog post updated successfully!", { id: toastId }); // Show success toast
      navigate(`/blog/${response.data.slug}`); // Redirect to the updated blog post
    } catch (error) {
      toast.error("Failed to update blog post", { id: toastId }); // Show error toast
      console.error("Error updating blog post:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Stack gap="40px">
        <UpdateBlogInfo
          title={title}
          setTitle={setTitle}
          categories={categories}
          blogCategory={blogCategory} // Pass the blog category
          setBlogCategory={setBlogCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <UpdateBlogContent
          editorData={editorData}
          setEditorData={setEditorData}
          handleQuillChange={handleQuillChange}
        />
        <UpdateBlogCover
          handleCoverUpload={handleCoverUpload}
          coverPhoto={coverPhoto}
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
        <Button
          variant="outlined"
          color="inherit"
          disabled={loading}
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          disabled={loading} // Disable button while loading
        >
          Update
        </Button>
      </Stack>
    </>
  );
}
