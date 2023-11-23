import { useState, useEffect } from "react";
import Link from "next/link";
import HouseIcon from "../icons/house";
import NewsPaperIcon from "../icons/newspaperIcon";
import ShieldIcon from "../icons/shield";

export default function SideBar() {
  const [url, setUrl] = useState("");
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const iconComponents = [
    {
      id: 1,
      icon: <HouseIcon style="w-5 h-5 md:w-8 md:h-8" />,
      title: "Dashboard",
      path: "/",
    },
    {
      id: 2,
      icon: <NewsPaperIcon style="w-5 h-5 md:w-8 md:h-8" />,
      title: "News",
      path: "/news",
    },
    {
      id: 3,
      icon: <ShieldIcon style="w-5 h-5 md:w-8 md:h-8" />,
      title: "Leagues",
      path: "/leagues",
    },
  ];

  console.log(menuStatus, "menu status");

  useEffect(() => {
    setUrl(window.location.pathname.split("/")[1]);
  }, []);

  return (
    <>
      <nav
        onClick={() => setMenuStatus(true)}
        className="fixed left-0 right-0 bottom-0 md:top-0 md:right-auto z-[15] flex md:flex-col items-center justify-center md:items-start md:justify-start shadow-xl bg-white"
      >
        {iconComponents.map((nav) => (
          <Link
            href={nav.path}
            key={nav.id}
            className={`flex items-center justify-center p-3 md:p-5 ${
              url === nav.path.split("/")[1]
                ? "bg-custom_orange text-white"
                : "bg-white text-custom_orange"
            } hover:bg-custom_orange hover:text-white cursor-pointer`}
          >
            {nav.icon}
          </Link>
        ))}
      </nav>

      {menuStatus === true ? (
        <div className="fixed left-0 right-0 top-0 w-full h-1 z-[10]">
          <div className="w-20 rounded h-1 bg-[#1b69aa] transfull"></div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
