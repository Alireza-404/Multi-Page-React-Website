import { useDispatch, useSelector } from "react-redux";
import {
  UpdateBooleanField,
  UpdateStringField,
} from "../../redux/slices/fieldsSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { MonthsData } from "../../data/monthsData";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { MdNumbers } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { formatPhoneNumber } from "../../utils/persianPhoneNumber";
import {
  ClearServerFields,
  SetFieldsError,
  SignupUser,
} from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  setShowSecondBoxSignup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  uid: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  age: number;
  phoneNumber?: string;
  dateOfBirth: string;
  gender?: string;
}

const SecondSignupBox = ({ setShowSecondBoxSignup }: Props) => {
  const field = useSelector((state: RootState) => state.fields);
  const { status, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);
  const [monthText, setMonthText] = useState<string | null>("Select Month...");
  const [monthValue, setMonthValue] = useState<string | null>(null);

  const [maleChackBox, setMaleCheckBox] = useState<boolean>(false);
  const [femaleChackBox, setFemaleCheckBox] = useState<boolean>(false);
  const [notSayedGender, setNotSayedGender] = useState<boolean>(false);

  const [firstCode, setFirstCode] = useState<number>(0);
  const [secondCode, setSecondCode] = useState<number>(0);

  const date = new Date();
  const nowYear = date.getFullYear();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      field.isFirstNameForSignUpTrue &&
      field.isLastNameForSignUpTrue &&
      field.isAgeForSignUpTrue &&
      field.isYearForSignUpTrue &&
      field.isMonthForSignUpTrue &&
      field.isDayForSignUpTrue &&
      (maleChackBox || femaleChackBox || notSayedGender) &&
      field.codeForSignUp &&
      monthValue
    ) {
      const userData: User = {
        uid: crypto.randomUUID(),
        username: field.userNameForSignUp,
        firstname: field.firstNameForSignUp,
        lastname: field.lastNameForSignUp,
        email: field.emailForSignUp,
        password: field.passwordForSignUp,
        age: Number(field.ageForSignUp),
        dateOfBirth: `${
          field.yearForSignUp
        }/${monthValue}/${field.dayForSignUp.padStart(2, "0")}`,
      };

      if (field.isPhoneNumberForSignUpTrue) {
        userData.phoneNumber = field.phoneNumberForSignUp;
      }

      if (maleChackBox) {
        userData.gender = "Male";
      } else if (femaleChackBox) {
        userData.gender = "Female";
      } else {
        userData.gender = "NotSayedGender";
      }

      try {
        await dispatch(SignupUser(userData)).unwrap();

        setTimeout(() => {
          navigate("/sign-in");
        }, 1200);
      } catch {}
    } else {
      dispatch(SetFieldsError());
    }
  };

  const generatingCode = () => {
    const code1 = Math.floor(Math.random() * 10) + 1;
    const code2 = Math.floor(Math.random() * 10) + 1;

    setFirstCode(code1);
    setSecondCode(code2);
  };

  useEffect(() => {
    generatingCode();
    dispatch(ClearServerFields());
  }, []);

  useEffect(() => {
    if (status === "failed" || status === "idle") {
      dispatch(UpdateStringField({ name: "codeForSignUp", value: "" }));
      dispatch(
        UpdateBooleanField({ name: "isCodeForSignUpTrue", value: false })
      );

      generatingCode();
    }
  }, [status]);

  return (
    <div
      className="flex justify-center items-center w-full px-7
        h-full relative z-30"
    >
      <div
        className="shadow-lg w-full p-8 border-2 border-gray-300/50 dark:border-gray-600/40 rounded-xl
          flex flex-col gap-y-5 bg-white/80 dark:bg-[#05070aaf] max-w-[525px] lg:max-w-[550px] mt-14"
        data-aos={innerWidth >= 1024 ? "fade-right" : "fade-left"}
      >
        <svg
          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-zzz9b5"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 86 19"
          width={window.innerWidth >= 1024 ? "105" : "95"}
          height={window.innerWidth >= 1024 ? "28" : "23"}
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
            Sign up
          </h1>

          <div className="grid grid-cols-3 gap-x-2.5">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="firstname-for-sign-up"
                className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
              >
                First name
              </label>
              <input
                type="text"
                autoComplete="name"
                name="firstNameForSignup"
                id="firstname-for-sign-up"
                placeholder="Alireza"
                value={field.firstNameForSignUp}
                maxLength={18}
                className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                              ${
                                field.isFirstNameForSignUpTrue
                                  ? "border-[#027af2]"
                                  : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                                dark:focus:border-gray-500/50`
                              }`}
                onChange={(event) => {
                  const value = event.target.value;
                  dispatch(
                    UpdateStringField({ name: "firstNameForSignUp", value })
                  );

                  const firstnameRegex =
                    /^(?=.{3,18}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/;

                  if (firstnameRegex.test(value)) {
                    dispatch(
                      UpdateBooleanField({
                        name: "isFirstNameForSignUpTrue",
                        value: true,
                      })
                    );
                  } else {
                    dispatch(
                      UpdateBooleanField({
                        name: "isFirstNameForSignUpTrue",
                        value: false,
                      })
                    );
                  }
                }}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="lastname-for-sign-up"
                className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
              >
                Last name
              </label>
              <input
                type="text"
                autoComplete="family-name"
                name="lastNameForSignup"
                id="lastname-for-sign-up"
                placeholder="Shabani"
                value={field.lastNameForSignUp}
                maxLength={18}
                className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                              ${
                                field.isLastNameForSignUpTrue
                                  ? "border-[#027af2]"
                                  : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                                dark:focus:border-gray-500/50`
                              }`}
                onChange={(event) => {
                  const value = event.target.value;
                  dispatch(
                    UpdateStringField({ name: "lastNameForSignUp", value })
                  );

                  const lastnameRegex =
                    /^(?=.{3,18}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/;

                  if (lastnameRegex.test(value)) {
                    dispatch(
                      UpdateBooleanField({
                        name: "isLastNameForSignUpTrue",
                        value: true,
                      })
                    );
                  } else {
                    dispatch(
                      UpdateBooleanField({
                        name: "isLastNameForSignUpTrue",
                        value: false,
                      })
                    );
                  }
                }}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="age-for-sign-up"
                className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
              >
                Age
              </label>
              <input
                type="text"
                name="ageForSignup"
                id="age-for-sign-up"
                placeholder="18"
                value={field.ageForSignUp}
                maxLength={2}
                className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                            ${
                              field.isAgeForSignUpTrue
                                ? "border-[#027af2]"
                                : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                              dark:focus:border-gray-500/50`
                            }`}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");
                  dispatch(UpdateStringField({ name: "ageForSignUp", value }));

                  if (value.length === 1 || value.length === 2) {
                    dispatch(
                      UpdateBooleanField({
                        name: "isAgeForSignUpTrue",
                        value: true,
                      })
                    );
                  } else {
                    dispatch(
                      UpdateBooleanField({
                        name: "isAgeForSignUpTrue",
                        value: false,
                      })
                    );
                  }
                }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-x-2.5">
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="year-for-sign-up"
                className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
              >
                Year
              </label>
              <input
                type="text"
                name="yearForSignup"
                id="year-for-sign-up"
                placeholder="YYYY"
                value={field.yearForSignUp}
                maxLength={4}
                className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                            ${
                              field.isYearForSignUpTrue
                                ? "border-[#027af2]"
                                : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                              dark:focus:border-gray-500/50`
                            }`}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");
                  const numberValue = Number(value);
                  dispatch(UpdateStringField({ name: "yearForSignUp", value }));

                  if (
                    value.length === 4 &&
                    numberValue <= nowYear &&
                    numberValue >= nowYear - 100
                  ) {
                    dispatch(
                      UpdateBooleanField({
                        name: "isYearForSignUpTrue",
                        value: true,
                      })
                    );
                  } else {
                    dispatch(
                      UpdateBooleanField({
                        name: "isYearForSignUpTrue",
                        value: false,
                      })
                    );
                  }
                }}
              />
            </div>

            <div className="hidden flex-col gap-y-2 md:flex">
              <label
                htmlFor="mounth-for-sign-up"
                className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
              >
                Month
              </label>

              <div className="relative">
                <button
                  type="button"
                  className={`appearance-none text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                 bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200 w-full text-start
                 ${
                   field.isMonthForSignUpTrue
                     ? "border-[#027af2]"
                     : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                   dark:focus:border-gray-500/50`
                 }`}
                  onClick={() => {
                    setShowMonthDropdown((prev) => !prev);
                  }}
                >
                  {monthText}
                  <span className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-800 dark:text-gray-200 text-xs">
                    <FaChevronDown />
                  </span>
                </button>

                <AnimatePresence>
                  {showMonthDropdown && (
                    <motion.ul
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      exit={{ scaleY: 0, opacity: 0 }}
                      className="absolute z-40 w-full h-[148px] overflow-y-auto origin-top scroll 
                    light-scroll-for-month-dropdown dark:dark-scroll-for-month-dropdown mt-2 rounded-md overflow-hidden
                    border border-gray-300/50 dark:border-gray-600/40 divide-y divide-gray-300/50
                    dark:divide-gray-600/40"
                    >
                      {MonthsData.map((month) => (
                        <li
                          key={month.value}
                          className="text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2
                        bg-gray-200 dark:bg-[#0b0e14] outline-none transition-all duration-200 w-full
                         text-start cursor-pointer relative z-50"
                          onClick={(event) => {
                            const target = event.target as HTMLElement;
                            setMonthText(target.textContent);
                            setMonthValue(month.value);
                            setShowMonthDropdown(false);
                            dispatch(
                              UpdateBooleanField({
                                name: "isMonthForSignUpTrue",
                                value: true,
                              })
                            );
                          }}
                        >
                          {month.label}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="day-for-sign-up"
                className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
              >
                Day
              </label>
              <input
                type="text"
                name="dayForSignup"
                id="day-for-sign-up"
                placeholder="DD"
                value={field.dayForSignUp}
                maxLength={2}
                className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                            ${
                              field.isDayForSignUpTrue
                                ? "border-[#027af2]"
                                : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                              dark:focus:border-gray-500/50`
                            }`}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");
                  const numberValue = Number(value);
                  dispatch(UpdateStringField({ name: "dayForSignUp", value }));

                  if (
                    (value.length === 1 || value.length === 2) &&
                    numberValue <= 31 &&
                    numberValue >= 1
                  ) {
                    dispatch(
                      UpdateBooleanField({
                        name: "isDayForSignUpTrue",
                        value: true,
                      })
                    );
                  } else {
                    dispatch(
                      UpdateBooleanField({
                        name: "isDayForSignUpTrue",
                        value: false,
                      })
                    );
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 md:hidden">
            <label
              htmlFor="mounth-for-sign-up"
              className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
            >
              Month
            </label>

            <div className="relative">
              <button
                type="button"
                className={`appearance-none text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                 bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200 w-full text-start
                 ${
                   field.isMonthForSignUpTrue
                     ? "border-[#027af2]"
                     : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                   dark:focus:border-gray-500/50`
                 }`}
                onClick={() => {
                  setShowMonthDropdown((prev) => !prev);
                }}
              >
                {monthText}
                <span className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-800 dark:text-gray-200 text-xs">
                  <FaChevronDown />
                </span>
              </button>

              <AnimatePresence>
                {showMonthDropdown && (
                  <motion.ul
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    className="absolute z-50 w-full h-[148px] overflow-y-auto origin-top scroll 
                    light-scroll-for-month-dropdown dark:dark-scroll-for-month-dropdown mt-2 rounded-md overflow-hidden
                    border border-gray-300/50 dark:border-gray-600/40 divide-y divide-gray-300/50
                    dark:divide-gray-600/40"
                  >
                    {MonthsData.map((month) => (
                      <li
                        key={month.value}
                        className="text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2
                        bg-gray-200 dark:bg-[#0b0e14] outline-none transition-all duration-200 w-full
                         text-start cursor-pointer"
                        onClick={(event) => {
                          const target = event.target as HTMLElement;
                          setMonthText(target.textContent);
                          setMonthValue(month.value);
                          setShowMonthDropdown(false);
                          dispatch(
                            UpdateBooleanField({
                              name: "isMonthForSignUpTrue",
                              value: true,
                            })
                          );
                        }}
                      >
                        {month.label}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-x-5 gap-y-1 flex-wrap">
            <div className="flex items-center gap-x-2.5 my-1">
              <div
                className={`rounded border-2 border-gray-300/50 dark:border-gray-600/40
                  h-5 w-5 ${
                    maleChackBox
                      ? "bg-gradient-to-t from-[#4876EE] to-[#2e53b1]"
                      : "bg-gray-300/15 dark:bg-[#0b0e14]"
                  }`}
                onClick={() => {
                  setMaleCheckBox((prev) => !prev);
                  setFemaleCheckBox(false);
                  setNotSayedGender(false);
                }}
              ></div>

              <span className="text-slate-800 dark:text-gray-200 font-medium text-sm lg:text-[15px]">
                Mail
              </span>
            </div>

            <div className="flex items-center gap-x-2.5 my-1">
              <div
                className={`rounded border-2 border-gray-300/50 dark:border-gray-600/40
                  h-5 w-5 ${
                    femaleChackBox
                      ? "bg-gradient-to-t from-[#d248ee] to-[#ad2eb1]"
                      : "bg-gray-300/15 dark:bg-[#0b0e14]"
                  }`}
                onClick={() => {
                  setFemaleCheckBox((prev) => !prev);
                  setMaleCheckBox(false);
                  setNotSayedGender(false);
                }}
              ></div>

              <span className="text-slate-800 dark:text-gray-200 font-medium text-sm lg:text-[15px]">
                Female
              </span>
            </div>

            <div className="flex items-center gap-x-2.5 my-1">
              <div
                className={`rounded border-2 border-gray-300/50 dark:border-gray-600/40
                  h-5 w-5 ${
                    notSayedGender
                      ? "bg-gradient-to-t from-[#505664] to-[#3a4050]"
                      : "bg-gray-300/15 dark:bg-[#0b0e14]"
                  }`}
                onClick={() => {
                  setNotSayedGender((prev) => !prev);
                  setMaleCheckBox(false);
                  setFemaleCheckBox(false);
                }}
              ></div>

              <span className="text-slate-800 dark:text-gray-200 font-medium text-sm lg:text-[15px]">
                Prefer not to say
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2.5">
            <div className="relative">
              <input
                type="text"
                value={field.codeForSignUp}
                name="codeForSignUp"
                maxLength={2}
                className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                            w-full
                            ${
                              field.isCodeForSignUpTrue
                                ? "border-[#027af2]"
                                : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                              dark:focus:border-gray-500/50`
                            }`}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");
                  const numberValue = Number(value);

                  dispatch(UpdateStringField({ name: "codeForSignUp", value }));

                  if (numberValue === firstCode + secondCode) {
                    dispatch(
                      UpdateBooleanField({
                        name: "isCodeForSignUpTrue",
                        value: true,
                      })
                    );
                  } else {
                    dispatch(
                      UpdateBooleanField({
                        name: "isCodeForSignUpTrue",
                        value: false,
                      })
                    );
                  }
                }}
              />

              <span className="absolute top-1/2 -translate-y-1/2 right-2.5">
                <MdNumbers className="text-slate-800 dark:text-gray-200" />
              </span>
            </div>

            <div
              className="border border-gray-300/50 dark:border-gray-600/40 rounded-md flex items-center
              justify-center px-2.5 py-2 text-sm"
            >
              <p className="text-slate-800 dark:text-gray-200 font-medium shadow-inner">
                {firstCode} + {secondCode} ={" "}
                <span className="text-[#027af2] font-bold">?</span>
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="phone-number-for-sign-up"
                className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold
                flex items-center gap-x-1"
              >
                Phone number{" "}
                <p className="text-xs">
                  <span className="text-[#027af2]">(</span>Optional
                  <span className="text-[#027af2]">)</span>
                </p>
              </label>

              <div className="grid grid-cols-[30%_1fr] lg:grid-cols-[25%_1fr] gap-x-2.5">
                <div
                  className="px-2.5 py-2 rounded-md border border-gray-300/50
                   dark:border-gray-600/40 focus:border-gray-400/65 dark:focus:border-gray-500/50 flex items-center
                   gap-x-1 md:gap-x-2.5 lg:justify-center"
                >
                  <div className="rounded-[2.5px] overflow-hidden">
                    <div className="bg-green-600 dark:bg-green-500 w-6 md:w-8 h-[5px]"></div>
                    <div className="bg-white w-6 md:w-8 h-[5px]"></div>
                    <div className="bg-red-600 dark:bg-red-500 w-6 md:w-8 h-[5px]"></div>
                  </div>

                  <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                    <span className="text-[#027af2]">+</span>98
                  </p>
                </div>

                <div className="relative w-full">
                  <input
                    type="tel"
                    name="phoneNumberForSignup"
                    id="phone-number-for-sign-up"
                    placeholder="904 ••• 0260"
                    value={formatPhoneNumber(field.phoneNumberForSignUp)}
                    maxLength={12}
                    className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                            w-full
                            ${
                              field.isPhoneNumberForSignUpTrue
                                ? "border-[#027af2]"
                                : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                              dark:focus:border-gray-500/50`
                            }`}
                    onChange={(event) => {
                      const value = event.target.value.replace(/\D/g, "");

                      dispatch(
                        UpdateStringField({
                          name: "phoneNumberForSignUp",
                          value,
                        })
                      );

                      if (value.charAt(0) === "9" && value.length === 10) {
                        dispatch(
                          UpdateBooleanField({
                            name: "isPhoneNumberForSignUpTrue",
                            value: true,
                          })
                        );
                      } else {
                        dispatch(
                          UpdateBooleanField({
                            name: "isPhoneNumberForSignUpTrue",
                            value: false,
                          })
                        );
                      }
                    }}
                  />

                  <span className="absolute top-1/2 -translate-y-1/2 right-2.5">
                    <BsTelephone className="text-slate-800 dark:text-gray-200 text-sm md:text-[15px]" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2.5">
            <button
              type="button"
              className="text-sm lg:text-base rounded-md cursor-pointer border-2 border-gray-300/50 dark:border-gray-600/40
                h-9 w-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 dark:text-gray-200
                flex items-center justify-center font-medium"
              onClick={() => {
                setShowSecondBoxSignup(false);
                dispatch(
                  UpdateStringField({ name: "codeForSignUp", value: "" })
                );

                dispatch(
                  UpdateBooleanField({
                    name: "isCodeForSignUpTrue",
                    value: false,
                  })
                );
              }}
            >
              Back
            </button>

            <motion.button
              animate={{ scale: [1, -1, 1] }}
              transition={{ duration: 0.3, ease: "linear" }}
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
                ? "Signing up..."
                : status === "failed"
                ? "Try again"
                : status === "succeeded"
                ? "Success"
                : status === "fieldsError"
                ? "Fill in all fields."
                : "Sign up"}

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
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-500 font-semibold text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SecondSignupBox;
