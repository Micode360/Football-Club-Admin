import HouseIcon from "../icons/house";
import NewsPaperIcon from "../icons/newspaperIcon";


export default function SideBar() {
  const iconComponents = [
    { id: 1, icon: <HouseIcon style="w-8 h-8" />, title: "Dashboard", path:"/"},
    { id: 2, icon: <NewsPaperIcon style="w-8 h-8" />, title: "News"},
  ];
  
  let active = "/";

  return (
    <nav className="shadow-xl">
      {iconComponents.map((nav) => (
        <div
          key={nav.id}
          className={`flex items-center justify-center p-5 ${active === nav.path? "bg-custom_orange text-white":"bg-white text-custom_orange"} hover:bg-custom_orange hover:text-white cursor-pointer`}
        >
          {nav.icon}
        </div>
      ))}
    </nav>
  );
}
