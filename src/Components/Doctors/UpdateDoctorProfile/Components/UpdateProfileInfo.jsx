import { useEffect, useState } from "react";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import UpdateProfileImage from "./UpdateProfileImage";
import UpdateSerialInfo from "./UpdateSerialInfo";
import { useNavigate, useParams } from "react-router-dom";
import UpdateBasicInfo from "./UpdateBasicInfo";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateProfileInfo() {
  const forBelow1200 = useMediaQuery("(max-width:1200px)");
  const forBelow676 = useMediaQuery("(max-width:676px)");

  // States for profile information
  const [profilePhoto, setProfilePhoto] = useState(""); // Image URL from DB
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [detailsInfo, setDetailsInfo] = useState("");
  const [serialInfo, setSerialInfo] = useState([
    {
      location: "",
      appointmentNumber: "",
      consultationDays: [],
      consultationTime: "",
    },
  ]);
  const [creating, setCreating] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  // Load Data for Profile
  useEffect(() => {
    loadMember();
  }, []);

  const loadMember = async () => {
    try {
      const { data } = await axios.get(`/doctor/${params.id}`);
      setName(data.name);
      setDesignation(data.designation);
      setEmail(data.email);
      setPhone(data.phone);
      setWhatsApp(data.whatsApp);
      setDetailsInfo(data.detailsInfo);
      setSerialInfo(data.serialInfo || [ // Set serialInfo if available from DB
        {
          location: "",
          appointmentNumber: "",
          consultationDays: [],
          consultationTime: "",
        },
      ]);
      if (data.profilePhoto && data.profilePhoto.length > 0) {
        setProfilePhoto(data.profilePhoto[0].url); // Load image URL from DB
      }
    } catch (err) {
      toast.error("Failed to load profile data");
    }
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Set new image file
      setProfilePhoto(URL.createObjectURL(e.target.files[0])); // Preview the new image
    }
  };

  // Handle Form Submit
  const handleSubmit = async () => {
    setCreating(true);
    const toastId = toast.loading("Updating doctor profile..."); // Show loading toast
    const formData = new FormData();

    // Append all fields
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("whatsApp", whatsApp);
    formData.append("detailsInfo", detailsInfo);
    serialInfo.forEach((item, index) => {
      formData.append(`serialInfo[${index}].location`, item.location);
      formData.append(`serialInfo[${index}].appointmentNumber`, item.appointmentNumber);
      item.consultationDays.forEach((day, i) =>
        formData.append(`serialInfo[${index}].consultationDays[${i}]`, day)
      );
      formData.append(`serialInfo[${index}].consultationTime`, item.consultationTime);
    });

    // Check if a new image is uploaded
    if (image) {
      formData.append("profilePhoto", image);
    }

    try {
      const response = await axios.put(`/doctor/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      if (response.status === 200) {
        toast.success("Profile updated successfully", { id: toastId }); // Show success toast
        navigate("/doctor_list");
      } else {
        throw new Error("Profile update failed");
      }
    } catch (err) {
      toast.error("Failed to update profile", { id: toastId }); // Show error toast
      console.error("Update error:", err); // Logs the actual error
    } finally {
      setCreating(false);
      toast.dismiss(toastId); // Dismiss the loading toast
    }
  };

  return (
    <Stack gap={2} sx={{ pb: "64px" }}>
      <Typography variant="h4" sx={{ mb: "40px" }}>
        Update Profile
      </Typography>
      <Stack gap="24px" alignItems="center">
        <UpdateProfileImage
          profilePhoto={profilePhoto} // Either DB image or new one
          handleImageUpload={handleImageUpload} // Function to handle uploads
        />
        <UpdateBasicInfo
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
        <UpdateSerialInfo
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
        <Button
          variant="outlined"
          color="inherit"
          disabled={creating}
          onClick={() => navigate("/doctor_list")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={creating}
          onClick={handleSubmit}
        >
          {creating ? "Updating..." : "Update"}
        </Button>
      </Stack>
    </Stack>
  );
}
