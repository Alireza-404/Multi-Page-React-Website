import AOS from "aos";
import "aos/dist/aos.css";
import { FaBolt, FaCheckCircle } from "react-icons/fa";
import { useEffect } from "react";

const Pricing = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="flex flex-col md2:grid md2:grid-cols-3 md2:gap-x-3 xl:gap-x-6 md2:items-center gap-y-5 mt-7">
      <div className="flex flex-col gap-y-5 xs:flex-row xs:gap-x-7 xs:items-center md2:hidden">
        <div
          className="flex flex-col gap-y-6 border-2 border-gray-300/50 rounded-xl p-4 bg-gray-300/15 dark:bg-[#0b0e14]
         shadow dark:border-gray-600/40 h-fit w-full"
          data-aos="flip-left"
        >
          <div className="flex flex-col gap-y-2">
            <p className="text-slate-800 dark:text-gray-200 text-lg font-medium">
              Free
            </p>

            <div className="flex items-end gap-x-2">
              <span className="text-3xl font-bold text-slate-800 dark:text-gray-200">
                $0
              </span>
              <span className="text-lg font-medium text-slate-800 dark:text-gray-200">
                per month
              </span>
            </div>
          </div>

          <span className="h-0.5 w-full bg-gray-300/50 dark:bg-gray-600/40"></span>

          <ul className="flex flex-col gap-y-4 xs:gap-y-6">
            <li className="text-slate-800 dark:text-gray-200 font-medium text-sm flex items-center gap-x-3">
              <FaCheckCircle className="text-[#1184f7] text-lg" />
              10 users included
            </li>

            <li className="text-slate-800 dark:text-gray-200 font-medium text-sm flex items-center gap-x-3">
              <FaCheckCircle className="text-[#1184f7] text-lg" /> 2 GB of
              storage
            </li>

            <li className="text-slate-800 dark:text-gray-200 font-medium text-sm flex items-center gap-x-3">
              <FaCheckCircle className="text-[#1184f7] text-lg" />
              Help center access
            </li>

            <li className="text-slate-800 dark:text-gray-200 font-medium text-sm flex items-center gap-x-3">
              <FaCheckCircle className="text-[#1184f7] text-lg" />
              Email support
            </li>
          </ul>

          <button
            type="button"
            className="border-2 border-gray-300/50 rounded-md py-2 text-sm font-medium active:bg-gray-200 transition
          duration-200 dark:border-gray-600/40 text-slate-800 dark:text-gray-200 dark:active:bg-[#141a24]
          hover:bg-[#141a24]"
          >
            Sign up for free
          </button>
        </div>

        <div
          className="flex flex-col gap-y-6 border-2 border-gray-300/25 dark:border-gray-600/40 rounded-xl p-4
         bg-[radial-gradient(circle,#47536b,#0b0e14)] dark:bg-[radial-gradient(circle,#283142,#161a23)] shadow w-full"
          data-aos="flip-right"
        >
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-200 text-lg font-medium">Professional</p>
              <div
                className="text-xs flex items-center font-medium gap-x-1 bg-gray-100 text-[#566481] px-2 py-1
            rounded-full"
              >
                <FaBolt />
                <p>Recommended</p>
              </div>
            </div>

            <div className="flex items-end gap-x-2">
              <span className="text-3xl font-bold text-gray-200">$15</span>
              <span className="text-lg font-medium text-gray-200">
                per month
              </span>
            </div>
          </div>

          <span className="h-0.5 w-full bg-gray-300/50"></span>

          <ul className="flex flex-col gap-y-4 xs:gap-y-6">
            <li className="text-gray-200 font-medium text-sm flex items-center gap-x-3">
              <FaCheckCircle className="text-[#7ab8f5] text-lg" />
              20 users included
            </li>

            <li className="text-gray-200 font-medium text-sm flex items-center gap-x-3">
              <FaCheckCircle className="text-[#7ab8f5] text-lg" /> 10 GB of
              storage
            </li>

            <li className="text-gray-200 font-medium text-sm flex items-center gap-x-3">
              <FaCheckCircle className="text-[#7ab8f5] text-lg" />
              Help center access
            </li>

            <li className="text-gray-200 font-medium text-sm flex items-center gap-x-3">
              <FaCheckCircle className="text-[#7ab8f5] text-lg" />
              Priority email support
            </li>

            <li className="text-gray-200 font-medium text-sm flex items-center gap-x-3">
              <FaCheckCircle className="text-[#7ab8f5] text-lg" />
              Dedicated team
            </li>

            <li className="text-gray-200 font-medium text-sm flex items-center gap-x-3">
              <FaCheckCircle className="text-[#7ab8f5] text-lg" />
              Best deals
            </li>
          </ul>

          <button
            type="button"
            className="bg-gradient-to-t from-[#1184f7] to-[#5aa7f4] rounded-md py-2 text-sm font-medium
           transition text-gray-200
          duration-200"
          >
            Start now
          </button>
        </div>
      </div>

      <div
        className="flex-col gap-y-6 border-2 border-gray-300/50 rounded-xl p-4 bg-gray-300/15 dark:bg-[#0b0e14]
         shadow dark:border-gray-600/40 h-fit w-full hidden md2:flex"
        data-aos="flip-left"
      >
        <div className="flex flex-col gap-y-2 md2:gap-y-3">
          <p className="text-slate-800 dark:text-gray-200 text-lg md2:text-xl font-medium">
            Free
          </p>

          <div className="flex items-end gap-x-2">
            <span className="text-3xl md2:text-4xl font-bold text-slate-800 dark:text-gray-200">
              $0
            </span>
            <span className="text-lg md2:text-xl font-medium text-slate-800 dark:text-gray-200">
              per month
            </span>
          </div>
        </div>

        <span className="h-0.5 w-full bg-gray-300/50 dark:bg-gray-600/40"></span>

        <ul className="flex flex-col gap-y-4 xs:gap-y-6">
          <li className="text-slate-800 dark:text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#1184f7] text-lg" />
            10 users included
          </li>

          <li className="text-slate-800 dark:text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#1184f7] text-lg" /> 2 GB of storage
          </li>

          <li className="text-slate-800 dark:text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#1184f7] text-lg" />
            Help center access
          </li>

          <li className="text-slate-800 dark:text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#1184f7] text-lg" />
            Email support
          </li>
        </ul>

        <button
          type="button"
          className="border-2 border-gray-300/50 rounded-md py-2 text-sm font-medium active:bg-gray-300/80 transition
          duration-200 dark:border-gray-600/40 text-slate-800 dark:text-gray-200 dark:active:bg-[#141a24]
          dark:hover:bg-[#141a24] md2:text-base hover:bg-gray-300/80"
        >
          Sign up for free
        </button>
      </div>

      <div
        className="flex-col gap-y-6 border-2 border-gray-300/25 dark:border-gray-600/40 rounded-xl p-4
         bg-[radial-gradient(circle,#47536b,#0b0e14)] dark:bg-[radial-gradient(circle,#283142,#161a23)] shadow w-full
        hidden md2:flex"
        data-aos={window.innerWidth >= 920 ? "flip-up" : "flip-right"}
      >
        <div className="flex flex-col gap-y-2 md2:gap-y-3">
          <div className="flex items-center justify-between">
            <p className="text-gray-200 text-lg md2:text-xl font-medium">
              Professional
            </p>
            <div
              className="text-xs md2:text-sm flex items-center font-medium gap-x-1 bg-gray-100 text-[#566481] px-2 py-1
            rounded-full"
            >
              <FaBolt />
              <p>Recommended</p>
            </div>
          </div>

          <div className="flex items-end gap-x-2">
            <span className="text-3xl md2:text-4xl font-bold text-gray-200">
              $15
            </span>
            <span className="text-lg md2:text-xl font-medium text-gray-200">
              per month
            </span>
          </div>
        </div>

        <span className="h-0.5 w-full bg-gray-300/50"></span>

        <ul className="flex flex-col gap-y-4 xs:gap-y-6">
          <li className="text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#7ab8f5] text-lg" />
            20 users included
          </li>

          <li className="text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#7ab8f5] text-lg" /> 10 GB of
            storage
          </li>

          <li className="text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#7ab8f5] text-lg" />
            Help center access
          </li>

          <li className="text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#7ab8f5] text-lg" />
            Priority email support
          </li>

          <li className="text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#7ab8f5] text-lg" />
            Dedicated team
          </li>

          <li className="text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#7ab8f5] text-lg" />
            Best deals
          </li>
        </ul>

        <button
          type="button"
          className="bg-gradient-to-t from-[#1184f7] to-[#5aa7f4] rounded-md py-2 text-sm font-medium
           transition text-gray-200 duration-200 md2:text-base"
        >
          Start now
        </button>
      </div>

      <div
        className="flex flex-col gap-y-6 border-2 border-gray-300/50 rounded-xl p-4 bg-gray-300/15 shadow
         dark:bg-[#0b0e14] dark:border-gray-600/40"
        data-aos="flip-right"
      >
        <div className="flex flex-col gap-y-2 md2:gap-y-3">
          <p className="text-slate-800 dark:text-gray-200 text-lg md2:text-xl font-medium">
            Enterprise
          </p>

          <div className="flex items-end gap-x-2">
            <span className="text-3xl md2:text-4xl font-bold text-slate-800 dark:text-gray-200">
              $30
            </span>
            <span className="text-lg font-medium text-slate-800 dark:text-gray-200">
              per month
            </span>
          </div>
        </div>

        <span className="h-0.5 w-full bg-gray-300/50 dark:bg-gray-600/40"></span>

        <ul className="flex flex-col gap-y-4 xs:gap-y-6">
          <li className="text-slate-800 dark:text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#1184f7] text-lg" />
            50 users included
          </li>

          <li className="text-slate-800 dark:text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#1184f7] text-lg" /> 30 GB of
            storage
          </li>

          <li className="text-slate-800 dark:text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#1184f7] text-lg" />
            Help center access
          </li>

          <li className="text-slate-800 dark:text-gray-200 font-medium text-sm md2:text-base flex items-center gap-x-3">
            <FaCheckCircle className="text-[#1184f7] text-lg" />
            Phone & email support
          </li>
        </ul>

        <button
          type="button"
          className="border-2 border-gray-300/50 rounded-md py-2 text-sm font-medium active:bg-gray-300/80 transition
          duration-200 dark:border-gray-600/40 dark:text-gray-200 dark:active:bg-[#141a24] dark:hover:bg-[#141a24]
          md2:text-base hover:bg-gray-300/80"
        >
          Contact us
        </button>
      </div>
    </div>
  );
};

export default Pricing;
