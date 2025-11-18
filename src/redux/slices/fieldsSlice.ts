import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StringFields =
  | "enterEmailInHeader"
  | "enterEmailInFooter"
  | "emailForSignIn"
  | "passwordForSignIn"
  | "userNameForSignUp"
  | "emailForSignUp"
  | "passwordForSignUp"
  | "firstNameForSignUp"
  | "lastNameForSignUp"
  | "ageForSignUp"
  | "phoneNumberForSignUp"
  | "searchForBlogPage"
  | "confirmPasswordForSignUp"
  | "dayForSignUp"
  | "monthForSignUp"
  | "yearForSignUp"
  | "codeForSignUp";

type BooleanFields =
  | "isEmailForSignInTrue"
  | "isPasswordForSignInTrue"
  | "isUserNameForSignUpTrue"
  | "isEmailForSignUpTrue"
  | "isPasswordForSignUpTrue"
  | "isFirstNameForSignUpTrue"
  | "isLastNameForSignUpTrue"
  | "isAgeForSignUpTrue"
  | "isPhoneNumberForSignUpTrue"
  | "isDayForSignUpTrue"
  | "isMonthForSignUpTrue"
  | "isYearForSignUpTrue"
  | "isConfirmPasswordForSignUpTrue"
  | "isCodeForSignUpTrue";

interface FieldsState {
  enterEmailInHeader: string;
  enterEmailInFooter: string;
  searchForBlogPage: string;

  // Sign in
  emailForSignIn: string;
  isEmailForSignInTrue: boolean;
  passwordForSignIn: string;
  isPasswordForSignInTrue: boolean;

  // Sign up
  userNameForSignUp: string;
  isUserNameForSignUpTrue: boolean;
  emailForSignUp: string;
  isEmailForSignUpTrue: boolean;
  passwordForSignUp: string;
  isPasswordForSignUpTrue: boolean;
  confirmPasswordForSignUp: string;
  isConfirmPasswordForSignUpTrue: boolean;
  firstNameForSignUp: string;
  isFirstNameForSignUpTrue: boolean;
  lastNameForSignUp: string;
  isLastNameForSignUpTrue: boolean;
  ageForSignUp: string;
  isAgeForSignUpTrue: boolean;
  phoneNumberForSignUp: string;
  isPhoneNumberForSignUpTrue: boolean;
  dayForSignUp: string;
  isDayForSignUpTrue: boolean;
  monthForSignUp: string;
  isMonthForSignUpTrue: boolean;
  yearForSignUp: string;
  isYearForSignUpTrue: boolean;
  codeForSignUp: string;
  isCodeForSignUpTrue: boolean;
}

const initialState: FieldsState = {
  enterEmailInHeader: "",
  enterEmailInFooter: "",
  emailForSignIn: "",
  passwordForSignIn: "",
  userNameForSignUp: "",
  emailForSignUp: "",
  passwordForSignUp: "",
  confirmPasswordForSignUp: "",
  firstNameForSignUp: "",
  lastNameForSignUp: "",
  ageForSignUp: "",
  phoneNumberForSignUp: "",
  searchForBlogPage: "",
  dayForSignUp: "",
  monthForSignUp: "",
  yearForSignUp: "",
  codeForSignUp: "",
  isEmailForSignInTrue: false,
  isPasswordForSignInTrue: false,
  isConfirmPasswordForSignUpTrue: false,
  isUserNameForSignUpTrue: false,
  isEmailForSignUpTrue: false,
  isPasswordForSignUpTrue: false,
  isFirstNameForSignUpTrue: false,
  isLastNameForSignUpTrue: false,
  isAgeForSignUpTrue: false,
  isPhoneNumberForSignUpTrue: false,
  isDayForSignUpTrue: false,
  isMonthForSignUpTrue: false,
  isYearForSignUpTrue: false,
  isCodeForSignUpTrue: false,
};

const Slice = createSlice({
  name: "FieldsSlice",
  initialState,
  reducers: {
    UpdateStringField: (
      state,
      action: PayloadAction<{ name: StringFields; value: string }>
    ) => {
      const { name, value } = action.payload;

      state[name] = value;
    },
    UpdateBooleanField: (
      state,
      action: PayloadAction<{ name: BooleanFields; value: boolean }>
    ) => {
      const { name, value } = action.payload;

      state[name] = value;
    },
    ClearAllFields: () => {
      return initialState;
    },
  },
});

export const { UpdateStringField, UpdateBooleanField, ClearAllFields } =
  Slice.actions;
export default Slice.reducer;
