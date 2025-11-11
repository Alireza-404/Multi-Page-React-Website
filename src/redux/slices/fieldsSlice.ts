import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type StringFields =
  | "enterEmailInHeader"
  | "enterEmailInFooter"
  | "emailForSignIn"
  | "passwordForSignIn"
  | "fullNameForSignUp"
  | "searchForBlogPage";

interface FieldsState {
  enterEmailInHeader: string;
  enterEmailInFooter: string;
  emailForSignIn: string;
  passwordForSignIn: string;
  fullNameForSignUp: string;
  searchForBlogPage: string;
}

const initialState: FieldsState = {
  enterEmailInHeader: "",
  enterEmailInFooter: "",
  emailForSignIn: "",
  passwordForSignIn: "",
  fullNameForSignUp: "",
  searchForBlogPage: "",
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
  },
});

export const { UpdateStringField } = Slice.actions;
export default Slice.reducer;
