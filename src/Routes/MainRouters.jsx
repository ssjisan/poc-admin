import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Page/Dashboard";
import { Toaster } from "react-hot-toast";
import Login from "../UserAuth/Login";
import UploadAlbum from "../Page/Albums/UploadAlbum";
import AlbumList from "../Page/Albums/AlbumList";
import UpdateAlbum from "../Page/Albums/UpdateAlbum";
import UploadVideo from "../Page/Videos/UploadVideo";
import VideoList from "../Page/Videos/VideoList";
import UpdateVideo from "../Page/Videos/UpdateVideo";
import WriteABlog from "../Page/Blog/WriteABlog";
import AddDoctorProfile from "../Page/Doctors/AddDoctorProfile";
import DoctorsProfile from "../Page/Doctors/DoctorsProfile";
import UpdateDoctorProfile from "../Page/Doctors/UpdateDoctorProfile";
import CreateTreatment from "../Page/Treatments/CreateTreatment";
import Blog from "../Page/Blog/Blog";
import AddUser from "../Page/User/AddUser";
import ChangePassword from "../Page/User/ChangePassword";
import UserList from "../Page/User/UserList";
import AllTreatments from "../Page/Treatments/AllTreatments";
import PreviewBlog from "../Components/BlogPost/PreviewBlog/PreviewBlog";

export default function MainRouters() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload_album" element={<UploadAlbum />} />
          <Route path="/album_list" element={<AlbumList />} />
          <Route path="/album/:id" element={<UpdateAlbum />} />
          <Route path="/upload_video" element={<UploadVideo />} />
          <Route path="/video_list" element={<VideoList />} />
          <Route path="/video/:slug" element={<UpdateVideo />} />
          <Route path="/write_blog" element={<WriteABlog />} />
          <Route path="/add_doctor" element={<AddDoctorProfile />} />
          <Route path="/doctor_list" element={<DoctorsProfile />} />
          <Route path="/doctor/:id" element={<UpdateDoctorProfile />} />
          <Route path="/create_treatment" element={<CreateTreatment/>}/>
          <Route path="/treatments_list" element={<AllTreatments />} />
          <Route path="/blog" element={<Blog/>}/>
          <Route path="blog/:slug" element={<PreviewBlog/>}/>
          <Route path="/create_use" element={<AddUser />} />
          <Route path="change_password" element={<ChangePassword />} />
          <Route path="user_list" element={<UserList />} />
        </Route>
        {/* <Route path="*" element={<ErrorPage />} replace /> */}
      </Routes>
    </>
  );
}
