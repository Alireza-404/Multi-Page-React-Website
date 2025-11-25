import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  UpdateBooleanField,
  UpdateStringField,
} from "../../redux/slices/fieldsSlice";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { MonthsData } from "../../data/monthsData";
import { formatPhoneNumber } from "../../utils/persianPhoneNumber";
import { BsTelephone } from "react-icons/bs";
import {
  ClearServerFields,
  GetUser,
  setFieldErrorForUpdateUser,
  UpdateUser,
} from "../../redux/slices/authSlice";
import ParticlesConfig from "../particlesConfig/particlesConfig";

interface Props {
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  showLoader: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserForEdit {
  firstname: string;
  lastname: string;
  age: number;
  phoneNumber?: string;
  dateOfBirth: string;
  gender?: string;
}

const EditModal = ({
  showEditModal,
  setShowEditModal,
  showLoader,
  setShowLoader,
}: Props) => {
  const field = useSelector((state: RootState) => state.fields);
  const { user, error, updateUserStatusForEditModal, status } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const [uid, setUid] = useState<string | null | undefined>(null);
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

  const [maleChackBox, setMaleCheckBox] = useState<boolean>(false);
  const [femaleChackBox, setFemaleCheckBox] = useState<boolean>(false);
  const [notSayedGender, setNotSayedGender] = useState<boolean>(false);

  const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);
  const [monthText, setMonthText] = useState<string | null>("Select Month...");
  const [monthValue, setMonthValue] = useState<string | null>(null);

