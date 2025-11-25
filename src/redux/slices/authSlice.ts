import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

const FIREBASE_URL =
  "https://multi-page-react-website-8df15-default-rtdb.firebaseio.com/";

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

interface UserForEdit {
  firstname: string;
  lastname: string;
  age: number;
  phoneNumber?: string;
  dateOfBirth: string;
  gender?: string;
}

interface AuthState {
  user: User | null;
  status: "idle" | "succeeded" | "failed" | "loading" | "fieldsError";
  updateUserStatusForEditModal:
    | "idle"
    | "succeeded"
    | "failed"
    | "loading"
    | "fieldsError";
  error: null | string;
  check: boolean;
}

export const SignupUser = createAsyncThunk<void, User, { rejectValue: string }>(
  "Auth/Signup",
  async (user, thunkAPI) => {
    try {
      const res = await fetch(`${FIREBASE_URL}/users.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Network error. Please try again.");
      }
    } catch {
      return thunkAPI.rejectWithValue("Server error. Please try again.");
    }
  }
);

export const CheckUserInSignup = createAsyncThunk<
  void,
  { username: string; email: string },
  { rejectValue: string }
>("Auth/CheckUserInSignup", async (userData, thunkAPI) => {
  try {
    const res = await fetch(`${FIREBASE_URL}/users.json`);

    if (!res.ok) {
      return thunkAPI.rejectWithValue("Network error. Please try again.");
    }

    const users = await res.json();

    if (!users) {
      return;
    }

    const usersArray = Object.values(users) as User[];

    const checkUserName = usersArray.some(
      (u) => u.username === userData.username
    );
    if (checkUserName) {
      return thunkAPI.rejectWithValue("Username already taken.");
    }

    const checkEmail = usersArray.some((u) => u.email === userData.email);
    if (checkEmail) {
      return thunkAPI.rejectWithValue("Email already registered.");
    }
  } catch {
    return thunkAPI.rejectWithValue("Server error. Please try again.");
  }
});

export const CheckUserInSignin = createAsyncThunk<
  void,
  { email: string; password: string; rememberUser: boolean },
  { rejectValue: string }
>("Auth/CheckUserInSignin", async (userData, thunkAPI) => {
  try {
    const res = await fetch(`${FIREBASE_URL}/users.json`);

    if (!res.ok) {
      return thunkAPI.rejectWithValue("Network error. Please try again.");
    }

    const users = await res.json();

    if (!users) {
      return;
    }

    const usersArray = Object.entries(users) as [string, User][];

    const checkUser = usersArray.find(
      ([_, user]) =>
        user.email === userData.email && user.password === userData.password
    );

    if (!checkUser) {
      return thunkAPI.rejectWithValue(
        "The email or password you entered is incorrect. Please check your information and try again."
      );
    }

    if (userData.rememberUser) {
      localStorage.setItem("uid", checkUser[0]);
      localStorage.setItem(
        "LoginInMultiPageReactWebsite",
        JSON.stringify(true)
      );
    } else {
      sessionStorage.setItem("uid", checkUser[0]);
      sessionStorage.setItem(
        "SessionLoginInMultiPageReactWebsite",
        JSON.stringify(true)
      );
    }
  } catch {
    return thunkAPI.rejectWithValue("Server error. Please try again.");
  }
});

export const GetUser = createAsyncThunk<User, string, { rejectValue: string }>(
  "Auth/GetUser",
  async (uid, thunkAPI) => {
    try {
      const res = await fetch(`${FIREBASE_URL}/users/${uid}.json`);

      if (!res.ok) {
        return thunkAPI.rejectWithValue("Network error. Please try again.");
      }

      const user = await res.json();
      return user;
    } catch {
      return thunkAPI.rejectWithValue("Server error. Please try again.");
    }
  }
);

export const UpdateUser = createAsyncThunk<
  User,
  {
    uid: string;
    data: UserForEdit;
  },
  { rejectValue: string }
>("Auth/UpdateUser", async ({ uid, data }, thunkAPI) => {
  try {
    const res = await fetch(`${FIREBASE_URL}/users/${uid}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const user = await res.json();

    return user;
  } catch {
    return thunkAPI.rejectWithValue("Server error. Please try again.");
  }
});

const initialState: AuthState = {
  user: null,
  status: "idle",
  updateUserStatusForEditModal: "idle",
  error: null,
  check: false,
};

const Slice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    SetFieldsError: (state) => {
      state.status = "fieldsError";
    },
    setFieldErrorForUpdateUser: (state) => {
      state.updateUserStatusForEditModal = "fieldsError";
    },
    ClearServerFields: (state) => {
      state.error = null;
      state.status = "idle";
      state.updateUserStatusForEditModal = "idle";
      state.check = false;
      state.user = null;
    },
    LogoutUser: (state) => {
      localStorage.removeItem("uid");
      localStorage.removeItem("LoginInMultiPageReactWebsite");
      sessionStorage.removeItem("uid");
      sessionStorage.removeItem("SessionLoginInMultiPageReactWebsite");
      state.error = null;
      state.status = "idle";
      state.check = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignupUser.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(SignupUser.fulfilled, (state) => {
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.error = action.payload ?? "Error :(";
        state.status = "failed";
      })

      .addCase(CheckUserInSignup.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(CheckUserInSignup.fulfilled, (state) => {
        state.error = null;
        state.status = "succeeded";
        state.check = false;
      })
      .addCase(CheckUserInSignup.rejected, (state, action) => {
        state.status = "failed";
        state.check = true;
        state.error = action.payload ?? "Error :(";
      })

      .addCase(CheckUserInSignin.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(CheckUserInSignin.fulfilled, (state) => {
        state.error = null;
        state.status = "succeeded";
        state.check = false;
      })
      .addCase(CheckUserInSignin.rejected, (state, action) => {
        state.error = action.payload ?? "Error :(";
        state.status = "failed";
        state.check = true;
      })

      .addCase(GetUser.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(GetUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.error = null;
        state.status = "succeeded";
        state.check = false;
        state.user = action.payload;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.error = action.payload ?? "Error :(";
        state.status = "failed";
        state.check = false;
      })

      .addCase(UpdateUser.pending, (state) => {
        state.error = null;
        state.updateUserStatusForEditModal = "loading";
      })
      .addCase(UpdateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.error = null;
        state.updateUserStatusForEditModal = "succeeded";
        state.user = action.payload;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.error = action.payload ?? "Error :(";
        state.updateUserStatusForEditModal = "failed";
      });
  },
});

export const {
  SetFieldsError,
  setFieldErrorForUpdateUser,
  ClearServerFields,
  LogoutUser,
} = Slice.actions;
export default Slice.reducer;
