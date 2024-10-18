import { AlbumList, Blog, Dashboard, Doctor, Video } from "../../assets/IconSet";

const navConfig = ({ pathname }) => [
  {
    title: "Overview",
    icon: (
      <Dashboard color={pathname === "/" ? "#00AE60" : "#637381"} size={20} />
    ),
    items: [
      {
        title: "Dashboard",
        link: "/",
      },
    ],
  },
  {
    title: "Album",
    icon: (
      <AlbumList
        color={
          pathname.startsWith("/upload_album") ||
          pathname.startsWith("/album_list")
            ? "#00AE60"
            : "#637381"
        }
        size={20}
      />
    ),
    items: [
      {
        title: "Add Album",
        link: "/upload_album",
      },
      {
        title: "Album List",
        link: "/album_list",
      },
    ],
  },
  {
    title: "Video",
    icon: (
      <Video
        color={
          pathname.startsWith("/upload_video") ||
          pathname.startsWith("/video_list")
            ? "#00AE60"
            : "#637381"
        }
        size={20}
      />
    ),
    items: [
      {
        title: "Add Video",
        link: "/upload_video",
      },
      {
        title: "Video List",
        link: "/video_list",
      },
    ],
  },
  {
    title: "Doctor",
    icon: (
      <Doctor
        color={
          pathname.startsWith("/add_doctor") ||
          pathname.startsWith("/doctor_list")
            ? "#00AE60"
            : "#637381"
        }
        size={20}
      />
    ),
    items: [
      {
        title: "Add Doctor",
        link: "/add_doctor",
      },
      {
        title: "Doctor List",
        link: "/doctor_list",
      },
    ],
  },
  {
    title: "Blog",
    icon: (
      <Blog
        color={
          pathname.startsWith("/write_blog") ||
          pathname.startsWith("/blog_list")
            ? "#00AE60"
            : "#637381"
        }
        size={20}
      />
    ),
    items: [
      {
        title: "Add Blog",
        link: "/write_blog",
      },
      {
        title: "Blog List",
        link: "/blog_list",
      },
    ],
  },
];

export default navConfig;
