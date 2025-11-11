import { configureStore } from "@reduxjs/toolkit";
import FieldsSlice from "./slices/fieldsSlice";

const Store = configureStore({
  reducer: { fields: FieldsSlice },
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
export default Store;
