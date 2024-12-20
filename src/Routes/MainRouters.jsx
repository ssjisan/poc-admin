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
import EditBlog from "../Page/Blog/EditBlog";
import AddUser from "../Page/User/AddUser";
import ChangePassword from "../Page/User/ChangePassword";
import UserList from "../Page/User/UserList";
import AllTreatments from "../Page/Treatments/AllTreatments";
import PreviewBlog from "../Components/BlogPost/PreviewBlog/PreviewBlog";
import AddForm from "../Page/Forms/AddForm";
import FormList from "../Page/Forms/FormList";
import UpdateForm from "../Page/Forms/UpdateForm";
import Appointments from "../Page/Appointments/Appointments";
import UploadExerciseVideo from "../Page/ExerciseVideos/UploadExerciseVideo";
import ExerciseVideoList from "../Page/ExerciseVideos/ExerciseVideoList";
import UpdateExerciseVideo from "../Page/ExerciseVideos/UpdateExerciseVideo";
import AddLink from "../Page/Links/AddLink";
import LinksList from "../Page/Links/LinksList";
import UpdateLink from "../Page/Links/UpdateLink";

export default function MainRouters() {
  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#59B259",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#59B259",
            },
          },
          error: {
            style: {
              background: "#EC4034",
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#EC4034",
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />

          {/* Album Routes Start */}
          <Route path="/upload_album" element={<UploadAlbum />} />
          <Route path="/album_list" element={<AlbumList />} />
          <Route path="/album/:id" element={<UpdateAlbum />} />
          {/* Album Routes End */}

          {/* Videos Routes Start */}
          <Route
            path="/upload_exercise_video"
            element={<UploadExerciseVideo />}
          />
          <Route path="/exercise_video_list" element={<ExerciseVideoList />} />
          <Route
            path="/exercise_video/:slug"
            element={<UpdateExerciseVideo />}
          />
          {/* Videos Routes End */}

          {/* Exercise Videos Routes Start */}
          <Route path="/upload_video" element={<UploadVideo />} />
          <Route path="/video_list" element={<VideoList />} />
          <Route path="/video/:slug" element={<UpdateVideo />} />
          {/* Exercise Videos Routes End */}

          {/* Doctor Routes Start */}
          <Route path="/add_doctor" element={<AddDoctorProfile />} />
          <Route path="/doctor_list" element={<DoctorsProfile />} />
          <Route path="/doctor/:id" element={<UpdateDoctorProfile />} />
          {/* Doctor Routes End */}

          {/* Treatment Routes Start */}
          <Route path="/create_guidance" element={<CreateTreatment />} />
          <Route path="/guidance_list" element={<AllTreatments />} />
          {/* Treatment Routes End */}

          {/* Blog Routes Start */}
          <Route path="/write_blog" element={<WriteABlog />} />
          <Route path="/edit-blog/:slug" element={<EditBlog />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<PreviewBlog />} />
          {/* Blog Routes End */}

          {/* Links Routes Start */}
          <Route path="add_link" element={<AddLink />} />
          <Route path="links" element={<LinksList />} />
          <Route path="link/:linkId" element={<UpdateLink />} />
          {/* Links Routes End */}

          {/* Forms Routes Start */}
          <Route path="upload_form" element={<AddForm />} />
          <Route path="forms" element={<FormList />} />
          <Route path="form/:formId" element={<UpdateForm />} />
          {/* Forms Routes End */}

          {/* User Routes Start */}
          <Route path="/create_use" element={<AddUser />} />
          <Route path="change_password" element={<ChangePassword />} />
          <Route path="user_list" element={<UserList />} />
          {/* User Routes End */}

          <Route path="/appointments" element={<Appointments />} />
        </Route>
        {/* <Route path="*" element={<ErrorPage />} replace /> */}
      </Routes>
    </>
  );
}
