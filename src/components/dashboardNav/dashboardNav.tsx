import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import {
  FaBars,
  FaBell,
  FaChartLine,
  FaHome,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import { FaPeopleGroup, FaX } from "react-icons/fa6";
import { FiMoreVertical, FiSettings } from "react-icons/fi";
import { LuLogOut, LuSparkles } from "react-icons/lu";
import { MdDashboard, MdFeedback } from "react-icons/md";
import { Link } from "react-router-dom";
import Overlay from "../overlay/overlay";

interface LinksArrayType {
  id: number;
  text: string;
  icon: ReactNode;
  isActive: boolean;
}

const DashboardNav = ({
  setStringActiveLink,
}: {
  setStringActiveLink: React.Dispatch<string>;
}) => {
  const root = window.document.documentElement;

  // Mobile Nav
  const [showDashboardNav, setShowDashboardNav] = useState<boolean>(false);

  // Desktop Nav
  const [activeLink, setActiveLink] = useState<null | number>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const [linksArray, setLinksArray] = useState<LinksArrayType[]>([
    { id: 1, text: "Home", icon: <FaHome />, isActive: true },
    { id: 2, text: "Analytics", icon: <FaChartLine />, isActive: false },
    { id: 3, text: "Clients", icon: <FaPeopleGroup />, isActive: false },
    { id: 4, text: "Tasks", icon: <FaTasks />, isActive: false },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setLinksArray((prev) =>
      prev.map((link) =>
        link.id === activeLink
          ? { ...link, isActive: !link.isActive }
          : { ...link, isActive: false }
      )
    );
  }, [activeLink]);

  useEffect(() => {
    if (showDashboardNav) {
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }
  }, [showDashboardNav]);

  return (
    <>
      <nav
        className="w-full h-16 fixed top-0 flex items-center justify-between bg-gray-200 dark:bg-[#0c1017] z-40 px-6
        md2:hidden"
      >
        <div className="flex items-center gap-x-2.5">
          <span className="bg-gradient-to-tl from-[#027af2] to-[#3892eca2] p-1.5 rounded-full">
            <MdDashboard className="text-gray-200" />
          </span>

          <h1 className="text-slate-800 dark:text-gray-200 font-bold text-[26px]">
            Dashboard
          </h1>
        </div>

        <button
          type="button"
          className="border-2 border-gray-300/50 p-1.5 rounded-md"
          onClick={() => setShowDashboardNav(true)}
        >
          <FaBars className="text-slate-800 dark:text-gray-200 md:text-lg" />
        </button>
      </nav>

      <AnimatePresence>
        {showDashboardNav && (
          <motion.div
            initial={{ opacity: 0.5, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="py-5 bg-gray-200 dark:bg-[#0c1017] z-50 top-0 left-0 h-full overflow-y-auto w-72
            flex flex-col justify-between fixed"
          >
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-x-2.5">
                  <div
                    className="w-6 h-6 rounded-full bg-gray-100 dark:bg-[#05070a61] flex items-center justify-center
                    border-[0.5px] border-gray-300/50 dark:border-gray-600/40 outline outline-[0.5px] outline-[#037BF2]
                    outline-offset-2"
                  >
                    <FaUser className="text-gray-600 dark:text-gray-500 text-xs" />
                  </div>

                  <span className="text-slate-800 dark:text-gray-200 font-medium text-lg">
                    Alireza Shabani
                  </span>
                </div>

                <div className="flex items-center gap-x-1.5">
                  <div
                    className="bg-gray-300/50 dark:bg-[#05070a] rounded-md border border-gray-300/50
                  dark:border-gray-600/40 w-8 h-8 flex items-center justify-center relative hover:border-gray-400/50
                  dark:hover:border-gray-500/40 transition-all duration-200"
                  >
                    <FaBell className="text-slate-800 dark:text-gray-200 text-sm" />

                    <span
                      className="block bg-red-600 dark:bg-red-500 rounded-full w-2 h-2 absolute
                    top-0 right-0 translate-x-1/2 -translate-y-1/2"
                    ></span>
                  </div>

                  <div
                    className="bg-gray-300/50 dark:bg-[#05070a] rounded-md border border-gray-300/50
                  dark:border-gray-600/40 w-8 h-8 flex items-center justify-center relative hover:border-gray-400/50
                  dark:hover:border-gray-500/40 transition-all duration-200"
                    onClick={() => setShowDashboardNav(false)}
                  >
                    <FaX className="text-slate-800 dark:text-gray-200 text-sm" />
                  </div>
                </div>
              </div>

              <span className="block w-full h-px bg-gray-300/50 dark:bg-gray-600/40"></span>

              <ul className="flex flex-col gap-y-1.5 px-4">
                {linksArray.map((link) => (
                  <button
                    type="button"
                    key={link.id}
                    className={` text-sm flex items-center gap-x-2 font-medium cursor-pointer px-4 py-2
                  rounded-md transition-all select-none w-full
                  duration-200 ${
                    link.isActive && link.id === activeLink
                      ? `bg-gray-300 dark:bg-[#323947] hover:bg-gray-300 dark:hover:bg-[#323947]
                        text-slate-800 dark:text-gray-200`
                      : "bg-transparent hover:bg-gray-300/40 dark:hover:bg-[#232b3986]"
                  }`}
                    onClick={() => {
                      setActiveLink(link.id);
                      setStringActiveLink(link.text);
                    }}
                  >
                    <span
                      className={`${
                        link.isActive && link.id === activeLink
                          ? "text-slate-900 dark:text-gray-200"
                          : "text-gray-600 dark:text-gray-500"
                      }`}
                    >
                      {link.icon}
                    </span>
                    <li
                      className={`${
                        link.isActive
                          ? "text-slate-800 dark:text-gray-200"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {link.text}
                    </li>
                  </button>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-y-4">
              <ul className="flex flex-col gap-y-1.5 px-4">
                <button
                  type="button"
                  className="w-full flex items-center gap-x-2 px-4 py-2 transition-all duration-200 
                hover:bg-gray-300/40 dark:hover:bg-[#232b3986] rounded-md bg-transparent cursor-pointer"
                >
                  <FiSettings className="text-gray-600 dark:text-gray-500" />

                  <li className=" text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Settings
                  </li>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-x-2 px-4 py-2 transition-all duration-200 
                hover:bg-gray-300/40 dark:hover:bg-[#232b3986] rounded-md bg-transparent cursor-pointer"
                >
                  <AiOutlineInfoCircle className="text-gray-600 dark:text-gray-500" />

                  <li className=" text-sm text-gray-500 dark:text-gray-400 font-medium">
                    About
                  </li>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-x-2 px-4 py-2 transition-all duration-200 
                hover:bg-gray-300/40 dark:hover:bg-[#232b3986] rounded-md bg-transparent cursor-pointer"
                >
                  <MdFeedback className="text-gray-600 dark:text-gray-500" />

                  <li className=" text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Feedback
                  </li>
                </button>

                <Link to={"/"}>
                  <button
                    type="button"
                    className="w-full flex items-center gap-x-2 px-4 py-2 transition-all duration-200 
                  hover:bg-gray-300/40 dark:hover:bg-[#232b3986] rounded-md bg-transparent cursor-pointer"
                  >
                    <BiExit className="text-red-600 dark:text-red-500" />

                    <li className=" text-sm text-gray-500 dark:text-gray-400 font-medium">
                      Exit Dashboard
                    </li>
                  </button>
                </Link>
              </ul>

              <span className="block w-full h-px bg-gray-300/50 dark:bg-gray-600/40"></span>

              <div className="px-4">
                <div
                  className="border-2 border-gray-300/50 dark:border-gray-600/40 rounded-md p-4 flex flex-col
                  gap-y-2 bg-gray-100 dark:bg-[#05070a61]"
                >
                  <LuSparkles className="text-yellow-400 dark:text-yellow-300 text-lg" />

                  <p className="text-slate-800 dark:text-gray-200 font-medium text-[15px]">
                    Plan about to expire
                  </p>

                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Enjoy 10% off when renewing your plan today.
                  </p>

                  <button
                    type="button"
                    className="text-gray-100 bg-slate-800  hover:bg-slate-700 rounded-md font-semibold transition
                duration-200 dark:text-[#05070a] dark:bg-gray-200 dark:hover:bg-white/75 text-sm py-1.5"
                  >
                    Get the discount
                  </button>
                </div>
              </div>

              <div className="px-4">
                <button
                  type="button"
                  className="border-2 border-gray-300/50 dark:border-gray-600/40 rounded-md py-1.5 flex items-center
                  justify-center gap-x-2 bg-gray-100 dark:bg-[#05070a61] text-slate-800 dark:text-gray-200 w-full
                  hover:border-gray-400/50 dark:hover:border-gray-500/40 transition-all duration-200"
                >
                  <LuLogOut />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showDashboardNav && (
        <Overlay className="fixed" click={() => setShowDashboardNav(false)} />
      )}

      <nav
        className="hidden bg-gray-200 dark:bg-[#0c1017] px-6
          md2:flex border-r border-gray-300/50 dark:border-gray-600/40"
      >
        <div className="w-60 h-full fixed top-0 left-0 bottom-0 z-50 py-7 flex flex-col justify-between">
          <div className="flex flex-col gap-y-5 px-2.5">
            <h1 className="text-xl text-slate-800 dark:text-gray-200 font-bold">
              Dashboard
            </h1>

            <ul className="flex flex-col gap-y-2.5">
              {linksArray.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  className={` text-sm flex items-center gap-x-2 font-medium cursor-pointer px-4 py-2
                rounded-md transition-all select-none
                  duration-200 ${
                    link.isActive && link.id === activeLink
                      ? `bg-gray-300 dark:bg-[#323947] hover:bg-gray-300 dark:hover:bg-[#323947]
                        text-slate-800 dark:text-gray-200`
                      : "bg-transparent hover:bg-gray-300/40 dark:hover:bg-[#232b3986]"
                  }`}
                  onClick={() => {
                    setActiveLink(link.id);
                    setStringActiveLink(link.text);
                  }}
                >
                  <span
                    className={`${
                      link.isActive && link.id === activeLink
                        ? "text-slate-900 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-500"
                    }`}
                  >
                    {link.icon}
                  </span>
                  <li
                    className={`${
                      link.isActive
                        ? "text-slate-800 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {link.text}
                  </li>
                </button>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-y-5">
            <ul className="flex flex-col gap-y-2.5 px-2.5">
              <button
                type="button"
                className="w-full flex items-center gap-x-2 px-4 py-2 transition-all duration-200 
                hover:bg-gray-300/40 dark:hover:bg-[#232b3986] rounded-md bg-transparent cursor-pointer"
              >
                <FiSettings className="text-gray-600 dark:text-gray-500" />

                <li className=" text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Settings
                </li>
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-x-2 px-4 py-2 transition-all duration-200 
                hover:bg-gray-300/40 dark:hover:bg-[#232b3986] rounded-md bg-transparent cursor-pointer"
              >
                <AiOutlineInfoCircle className="text-gray-600 dark:text-gray-500" />

                <li className=" text-sm text-gray-500 dark:text-gray-400 font-medium">
                  About
                </li>
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-x-2 px-4 py-2 transition-all duration-200 
                hover:bg-gray-300/40 dark:hover:bg-[#232b3986] rounded-md bg-transparent cursor-pointer"
              >
                <MdFeedback className="text-gray-600 dark:text-gray-500" />

                <li className=" text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Feedback
                </li>
              </button>

              <Link to={"/"}>
                <button
                  type="button"
                  className="w-full flex items-center gap-x-2 px-4 py-2 transition-all duration-200 
                hover:bg-gray-300/40 dark:hover:bg-[#232b3986] rounded-md bg-transparent cursor-pointer"
                >
                  <BiExit className="text-red-600 dark:text-red-500" />

                  <li className=" text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Exit Dashboard
                  </li>
                </button>
              </Link>
            </ul>

            <div className="px-2.5">
              <div
                className="border-2 border-gray-300/50 dark:border-gray-600/40 rounded-md p-4 flex flex-col
              gap-y-2.5 bg-gray-100 dark:bg-[#05070a61]"
              >
                <LuSparkles className="text-yellow-400 dark:text-yellow-300 text-lg" />

                <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                  Plan about to expire
                </p>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Enjoy 10% off when renewing your plan today.
                </p>

                <button
                  type="button"
                  className="text-gray-100 bg-slate-800  hover:bg-slate-700 rounded-md font-semibold transition
                duration-200 dark:text-[#05070a] dark:bg-gray-200 dark:hover:bg-white/75 text-sm py-1.5"
                >
                  Get the discount
                </button>
              </div>
            </div>

            <span className="bg-gray-300/50 dark:bg-gray-600/40 block w-full h-0.5 dark:h-px"></span>

            <div className="flex items-center gap-x-2.5 px-2.5">
              <div
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-[#05070a61] flex items-center justify-center
                border-[0.5px] border-gray-300/50 dark:border-gray-600/40 outline outline-[0.5px] outline-[#037BF2]
                outline-offset-2"
              >
                <FaUser className="text-gray-600 dark:text-gray-500 text-xl" />
              </div>

              <div className="flex items-center gap-x-2.5">
                <div className="flex flex-col">
                  <span className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                    Alireza Shabani
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    alireza404@gmail.com
                  </span>
                </div>

                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-md border-[0.5px] border-gray-300/50 dark:border-gray-600/40
                  bg-gray-100 dark:bg-[#05070a61] flex items-center justify-center hover:bg-gray-300/65
                  dark:hover:bg-[#05070aa1] hover:border-gray-400/50 dark:hover:border-gray-500/40
                    transition-all duration-200 cursor-pointer"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    <FiMoreVertical className="text-slate-800 dark:text-gray-200" />
                  </div>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.ul
                        key={isDropdownOpen ? 1 : 2}
                        initial={{ opacity: 0.2, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.1 }}
                        ref={dropdownRef}
                        className="bg-gray-100 dark:bg-[#05070a] py-3 px-2 rounded-md border border-gray-300/50
                      dark:border-gray-600/40 flex flex-col gap-y-1.5 absolute right-0 bottom-0"
                      >
                        <li
                          className="py-1 px-2 text-slate-800 dark:text-gray-200
                        hover:bg-gray-200 dark:hover:bg-[#0b0e14] transition-all duration-200 cursor-pointer rounded-md
                          text-nowrap"
                        >
                          Profile
                        </li>

                        <li
                          className="py-1 px-2 text-slate-800 dark:text-gray-200
                    hover:bg-gray-200 dark:hover:bg-[#0b0e14] transition-all duration-200 cursor-pointer rounded-md
                    text-nowrap"
                        >
                          My account
                        </li>

                        <div className="py-2">
                          <span className="h-px block w-full bg-gray-300/50 dark:bg-gray-600/40"></span>
                        </div>

                        <li
                          className="py-1 px-2 text-slate-800 dark:text-gray-200
                    hover:bg-gray-200 dark:hover:bg-[#0b0e14] transition-all duration-200 cursor-pointer rounded-md
                    text-nowrap"
                        >
                          Add another account
                        </li>

                        <li
                          className="py-1 px-2 text-slate-800 dark:text-gray-200
                    hover:bg-gray-200 dark:hover:bg-[#0b0e14] transition-all duration-200 cursor-pointer rounded-md
                    text-nowrap"
                        >
                          Settings
                        </li>

                        <div className="py-2">
                          <span className="h-px block w-full bg-gray-300/50 dark:bg-gray-600/40"></span>
                        </div>

                        <li
                          className="py-1 px-2 text-slate-800 dark:text-gray-200
                    hover:bg-gray-200 dark:hover:bg-[#0b0e14] transition-all duration-200 cursor-pointer rounded-md
                    text-nowrap flex items-center justify-between"
                        >
                          Logout{" "}
                          <LuLogOut className="text-red-600 dark:text-red-500" />
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardNav;
