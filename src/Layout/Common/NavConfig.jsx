import { AlbumList, Dashboard } from "../../assets/IconSet";

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
];

export default navConfig;
