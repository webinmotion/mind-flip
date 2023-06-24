import { BsArrowLeftShort, BsSearch, BsChevronDown } from "react-icons/bs";
import { AiFillEnvironment, AiFillDashboard } from "react-icons/ai";
import { useState } from "react";

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("home");

  const toggleComponent = (componentName) => {
    setActiveComponent(componentName);
  };
  const menus = [
    { title: "Dashboard" },
    { title: "Pages" },
    { title: "Media", spacing: true },
    {
      title: "Projects",
      subMenus: true,
      subMenuItems: [
        { title: "Submenu 1" },
        { title: "Submenu 2" },
        { title: "Submenu 3" },
        { title: "Submenu 4" },
      ],
    },
    { title: "Analytics" },
    { title: "inbox" },
    { title: "Profile", spacing: true },
    { title: "Settings" },
    { title: "Logout" },
  ];
  return (
    <div className="flex">
      <div
        className={`h-screen bg-primary-lightest p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } relative duration-300`}
      >
        <BsArrowLeftShort
          className={`absolute -right-3 top-9 cursor-pointer rounded-full border-primary bg-primary text-3xl ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div>
          <AiFillEnvironment
            className={`float-left mr-2 block cursor-pointer rounded bg-background-color text-4xl text-primary duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`origin-left text-2xl font-medium duration-300 ${
              !open && "hidden"
            }`}
          >
            MindFlip
          </h1>
        </div>
        <div
          className={`mt-6 flex items-center rounded-md ${
            !open ? "px-2.5" : "px-4"
          } px-4 py-2`}
        >
          <BsSearch
            className={`text-white float-left block cursor-pointer text-lg ${
              open && "mr-2"
            }`}
          />
          <input
            type={"search"}
            placeholder="Search"
            className={`bg-transparent w-full text-base focus:outline-none ${
              !open && "hidden"
            }`}
          />
        </div>
        <ul className="pt-2">
          {menus.map((menu, index) => (
            <>
              <li
                key={index}
                className={`mt-2 flex cursor-pointer items-center gap-x-4 rounded-md ${
                  menu.spacing ? "mt-9" : "mt-2"
                } p-2 text-sm hover:bg-background-color`}
              >
                <span className="float-left block text-2xl">
                  <AiFillDashboard />
                </span>
                <span
                  className={`flex-1 text-base font-medium duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.subMenus && open && (
                  <BsChevronDown
                    className={`${subMenuOpen && "rotate-180"}`}
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                  />
                )}
              </li>
              {menu.subMenus && subMenuOpen && open && (
                <ul>
                  {menu.subMenuItems.map((subMenuItem, index) => (
                    <li
                      key={index}
                      className="mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 px-5 text-sm hover:bg-background-color"
                    >
                      {subMenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">Homepage</h1>
        
      </div>
    </div>
  );
}
