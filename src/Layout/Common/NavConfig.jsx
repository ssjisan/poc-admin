import {
  AlbumList,
  Blog,
  Calender,
  Dashboard,
  Doctor,
  ExerciseVideo,
  Form,
  JournalList,
  Services,
  Users,
  Video,
} from "../../assets/IconSet";

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
    title: "Appointments",
    icon: (
      <Calender color={pathname === "/appointments" ? "#00AE60" : "#637381"} size={20} />
    ),
    items: [
      {
        title: "Appointments",
        link: "/appointments",
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
    title: "Exercise Video",
    icon: (
      <ExerciseVideo
        color={
          pathname.startsWith("/upload_exercise_video") ||
          pathname.startsWith("/exercise_video_list")
            ? "#00AE60"
            : "#637381"
        }
        size={20}
      />
    ),
    items: [
      {
        title: "Add Exercise Video",
        link: "/upload_exercise_video",
      },
      {
        title: "Exercise Video List",
        link: "/exercise_video_list",
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
          pathname.startsWith("/write_blog") || pathname.startsWith("/blog")
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
    title: "Journals",
    icon: (
      <JournalList
        color={
          pathname.startsWith("/add_journal") ||
          pathname.startsWith("/journals")
            ? "#00AE60"
            : "#637381"
        }
        size={20}
      />
    ),
    items: [
      {
        title: "Add Journal",
        link: "/add_journal",
      },
      {
        title: "All Journals",
        link: "/journals",
      },
    ],
  },
  {
    title: "Forms",
    icon: (
      <Form
        color={
          pathname.startsWith("/upload_form") || pathname.startsWith("/forms")
            ? "#00AE60"
            : "#637381"
        }
        size={20}
      />
    ),
    items: [
      {
        title: "Upload Form",
        link: "/upload_form",
      },
      {
        title: "Form List",
        link: "/forms",
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
