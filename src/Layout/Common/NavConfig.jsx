import { AlbumList, Blog, Dashboard, Doctor, Services, Users, Video } from "../../assets/IconSet";

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
    title: "Treatments",
    icon: (
      <Services
        color={
          pathname.startsWith("/create_treatment") ||
          pathname.startsWith("/treatments_list")
            ? "#00AE60"
            : "#637381"
        }
        size={20}
      />
    ),
    items: [
      {
        title: "Create Treatment",
        link: "/create_treatment",
      },
      {
        title: "Treatments List",
        link: "/treatments_list",
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
          pathname.startsWith("/blog")
            ? "#00AE60"
            : "#637381"
        }
        size={20}
      />
    ),
    items: [
      {
        title: "Write Blog",
        link: "/write_blog",
      },
      {
        title: "All Blogs",
        link: "/blog",
      },
    ],
  },
  {
    title: "User",
    icon: (
      <Users
        color={
          pathname.startsWith("/create_user") ||
          pathname.startsWith("/user_list")
            ? "#00AE60"
            : "#637381"
        }
        size={20}
      />
    ),
    items: [
      {
        title: "Create User",
        link: "/create_use",
      },
      {
        title: "User List",
        link: "/user_list",
      },
    ],
  },
];

export default navConfig;