  const date = new Date();
  const nowYear = date.getFullYear();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      field.firstNameForEdit &&
      field.lastNameForEdit &&
      field.ageForEdit &&
      field.yearForEdit &&
      field.monthForEdit &&
      field.dayForEdit &&
      (maleChackBox || femaleChackBox || notSayedGender) &&
      monthValue
    ) {
      const userData: UserForEdit = {
        firstname: field.firstNameForEdit,
        lastname: field.lastNameForEdit,
        age: Number(field.ageForEdit),
        dateOfBirth: `${
          field.yearForEdit
        }/${monthValue}/${field.dayForEdit.padStart(2, "0")}`,
      };

      if (field.phoneNumberForEdit) {
        userData.phoneNumber = field.phoneNumberForEdit;
      }

      if (maleChackBox) {
        userData.gender = "Male";
      } else if (femaleChackBox) {
        userData.gender = "Female";
      } else {
        userData.gender = "NotSayedGender";
      }

      try {
        if (isUserLogged && uid) {
          await dispatch(UpdateUser({ uid, data: userData })).unwrap();

          setTimeout(() => {
            setShowEditModal(false);
            setShowLoader(false);
          }, 1200);
        }
      } catch {}
    } else {
      console.log(field.firstNameForEdit, field.lastNameForEdit);
      dispatch(setFieldErrorForUpdateUser());
    }
  };

  // Get User
  useEffect(() => {
    setShowLoader(false);
    dispatch(ClearServerFields());

    const getUid = localStorage.getItem("uid");
    const getUidFromSession = sessionStorage.getItem("uid");

    const getIsUserLogged = localStorage.getItem(
      "LoginInMultiPageReactWebsite"
    );
    const getIsUserLoggedFromSession = sessionStorage.getItem(
      "SessionLoginInMultiPageReactWebsite"
    );

    if (getUid && getIsUserLogged && JSON.parse(getIsUserLogged)) {
      setUid(getUid);
      setIsUserLogged(JSON.parse(getIsUserLogged));
      dispatch(GetUser(getUid));
    } else if (
      getUidFromSession &&
      getIsUserLoggedFromSession &&
      JSON.parse(getIsUserLoggedFromSession)
    ) {
      setUid(getUidFromSession);
      setIsUserLogged(JSON.parse(getIsUserLoggedFromSession));
      dispatch(GetUser(getUidFromSession));
    } else {
      setUid(null);
      setIsUserLogged(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") {
      setShowLoader(true);
    } else {
      const timer: NodeJS.Timeout = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (status === "succeeded" && user) {
      const foundMonth = MonthsData.find(
        (month) => month.value === user.dateOfBirth.slice(5, 7)
      );

      if (foundMonth) {
        setMonthText(foundMonth.label);
      }

      dispatch(
        UpdateStringField({ name: "firstNameForEdit", value: user?.firstname })
      );
      dispatch(
        UpdateStringField({ name: "lastNameForEdit", value: user?.lastname })
      );
      dispatch(
        UpdateStringField({ name: "ageForEdit", value: String(user?.age) })
      );
      dispatch(
        UpdateStringField({
          name: "yearForEdit",
          value: user?.dateOfBirth.slice(0, 4),
        })
      );
      dispatch(
        UpdateStringField({
          name: "monthForEdit",
          value: user?.dateOfBirth.slice(5, 7),
        })
      );
      dispatch(
        UpdateStringField({
          name: "dayForEdit",
          value: user?.dateOfBirth.slice(8, 10),
        })
      );
      dispatch(
        UpdateStringField({
          name: "phoneNumberForEdit",
          value: String(user?.phoneNumber),
        })
      );

      dispatch(
        UpdateBooleanField({ name: "isFirstNameForEditTrue", value: true })
      );
      dispatch(
        UpdateBooleanField({ name: "isLastNameForEditTrue", value: true })
      );
      dispatch(UpdateBooleanField({ name: "isAgeForEditTrue", value: true }));
      dispatch(UpdateBooleanField({ name: "isYearForEditTrue", value: true }));
      dispatch(UpdateBooleanField({ name: "isMonthForEditTrue", value: true }));
      dispatch(UpdateBooleanField({ name: "isDayForEditTrue", value: true }));
      dispatch(
        UpdateBooleanField({ name: "isPhoneNumberForEditTrue", value: true })
      );

      setMaleCheckBox(user.gender === "Male" ? true : false);
      setFemaleCheckBox(user.gender === "Female" ? true : false);
      setNotSayedGender(user.gender === "NotSayedGender" ? true : false);
      setMonthValue(user?.dateOfBirth ? user.dateOfBirth.slice(5, 7) : null);
    }
  }, [status, user]);

  return (
    <AnimatePresence mode="wait">
      {showEditModal &&
        (showLoader ? (
          <motion.div
            key={"loading"}
            initial={{ opacity: 0, y: "-100%", x: "-50%" }}
            animate={{ opacity: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, y: "100%", x: "-50%" }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#05070a]
             border-gray-300/50 dark:border-gray-600/40 rounded-md flex items-center justify-center
              border-2 h-96 w-11/12 md:w-96 lg:w-[700px] xl:w-[640px] overflow-hidden"
          >
            <ParticlesConfig
              showSecondConfig={true}
              className="w-full h-full top-0 left-0 absolute z-10"
            />

            <motion.p
              animate={{ backgroundPosition: ["0% 200%", "200% 0%"] }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              className="md:text-6xl text-[44px] text-transparent bg-clip-text bg-gradient-to-r from-[#0272f2] via-[#4beea7]
              to-[#0272f2] font-bold font-mono flex items-center select-none h-24 relative z-20"
              style={{ backgroundSize: "200% 200%" }}
            >
              Loading
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#27f2ff] via-[#4beea7] to-[#0272f2]"
                  style={{
                    WebkitBackgroundClip: "text",
                    filter:
                      "drop-shadow(0 0 6px rgba(75,238,167,0.8)) drop-shadow(0 0 4px rgba(2,114,242,0.8))",
                  }}
                  animate={{
                    y: [-25, 0, 0, 25],
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4 * 0.4,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                >
                  .
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        ) : error ? (
          <motion.div
            key={"error"}
            initial={{ opacity: 0, y: "-100%", x: "-50%" }}
            animate={{
              opacity: 1,
              y: "-50%",
              x: "-50%",
            }}
            exit={{ opacity: 0, y: "100%", x: "-50%" }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r            
             border-gray-400 dark:border-white rounded-md flex items-center justify-center
              border-2 h-96 w-11/12 md:w-96 lg:w-[700px] xl:w-[640px] bg-white dark:bg-[#05070a]"
          >
            <ParticlesConfig
              showFireConfig={true}
              className="w-full h-full top-0 left-0 absolute z-10"
            />

            <motion.p
              animate={{ backgroundPosition: ["0% 200%", "200% 0%"] }}
              transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
              className="md:text-5xl py-2 text-[44px] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400
              to-white font-bold font-mono flex items-center select-none px-2 text-center relative z-20"
              style={{ backgroundSize: "200% 200%" }}
            >
              {error}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key={"editModal"}
            initial={{ opacity: 0, y: "-100%", x: "-50%" }}
            animate={{ opacity: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, y: "100%", x: "-50%" }}
            className="
            bg-white dark:bg-[#05070a] border-2 border-gray-300/50 dark:border-gray-600/40
            rounded-md w-11/12 md:w-[565px] lg:w-[700px] xl:w-[640px] fixed z-50 left-1/2 top-1/2"
          >
            <form
              className="flex flex-col gap-y-5 p-5 "
              onSubmit={handleSubmit}
            >
              <h1 className="text-slate-800 dark:text-gray-200 font-bold text-[33px]">
                Edit information
              </h1>

              <div className="grid grid-cols-3 gap-x-2.5">
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="firstname-for-edit"
                    className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    name="firstNameForEdit"
                    id="firstname-for-edit"
                    placeholder="Alireza"
                    spellCheck={false}
                    value={field.firstNameForEdit}
                    maxLength={18}
                    className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                              ${
                                field.isFirstNameForEditTrue
                                  ? "border-[#027af2]"
                                  : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                                dark:focus:border-gray-500/50`
                              }`}
                    onChange={(event) => {
                      const value = event.target.value;
                      dispatch(
                        UpdateStringField({ name: "firstNameForEdit", value })
                      );

                      const firstnameRegex =
                        /^(?=.{3,18}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/;

                      if (firstnameRegex.test(value)) {
                        dispatch(
                          UpdateBooleanField({
                            name: "isFirstNameForEditTrue",
                            value: true,
                          })
                        );
                      } else {
                        dispatch(
                          UpdateBooleanField({
                            name: "isFirstNameForEditTrue",
                            value: false,
                          })
                        );
                      }
                    }}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="lastname-for-edit"
                    className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    autoComplete="family-name"
                    name="lastNameForEdit"
                    id="lastname-for-edit"
                    spellCheck={false}
                    placeholder="Shabani"
                    value={field.lastNameForEdit}
                    maxLength={18}
                    className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                              ${
                                field.isLastNameForEditTrue
                                  ? "border-[#027af2]"
                                  : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                                dark:focus:border-gray-500/50`
                              }`}
                    onChange={(event) => {
                      const value = event.target.value;
                      dispatch(
                        UpdateStringField({
                          name: "lastNameForEdit",
                          value,
                        })
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
                            name: "isLastNameForEditTrue",
                            value: false,
                          })
                        );
                      }
                    }}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="age-for-edit"
                    className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    name="ageForEdit"
                    id="age-for-edit"
                    placeholder="18"
                    value={field.ageForEdit}
                    maxLength={2}
                    className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                            ${
                              field.isAgeForEditTrue
                                ? "border-[#027af2]"
                                : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                              dark:focus:border-gray-500/50`
                            }`}
                    onChange={(event) => {
                      const value = event.target.value.replace(/\D/g, "");
                      dispatch(
                        UpdateStringField({ name: "ageForEdit", value })
                      );

                      if (value.length === 1 || value.length === 2) {
                        dispatch(
                          UpdateBooleanField({
                            name: "isAgeForEditTrue",
                            value: true,
                          })
                        );
                      } else {
                        dispatch(
                          UpdateBooleanField({
                            name: "isAgeForEditTrue",
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
                    htmlFor="year-for-edit"
                    className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
                  >
                    Year
                  </label>
                  <input
                    type="text"
                    name="yearForEdit"
                    id="year-for-edit"
                    placeholder="YYYY"
                    value={field.yearForEdit}
                    maxLength={4}
                    className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                            ${
                              field.isYearForEditTrue
                                ? "border-[#027af2]"
                                : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                              dark:focus:border-gray-500/50`
                            }`}
                    onChange={(event) => {
                      const value = event.target.value.replace(/\D/g, "");
                      const numberValue = Number(value);
                      dispatch(
                        UpdateStringField({ name: "yearForEdit", value })
                      );

                      if (
                        value.length === 4 &&
                        numberValue <= nowYear &&
                        numberValue >= nowYear - 100
                      ) {
                        dispatch(
                          UpdateBooleanField({
                            name: "isYearForEditTrue",
                            value: true,
                          })
                        );
                      } else {
                        dispatch(
                          UpdateBooleanField({
                            name: "isYearForEditTrue",
                            value: false,
                          })
                        );
                      }
                    }}
                  />
                </div>

                <div className="hidden flex-col gap-y-2 md:flex">
                  <label
                    htmlFor="mounth-for-edit"
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
                   field.isMonthForEditTrue
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
                                    name: "isMonthForEditTrue",
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
                    htmlFor="day-for-edit"
                    className="text-sm lg:text-[15px] text-gray-500 dark:text-gray-400 font-semibold"
                  >
                    Day
                  </label>
                  <input
                    type="text"
                    name="dayForEdit"
                    id="day-for-edit"
                    placeholder="DD"
                    value={field.dayForEdit}
                    maxLength={2}
                    className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                            ${
                              field.isDayForEditTrue
                                ? "border-[#027af2]"
                                : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                              dark:focus:border-gray-500/50`
                            }`}
                    onChange={(event) => {
                      const value = event.target.value.replace(/\D/g, "");
                      const numberValue = Number(value);
                      dispatch(
                        UpdateStringField({ name: "dayForEdit", value })
                      );

                      if (
                        (value.length === 1 || value.length === 2) &&
                        numberValue <= 31 &&
                        numberValue >= 1
                      ) {
                        dispatch(
                          UpdateBooleanField({
                            name: "isDayForEditTrue",
                            value: true,
                          })
                        );
                      } else {
                        dispatch(
                          UpdateBooleanField({
                            name: "isDayForEditTrue",
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
                  htmlFor="mounth-for-edit"
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
                   field.isMonthForEditTrue
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
                                  name: "isMonthForEditTrue",
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

              {user?.phoneNumber && (
                <div className="flex flex-col gap-y-2">
                  <label
                    htmlFor="phone-number-for-edit"
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
                        name="phoneNumberForEdit"
                        id="phone-number-for-edit"
                        placeholder="904 ••• 0260"
                        value={formatPhoneNumber(field.phoneNumberForEdit)}
                        maxLength={12}
                        className={`text-slate-800 dark:text-gray-200 font-medium text-sm px-2.5 py-2 rounded-md
                            bg-gray-300/15 dark:bg-[#0b0e14] border outline-none transition-all duration-200
                            w-full
                            ${
                              field.isPhoneNumberForEditTrue
                                ? "border-[#027af2]"
                                : `border-gray-300/50 dark:border-gray-600/40 focus:border-gray-400/65
                              dark:focus:border-gray-500/50`
                            }`}
                        onChange={(event) => {
                          const value = event.target.value.replace(/\D/g, "");

                          dispatch(
                            UpdateStringField({
                              name: "phoneNumberForEdit",
                              value,
                            })
                          );

                          if (value.charAt(0) === "9" && value.length === 10) {
                            dispatch(
                              UpdateBooleanField({
                                name: "isPhoneNumberForEditTrue",
                                value: true,
                              })
                            );
                          } else {
                            dispatch(
                              UpdateBooleanField({
                                name: "isPhoneNumberForEditTrue",
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
              )}

              <div className="grid grid-cols-2 gap-x-2.5">
                <button
                  type="button"
                  className="text-sm lg:text-base rounded-md cursor-pointer border-2 border-gray-300/50 dark:border-gray-600/40
                  h-9 w-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 dark:text-gray-200
                  flex items-center justify-center font-medium"
                  onClick={() => {
                    setShowEditModal(false);
                    dispatch(ClearServerFields());
                    setShowLoader(false);
                  }}
                >
                  Close
                </button>

                <motion.button
                  animate={{ scale: [1, -1, 1] }}
                  transition={{ duration: 0.3, ease: "linear" }}
                  key={status}
                  type="submit"
                  className={`text-sm lg:text-[15px] rounded-md font-medium cursor-pointer h-9 w-full 
                  flex items-center justify-center gap-x-2.5 transition-all duration-200 relative ${
                    updateUserStatusForEditModal === "loading"
                      ? `bg-slate-500 text-gray-200 dark:bg-gray-500 dark:text-slate-800`
                      : updateUserStatusForEditModal === "succeeded"
                      ? "bg-green-600 dark:bg-green-500 text-white"
                      : updateUserStatusForEditModal === "failed"
                      ? "bg-red-600 dark:bg-red-500 text-white"
                      : updateUserStatusForEditModal === "fieldsError"
                      ? "bg-orange-600 dark:bg-orange-500 text-white"
                      : `bg-slate-800 text-gray-200 hover:bg-slate-700 dark:bg-gray-200
                      dark:text-slate-800 dark:hover:bg-white/75`
                  }`}
                  disabled={
                    updateUserStatusForEditModal === "succeeded" ||
                    updateUserStatusForEditModal === "loading"
                  }
                >
                  {updateUserStatusForEditModal === "loading"
                    ? "Editing..."
                    : updateUserStatusForEditModal === "failed"
                    ? "Try again"
                    : updateUserStatusForEditModal === "succeeded"
                    ? "Success"
                    : updateUserStatusForEditModal === "fieldsError"
                    ? "Fill in all fields."
                    : "Edit"}

                  {updateUserStatusForEditModal === "loading" && (
                    <span
                      className="animate-spin w-3 h-3 rounded-full border-2 border-gray-200 dark:border-slate-800
                      border-t-transparent dark:border-t-transparent"
                    ></span>
                  )}

                  <span
                    className={`animate-ping w-2 h-2 rounded-full border absolute z-40 top-2 right-2 ${
                      updateUserStatusForEditModal === "failed"
                        ? "bg-red-700 dark:bg-red-600"
                        : updateUserStatusForEditModal === "succeeded"
                        ? "bg-green-700 dark:bg-green-600"
                        : "hidden"
                    }`}
                  ></span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        ))}
    </AnimatePresence>
  );
};

export default EditModal;
