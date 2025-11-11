import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { UpdateStringField } from "../../redux/slices/fieldsSlice";
import { Link } from "react-router-dom";

const Footer = () => {
  const field = useSelector((state: RootState) => state.fields);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <footer className="mt-[72px] mx-auto w-11/12 flex flex-col gap-y-5 pb-14 xl:max-w-[1280px]">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="flex flex-col gap-y-5">
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-zzz9b5"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 86 19"
            width="115"
            height="30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#B4C0D3"
              d="m.787 12.567 6.055-2.675 3.485 2.006.704 6.583-4.295-.035.634-4.577-.74-.422-3.625 2.817-2.218-3.697Z"
            ></path>
            <path
              fill="#00D3AB"
              d="m10.714 11.616 5.352 3.908 2.112-3.767-4.295-1.725v-.845l4.295-1.76-2.112-3.732-5.352 3.908v4.013Z"
            ></path>
            <path
              fill="#4876EF"
              d="m10.327 7.286.704-6.583-4.295.07.634 4.577-.74.422-3.66-2.816L.786 6.617l6.055 2.676 3.485-2.007Z"
            ></path>
            <path
              fill="#4876EE"
              d="M32.507 8.804v6.167h2.312v-7.86h-3.366v1.693h1.054ZM32.435 6.006c.212.22.535.33.968.33.434 0 .751-.11.953-.33.213-.23.318-.516.318-.86 0-.354-.105-.641-.318-.86-.202-.23-.52-.345-.953-.345-.433 0-.756.115-.968.344-.202.22-.303.507-.303.86 0 .345.101.632.303.861ZM24.46 14.799c.655.296 1.46.444 2.413.444.896 0 1.667-.139 2.312-.416.645-.277 1.141-.664 1.488-1.162.357-.506.535-1.094.535-1.764 0-.65-.169-1.2-.506-1.649-.328-.459-.785-.818-1.373-1.076-.587-.267-1.266-.435-2.037-.502l-.809-.071c-.481-.039-.828-.168-1.04-.388a1.08 1.08 0 0 1-.318-.774c0-.23.058-.44.173-.631.116-.201.29-.359.52-.474.241-.114.535-.172.882-.172.366 0 .67.067.91.201.053.029.104.059.15.09l.012.009.052.037c.146.111.263.243.35.395.125.21.188.444.188.703h2.311c0-.689-.159-1.286-.476-1.793-.318-.516-.776-.913-1.373-1.19-.588-.287-1.296-.43-2.124-.43-.79 0-1.474.133-2.052.4a3.131 3.131 0 0 0-1.358 1.12c-.318.487-.477 1.066-.477 1.735 0 .927.314 1.673.94 2.237.626.564 1.464.89 2.514.976l.794.071c.645.058 1.113.187 1.401.388a.899.899 0 0 1 .434.788 1.181 1.181 0 0 1-.231.717c-.154.201-.38.36-.68.474-.298.115-.669.172-1.112.172-.49 0-.89-.067-1.199-.2-.308-.144-.539-.33-.694-.56a1.375 1.375 0 0 1-.216-.746h-2.297c0 .679.168 1.281.505 1.807.337.517.834.928 1.489 1.234ZM39.977 15.07c-.8 0-1.445-.095-1.936-.286a2.03 2.03 0 0 1-1.084-.99c-.221-.469-.332-1.1-.332-1.893V8.789h-1.2V7.11h1.2V4.988h2.153V7.11h2.312V8.79h-2.312v3.198c0 .373.096.66.289.86.202.192.486.287.852.287h1.17v1.937h-1.112Z"
            ></path>
            <path
              fill="#4876EE"
              fillRule="evenodd"
              d="M43.873 14.899c.52.23 1.117.344 1.791.344.665 0 1.252-.115 1.763-.344.51-.23.934-.55 1.271-.96.337-.412.564-.88.679-1.407h-2.124c-.096.24-.279.44-.549.603-.27.162-.616.244-1.04.244-.262 0-.497-.031-.704-.093a1.572 1.572 0 0 1-.423-.194 1.662 1.662 0 0 1-.636-.803 3.159 3.159 0 0 1-.163-.645h5.784v-.775a4.28 4.28 0 0 0-.463-1.98 3.686 3.686 0 0 0-1.343-1.477c-.578-.382-1.291-.574-2.139-.574-.645 0-1.223.115-1.733.345-.501.22-.92.52-1.257.903a4.178 4.178 0 0 0-.78 1.305c-.174.478-.26.98-.26 1.506v.287c0 .507.086 1.004.26 1.492.183.478.443.913.78 1.305.347.382.775.688 1.286.918Zm-.094-4.674.02-.09a2.507 2.507 0 0 1 .117-.356c.145-.354.356-.622.636-.804.104-.067.217-.123.339-.165.204-.071.433-.107.686-.107.395 0 .723.09.983.272.27.173.472.426.607.76a2.487 2.487 0 0 1 .16.603h-3.57c.006-.038.013-.076.022-.113Z"
              clipRule="evenodd"
            ></path>
            <path
              fill="#4876EE"
              d="M50.476 14.97V7.112h1.835v1.98a4.54 4.54 0 0 1 .173-.603c.202-.536.506-.937.91-1.205.405-.277.9-.416 1.488-.416h.101c.598 0 1.094.139 1.489.416.404.268.707.67.91 1.205l.016.04.013.037.028-.077c.212-.536.52-.937.925-1.205.405-.277.901-.416 1.489-.416h.1c.598 0 1.098.139 1.503.416.414.268.727.67.94 1.205.211.535.317 1.205.317 2.008v4.475h-2.312v-4.604c0-.43-.115-.78-.346-1.047-.222-.268-.54-.402-.954-.402-.414 0-.742.139-.982.416-.241.268-.362.626-.362 1.076v4.56h-2.326v-4.603c0-.43-.115-.78-.346-1.047-.222-.268-.535-.402-.94-.402-.423 0-.756.139-.996.416-.241.268-.362.626-.362 1.076v4.56h-2.311Z"
            ></path>
            <path
              fill="#4876EE"
              fillRule="evenodd"
              d="M68.888 13.456v1.515h1.834v-4.82c0-.726-.144-1.319-.433-1.778-.289-.468-.712-.817-1.271-1.047-.549-.23-1.228-.344-2.037-.344a27.76 27.76 0 0 0-.896.014c-.318.01-.626.024-.924.043l-.229.016a36.79 36.79 0 0 0-.552.042v1.936a81.998 81.998 0 0 1 1.733-.09 37.806 37.806 0 0 1 1.171-.025c.424 0 .732.1.925.301.193.201.289.502.289.904v.029h-1.43c-.704 0-1.325.09-1.864.272-.54.172-.959.445-1.257.818-.299.363-.448.832-.448 1.405 0 .526.12.98.361 1.363.24.373.573.66.997.86.433.201.934.302 1.502.302.55 0 1.012-.1 1.388-.302.385-.2.683-.487.895-.86a2.443 2.443 0 0 0 .228-.498l.018-.056Zm-.39-1.397v-.63h-1.445c-.405 0-.718.1-.939.3-.212.192-.318.455-.318.79 0 .157.026.3.08.429a.99.99 0 0 0 .238.345c.221.191.534.287.939.287a2.125 2.125 0 0 0 .394-.038c.106-.021.206-.052.3-.092.212-.095.385-.253.52-.473.135-.22.212-.526.23-.918Z"
              clipRule="evenodd"
            ></path>
            <path
              fill="#4876EE"
              d="M72.106 14.97V7.11h1.835v2.595c.088-.74.31-1.338.665-1.791.481-.603 1.174-.904 2.08-.904h.303v1.98h-.578c-.635 0-1.127.172-1.473.516-.347.334-.52.822-.52 1.463v4.001h-2.312ZM79.92 11.298h.767l2.499 3.672h2.6l-3.169-4.51 2.606-3.35h-2.427l-2.875 3.737V4.5h-2.312v10.47h2.312v-3.672Z"
            ></path>
          </svg>

          <div className="flex flex-col gap-y-0.5">
            <p className="text-base xs:text-lg lg:text-[21px] font-semibold text-slate-800 dark:text-gray-200">
              Join the newsletter
            </p>

            <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-base lg:text-[17px]">
              Subscribe for weekly updates. No spams ever!
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="footer-email-input"
              className="text-sm xs:text-base text-slate-800 dark:text-gray-200 lg:text-[17px]"
            >
              Email
            </label>

            <div className="flex gap-x-3 lg:gap-x-4">
              <input
                type="email"
                id="footer-email-input"
                spellCheck={false}
                placeholder="Your email address"
                value={field.enterEmailInFooter}
                onChange={(event) => {
                  const value = event.target.value;
                  dispatch(
                    UpdateStringField({ name: "enterEmailInFooter", value })
                  );
                }}
                className="text-sm font-medium text-slate-800 border-2 border-gray-300/50 px-2.5 py-1.5 rounded-md
                flex-grow focus:border-gray-400/65 dark:text-gray-200 dark:border-gray-600/40 outline-none 
                bg-transparent xs:text-base lg:text-[17px] lg:w-64 xl:w-96"
              />
              <button
                type="button"
                className="bg-slate-800 rounded-md hover:bg-slate-700 text-gray-100 font-semibold py-1.5 px-2.5
              transition duration-200 dark:bg-gray-200 dark:hover:bg-white/75 dark:text-[#05070a] text-sm xs:text-base
              lg:text-[17px]"
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="py-5 lg:hidden">
            <span className="bg-gray-300/50 dark:bg-gray-600/40 dark:h-px block w-full h-0.5"></span>
          </div>
        </div>

        <div className="hidden sm:flex items-start gap-x-10 select-none">
          <div className="flex flex-col gap-y-3 lg:gap-y-6">
            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                Features
              </p>
            </Link>

            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                About us
              </p>
            </Link>

            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                Terms
              </p>
            </Link>
          </div>

          <div className="flex flex-col gap-y-3 lg:gap-y-6">
            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                Testimonials
              </p>
            </Link>

            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                Careers
              </p>
            </Link>

            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                Privacy
              </p>
            </Link>
          </div>

          <div className="flex flex-col gap-y-3 lg:gap-y-6">
            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                Highlights
              </p>
            </Link>

            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                Press
              </p>
            </Link>

            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                Contact
              </p>
            </Link>
          </div>

          <div className="flex flex-col gap-y-3 lg:gap-y-6">
            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                Pricing
              </p>
            </Link>

            <Link to={"#"}>
              <p
                className="text-base text-gray-500 dark:text-gray-400 font-medium relative after:absolute
            after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
            after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer lg:text-lg"
              >
                FAQs
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-5 hidden sm:block select-none">
        <span className="bg-gray-300/50 dark:bg-gray-600/40 dark:h-px block w-full h-0.5"></span>
      </div>

      <div className="flex items-center justify-between select-none">
        <div className="flex flex-col gap-y-3">
          <p className="text-sm xs:text-base lg:text-lg text-slate-800 dark:text-gray-400 select-none flex gap-x-4 cursor-pointer">
            <span
              className="relative after:absolute after:w-full after:-bottom-0.5 after:left-0 
                dark:after:bg-slate-600 after:h-px hover:after:w-0 after:transition-all after:duration-200
                after:bg-gray-400/70"
            >
              Privacy Policy
            </span>{" "}
            •{" "}
            <span
              className="relative after:absolute after:w-full after:-bottom-0.5
                 after:left-0 dark:after:bg-slate-600 after:h-px hover:after:w-0 after:transition-all after:duration-200
                 after:bg-gray-400/70"
            >
              Terms of Service
            </span>
          </p>

          <p className="text-sm xs:text-base lg:text-lg text-slate-800 dark:text-gray-400 cursor-pointer">
            Copyright ©{" "}
            <span
              className="relative after:absolute after:w-full after:-bottom-0.5
                 after:left-0 dark:after:bg-slate-600 after:h-px hover:after:w-0 after:transition-all after:duration-200
                 after:bg-gray-400/70"
            >
              Sitemark 2025
            </span>
          </p>
        </div>

        <div className="flex items-center gap-x-1.5">
          <a
            href={"http://github.com/Alireza-404"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="p-2 md2:p-3 lg:p-4 rounded-lg border border-gray-300/50 hover:bg-gray-200
             transition duration-200 dark:hover:bg-[#333b4d64] cursor-pointer"
            >
              <FaGithub className="text-slate-800 dark:text-gray-200 md2:text-xl lg:text-2xl" />
            </div>
          </a>

          <div
            className="p-2 md2:p-3 lg:p-4 rounded-lg border border-gray-300/50 hover:bg-gray-200
             transition duration-200 dark:hover:bg-[#333b4d4d] cursor-pointer"
          >
            <FaXTwitter className="text-slate-800 dark:text-gray-200 md2:text-xl lg:text-2xl" />
          </div>

          <div
            className="p-2 md2:p-3 lg:p-4 rounded-lg border border-gray-300/50 hover:bg-gray-200
             transition duration-200 dark:hover:bg-[#333b4d4d] cursor-pointer"
          >
            <FaLinkedin className="text-slate-800 dark:text-gray-200 md2:text-xl lg:text-2xl" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
