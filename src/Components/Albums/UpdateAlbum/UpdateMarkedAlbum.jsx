import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import UpdateAlbumForm from "./UpdateAlbumForm";
import UpdateImagePreview from "./UpdateImagePreview";

export default function UpdateMarkedAlbum() {
  const params = useParams();
  const [albumName, setAlbumName] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [images, setImages] = useState([]); // Combined state for existing and new images
  const [removedImageIds, setRemovedImageIds] = useState([]); // Track removed image IDs
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    loadAlbum();
  }, []);

  const loadAlbum = async () => {
    try {
      const { data } = await axios.get(`/album/${params.id}`);
      setAlbumName(data.name);
      const formattedImages = data.images.map((image) => ({
        src: image.src,
        public_id: image.public_id,
        size: image.size,
        name: image.name,
        _id: image._id,
        fromDatabase: true,
      }));
      setImages(formattedImages);
      setId(data._id);
    } catch (err) {
      toast.error("Failed to load album data");
    }
  };

  const handleNewImages = (newImageFiles) => {
    const imageFiles = Array.from(newImageFiles).map((file) => ({
      src: URL.createObjectURL(file), // Create a temporary local preview
      file, // Store the file itself for uploading
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2),
      fromDatabase: false, // Indicate this is a new image
    }));
    setImages((prev) => [...prev, ...imageFiles]); // Append new images to existing images
  };

  const handleRemoveImage = (imageId, isFromDatabase) => {
    if (isFromDatabase) {
      setImages(images.filter((image) => image._id !== imageId)); // Remove from existing images
      setRemovedImageIds((prev) => [...prev, imageId]); // Track removed image ID
    } else {
      setImages(images.filter((image) => image.name !== imageId)); // Remove from new images
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading state

    try {
      const formData = new FormData();

      // Append updated album name (if applicable)
      formData.append("name", albumName);

      // Append new images (if any)
      images.forEach((image) => {
        if (!image.fromDatabase) {
          formData.append("newImages", image.file);
        }
      });

      // Prepare the removed image IDs to be sent to the backend
      formData.append("removedImages", JSON.stringify(removedImageIds));

      // Update the album on the backend
      const response = await axios.put(`/album/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Album updated successfully!");
      navigate("/album_list");
    } catch (err) {
      // Check for specific error messages
      if (
        err.response &&
        err.response.data &&
        err.response.data.message.includes("File size too large")
      ) {
        toast.error(
          "File size too large. Please remove large files and try again. Maximum file size is 10 MB."
        );
      } else {
        toast.error("Failed to update album");
      }
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  const onDragEnd = (result) => {
    // Check if dropped outside of the list
    if (!result.destination) return;

    // Create a copy of the images array
    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1); // Remove the item from the original position
    reorderedImages.splice(result.destination.index, 0, movedImage); // Insert it at the new position

    // Update the state with the new order
    setImages(reorderedImages);
    console.log('Reordered Images:', reorderedImages);
  };

  return (
    <Box sx={{ p: "24px 24px 0px 24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <UpdateAlbumForm
            albumName={albumName}
            setAlbumName={setAlbumName}
            handleNewImages={handleNewImages} // Pass down the image handler
            handleSubmit={handleSubmit}
            isLoading={isLoading} // Pass loading state to form
          />
        </Grid>
        <Grid item xs={12} lg={9}>
          <UpdateImagePreview
            images={images} // Use combined images state
            removeImage={handleRemoveImage} // Handle image removal
            isLoading={isLoading}
            onDragEnd={onDragEnd} // Pass down the onDragEnd handler
          />
        </Grid>
      </Grid>
    </Box>
  );
}
