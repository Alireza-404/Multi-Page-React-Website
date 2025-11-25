import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  href: string;
  children: ReactNode;
  setShowNavLinks?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavLinks = ({ href, children, setShowNavLinks }: Props) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <>
      {pathname === "/" ? (
        <>
          <a href={href} className="hidden md2:inline">
            <li
              className="text-slate-800 dark:text-gray-200 font-medium text-sm lg:text-base cursor-pointer
            hover:bg-gray-300/65 dark:hover:bg-slate-700 transition-all duration-200 rounded px-2 py-1.5 lg:px-2.5
            xl:px-3"
            >
              {children}
            </li>
          </a>

          <a href={href} className="block md2:hidden">
            <li
              className="text-slate-800 dark:text-gray-200 text-sm font-medium"
              onClick={() => setShowNavLinks && setShowNavLinks(false)}
            >
              {children}
            </li>
          </a>
        </>
      ) : (
        <>
          <button
            type="button"
            className="text-slate-500 dark:text-gray-500 font-medium text-sm lg:text-base cursor-pointer
              xl:px-3 px-2 hidden md2:inline"
          >
            <li>{children}</li>
          </button>

          <button
            type="button"
            className="text-slate-500 dark:text-gray-500 text-sm font-medium block md2:hidden text-start"
          >
            <li>{children}</li>
          </button>
        </>
      )}
    </>
  );
};

export default NavLinks;
