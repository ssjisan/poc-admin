import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import UpdateAlbumForm from "./UpdateAlbumForm";
import UpdateImagePreview from "./UpdateImagePreview";
import { DragDropContext } from "react-beautiful-dnd";

export default function UpdateMarkedAlbum() {
  const params = useParams();
  const navigate = useNavigate();
  const [albumName, setAlbumName] = useState("");
  const [id, setId] = useState("");
  const [images, setImages] = useState([]); // Existing images
  const [newImages, setNewImages] = useState([]); // New images
  const [imagesToDelete, setImagesToDelete] = useState([]); // Images to be deleted
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleImageUpload = (event) => {
    const fileList = event.target.files;
    if (fileList.length > 0) {
      const newUploadedImages = Array.from(fileList).map((file) => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2), // Convert size to MB
        src: URL.createObjectURL(file),
        file, // Store file object to send to the backend later
        fromDatabase: false, // Mark as new
      }));
      setNewImages((prev) => [...prev, ...newUploadedImages]);
    }
  };

  const removeImage = (index) => {
    if (index < images.length) {
      // Mark image from DB for deletion
      const imageToRemove = images[index];
      setImagesToDelete((prev) => [...prev, imageToRemove.public_id]); // Add public_id to the delete array
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Remove new image
      setNewImages((prev) => prev.filter((_, i) => i !== index - images.length));
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedImages = Array.from([...images, ...newImages]);
    const [movedImage] = reorderedImages.splice(source.index, 1);
    reorderedImages.splice(destination.index, 0, movedImage);
    setImages(reorderedImages.slice(0, images.length));
    setNewImages(reorderedImages.slice(images.length));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", albumName);
      formData.append("imagesToDelete", JSON.stringify(imagesToDelete)); // Send images to be deleted

      // Append new images (file objects) to formData
      newImages.forEach((image) => {
        formData.append("images", image.file); // Send file object to the backend
      });

      const { data } = await axios.put(`/album/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper form data handling
        },
      });

      toast.success("Album updated successfully");
      navigate("/album_list");
    } catch (err) {
      toast.error("Failed to update album");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: "24px 24px 0px 24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <UpdateAlbumForm
            albumName={albumName}
            setAlbumName={setAlbumName}
            handleImageUpload={handleImageUpload}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </Grid>
        <Grid item xs={12} lg={9}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <UpdateImagePreview
              images={[...images, ...newImages]} // Combine old and new images
              removeImage={removeImage}
            />
          </DragDropContext>
        </Grid>
      </Grid>
    </Box>
  );
}
