import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../redux/store";
import {
  ClearAllFields,
  UpdateBooleanField,
  UpdateStringField,
} from "../redux/slices/fieldsSlice";
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaHammer,
  FaLightbulb,
} from "react-icons/fa6";
import { FaSmile, FaTachometerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  CheckUserInSignin,
  ClearServerFields,
  SetFieldsError,
} from "../redux/slices/authSlice";
import { motion } from "framer-motion";

const SignIn = () => {
  const field = useSelector((state: RootState) => state.fields);
  const { check, status, error } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRememberTrue, setIsRememberTrue] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (field.emailForSignIn && field.passwordForSignIn) {
      try {
        await dispatch(
          CheckUserInSignin({
            email: field.emailForSignIn,
            password: field.passwordForSignIn,
          })
        ).unwrap();

        localStorage.setItem(
          "LoginInMultiPageReactWebsite",
          JSON.stringify(true)
        );
        navigate("/");
        dispatch(ClearAllFields());
      } catch {}
    } else {
      dispatch(SetFieldsError());
    }
  };

  useEffect(() => {
    dispatch(ClearServerFields());

    const getLocal = localStorage.getItem("LoginInMultiPageReactWebsite");
    const parseLocal = getLocal ? JSON.parse(getLocal) : false;

    if (parseLocal) {
      navigate("/");
    }

    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  return (
    <div
      className="min-h-screen overflow-y-auto bg-gray-100 dark:bg-[#05070a]
     overflow-x-hidden lg:flex lg:items-center lg:justify-center"
    >
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-20  
      dark:bg-blue-500/55 dark:blur-[210px] xs:dark:bg-blue-500/40 w-1/2 h-4/5 blur-[150px] bg-blue-500/20
      lg:blur-[410px] dark:lg:blur-[500px] lg:bg-blue-500/60"
      ></div>

      <Link
        to={"/"}
        onClick={() => dispatch(ClearAllFields())}
        className="md:block hidden"
      >
        <span
          className="text-slate-800 dark:text-gray-200 text-xl relative left-7 top-12 lg:text-2xl lg:left-4
        z-50 lg:cursor-pointer lg:absolute xl:left-9 xl:px-3.5 inline"
          data-aos="fade-right"
        >
          <FaArrowLeft />
        </span>
      </Link>

      <div
        className="flex flex-col items-center lg:flex-row-reverse lg:justify-center gap-y-16 lg:gap-x-28 w-full
       h-full relative z-30 pt-24 px-7"
      >
        <div
          className="shadow-lg w-full p-8 border-2 border-gray-300/50 dark:border-gray-600/40 rounded-xl
          flex flex-col gap-y-5 bg-white/80 dark:bg-[#05070aaf] max-w-[525px] lg:max-w-[450px]"
          data-aos={window.innerWidth >= 1024 ? "fade-left" : "fade-right"}
        >
          <Link
            to={"/"}
            onClick={() => dispatch(ClearAllFields())}
            className="md:hidden block"
          >
            <span
              className="text-slate-800 dark:text-gray-200 text-xl left-2 top-2
                z-50 inline"
              data-aos="fade-right"
            >
              <FaArrowLeft />
            </span>
          </Link>

          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-zzz9b5 lg:hidden"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 86 19"
            width="95"
            height="23"
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

          <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
            <h1 className="text-slate-800 dark:text-gray-200 font-bold text-[33px]">
              Sign in
            </h1>

            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <label
                  htmlFor="email-for-sign-in"
                  className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  spellCheck={false}
                  autoComplete="email"
                  name="emailForSignIn"
                  id="email-for-sign-in"
                  placeholder="your@email.com"
                  value={field.emailForSignIn}
                  className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                    ${
                      field.isEmailForSignInTrue
                        ? "border-[#027af2]"
                        : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                    dark:focus:border-gray-500/50`
                    }`}
                  onChange={(event) => {
                    const value = event.target.value;
                    dispatch(
                      UpdateStringField({ name: "emailForSignIn", value })
                    );

                    const emailRegex =
                      /^[\w.+-]+[a-zA-Z0-9]+@[\w.]+\.[a-zA-Z]{2,}$/;

                    if (emailRegex.test(value)) {
                      dispatch(
                        UpdateBooleanField({
                          name: "isEmailForSignInTrue",
                          value: true,
                        })
                      );
                    } else {
                      dispatch(
                        UpdateBooleanField({
                          name: "isEmailForSignInTrue",
                          value: false,
                        })
                      );
                    }
                  }}
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <div className="flex items-end justify-between">
                  <label
                    htmlFor="password-for-sign-in"
                    className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
                  >
                    Password
                  </label>

                  <p
                    className="text-sm text-slate-800 dark:text-gray-200 font-medium relative after:absolute
                  after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
                  after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer"
                  >
                    Forgot your password?
                  </p>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    name="passwordForSignIn"
                    id="password-for-sign-in"
                    placeholder="........"
                    value={field.passwordForSignIn}
                    className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                  bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                  placeholder:text-2xl w-full
                    ${
                      field.isPasswordForSignInTrue
                        ? "border-[#027af2]"
                        : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                    dark:focus:border-gray-500/50`
                    }`}
                    maxLength={16}
                    onChange={(event) => {
                      const value = event.target.value;
                      dispatch(
                        UpdateStringField({ name: "passwordForSignIn", value })
                      );

                      const passwordRegex = /^[\w+.!-]{8,16}[a-zA-Z0-9]+$/;

                      if (passwordRegex.test(value)) {
                        dispatch(
                          UpdateBooleanField({
                            name: "isPasswordForSignInTrue",
                            value: true,
                          })
                        );
                      } else {
                        dispatch(
                          UpdateBooleanField({
                            name: "isPasswordForSignInTrue",
                            value: false,
                          })
                        );
                      }
                    }}
                  />

                  {!showPassword ? (
                    <span
                      className="absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-500 dark:text-gray-400
                    cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    >
                      <FaEye />
                    </span>
                  ) : (
                    <span
                      className="absolute top-1/2 -translate-y-1/2 right-3.5 text-gray-500 dark:text-gray-400
                    cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    >
                      <FaEyeSlash />
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-x-2.5 my-1">
              <div
                className={`rounded border-2 border-gray-300/50 dark:border-gray-600/40
              h-5 w-5 ${
                isRememberTrue
                  ? "bg-gradient-to-t from-[#4876EE] to-[#2e53b1]"
                  : "bg-gray-300/15 dark:bg-[#0b0e14]"
              }`}
                onClick={() => setIsRememberTrue((prev) => !prev)}
              ></div>

              <span className="text-slate-800 dark:text-gray-200 font-medium text-sm lg:text-[15px]">
                Remember me
              </span>
            </div>

            <div className="flex flex-col gap-y-2.5">
              <motion.button
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                key={status}
                type="submit"
                className={`text-sm lg:text-[15px] rounded-md font-medium cursor-pointer h-9 w-full 
                  flex items-center justify-center gap-x-2.5 transition-all duration-200 relative ${
                    status === "loading"
                      ? `bg-slate-500 text-gray-200 dark:bg-gray-500 dark:text-slate-800`
                      : status === "succeeded"
                      ? "bg-green-600 dark:bg-green-500 text-white"
                      : status === "failed"
                      ? "bg-red-600 dark:bg-red-500 text-white"
                      : status === "fieldsError"
                      ? "bg-orange-600 dark:bg-orange-500 text-white"
                      : `bg-slate-800 text-gray-200 hover:bg-slate-700 dark:bg-gray-200
                   dark:text-slate-800 dark:hover:bg-white/75`
                  }`}
                disabled={status === "succeeded" || status === "loading"}
              >
                {status === "loading"
                  ? "Signing In"
                  : status === "failed"
                  ? "Try again"
                  : status === "succeeded"
                  ? "Success"
                  : status === "fieldsError"
                  ? "Fill in all fields."
                  : "Sign in"}

                {status === "loading" && (
                  <span
                    className="animate-spin w-3 h-3 rounded-full border-2 border-gray-200 dark:border-slate-800
                      border-t-transparent dark:border-t-transparent"
                  ></span>
                )}

                <span
                  className={`animate-ping w-2 h-2 rounded-full border absolute z-40 top-2 right-2 ${
                    status === "failed"
                      ? "bg-red-700 dark:bg-red-600"
                      : status === "succeeded"
                      ? "bg-green-700 dark:bg-green-600"
                      : "hidden"
                  }`}
                ></span>
              </motion.button>

              {error && check && (
                <p className="text-sm text-red-600 dark:text-red-500 font-semibold text-center">
                  {error}
                </p>
              )}
            </div>
          </form>

          <p className="text-slate-800 dark:text-gray-200 text-sm text-center">
            Don't have an account?{" "}
            <Link
              to={"/sign-up"}
              replace
              onClick={() => {
                dispatch(ClearAllFields());

                setIsRememberTrue(false);
              }}
            >
              <span
                className="text-sm text-slate-800 dark:text-gray-200 font-medium relative after:absolute
                  after:w-full after:-bottom-0.5 after:bg-gray-400/70 dark:after:bg-slate-600 hover:after:w-0
                  after:transition-all after:duration-200 after:left-0 after:h-px inline cursor-pointer"
              >
                Sign up
              </span>
            </Link>
          </p>

          <div className="flex items-center gap-x-3">
            <span className="h-px w-full bg-gray-300/50 dark:bg-gray-600/40 block"></span>

            <p className="text-sm text-slate-800 dark:text-gray-200 font-medium">
              or
            </p>

            <span className="h-px w-full bg-gray-300/50 dark:bg-gray-600/40 block"></span>
          </div>

          <button
            type="button"
            className="rounded-md border border-gray-300/50 dark:border-gray-600/40 flex items-center
            justify-center py-2 text-[15px] gap-x-1.5
            font-semibold text-slate-800 dark:text-gray-200 bg-gray-300/15 dark:bg-[#0b0e14]
            hover:bg-gray-300/40 dark:hover:bg-[#05070A] transition-all duration-200"
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-8mcbwj"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z"
                fill="#4285F4"
              ></path>
              <path
                d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98545 12.5309 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52727H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z"
                fill="#34A853"
              ></path>
              <path
                d="M3.52 9.52C3.36 9.04 3.26545 8.53091 3.26545 8C3.26545 7.46909 3.36 6.96 3.52 6.48V4.41455H0.858182C0.312727 5.49091 0 6.70545 0 8C0 9.29455 0.312727 10.5091 0.858182 11.5855L2.93091 9.97091L3.52 9.52Z"
                fill="#FBBC05"
              ></path>
              <path
                d="M8 3.18545C9.17818 3.18545 10.2255 3.59273 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.16 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.41455L3.52 6.48C4.15273 4.58909 5.92 3.18545 8 3.18545Z"
                fill="#EA4335"
              ></path>
            </svg>
            Sign in with Google
          </button>

          <button
            type="button"
            className="rounded-md border border-gray-300/50 dark:border-gray-600/40 flex items-center
            justify-center py-2 text-[15px] gap-x-1.5
            font-semibold text-slate-800 dark:text-gray-200 bg-gray-300/15 dark:bg-[#0b0e14]
            hover:bg-gray-300/40 dark:hover:bg-[#05070A] transition-all duration-200"
          >
            <svg
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-8mcbwj"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.68 15.92C2.88 15.24 0 11.96 0 8C0 3.6 3.6 0 8 0C12.4 0 16 3.6 16 8C16 11.96 13.12 15.24 9.32 15.92L8.88 15.56H7.12L6.68 15.92Z"
                fill="url(#paint0_linear_795_116)"
              ></path>
              <path
                d="M11.12 10.2391L11.48 7.99914H9.36V6.43914C9.36 5.79914 9.6 5.31914 10.56 5.31914H11.6V3.27914C11.04 3.19914 10.4 3.11914 9.84 3.11914C8 3.11914 6.72 4.23914 6.72 6.23914V7.99914H4.72V10.2391H6.72V15.8791C7.16 15.9591 7.6 15.9991 8.04 15.9991C8.48 15.9991 8.92 15.9591 9.36 15.8791V10.2391H11.12Z"
                fill="white"
              ></path>
            </svg>
            Sign in with Facebook
          </button>
        </div>

        <div
          className="flex flex-col gap-y-8 max-w-[525px] pb-12"
          data-aos={window.innerWidth >= 1024 ? "fade-right" : null}
        >
          <svg
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-zzz9b5 hidden lg:block"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 86 19"
            width="107"
            height="35"
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

          <div className="flex items-start gap-x-5">
            <FaTachometerAlt className="text-slate-700 text-xl lg:text-[22px] flex-shrink-0 dark:text-gray-400" />
            <div className="flex flex-col gap-y-1">
              <p className="text-[15px] lg:text-base font-semibold text-slate-800 dark:text-gray-200">
                Adaptable performance
              </p>
              <p className="text-[15px] text-gray-500 dark:text-gray-400">
                Our product effortlessly adjusts to your needs, boosting
                efficiency and simplifying your tasks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-x-5">
            <FaHammer className="text-slate-700 text-xl lg:text-[22px] flex-shrink-0 dark:text-gray-400" />
            <div className="flex flex-col gap-y-1">
              <p className="text-[15px] lg:text-base font-semibold text-slate-800 dark:text-gray-200">
                Built to last
              </p>
              <p className="text-[15px] text-gray-500 dark:text-gray-400">
                Experience unmatched durability that goes above and beyond with
                lasting investment.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-x-5">
            <FaSmile className="text-slate-700 text-xl lg:text-[22px] flex-shrink-0 dark:text-gray-400" />
            <div className="flex flex-col gap-y-1">
              <p className="text-[15px] lg:text-base font-semibold text-slate-800 dark:text-gray-200">
                Great user experience
              </p>
              <p className="text-[15px] text-gray-500 dark:text-gray-400">
                Integrate our product into your routine with an intuitive and
                easy-to-use interface.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-x-5">
            <FaLightbulb className="text-slate-700 text-xl lg:text-[22px] flex-shrink-0 dark:text-gray-400" />
            <div className="flex flex-col gap-y-1">
              <p className="text-[15px] lg:text-base font-semibold text-slate-800 dark:text-gray-200">
                Innovative functionality
              </p>
              <p className="text-[15px] text-gray-500 dark:text-gray-400">
                Stay ahead with features that set new standards, addressing your
                evolving needs better than the rest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
