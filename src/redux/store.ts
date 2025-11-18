import { configureStore } from "@reduxjs/toolkit";
import FieldsSlice from "./slices/fieldsSlice";
import AuthSlice from "./slices/authSlice";

const Store = configureStore({
  reducer: { fields: FieldsSlice, auth: AuthSlice },
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
export default Store;
