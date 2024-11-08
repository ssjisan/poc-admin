import { useState } from "react";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import ProfileImage from "./ProfileImage";
import BasicInfo from "./BasicInfo";
import SerialInfo from "./SerialInfo"; // Import the SerialInfo component
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProfileInfo() {
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
  const forBelow676 = useMediaQuery("(max-width:676px)");

  // State for profile info
  const [profilePhoto, setProfilePhoto] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [detailsInfo, setDetailsInfo] = useState("");
  const [creating, setCreating] = useState(false);
  const [serialInfo, setSerialInfo] = useState([
    {
      location: "",
      appointmentNumber: "",
      consultationDays: [],
      consultationTime: "",
    },
  ]);
  const navigate = useNavigate();


  // Upload Profile Image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const MAX_SIZE_MB = 5;

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB

      if (fileSizeMB > MAX_SIZE_MB) {
        toast.error("System can’t accept images larger than 5MB");
        return; // Stop further execution if the file is too large
      }
      setProfilePhoto(file); // Proceed if the file size is acceptable
    }
  };

  // Handle form submission to create a profile
  const handleCreateMember = async () => {
    // Create a loading toast
    const loadingToast = toast.loading("Creating profile...");

    try {
      // Create a FormData object to handle form submission
      const formData = new FormData();
      formData.append("profilePhoto", profilePhoto); // Append the profile photo if available
      formData.append("name", name);
      formData.append("designation", designation);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("whatsApp", whatsApp);
      formData.append("detailsInfo", detailsInfo);
      formData.append("serialInfo", JSON.stringify(serialInfo)); // Convert serialInfo to a string

      // Show a loading state during the submission process
      setCreating(true);

      const { data } = await axios.post("/create-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Dismiss the loading toast once response is received
      toast.dismiss(loadingToast);

      if (data?.error) {
        toast.error(data.error); // Show error if response includes an error field
        setCreating(false);
      } else {
        toast.success("Doctor Profile Created Successfully");
        setCreating(false);
        navigate("/doctor_list"); // Redirect after successful creation
      }
    } catch (error) {
      // Dismiss the loading toast and show an error toast
      toast.dismiss(loadingToast);
      console.error("Error creating profile:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      // Reset the loading state after the submission is complete
      setCreating(false);
    }
  };

  return (
    <Stack gap={2} sx={{ pb: "64px" }}>
      <Typography variant="h4" sx={{ mb: "40px" }}>
        Create Profile
      </Typography>
      <Stack gap="24px" alignItems="center">
        {/* Profile Image */}
        <ProfileImage
          profilePhoto={profilePhoto}
          setProfilePhoto={setProfilePhoto}
          handleImageUpload={handleImageUpload}
        />
        {/* Basic Info */}
        <BasicInfo
          forBelow676={forBelow676}
          name={name}
          setName={setName}
          designation={designation}
          setDesignation={setDesignation}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          whatsApp={whatsApp}
          setWhatsApp={setWhatsApp}
          detailsInfo={detailsInfo}
          setDetailsInfo={setDetailsInfo}
        />
        {/* Serial Info */}
        <SerialInfo
          forBelow676={forBelow676}
          serialInfo={serialInfo} // Pass serialInfoList state as a prop
          setSerialInfo={setSerialInfo} // Pass the setter function
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
        <Button variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateMember}
          disabled={creating}
        >
          {creating ? "Creating..." : "Create"}
        </Button>
      </Stack>
    </Stack>
  );
}
