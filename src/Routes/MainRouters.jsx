import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Page/Dashboard";
import { Toaster } from "react-hot-toast";
import Login from "../UserAuth/Login";
import UploadAlbum from "../Page/Albums/UploadAlbum";
import AlbumList from "../Page/Albums/AlbumList";
import UpdateAlbum from "../Page/Albums/UpdateAlbum";

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
        </Route>
        {/* <Route path="*" element={<ErrorPage />} replace /> */}
      </Routes>
    </>
  );
}
