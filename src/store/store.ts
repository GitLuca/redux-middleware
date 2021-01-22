import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

export const store = configureStore({
  reducer: {
    post: slice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
