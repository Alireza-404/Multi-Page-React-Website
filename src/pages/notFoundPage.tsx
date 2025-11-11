import { Link } from "react-router-dom";
import ParticlesConfig from "../components/particlesConfig/particlesConfig";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full overflow-hidden relative">
      <ParticlesConfig className="w-full h-full top-0 left-0 absolute bg-gray-200 dark:bg-[#0d0d0d]" />

      <div
        className="border-2 border-slate-800 dark:border-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2
      -translate-y-1/2 rounded-md bg-gray-300/70 dark:bg-[#151515f3] p-5 flex flex-col gap-y-5"
      >
        <h1 className="text-nowrap text-slate-800 dark:text-gray-100 font-bold font-mono flex flex-col gap-y-0.5 items-center">
          <span className="text-[#037bf2] text-4xl lg:text-6xl">404</span>
          <span className="text-3xl lg:text-4xl">
            Page <span className="text-red-500">Not</span> Found
          </span>
        </h1>

        <div className="flex flex-col gap-y-1">
          <p
            className="text-center bg-clip-text text-transparent bg-gradient-to-r
          dark:from-gray-200 dark:to-gray-300/80 from-slate-950 to-slate-700 font-medium
          lg:text-lg"
          >
            The page you are looking for could not be found.
          </p>

          <p
            className="text-center bg-clip-text text-transparent bg-gradient-to-r
          dark:from-gray-400 dark:to-gray-300/80 from-slate-700 to-slate-500 font-medium text-sm"
          >
            Please check the URL for errors or return to the homepage to
            continue browsing.
          </p>
        </div>

        <Link to={"/"}>
          <button
            type="button"
            className="border border-gray-500 px-4 py-1 rounded-md bg-gray-300 font-medium text-sm mx-auto
            block hover:bg-gray-400/30 transition-all duration-200 hover:border-[#037bf2] text-slate-800
            dark:bg-[#151515] dark:hover:bg-[#111111] dark:text-gray-200 lg:text-lg lg:px-8 lg:py-1.5"
          >
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
